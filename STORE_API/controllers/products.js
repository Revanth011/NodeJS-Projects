const Product = require("../models/product");
const getAllProductsStatic = async (req, res) => {
    try {
        const products = await Product.find({}).sort('-rating');
        res.status(200).json(products);
    } catch (err) {
        res.status(400).json(err);
    }
}
const getAllProducts = async (req, res) => {
    try {
        var query = req.query;
        if (req.query.name) {
            query = { ...req.query, name: { $regex: req.query.name, $options: 'i' } };
        }
        const products = await Product.find(query, null, { strict: false }).sort('-rating');
        res.status(200).json(products);
    } catch (err) {
        res.status(400).json(err);
    }
}
module.exports = {
    getAllProductsStatic,
    getAllProducts
}
