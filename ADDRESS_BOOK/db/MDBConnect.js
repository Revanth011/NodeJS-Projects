const mongoose = require("mongoose");
require("dotenv").config();
const MDBConnect = async () => {
  mongoose
    .connect(process.env.MDB)
    .then(() => console.log("MDB CONNECTED"))
    .catch((err) => console.log(err));
};
module.exports = MDBConnect;
