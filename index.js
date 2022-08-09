 const {serverPort} = require('./config/server.config')
 const express = require('express')
const {categories, sequelize} = require('./models')
const routes = require('./routes')
 const app = express() 

 app.use(express.json())
 app.use(routes)

 app.listen(serverPort, async ()=>{
    console.log('server is running on this port', serverPort);

    await init()
 })

 async function init(){

   try{
  await categories.sync({force: true})

   const defaultCategories  = [
      {
         name: 'Mobile',
         description: 'About mobile'
      },
      {
         name: 'Washing Machine',
         descriotion:' About Washing machine'
      }
   ]

   const result = await categories.bulkCreate(defaultCategories)
   console.log(result);

} catch(err){

   console.log(err)
}
 }