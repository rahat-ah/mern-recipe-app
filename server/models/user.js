const mongoose = require("mongoose")

const userSchema = new mongoose.Schema({
    username:{type:String,required:true,unique:true},
    password:{type:String,required:true},
    savedRecipeId:[{type:mongoose.Schema.Types.ObjectId}]
})

const userModel = mongoose.model("users",userSchema)
module.exports = userModel