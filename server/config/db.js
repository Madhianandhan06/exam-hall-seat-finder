// 1️⃣ Import mongoose
const mongoose = require("mongoose");

// 2️⃣ Connect function
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("✅ MongoDB connected");
  } catch (err) {
    console.error("❌ MongoDB connection failed", err.message);
    process.exit(1);
  }
};

// 3️⃣ Export
module.exports = connectDB;
