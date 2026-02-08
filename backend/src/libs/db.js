import mongoose from "mongoose";

const connectDb = async () => {
  try {
    if (!process.env.MONGODB_URI) {
      throw new error("MONGODB_URI environment variable is not defined");
    }
    await mongoose.connect(process.env.MONGODB_URI);
    console.log("Connected Successfully!");
  } catch (error) {
    console.error("Connection failed", error);
    process.exit(1);
  }
};
export default connectDb;
