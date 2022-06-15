const mongoose = require('mongoose');

const EquipmentSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true
  },
  date: {
    type: Date
  },
  items: {
    type: Map,
    of: Number
  }
});

module.exports = Equipment = mongoose.model('equipment', EquipmentSchema);
