const express = require('express')
const checkout = require('../config/stripe')
const router = express.Router()


router.route('/cart/checkout').post(checkout)

module.exports = router