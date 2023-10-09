import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const dbConnect = () => {
  mongoose
    .connect(process.env.MONGODB_URL)
    .then((conn) => console.log(`Connected to DB: ${conn.connection.host}`))
    .catch((error) => console.log(error.message));
};

export default dbConnect;
