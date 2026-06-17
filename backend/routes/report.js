const express = require("express");
const router = express.Router();
const multer = require("multer");
const Report = require("../models/Report");
const auth = require("../middleware/authMiddleware");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

const upload = multer({ storage });

router.post(
  "/upload",
  auth,
  upload.single("reportFile"),
  async (req, res) => {
    try {
      if (!req.file) {
        return res.status(400).json({
          message: "No file uploaded",
        });
      }

      const report = new Report({
        user: req.user.id,
        filename: req.file.filename,
        filepath: req.file.path,
      });

      await report.save();

      res.json({
        message: "Report uploaded successfully",
      });
    } catch (err) {
      console.log(err);
      res.status(500).json({
        message: "Upload failed",
      });
    }
  }
);

router.get("/my-reports", auth, async (req, res) => {
  try {
    const reports = await Report.find({
      user: req.user.id,
    }).sort({ uploadedAt: -1 });

    res.json(reports);
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: "Error fetching reports",
    });
  }
});

module.exports = router;