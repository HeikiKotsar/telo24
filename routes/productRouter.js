const express = require('express')
const router = express.Router();

const { createProduct } = require('../controllers/products');

router
    .route('/')
    .post(createProduct)

module.exports = router;