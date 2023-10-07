import mongoose from "mongoose";

const MONGODB_URL = process.env.MONGODB_URL || "mongodb://127.0.0.1/myDB";

const dbConnect = () => {
  mongoose
    .connect(MONGODB_URL)
    .then((conn) => console.log(`Connected to DB: ${conn.connection.host}`))
    .catch((error) => console.log(error.message));
};

export default dbConnect;
