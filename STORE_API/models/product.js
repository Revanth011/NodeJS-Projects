const mongoose = require('mongoose');
const { Schema } = mongoose;
const ProductSchema = new Schema({
    name: {
        type: String,
        required: [true, "Product Name Required"]
    },
    price: {
        type: Number,
        required: [true, "Price Required"]
    },
    rating: {
        type: Number,
        default: 4.0
    },
    createdAt: {
        type: Date,
        default: Date.now()
    }
});
module.exports = mongoose.model("Product", ProductSchema);