import mongoose from "mongoose";

const connectDb = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log("Connected Successfully!");
  } catch (error) {
    console.log("Connected failed", error);
    process.exit(1);
  }
};
export default connectDb;
