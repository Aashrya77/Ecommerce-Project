import React, { useEffect, useState } from "react";
import "./Cart.css";
import axios from "axios";
import CartNav from "../NavBar/CartNav";
import CartItem from "./CartItem";
const Cart = () => {
  const [name, setName] = useState("");
  const [cartData, setCartData] = useState([]);
  let cartLength = cartData.length;
  const [loading, setLoading] = useState(false);
  const [total, setTotal] = useState(0);
  const getCart = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get(
        `http://localhost:5500/api/v1/products/cart`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setCartData(response.data.cart.products);
      setName(response.data.user);
      setTotal(response.data.totalPrice);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getCart();
  }, []);

  return (
    <>
      <CartNav user={name} />
      <h1 style={{ textAlign: "center" }}>
        {!cartLength < 1 ? "Cart Items" : "Cart is empty"}
      </h1>
      {loading ? (
        <h1 style={{ textAlign: "center" }}>Loading...</h1>
      ) : (
        <CartItem cartData={cartData} total={total} setCartData={setCartData} cartLength={cartLength} setTotal={setTotal} />
      )}
    </>
  );
};

export default Cart;
