const bcrypt = require ('bcrypt')
const {Users, Cart} = require('../models')
const jwt = require('jsonwebtoken')

async function signUp(req,res){
const UserName = req.body.UserName;
const Email = req.body.Email;
const Password = bcrypt.hashSync(req.body.Password,8);  
console.log(Password);

try{
    const user = await Users.create({UserName,Email,Password})
   await Cart.create({id: user.id})
	if(req.body.Roles){
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

async function signIn(req,res){
	const username = req.body.UserName;
	const password = req.body.Password;

	try{
		const user = await Users.findOne({
			where : {
				UserName : username
			}
		})
		if(user){
			const validPassword = bcrypt.compareSync(password,user.Password)
			if(!validPassword){
				res.status(400).send({msg : 'Username/password is not correct'})	
			}

			const token = await jwt.sign({id : user.id}, process.env.JWT_SECRET_KEY, {
				expiresIn: '1h'
			})

			const authorities = [];
			const roles = await user.getRoles();
			for(let i=0; i<roles.length;i++){
				authorities.push(roles[i].Name)
			}

			const finalUser = {
				id: user.id,
				name: user.Name, 
				email: user.Email,
				username:user.UserName,
				authorities: authorities,
				token: (token)
			}

			res.send({Status: 'Success', message:'LogIn Success',data: finalUser})
		
		}else{
			res.status(400).send({msg : 'Username/password is not correct'})	
		}
	}catch(err){
		res.status(500).send({msg : 'Internal Server Error', err})
	}
}

module.exports ={
    signUp,
    signIn
}