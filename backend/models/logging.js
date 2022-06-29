const mongoose = require('mongoose');

const LoggingSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true
  },
  createdAt: { // this field is immutable so that the created date doesn't change
    type: Date,
    default: () => Date.now(),
    immutable: true,
    },
  // Technically there is no need to include all the items as parameters when logging, mongodb allows you to be flexible. 
  changeditems: {
    item1: Number,
    item2: Number,
    item3: Number,
    item4: Number,
    item5: Number,
    item6: Number,
  }
});

module.exports = Logging = mongoose.model('logging', LoggingSchema);