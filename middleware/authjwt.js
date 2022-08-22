const {Users}  = require('../models')
const  jwt = require('jsonwebtoken')

async function verifyToken(req,res,next){
	const token = req.headers['x-access-token'];

	if(token){
		try{
			const result = await jwt.verify(token, 'hellosecerateKeybfbgf')
			if(result){
                req.UserId  = result.id
				next()
			}else{
				res.status(400).send({msg : 'auth token has expired. Please relogin'})
				return;
			}
		}catch(err){
			res.status(400).send({msg : 'auth token has expired. Please relogin'})
			return;	
		}


	}else{
		res.status(401).send({msg : 'auth token is missing'})
		return;
	}
}

async function isAdmin(req, res, next){
    const UserId = req.UserId;

    try{
            const user = await Users.findByPk(UserId);
            const userRoles = await user.getRoles();
            for(let i = 0; i < userRoles.length; i++){
                if(userRoles[i].dataValues.Name === 'Admin'){
                    next()
                    return;
                }
            }

        res.status(500).send({msg: 'User does not have admin access'})
        return;
    }catch(err){
        res.status(500).send({msg: 'Internal server error', err})
        return;
    }
}


module.exports ={verifyToken, isAdmin}
