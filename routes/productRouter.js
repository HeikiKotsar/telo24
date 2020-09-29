const express = require('express')
const router = express.Router();

const { 
    createProduct,
    getAllProducts,
    getProduct,
    updateProduct,
    deleteProduct 
} = require('../controllers/products');

router
    .route('/')
    .post(createProduct)
    .get(getAllProducts)

router
    .route('/:id')
    .get(getProduct)
    .put(updateProduct)
    .delete(deleteProduct)
    
module.exports = router;