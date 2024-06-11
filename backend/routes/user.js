const router = require("express").Router();
const User=require("../models/user");
const bcryptjs= require("bcryptjs");
const jwt = require("jsonwebtoken");
const {authenticateToken} = require("./userAuth");
//SIGNUP
router.post("/signup", async(req,res)=>{
    try {
        const {email,username,password,address,gender} = req.body;
        if (!email || !username || !password || !address || !gender) {
            return res.status(400).json({ message: "All fields are required." });
        }

        // Validate gender field (case-sensitive)
        if (!['Male', 'Female'].includes(gender)) {
            return res.status(400).json({ message: "Gender must be either 'Male' or 'Female'." });
        }
        if (username.length < 3) {
            return res.status(400).json({message:"Username must be at least 3 characters long."});
        };
        if (!email.includes('@')) {
            return res.status(400).json({ message: "Email must contain an '@' symbol." });
        };
        if (password.length < 8) {
            return res.status(400).json({ message: "Password must be at least 8 characters long." });
        };
        const hashpassword = await bcryptjs.hash(password,10);

        const existingUsername = await User.findOne({username});
        if(existingUsername) {
            return res.status(400).json({message:"Ussrname Already Exists"});
        };
        const existingEmail = await User.findOne({email});
        if(existingEmail) {
            return res.status(400).json({message:"Email Already Exists"});
        };

        const newUser = new User({email,username,password:hashpassword,address,gender});
        await newUser.save();
        return res.status(200).json({message:"Sign Up Successful"});
    } catch (error) {
        res.status(500).json({message:"Internal Server Error",error});
    }

});

//SIGNIN
router.post("/signin", async (req, res) => {
    try {
        const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ message: 'Please provide an email and password' });
    }

    let user;
    if (email.includes('@')) {
        user = await User.findOne({ email });
    } else {
        user = await User.findOne({ username: email });
    }

    if (!user) {
        return res.status(400).json({ message: "Email or Username does not exist. Please Sign Up First." });
    }

    bcryptjs.compare(password, user.password, (err, result) => {
        if (result) {
            const authClaims = {
                email: user.email,
                username: user.username,
                role:user.role
                // Add any other relevant claims here
            };
            const token = jwt.sign({authClaims},"bookheaven112",{expiresIn:"30d"});
            return res.status(200).json({id:user._id , role:user.role, token , message: 'Sign In Successfull.'});
            
        } else {
            return res.status(400).json({ message: 'Invalid Credentials' });
        }
    });
    } catch (error) {
        return res.status(500).json({ message: 'Internal Server Error' });
    }
});

//getuserinfo
router.get("/getuserinfo",authenticateToken,async (req,res)=>{
    try {
        const {id} = req.headers;
        const data = await User.findById(id).select('-password');
        return res.status(200).json(data);
    } catch (error) {
        return res.status(500).json({ message: 'Internal Server Error' });
    }
});

//update address
router.put("/updateaddress",authenticateToken,async(req,res)=>{
    try {
        const {id} = req.headers;
        const {address} = req.body;
        await User.findByIdAndUpdate(id,{address:address});
        return res.status(200).json({ message: 'Address Updated Sucessfully.' });
    } catch (error) {
        return res.status(500).json({ message: 'Internal Server Error' });
    };
});
module.exports=router;