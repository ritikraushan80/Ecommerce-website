const{checkNameForCategory} = require('./category')
const {validateProductData}  = require('./product')
const {checkDuplicateUserNameOrEmail, checkRoles} = require('./checkUser')
const {verifyToken, isAdmin} = require('./authjwt')

module.exports ={
    checkNameForCategory,
     validateProductData,
     checkDuplicateUserNameOrEmail,
     verifyToken,
     checkRoles,
     isAdmin
    }