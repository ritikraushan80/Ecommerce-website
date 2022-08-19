const express = require('express')
const {createCategory,getCategories,getCategoryOnId, updateCategoryOnId,DeleteCategory} = require('../controller/category')
const {checkNameForCategory, verifyToken, isAdmin} = require('../middleware')
const routes = express.Router()


routes.post('/eComm/api/v1/categories', [checkNameForCategory,verifyToken, isAdmin],createCategory)

routes.get('/eComm/api/v1/getCategories', getCategories)

routes.get('/eComm/api/v1/getCategories/:id', getCategoryOnId)

routes.put('/eComm/api/v1/updatecategories/:id',[verifyToken, isAdmin],updateCategoryOnId)

routes.delete('/eComm/api/v1/deleteCategories/:id',[verifyToken, isAdmin],DeleteCategory)

module.exports = { categoryRoutes: routes}

