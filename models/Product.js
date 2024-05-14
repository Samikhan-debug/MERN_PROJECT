const mongoose = require('mongoose');

const productSchema = mongoose.Schema({
    name: String,
    price: Number,
    description: String,
    category:String,
    // imageUrl: { type: String, required: false } // Optional
});

let Product = mongoose.model('Product', productSchema);
module.exports = Product;
