const {Users,  Role, Sequeliz} = require('../models')
 
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
async function checkRoles(req,res,next){
	if(req.body.Roles){
		let roles = req.body.Roles;
		let flag = true;
		const findRoleFromDB = await Role.findAll({
			attributes:['id']
		});

		if(findRoleFromDB.length > 0){
			const storeRoles = []

			for(let i = 0 ; i<findRoleFromDB.length; i++){
				storeRoles.push(findRoleFromDB[i].dataValues.id)
			}
			for(let i = 0; i< roles.length;i++){
				const result = storeRoles.includes(roles[i])
				if(!result){
					flag = false
					break;
				}
			}
			if(flag){
				next()
			}else{
				res.status(400).send({msg :'Role id does not exist'})
				return;
			}
		}else{
			res.status(500).send({msg: 'Internal server error, Role does not found'});
			return;
		}
	}else{
		next()
	}
}

 

module.exports = {
    checkDuplicateUserNameOrEmail,
    checkRoles 
}