import mongoose from "mongoose";

const ConnectionRequest = new mongoose.Schema(
  {
    fromUserId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    toUserId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    status: {
      type: String,
      enum: {
        values: ["ignored","interested","pending", "accepted", "rejected"],
        message: "{VALUE} is not a valid status",
      },
      default: "pending",
    },
  },
  {
    timestamps: true,
  }
);

// Prevent duplicate connections between the same users
ConnectionRequest.index({ fromId: 1, toId: 1 }, { unique: true });

export const ConnectionRequestModel =new mongoose.model("UserConnection", ConnectionRequest);

