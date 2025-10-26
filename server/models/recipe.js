const mongoose = require("mongoose")

const recipeSchema = new mongoose.Schema({
    name:{type:String,required:true},
    description:{type:String},
    ingerdients:{type:String},
    imageUrl:{type:String},
    userId:{type:mongoose.Types.ObjectId},
})

const recipeModel = mongoose.model("recipe",recipeSchema)
module.exports = recipeModel