const mongoose = require('mongoose');

const CompactorSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true
  },
  createdAt: { // this field is immutable so that the created date doesn't change
    type: Date,
    default: () => Date.now(),
    immutable: true,
  },
  updatedAt: Date,
  items: {
    item1: Number,
    item2: Number,
    item3: Number,
    item4: Number,
    item5: Number,
    item6: Number,
  }
});

module.exports = Compactor = mongoose.model('compactor', CompactorSchema);


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