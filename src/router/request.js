import express from "express"
import { userAuth } from "../middlewares/auth.js";
import { ConnectionRequestModel } from "../models/userConnection.js"

export const requestRouter = express.Router();


requestRouter.post("/request/send/:status/:toUserId", userAuth, async (req, res) => {
    try {
        const fromUserId = req.user._id;
        const toUserId = req.params.toUserId;
        const status = req.params.status;

        console.log(
            fromUserId,
            toUserId,
            status
        );
    
        const connectionRequest = new ConnectionRequestModel({
            fromUserId,
            toUserId,
            status
        }) 

        const data=await connectionRequest.save();


        res.json({
            message:"connection request sent successfully",
            data,
        })
    

    } catch (error) {
        res.status(400).send("request failed"+ error)
    }

})  