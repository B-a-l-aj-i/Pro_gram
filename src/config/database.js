import mongoose from "mongoose";

export async function connectDB() {
  await mongoose.connect(
    "mongodb+srv://balajivijay679:*Balaji%402004@cluster-1.rgjtfox.mongodb.net/sample"
  );
}
