import mongoose from "mongoose";
import colors from "colors";

const connectDB = async (req, res) => {
  try {
    const con = await mongoose.connect(`${process.env.MONGO_URL}`);
    console.log(`Connected to   MongoDB ${con.connection.host}`.bgCyan);
  } catch (error) {
    console.log(`MongoDB connection error ${error}`);
  }
};

export default connectDB;
