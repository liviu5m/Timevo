import mongoose from "mongoose";

const connectDB = async () => {
  if (mongoose.connections[0].readyState) {
    return true;
  }

  try {
    await mongoose
      .connect(process.env.MONGO_PROD_URI)
      .then(() => console.log("Database connected!"))
      .catch((err) => console.log(err));
    console.log("Mongodb connected");
    return true;
  } catch (error) {
    console.log(error);
  }
};

export default connectDB;
