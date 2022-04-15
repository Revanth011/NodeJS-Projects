const express = require("express");
const router = express.Router();
const { getAllProductsStatic, getAllProducts } = require("../controllers/products");

router.get("/productsAll", getAllProductsStatic);
router.get("/", getAllProducts);
module.exports = router;