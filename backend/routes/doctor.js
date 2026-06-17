const express = require("express");
const router = express.Router();
const Doctor = require("../models/Doctor");

const auth = require("../middleware/authMiddleware");
const adminMiddleware = require("../middleware/adminMiddleware");


// ADD DOCTOR
router.post("/add", async (req, res) => {
  try {
    const doctor = new Doctor(req.body);
    await doctor.save();

    res.json({
      msg: "Doctor added successfully",
      doctor
    });

  } catch (err) {
    res.status(500).json({
      error: err.message
    });
  }
});


// GET ALL APPROVED DOCTORS
router.get("/", async (req, res) => {
  try {
    const doctors = await Doctor.find({
      isApproved: true
    });

    res.json(doctors);

  } catch (err) {
    res.status(500).json({
      error: err.message
    });
  }
});


// GET SINGLE DOCTOR
router.get("/:id", async (req, res) => {
  try {
    const doctor = await Doctor.findById(req.params.id);

    if (!doctor) {
      return res.status(404).json({
        msg: "Doctor not found"
      });
    }

    res.json(doctor);

  } catch (err) {
    res.status(500).json({
      error: err.message
    });
  }
});


// ADMIN APPROVE DOCTOR
router.put(
  "/approve/:id",
  auth,
  adminMiddleware,
  async (req, res) => {
    try {

      const doctor = await Doctor.findById(req.params.id);

      if (!doctor) {
        return res.status(404).json({
          msg: "Doctor not found"
        });
      }

      doctor.isApproved = true;

      await doctor.save();

      res.json({
        msg: "Doctor approved successfully",
        doctor
      });

    } catch (err) {
      res.status(500).json({
        error: err.message
      });
    }
  }
);

module.exports = router;