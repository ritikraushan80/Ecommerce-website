const {Users} = require('../models')
async function checkDuplicateUserNameOrEmail(req, res, next){
    if(req.body.UserName){
        const user = await Users.findOne({
            where:{
                UserName:req.body.UserName
            }
        })

        if(user){
            res.status(400).send({msg: 'Username ALready exist'})
            return;
        }
    }
    if(req.body.Email){
        const email = await Users.findOne({
            where:{
                Email:req.body.Email
            }
        })

        if(email){
            res.status(400).send({msg: 'Email ALready exist'})
            return;
        }
    }
   next()
}

module.exports = {checkDuplicateUserNameOrEmail}