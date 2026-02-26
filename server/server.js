require("dotenv").config();
const express = require("express");
const cors = require("cors");
const path = require("path");

const connectDB = require("./config/db");
const adminRoutes = require("./routes/admin.routes");
const studentRoutes = require("./routes/student.routes");

const app = express();
app.use(cors());
app.use(express.json());

connectDB();

// Serve static files from client folder
app.use(express.static(path.join(__dirname, "../client")));

app.use("/api/admin", adminRoutes);
app.use("/api/student", studentRoutes);

// Serve index.html for all other routes (SPA)
app.use((req, res) => {
  res.sendFile(path.join(__dirname, "../client/index.html"));
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () =>
  console.log("🚀 Server running on port " + PORT)
);
