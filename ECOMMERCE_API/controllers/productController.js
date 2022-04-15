const createError = require("http-errors");
const Product = require("../models/Product");

const createProduct = async (req, res) => {
    req.body.user = req.user.id;
    const product = await Product.create(req.body);
    res.status(200).json({ msg: "Product Created", product });
}

module.exports = {
    createProduct,
}
