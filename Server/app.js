require('dotenv').config()
require('express-async-errors')
const express = require('express')
const app = express();
const port = process.env.PORT || 5500;
const connectDB = require('./db/connectDB')
const errorHandlerMiddleware = require('./middleware/error-handler')
const notFoundMiddleware = require('./middleware/not-found')
const products = require('./Routes/products')
const userRoute = require('./Routes/User')
const cors = require('cors')
const auth = require('./middleware/auth')
const cartRoute = require('./Routes/Cart')
const checkoutRoute = require('./config/stripe')
//middleware
app.use(cors())    
app.use(express.json())          
app.use('/api/v1/auth', userRoute)
app.use('/api/v1/products',auth,  products)   
app.use('/api/v1/products', auth, cartRoute) 
app.use('/api/v1/products/stripe',checkoutRoute )
app.use(errorHandlerMiddleware) 
app.use(notFoundMiddleware) 
 
 
const start = async () => {
    try {
        await connectDB(process.env.MONGO_URI)
        app.listen(port, console.log(`Server listening on port ${port}...`))
    } catch (error) {
        console.log(error)
    }
}

start();
