const express = require("express")
const userModel = require("../models/user")
const userdataRouter = express.Router()

userdataRouter.get("/userdata/:id", async (req,res)=>{
    const {id} = req.params

    try {
        const userData = await userModel.findById(id)
        return res.json({userData})
    } catch (error) {
       return res.status(500).json(error)
    }
})

module.exports = userdataRouter