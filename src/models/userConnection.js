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
        values: ["ignored","pending", "accepted", "rejected"],
        message: "{VALUE} is not a valid status",
      },
      default: "pending",
    },
    timestamps:true,
  },
  {
    timestamps: true,
  }
);

// Prevent duplicate connections between the same users
ConnectionRequest.index({ fromId: 1, toId: 1 }, { unique: true });

const ConnectionRequestModel =new mongoose.model("UserConnection", userConnectionSchema);

export default ConnectionRequestModel;

