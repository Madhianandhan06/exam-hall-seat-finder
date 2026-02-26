const express = require("express");
const multer = require("multer");
const {
  uploadExcel,
  getUploadHistory,
  deleteUpload
} = require("../controllers/admin.controller");

const router = express.Router();
const upload = multer({ dest: "uploads/" });

const adminAuth = (req, res, next) => {
  if (req.headers["x-admin-key"] !== process.env.ADMIN_KEY) {
    return res.status(401).json({ error: "Unauthorized" });
  }
  next();
};

router.post("/upload", adminAuth, upload.single("file"), uploadExcel);
router.get("/history", adminAuth, getUploadHistory);
router.delete("/delete/:id", adminAuth, deleteUpload);

module.exports = router;
