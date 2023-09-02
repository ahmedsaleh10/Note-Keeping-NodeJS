const mongoose = require("mongoose");
mongoose.set("strictQuery", false);
const connectDB = async () => {
  return await mongoose
    .connect("mongodb+srv://ahmed:asaleh@mern.xtkoui0.mongodb.net/")
    .then((res) => {
      console.log("connectDB");
    })
    .catch((err) => {
      console.log("fail to connectDB", err);
    });
};

module.exports = connectDB