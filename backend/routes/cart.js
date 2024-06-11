const router = require("express").Router();
const User = require("../models/user");
const book = require("../models/book");
const { authenticateToken } = require("./userAuth");

router.put("/addtocart", authenticateToken, async (req, res) => {
    try {
        const { bookid, id } = req.headers;
        const userData = await User.findById(id);
        const isBookInCart = userData.cart.includes(bookid);

        if (isBookInCart) {
            return res.json({
                status: "Success",
                message: "Book is already in cart"
            });
        }

        await User.findByIdAndUpdate(id, {
            $push: { cart: bookid }
        });

        return res.json({
            status: "Success",
            message: "Book added to cart successfully."
        });
    } catch (error) {
        return res.status(500).json({ message: "Internal Server Error." });
    }
});


router.put("/delcart/:bookid",authenticateToken,async(req,res)=>{
    try {
        const {bookid} = req.params;
        const {id} = req.headers;
        await User.findByIdAndUpdate(id,{$pull:{cart:bookid}});
        return res.json({
            status: "Success",
            message: "Book removed from cart successfully."
        });
    } catch (error) {
        return res.status(500).json({ message: "Internal Server Error." });
    }
});


router.get("/getcart",authenticateToken,async(req,res)=>{
    try {
        const {id} = req.headers;
        const userData = await User.findById(id).populate("cart");
        const cart = await userData.cart.reverse();
        return res.json({
            status: "Success",
            data: cart
        });
    } catch (error) {
        return res.status(500).json({ message: "Internal Server Error." });
    }
});

module.exports=router;