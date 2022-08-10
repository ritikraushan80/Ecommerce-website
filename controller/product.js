const { Products } = require('../models')

async function createProduct(req, res) {
    const productData = req.body;

    if (!(productData.name && productData.cost && productData.quantity)) {
        res.status(400).send({ msg: 'Name, Cost & Quantity is missing !!' })
    }
    try {
        const name = productData.name;
        const description = productData.description;
        const cost = productData.cost;
        const quantity = productData.quantity;

        const result = await Products.create({ name, description, cost, quantity });
        res.send({ msg: 'Product created Successfully', result })
    } catch (err) {
        res.status(500).send({ msg: 'Something server Error', err })
    }
}

async function getProducts(req, res) {
    try {
        const data = await Products.findAll()
        res.send({ msg: 'Success', data })
    } catch (err) {
        res.status(500).send({ msg: 'Something server Error', err })
    }
}


async function getProductOnId(req, res) {
    const productId = req.params.id
    try {

        const result = await Products.findOne({
            where: {
                id: productId
            }
        })
        res.send(result)
    } catch (err) {

        console.log('Error in getting by id of products', err);

        res.status(500).send({ msg: ':Internal server error' })
    }

}

async function updateProduct(req, res) {
    const productData = req.body;
    const productId = req.params.id

    if (!(productData.name && productData.cost && productData.quantity)) {
        res.status(400).send({ msg: 'Name, Cost & Quantity is missing !!' })
    }
    try {
        const name = productData.name;
        const description = productData.description;
        const cost = productData.cost;
        const quantity = productData.quantity;

        const product =  await Products.findOne({
            where: {
                id: productId
            }
        }) 

        if(product){
        product.name = name;
        product.cost = cost;
        product.description = description;
        product.quantity = quantity;

        await product.save()

        res.send({ msg: 'Updated Succesfully !!', product})

        }else{
            res.status(400).send({msg: 'Product id does not exist'})
        }
    } catch (err) {
        console.log('Error in Updating of products', err);
        res.status(500).send({ msg: ':Internal server error' })
    }
}

async function deleteProduct(req, res) {
    const productId = req.params.id

    try {
        const result = await Products.destroy({
            where: {
                id: productId
            }
        })

        res.send({ msg: 'Deleted Succesfully', result })
    } catch (err) {
        console.log('Error in Deleting of products', err);
        res.status(500).send({ msg: ':Internal server error' })
    }
}

    module.exports = {
        createProduct,
        getProducts,
        getProductOnId,
        updateProduct,
        deleteProduct
    }