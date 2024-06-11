const router = require("express").Router();
const User = require("../models/user");
const book = require("../models/book");
const { authenticateToken } = require("./userAuth");

router.post("/addbook", authenticateToken, async (req, res) => {
    try {
        const { id } = req.headers;

        // Fetch the user based on the provided ID in headers
        const user = await User.findById(id);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        // Check if the user exists and has an admin role
        if (user.role !== "admin") {
            return res.status(403).json({ message: "Sorry, you are not authorized to add books" });
        }

        // Check if a book with the same title and author already exists
        const existingBook = await book.findOne({ title: req.body.title, author: req.body.author });
        if (existingBook) {
            return res.status(400).json({ message: "This book already exists" });
        }

        // Create a new book instance with the provided data
        const newBook = new book({
            url: req.body.imageUrl,
            title: req.body.title,
            author: req.body.author,
            price: req.body.price,
            description: req.body.description,
            language: req.body.language
        });

        // Save the book to the database
        await newBook.save();

        // Respond with a success message
        return res.status(200).json({ message: "Book added successfully" });

    } catch (error) {
        // Handle any errors that occur
        return res.status(500).json({ message: "Internal Server Error" });
    }
});


//Update Book
router.put("/updatebook",authenticateToken,async(req,res)=>{
    try {
        const {bookid} = req.headers;
    await book.findByIdAndUpdate(bookid,{
        url: req.body.url,
            title: req.body.title,
            author: req.body.author,
            price: req.body.price,
            description: req.body.description,
            language: req.body.language
    });
    return res.status(200).json({ message: "Book Updated successfully" });
    } catch (error) {
        return res.status(500).json({ message: "Internal Server Error" });
    }

});

//deletebook
router.delete("/deletebook",authenticateToken,async(req,res)=>{
    try {
        const {bookid} = req.headers;
    await book.findByIdAndDelete(bookid);
    return res.status(200).json({ message: "Book Deleted successfully" });
    } catch (error) {
        return res.status(500).json({ message: "Internal Server Error" });
    }

});

//readbooks
router.get("/readbooks",async(req,res)=>{
    try {
        const Books = await book.find().sort({createdAt : -1});
    return res.status(200).json({ status:"Success", data:Books });
    } catch (error) {
        return res.status(500).json({ message: "Internal Server Error" });
    }
});

//recentbooks
//readbooks
router.get("/getrecentbooks",async(req,res)=>{
    try {
        const Books = await book.find().sort({createdAt : -1}).limit(4);
    return res.status(200).json({ status:"Success", data:Books });
    } catch (error) {
        return res.status(500).json({ message: "Internal Server Error" });
    }
});
//by id
router.get("/getrecentbooksbyid/:id",async(req,res)=>{
    const id = req.params.id;
    try {
        const Books = await book.findById(id);
    return res.status(200).json({ status:"Success", data:Books });
    } catch (error) {
        return res.status(500).json({ message: "Internal Server Error" });
    }
});

module.exports = router;

