const { Products, Sequelize } = require('../models')

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
        const categoryId = productData.categoryId;

        const result = await Products.create({ name, description, cost, quantity,categoryId});
        res.status(200).send({ msg: 'Product created Successfully', result })
    } catch (err) {
        res.status(500).send({ msg: 'Internal server Error', err })
    }
}

async function getProducts(req, res) {
    try {
        const data = await Products.findAll()
        res.status(201).send( data )
    } catch (err) {
        res.status(500).send({ msg: 'Internal server Error', err })
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

async function filterProducts(req, res){
    const categoryId = req.query.CategoryId; // ?CategoryId=3
	const name = req.query.name;// ?name=
	const minCost = req.query.minCost;// ?minCost=450
	const maxCost = req.query.maxCost;// ?maxCost=350

    if(categoryId){
      const result = await  Products.findAll({
            where: {
                categoryId: categoryId
            }
        })
        res.send(result);
    }
    if(name){
        const result = await  Products.findAll({
              where: {
                  name: name
              }
          })
          res.send(result);
      }

      if(minCost && maxCost){
        const result = await Products.findAll({
            where:{
                    cost:{
                        [Sequelize.Op.gte] : minCost,
                        [Sequelize.Op.lte] : maxCost
                    }
            }
        })
        res.send(result)
      }
      else if(minCost){
        const result = await Products.findAll({
            where:{
                    cost:{
                        [Sequelize.Op.gte] : minCost 
                    }
            }
        })
        res.send(result)
      }
      else if(maxCost){
       const result = await Products.findAll({
            where:{
                    cost:{   
                    [Sequelize.Op.lte] : maxCost
                    }
            }
        })
        res.send(result)
      }
      else{
        const result = await Products.findAll()
        res.send(result)
      }
}
    module.exports = {
        createProduct,
        getProducts,
        getProductOnId,
        updateProduct,
        deleteProduct,
        filterProducts
    }