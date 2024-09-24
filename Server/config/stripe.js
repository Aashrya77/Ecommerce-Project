require("dotenv").config();
const express = require("express");
const router = express.Router();
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);
router.post("/checkout", async (req, res) => {
  const { cartData } = req.body;
  const line_items = cartData.map((product) => {
    return {
      price_data: {
        currency: "npr",
        product_data: {
          name: product.productId.name,
          metadata: {
            id: product.productId._id,
          },
        },
        unit_amount: product.productId.price * 100,
      },
      quantity: product.quantity,
    };
  });

  const session = await stripe.checkout.sessions.create({
    payment_method_types: ["card"],
    mode: "payment",
    shipping_address_collection:{
        allowed_countries: ['US', 'NP']
    },
    shipping_options: [
        {
            shipping_rate_data: {
                type: 'fixed_amount',
                fixed_amount: {
                    amount: 160 *100,
                    currency: 'npr'
                },
                display_name: 'Delivery Charge',
                delivery_estimate: {
                    minimum: {
                        unit: 'business_day',
                        value: 3
                    },
                    maximum: {
                        unit: 'business_day',
                        value: 5
                    },
                }
            }
        }
    ],
    
    phone_number_collection:{
        enabled: true
    },
    line_items,
    success_url: `${process.env.Success}/products`,  
    cancel_url: `${process.env.Cancel}/cart`,
  });

  res.send({ url: session.url });
});

module.exports = router;
