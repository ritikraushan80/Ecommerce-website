const bcrypt = require ('bcrypt')
const {Users} = require('../models')

async function signUp(req,res){
const UserName = req.body.UserName;
const Email = req.body.Email;
const Password = bcrypt.hashSync(req.body.Password,8);  
console.log(Password);

try{
    const user = await Users.create({UserName,Email,Password})
    if(req.body.roles){
        const roles = req.body.Roles
        const result = await user.setRoles(roles)
        console.log('user defined roles', result);

    
    }else{
        const result = await user.setRoles([1])
        console.log(result);
    }
    res.send({msg: 'User has been created successfully'})
}catch(err){
    res.status(500).send({msg:'Internal server error'})
}
}
module.exports ={signUp}