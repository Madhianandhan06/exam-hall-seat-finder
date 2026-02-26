const ExamRecord = require("../models/ExamRecord");

exports.searchByRegNo = async (req, res) => {
  const { regNo } = req.query;

  const record = await ExamRecord.findOne({ regNo }).sort({ createdAt: -1 });

  if (!record) {
    return res.status(404).json({ message: "No record found" });
  }

  res.json(record);
};
