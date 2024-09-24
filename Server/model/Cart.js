const mongoose = require('mongoose')

const CartSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Users',
        required: [true, 'Please provide User']
    },
    products: [
        {
            productId: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Products',
            },
            quantity: {
                type: Number,
                required: [true, 'Please provide quantity'],  
                min: [1, 'Quantity cannot be less than 1'],
                default: 1
            }
        }
    ]    ,
    totalPrice: {
        type: Number,
        default: 0
    }
})

module.exports = mongoose.model('cart', CartSchema)