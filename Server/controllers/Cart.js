const Cart = require("../model/Cart");

const getCart = async (req, res) => {
  const { userId, user } = req.user;
  let cart = await Cart.findOne({ userId }).populate({
    path: "products.productId",
    select: "name price company",
  });
  if (!cart) {
    cart = {
      userId,
      products: [],
    };
  }
  const totalPrice = cart.products.reduce((total, item) => {
    return total + item.productId.price * item.quantity;
  }, 0);

  cart.totalPrice = totalPrice;
  res.status(200).json({ cart, user, totalPrice });
};
const addToCart = async (req, res) => {
  const { userId } = req.user;
  const { productId, quantity } = req.body;

  // Find the user's cart without populating
  let cart = await Cart.findOne({ userId });

  if (cart) {
    // Check if product is already in the cart
    const productIndex = cart.products.findIndex(
      (product) => product.productId.toString() == productId
    );

    if (productIndex > -1) {
      cart.products[productIndex].quantity += quantity;
    } else {
      cart.products.push({ productId, quantity });
    }
  } else {
    cart = new Cart({
      userId,
      products: [{ productId, quantity }],
    });
  }

  await cart.save();

  cart = await Cart.findOne({ userId }).populate({
    path: "products.productId",
    select: "name price company",
  });

  res.status(201).json({ success: true, cart });
};


const deleteCartItem = async (req, res) => {
  const { userId } = req.user;
  const { id } = req.params;

  const cart = await Cart.findOne({ userId }).populate({
    path: "products.productId",
    select: "name price company",
  });
  if (!cart) {
    res.send("no cart found with that id");
  }

  const productIndex = cart.products.findIndex(
    (product) => product._id.toString() === id
  );

  if (productIndex === -1) {
    res.send("No product found with that id");
  }

  cart.products.splice(productIndex, 1);

  const totalPrice = cart.products.reduce((total, item) => {
    return total + item.productId.price * item.quantity;
  }, 0);

  cart.totalPrice = totalPrice;

  await cart.save();
  res
    .status(200)
    .json({ success: true, message: "Product removed from cart", cart, totalPrice });
};

const updateCartItem = async (req, res) => {
  const { userId } = req.user;
  const { id } = req.params;
  const { quantity } = req.body;
  const cart = await Cart.findOne({ userId }).populate({
    path: "products.productId",
    select: "name price company",
  });
  if (!cart) {
    res.send("Cart does not exist");
  }
  const productIndex = cart.products.findIndex(
    (product) => product._id.toString() === id
  );

  if (productIndex === -1) {
    res.send("No product found with that id");
  }

  cart.products[productIndex].quantity = quantity;

  const totalPrice = cart.products.reduce((total, item) => {
    return total + item.productId.price * item.quantity;
  }, 0);

  cart.totalPrice = totalPrice;

  await cart.save();
  res.status(200).json({ msg: "Cart updated successfully", cart, totalPrice });
};

module.exports = {
  getCart,
  addToCart,
  deleteCartItem,
  updateCartItem,
};
