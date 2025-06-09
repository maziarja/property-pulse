import mongoose from "mongoose";

let connected = false;

const connectDB = async () => {
  mongoose.set("strictQuery", true);
  //   if db connected do not connected again
  if (connected) {
    console.log("database is connected");
    return;
  }
  // connect to db
  try {
    mongoose.connect(process.env.DATABASE_URI);
    connected = true;
  } catch (err) {
    console.log(err);
  }
};

export default connectDB;
