const express = require("express");
const router = express.Router();
const Appointment = require("../models/Appointment");
const auth = require("../middleware/authMiddleware");

// BOOK APPOINTMENT (SECURED)
router.post("/book", auth, async (req, res) => {
  try {
    const { doctorId, date, time } = req.body;

    const appointment = new Appointment({
      userId: req.user.id,
      doctorId,
      date,
      time
    });

    await appointment.save();

    res.json({
      msg: "Appointment booked successfully",
      appointment
    });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


// GET ALL APPOINTMENTS (ADMIN/DEBUG)
router.get("/", async (req, res) => {
  try {
    const appointments = await Appointment.find()
      .populate("userId", "name email")
      .populate("doctorId", "name specialization");

    res.json(appointments);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


// GET ONLY LOGGED-IN USER APPOINTMENTS 👇 ADD HERE
router.get("/my", auth, async (req, res) => {
  try {
    const appointments = await Appointment.find({ userId: req.user.id })
      .populate("doctorId", "name specialization");

    res.json(appointments);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.delete("/:id", auth, async (req, res) => {
  try {
    const appointment = await Appointment.findById(req.params.id);

    if (!appointment) {
      return res.status(404).json({ msg: "Appointment not found" });
    }

    // optional security: only owner can delete
    if (appointment.userId.toString() !== req.user.id) {
      return res.status(403).json({ msg: "Not authorized" });
    }

    await appointment.deleteOne();

    res.json({ msg: "Appointment cancelled successfully" });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.put("/:id", auth, async (req, res) => {
  try {
    const { date, time } = req.body;

    const appointment = await Appointment.findById(req.params.id);

    if (!appointment) {
      return res.status(404).json({ msg: "Appointment not found" });
    }

    // only owner can update
    if (appointment.userId.toString() !== req.user.id) {
      return res.status(403).json({ msg: "Not authorized" });
    }

    appointment.date = date || appointment.date;
    appointment.time = time || appointment.time;

    await appointment.save();

    res.json({
      msg: "Appointment updated successfully",
      appointment
    });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;