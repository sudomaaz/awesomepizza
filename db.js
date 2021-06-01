const mongoose = require("mongoose");

var mongoURL =
  "mongodb+srv://maaz:Jo32wnEz1qfzHg2x@cluster0.jbt1g.mongodb.net/mern-pizza";

mongoose.connect(mongoURL, { useUnifiedTopology: true, useNewUrlParser: true });

var db = mongoose.connection;

db.on("connected", () => {
  console.log("Mongo DB Connection Successfull");
});

db.on("error", () => {
  console.log(`Mongo DB Connection failed`);
});

module.exports = mongoose;
