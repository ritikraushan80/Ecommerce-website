const express = require('express')
const {createProduct,getProducts, getProductOnId,updateProduct,deleteProduct, filterProducts} = require('../controller/product')
const {validateProductData} = require('../middleware')
const routes = express.Router()

routes.post('/eComm/api/v1/createProducts',[validateProductData],createProduct)

routes.get('/eComm/api/v1/getProducts',getProducts)

routes.get('/eComm/api/v1/filterProducts', filterProducts)

routes.get('/eComm/api/v1/getProductsOnId/:id', getProductOnId)

routes.put('/eComm/api/v1/updateProduct/:id', updateProduct)

routes.delete('/eComm/api/v1/deleteProduct/:id', deleteProduct)

module.exports = {productRoutes: routes}

