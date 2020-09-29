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

exports.getAllProducts = async (req, res, next) => {
    try {
        const products = await Products.find()

        res.status(201).json(products);

    } catch (err) {
        next(err)
    }
}

exports.getProduct = async (req, res, next) => {
    try {
        const product = await Products.findById(req.params.id);

        if (!product) return res.status(404).json({ msg: 'Toodet ei leitud' });
        
        res.status(201).json(product)
        
    } catch (err) {
        next(err)
    }
}

exports.updateProduct = async (req, res, next) => {
    try {
        let product = await Products.findById(req.params.id)

        if(!product) return res.status(404).json({ msg: `Sellist toodet id-ega ${req.params.id} ei leitud`})

        product = await Products.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true
        });

        product.save()

        res.status(200).json({
            status: 'success',
            data: {
              product
            }
        });
        
    } catch (err) {
        next(err)
    }
}

exports.deleteProduct = async (req, res, next) => {
    try {
        const product = await Products.findById(req.params.id);

        if(!product) return res.status(404).json({ msg: `Sellist toodet id-ega ${req.params.id} ei leitud`})

        await product.remove()

        res.status(200).json({
            success: true,
            data: {}
        });

    } catch (err) {
        next(err)
    }
}