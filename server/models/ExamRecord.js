const mongoose = require("mongoose");

const examRecordSchema = new mongoose.Schema({
  regNo: { type: String, index: true },
  department: String,
  hall: String,
  seatNo: String,
  subject: String,
  date: String,
  session: String,
  name: String,
  examId: String,
  uploadId: String,

  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model("ExamRecord", examRecordSchema);
