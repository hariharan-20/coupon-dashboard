const mongoose = require("mongoose");
const mongodb_url = "mongodb://127.0.0.1:27017/obform";
const connectDB = async () => {
  try {
    const conn = await mongoose.connect(mongodb_url, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
    });

    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
};

module.exports = connectDB;