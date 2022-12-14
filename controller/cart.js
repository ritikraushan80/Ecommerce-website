const { Cart, Products } = require('../models')

async function updateCart(req, res) {
    const cartId = req.params.id;
    try {
        const cart = await Cart.findByPk(cartId)

        if (cart) {
            const productsIds = req.body.productsIds;
            const products = await Products.findAll({
                where:{
                    id: productsIds
                }
            })
            if(products.length > 0){
                    await cart.setProducts(products)
                    const cartProducts = await cart.getProducts()
                    let totalCost =0;
                    const addedProducts = []

                    for(let i = 0; i < cartProducts.length; i++){
                        totalCost = totalCost + cartProducts[i].dataValues.cost;

                        addedProducts.push({
                            id: cartProducts[i].dataValues.id,
						name: cartProducts[i].dataValues.name,
						cost: cartProducts[i].dataValues.cost,
						description: cartProducts[i].dataValues.description
                        })
                    }
                    res.send({ totalCost, addedProducts})
            }else{
                res.status(400).send({ msg: 'Products does not exist' })
            }
        } else {
            res.status(400).send({ msg: 'Cart does not exist' })
        }
    } catch (err) {
        res.status(500).send({ msg: 'Internal server Error', err })
    }
}

async function getCart(req,res){
    const cartId = req.params.id;
try{
    const cart = await Cart.findByPk(cartId);
    if(cart){
            const cartProducts = await cart.getProducts()

            let totalCost = 0;
            const addedProducts = []

            for(let i=0; i<cartProducts.length; i++){

                totalCost = totalCost + cartProducts[i].dataValues.cost;

                addedProducts.push({
                    id: cartProducts[i].dataValues.id,
                    name: cartProducts[i].dataValues.name,
                    cost: cartProducts[i].dataValues.cost,
                    description: cartProducts[i].dataValues.description
                })
            }
            res.send({totalCost,addedProducts})
    }else{
        res.status(400).send({msg : 'Cart does not exist'})
    }

}catch(err){
    res.status(500).send({msg : 'Internal server error', err})
}
}

module.exports = { updateCart, getCart }