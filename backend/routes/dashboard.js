const express = require("express");
const router = express.Router();

const Appointment = require("../models/Appointment");
const Report = require("../models/Report");
const auth = require("../middleware/authMiddleware");

router.get("/", auth, async (req, res) => {
  try {
    const totalAppointments = await Appointment.countDocuments({
      userId: req.user.id,
    });

    const activeAppointments = await Appointment.countDocuments({
      userId: req.user.id,
      status: { $ne: "cancelled" },
    });

    const totalReports = await Report.countDocuments({
      user: req.user.id,
    });

    res.json({
      totalAppointments,
      activeAppointments,
      totalReports,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: "Dashboard error",
    });
  }
});

module.exports = router;