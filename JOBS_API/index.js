const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();
const app = express();
app.use(express.json());
app.use(cors());

//Route Import
const authentication = require("./middleware/authentication");
const auth = require("./routes/auth");
const job = require("./routes/job");

//Routes
app.use("/jobs/", authentication, job);
app.use('/auth/', auth);
app.get('/', (req, res) => res.send("WORKS"));

//Connection
mongoose
    .connect(process.env.MDB)
    .then(() => console.log("MDB Connected"))
    .catch(err => console.log(err));
app.listen(8000, () =>
    console.log("Server is Running http://localhost:8000")
);
