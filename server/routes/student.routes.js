const express = require("express");
const { searchByRegNo } = require("../controllers/student.controller");

const router = express.Router();
router.get("/search", searchByRegNo);

module.exports = router;
