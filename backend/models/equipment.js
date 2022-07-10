const mongoose = require('mongoose');

const EquipmentSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  date: {
    type: Date
  },
  compactor: {
    type: Number
  },
  items: [
    {
      id: Number,
      itemName: String,
      itemQuantity: Number
    }
  ]
});

module.exports = Equipment = mongoose.model('equipment', EquipmentSchema);
