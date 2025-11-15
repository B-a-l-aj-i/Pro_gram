import mongoose from "mongoose";

const userConnectionSchema = new mongoose.Schema(
  {
    fromId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    toId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    status: {
      type: String,
      enum: {
        values: ["pending", "accepted", "rejected"],
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
userConnectionSchema.index({ fromId: 1, toId: 1 }, { unique: true });

const UserConnection = mongoose.model("UserConnection", userConnectionSchema);

export default UserConnection;

