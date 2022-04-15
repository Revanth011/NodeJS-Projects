const mongoose = require("mongoose");
const ProductSchema = new mongoose.Schema({
    name: {
        type: String,
        trim: true,
        required: [true, "Product Name Required"],
        maxLength: [100, "Product Name Length Exceeded"],
    },
    price: {
        type: Number,
        required: [true, "Product Price Required"]
    },
    description: {
        type: String,
        trim: true,
        required: [true, "Product Description Required"]
    },
    image: {
        type: String,
    },
    category: {
        type: String,
        required: [true, "Provide Product Category"],
        enum: ['Gaming', 'Sports', 'Office', 'Men', 'Women', 'Beauty'],
    },
    user: {
        type: mongoose.Types.ObjectId,
        ref: 'User',
        required: true,
    }
}, { timestamps: true }
);
module.exports = mongoose.model("Product", ProductSchema);
