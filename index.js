const { serverPort } = require('./config/server.config')
const express = require('express')
const { categories, Products, sequelize,Role } = require('./models')
const { categoryRoutes, productRoutes,authRoutes } = require('./routes')
const app = express()

app.use(express.json())
app.use(categoryRoutes)
app.use(productRoutes)
app.use(authRoutes);

app.listen(serverPort, async () => {
   console.log('server is running on this port', serverPort);

   await init()
})

async function init() {

   try {
      await sequelize.sync({force: true}) //sync every model 
      // await categories.sync({ force: true })
      // await Products.sync({ force: true })

      const defaultCategories = [
         {
            name : 'Beauty',
            description: 'All beauty Products'
         },
         {
            name: 'Fragnance',
            description: 'All Fragnance Products'
         },
         {
            name: 'Clothes',
            description: 'All types of Clothes'
         } 
      ]

      const defaultProducts = [
         {
            "description":"Nyka best products",
            "name" :"MakeUP Kit",
            "cost": 870,
            "quantity": 20,
           "categoryId": 1
        },
        {
            "description":"Best fragnance",
            "name" :"Fogg",
            "cost": 280,
            "quantity": 20,
           "categoryId": 2
        },
        {
            "description":"Best for summer holidays",
            "name" :"Summer Clothes",
            "cost": 1200,
            "quantity": 20,
           "categoryId": 3
        } 
      ]

      const defaultRoles = [
         {
            Name : 'User',
          },
         {
            Name: 'Admin',
          } 
      ]
      await categories.bulkCreate(defaultCategories);
      await Products.bulkCreate(defaultProducts);
      await Role.bulkCreate(defaultRoles);

   } catch (err) {

      console.log(err)
   }
}