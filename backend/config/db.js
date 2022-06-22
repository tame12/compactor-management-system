const db = process.env.MONGO_URI;
// const config = require('config');
// const db = config.get('MONGO_URI');

// console.log(process.env.MONGO_URI)

const mongoose = require('mongoose');
const connectDB = async () => {
  try {
    await mongoose.connect(
      db,
      { useNewUrlParser: true }
    );

    console.log('MongoDB is Connected...');
  } catch (err) {
    console.error(err.message);
    process.exit(1);
  }
};

module.exports = connectDB;