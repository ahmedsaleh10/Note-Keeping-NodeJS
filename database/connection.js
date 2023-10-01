const mongoose = require("mongoose");
mongoose.set("strictQuery", false);
const connectDB = async () => {
  return await mongoose
    .connect("mongodb+srv://123sssaaalllh:asaleh@cluster0.d8cpyrg.mongodb.net/")
    .then((res) => {
      console.log("connectDB");
    })
    .catch((err) => {
      console.log("fail to connectDB", err);
    });
};

module.exports = connectDB