const router = require("express").Router();
const User = require("../models/user");
const Book = require("../models/book");
const Order = require("../models/order");
const { authenticateToken } = require("./userAuth");

router.post("/order", authenticateToken, async (req, res) => {
    try {
        const { id } = req.headers;
        const { order } = req.body;

        // Validate that `order` is an array
        if (!Array.isArray(order)) {
            return res.status(400).json({ message: "Order should be an array" });
        }

        for (const orderItem of order) {
            if (!orderItem.id) {
                return res.status(400).json({ message: "Each order item must have an id" });
            }

            const newOrder = new Order({ user: id, book: orderItem.id });
            const savedOrder = await newOrder.save();

            await User.findByIdAndUpdate(id, {
                $push: { orders: savedOrder._id }
            });

            await User.findByIdAndUpdate(id, {
                $pull: { cart: orderItem.id }
            });
        }

        return res.json({
            status: "Success",
            message: "Order Placed Successfully."
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Internal Server Error." });
    }
});

router.get("/getorderhistory", authenticateToken, async (req, res) => {
    try {
        const { id } = req.headers;
        const user = await User.findById(id).populate({
            path: "orders",
            populate: { path: "book" }
        });

        if (!user) {
            return res.status(404).json({ message: "User not found." });
        }

        const orderHistory = user.orders.reverse();

        return res.json({
            status: "Success",
            data: orderHistory
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Internal Server Error." });
    }
});

router.get("/allorders", authenticateToken, async (req, res) => {
    try {
        const allOrders = await Order.find().populate("book").populate("user").sort({ createdAt: -1 });
        return res.json({
            status: "Success",
            data: allOrders
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Internal Server Error." });
    }
});

router.put("/update-status/:id", authenticateToken, async (req, res) => {
    try {
        const { id } = req.params;
        const updatedOrder = await Order.findByIdAndUpdate(id, { status: req.body.status }, { new: true });

        if (!updatedOrder) {
            return res.status(404).json({
                status: "Failure",
                message: "Order not found"
            });
        }

        return res.json({
            status: "Success",
            message: "Status Updated Successfully",
            data: updatedOrder
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "An error occurred" });
    }
});

module.exports = router;
