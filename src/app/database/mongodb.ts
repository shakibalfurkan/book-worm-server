import mongoose from "mongoose";
import config from "../config/index.js";

async function connectToMongoDB() {
  try {
    await mongoose.connect(config.mongodb_url as string);
    console.log(`🛢MongoDB Database is connected successfully`);
  } catch (err) {
    console.log("Failed to connect MongoDB database", err);
  }
}

export default connectToMongoDB;
