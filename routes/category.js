const express = require('express')
const {createCategory,getCategories,getCategoryOnId, updateCategoryOnId,DeleteCategory} = require('../controller/category')
const {checkNameForCategory} = require('../middleware')
const routes = express.Router()


routes.post('/eComm/api/v1/categories', [checkNameForCategory],createCategory)

routes.get('/eComm/api/v1/getCategories', getCategories)

routes.get('/eComm/api/v1/getCategories/:id', getCategoryOnId)

routes.put('/eComm/api/v1/updatecategories/:id', updateCategoryOnId)

routes.delete('/eComm/api/v1/deleteCategories/:id', DeleteCategory)

module.exports = { categoryRoutes: routes}

