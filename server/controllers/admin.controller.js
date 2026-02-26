const xlsx = require("xlsx");
const fs = require("fs");
const ExamRecord = require("../models/ExamRecord");
const UploadLog = require("../models/UploadLog");

// 1️⃣ Upload Excel
exports.uploadExcel = async (req, res) => {
  try {
    const examId = req.body.examId;
    if (!examId) {
      return res.status(400).json({ error: "Exam ID required" });
    }

    const workbook = xlsx.readFile(req.file.path);
    const sheet = workbook.Sheets[workbook.SheetNames[0]];
    const data = xlsx.utils.sheet_to_json(sheet);

    const uploadId = Date.now().toString();

    const records = data.map(row => ({
      ...row,
      examId,
      uploadId
    }));

    await ExamRecord.insertMany(records);

    await UploadLog.create({
      fileName: req.file.originalname,
      filePath: req.file.path,
      examId,
      uploadId,
      recordCount: records.length
    });

    res.json({ success: true, records: records.length });
  } catch {
    res.status(500).json({ error: "Upload failed" });
  }
};

// 2️⃣ Upload history
exports.getUploadHistory = async (req, res) => {
  const uploads = await UploadLog.find().sort({ uploadedAt: -1 });
  res.json(uploads);
};

// 3️⃣ Delete upload (DB + FILE)
exports.deleteUpload = async (req, res) => {
  try {
    const upload = await UploadLog.findById(req.params.id);
    if (!upload) {
      return res.status(404).json({ error: "Upload not found" });
    }

    await ExamRecord.deleteMany({ uploadId: upload.uploadId });

    if (upload.filePath && fs.existsSync(upload.filePath)) {
      fs.unlinkSync(upload.filePath);
    }

    await UploadLog.findByIdAndDelete(req.params.id);

    res.json({ success: true });
  } catch {
    res.status(500).json({ error: "Delete failed" });
  }
};
