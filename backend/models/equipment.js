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


/* this is how the our one should look like
{
"compactor_id": 1,
"items": [
"item1": 0,
"item2": 3,
"item3": 1,
"item4": 2,
"item5": 3,
"item6": 4
]]
}
*/