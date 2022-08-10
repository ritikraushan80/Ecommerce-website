const { serverPort } = require('./config/server.config')
const express = require('express')
const { categories, Products, sequelize } = require('./models')
const { categoryRoutes, productRoutes } = require('./routes')
const app = express()

app.use(express.json())
app.use(categoryRoutes)
app.use(productRoutes)

app.listen(serverPort, async () => {
   console.log('server is running on this port', serverPort);

   await init()
})

async function init() {

   try {
      // await sequelize.sync({force: true}) //sync every model 
      await categories.sync({ force: true })
      await Products.sync({ force: true })

      const defaultCategories = [
         {
            name: 'Mobile',
            description: 'About mobile'
         },
         {
            name: 'Washing Machine',
            descriotion: ' About Washing machine'
         }
      ]

      const defaultProducts = [
         {
            name: "iPhone 13pro",
            cost: 80000,
            description: " This phone is very costally",
            quantity: 15,
         },
         {
            name: "Summer Cloths",
            cost: 800,
            description: " Comfertable Cloths",
            quantity: 150,
         }
      ]
      await categories.bulkCreate(defaultCategories)
      await Products.bulkCreate(defaultProducts)

   } catch (err) {

      console.log(err)
   }
}