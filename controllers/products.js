const Products = require('../models/Products')

exports.createProduct = async (req, res, next) => {
    try {
        const { title, description } = req.body

        const product = await Products.create({
           title,
           description 
        })

        res.status(201).json(product)
        
    } catch (err) {
        next(err)
    }
}