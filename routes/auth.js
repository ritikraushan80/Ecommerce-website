const express = require('express')
const routes = express.Router()
const { signUp } = require('../controller/auth')
const {checkDuplicateUserNameOrEmail} = require('../middleware')

routes.post('/ecomm/api/v1/auth/signup',[checkDuplicateUserNameOrEmail],signUp)

module.exports = {authRoutes : routes}