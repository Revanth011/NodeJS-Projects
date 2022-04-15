const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const tasks = require('./routes/tasks');
require('dotenv').config();
const app = express();
app.use(express.json());
app.use(cors());

//Routes
app.use('/tasks/', tasks);
app.get('/', (req, res) => res.send("HOMEPAGE"));
//MDB
mongoose
    .connect(process.env.MDB)
    .then(() => console.log("MDB Connected"))
    .catch(err => console.log(err));
//SERVER
app.listen(8000, () =>
    console.log("Server is Running http://localhost:8000")
);