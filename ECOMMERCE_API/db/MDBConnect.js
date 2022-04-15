const mongoose = require("mongoose");
const MDBConnect = async (MDB) => {
    mongoose.connect(MDB)
        .then(() => console.log("MDB Connected"))
        .catch((err) => console.log(err));
}
module.exports = MDBConnect;
