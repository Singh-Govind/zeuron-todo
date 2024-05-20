const mongoose = require("mongoose");

const dbConnection = () => {
  return mongoose.connect(
    "mongodb+srv://govindkmr141mongo2:G-1234567@cluster0.zs7zdgw.mongodb.net/zeuron?retryWrites=true&w=majority&appName=Cluster0"
  );
};

module.exports = dbConnection;
