const mongoose = require("mongoose");

const doctorSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },

  specialization: {
    type: String,
    required: true
  },

  experience: {
    type: Number,
    required: true
  },

  fees: {
    type: Number,
    required: true
  },

  available: {
    type: Boolean,
    default: true
  },

  availableSlots: {
    type: [String],
    default: []
  },

  isApproved: {
    type: Boolean,
    default: false
  }
});

module.exports = mongoose.model("Doctor", doctorSchema);