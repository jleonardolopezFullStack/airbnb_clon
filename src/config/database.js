import mongoose from "mongoose";

let connected = false;

const connectDB = async () => {
  mongoose.set("strictQuery", true);

  // If the Database i salready connected, don't connect again

  if (connected) {
    console.log("MongoDB is already connected");
    return;
  }

  // Connect to MongoDB

  try {
    // console.log(process.env.MONGODB_URL);
    await mongoose.connect(process.env.MONGODB_URL);
    connected = true;
    console.log("Server is connected to the Database");
  } catch (error) {
    console.log(error);
  }
};

export default connectDB;
