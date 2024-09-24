 const express = require('express')
const { getCart, addToCart, deleteCartItem, updateCartItem } = require('../controllers/Cart')
 const router = express.Router()

 router.route('/cart').get(getCart).post(addToCart)
 router.route('/cart/:id').delete(deleteCartItem).patch(updateCartItem)

 module.exports = router