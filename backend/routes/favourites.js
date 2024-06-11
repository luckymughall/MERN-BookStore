const router = require("express").Router();
const User = require("../models/user");
const book = require("../models/book");
const { authenticateToken } = require("./userAuth");

router.put("/favourites", authenticateToken,async(req,res)=>{
    try {
        const {bookid, id} = req.headers;
    const userData = await User.findById(id);
    const isbookfavourites = await userData.favourites.includes(bookid);
    if (isbookfavourites) {
        return res.status(200).json({message:"Book is Already in Favourites"});
    }
    await User.findByIdAndUpdate(id,{$push:{favourites:bookid}});
    return res.status(200).json({message:"Book Added to Favourites"});
    } catch (error) {
        return res.status(500).json({message:"Internal Server Error"});
    }
});

router.put("/removefavourites", authenticateToken,async(req,res)=>{
    try {
        const {bookid, id} = req.headers;
    const userData = await User.findById(id);
    const isbookfavourites = await userData.favourites.includes(bookid);
    if (isbookfavourites) {
        await User.findByIdAndUpdate(id,{$pull:{favourites:bookid}});
    }
    return res.status(200).json({message:"Book Removed from Favourites"});
    } catch (error) {
        return res.status(500).json({message:"Internal Server Error"});
    }
});

router.get("/getfavbooks", authenticateToken,async(req,res)=>{
    try {
        const {id} = req.headers;
        const userData = await User.findById(id).populate("favourites");
        const favouriteBook = userData.favourites;
        return res.json({
            status: "Success",
            data: favouriteBook
        });
    } catch (error) {
        return res.status(500).json({message:"Internal Server Error"});
    }

});


module.exports=router;