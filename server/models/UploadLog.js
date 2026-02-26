const mongoose = require("mongoose");

const uploadLogSchema = new mongoose.Schema({
  fileName: String,
  filePath: String,
  examId: String,
  uploadId: String,
  recordCount: Number,
  uploadedAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model("UploadLog", uploadLogSchema);
