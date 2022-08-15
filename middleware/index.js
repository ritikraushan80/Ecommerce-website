const{checkNameForCategory} = require('./category')
const {validateProductData}  = require('./product')
const {checkDuplicateUserNameOrEmail} = require('./checkUser')

module.exports ={
    checkNameForCategory,
     validateProductData,
     checkDuplicateUserNameOrEmail
    }