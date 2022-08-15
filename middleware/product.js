const {categories} = require('../models')
async function validateProductData(req, res, next) {
    const productData = req.body;

    if (!productData.name) {
        res.status(400).send({ msg: 'Name is missing in product Data' })
        return;
    }
    if (productData.categoryId) {
       
        const result = await categories.findByPk(productData.categoryId);

        if (result) {
            next()
        } else {
            res.status(400).send({ msg: 'CategoryId does not exist in category table' })
            return;
        }

    } else {
        res.status(400).send({ msg: 'CategoryId is missing in product Data' })
        return;
    }
}

module.exports = { 
    validateProductData
 }