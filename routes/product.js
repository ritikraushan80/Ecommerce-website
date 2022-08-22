const express = require('express')
const {createProduct,getProducts, getProductOnId,updateProduct,deleteProduct, filterProducts} = require('../controller/product')
const {validateProductData, verifyToken, isAdmin} = require('../middleware')
const routes = express.Router()

routes.post('/eComm/api/v1/createProducts',[validateProductData,verifyToken, isAdmin],createProduct)

routes.get('/eComm/api/v1/product', getProducts)

routes.get('/eComm/api/v1/filterProducts', filterProducts)

routes.get('/eComm/api/v1/getProductsOnId/:id', getProductOnId)

routes.put('/eComm/api/v1/updateProduct/:id',[verifyToken, isAdmin],updateProduct)

routes.delete('/eComm/api/v1/deleteProduct/:id',[verifyToken, isAdmin],deleteProduct)

module.exports = {productRoutes: routes}

