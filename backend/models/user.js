const mongoose = require("mongoose");
const defaultAvatars = {
    Male: "https://ps.w.org/user-avatar-reloaded/assets/icon-256x256.png",
    Female: "https://st2.depositphotos.com/4967775/11238/v/450/depositphotos_112387970-stock-illustration-avatar-girls-icon-vector-woman.jpg"
};

const User = new mongoose.Schema({
    email : {
        type:String,
        required:true,
        unique:true
    },
    username : {
        type:String,
        required:true,
        unique:true
    },
    password : {
        type:String,
        required:true
    },
    address : {
        type:String,
        required:true
    },
    gender: {
        type:String,
        enum: ["Male","Female"],
        required:true,
    },
    avatar : {
        type:String
    },
    role : {
        type:String,
        enum: ["user","admin"],
        default:"user"
    },
    favourites : [{
        type:mongoose.Types.ObjectId,
        ref:"books"
    },
],
cart : [{
    type:mongoose.Types.ObjectId,
    ref:"books"
},
],
orders : [{
    type:mongoose.Types.ObjectId,
    ref:"order"
},
],
},{timestamps: true},

);
User.pre('save', function (next) {
    if (!this.avatar) {
        this.avatar = defaultAvatars[this.gender];
    }
    next();
});
module.exports=mongoose.model("user",User);