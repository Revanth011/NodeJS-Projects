const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const products = require("./routes/products");

require('dotenv').config();
const app = express();
app.use(express.json());
app.use(cors());

app.use("/products", products);

app.get('/', (req, res) => res.send("WORKS"));
mongoose
    .connect(process.env.MDB)
    .then(() => console.log("MDB Connected"))
    .catch(err => console.log(err));
app.listen(8000, () =>
    console.log("Server is Running http://localhost:8000")
);
