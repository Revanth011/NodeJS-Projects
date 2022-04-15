const mongoose = require('mongoose');
const Product = require("./models/product");
const ProductJSON = require("./populate.json");
require('dotenv').config();
mongoose
    .connect(process.env.MDB)
    .then(async () => {
        console.log("MDB Connected")
        await Product.deleteMany();
        await Product.create(ProductJSON);
        process.exit(0);
    })
    .catch(err => console.log(err));
