const mongoose = require('mongoose');

const ProductsSchema = new mongoose.Schema({
    title: {
        type: String,
        require: true
    },
    description: {
        type: String,
        require: true
    }
});

module.exports = Products = mongoose.model('products', ProductsSchema);
