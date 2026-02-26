require("dotenv").config();
const express = require("express");
const cors = require("cors");

const connectDB = require("./config/db");
const adminRoutes = require("./routes/admin.routes");
const studentRoutes = require("./routes/student.routes");

const app = express();
app.use(cors());
app.use(express.json());

connectDB();

app.use("/api/admin", adminRoutes);
app.use("/api/student", studentRoutes);

app.listen(5000, () =>
  console.log("🚀 Server running on 5000")
);
