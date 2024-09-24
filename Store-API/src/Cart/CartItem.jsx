import axios from "axios";
import React, { useState } from "react";
import { MdDelete } from "react-icons/md";

const CartItem = ({ cartData, total, setTotal, setCartData, cartLength }) => {
  const updateQuantity = async (id, newQuantity) => {
    try {
      const token = localStorage.getItem("token");

      const response = await axios.patch(
        `http://localhost:5500/api/v1/products/cart/${id}`,
        {
          quantity: newQuantity,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setCartData(response.data.cart.products);
      setTotal(response.data.totalPrice);
    } catch (error) {
      console.log(error);
    }
  };

  const increaseQuantity = (id, currentQuantity) => {
    const newQuantity = currentQuantity + 1;
    updateQuantity(id, newQuantity);
  };
  const decreaseQuantity = (id, currentQuantity) => {
    if (currentQuantity > 1) {
      const newQuantity = currentQuantity - 1;
      updateQuantity(id, newQuantity);
    }
  };

  const handleCheckout = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.post(
        "http://localhost:5500/api/v1/products/stripe/checkout",
        {
          cartData,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (response.data.url) {
        window.location.href = response.data.url;
      }
    } catch (error) {
      console.log(error);
    }
  };

  const deleteItem = async (id) => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.delete(
        `http://localhost:5500/api/v1/products/cart/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setCartData(response.data.cart.products);
      setTotal(response.data.totalPrice);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      <div className="cart-container">
        <div className="cart-items">
          {cartData.map((item) => {
            const { _id, productId, quantity } = item;
            return (
              <div key={_id}>
                <div className="item">
                  <div className="item-right">
                    <img src="#" alt="Product Image" />
                    <div className="right-detail">
                      <h3 style={{ margin: "0px" }}>{productId.name}</h3>
                      <p style={{ margin: "10px" }}>
                        Company: {productId.company}
                      </p>
                    </div>
                  </div>
                  <div className="item-middle">
                    <p>Rs.{productId.price * quantity}</p>
                    <MdDelete
                      onClick={() => deleteItem(_id)}
                      style={{
                        fontSize: "21px",
                        cursor: "pointer",
                        color: "red",
                      }}
                    />
                  </div>
                  <div className="item-left">
                    <input
                      type="button"
                      value="+"
                      onClick={() => increaseQuantity(_id, quantity)}
                    />
                    <p>{quantity}</p>
                    <input
                      type="button"
                      value="-"
                      onClick={() => decreaseQuantity(_id, quantity)}
                    />
                  </div>
                </div>
              </div>
            );
          })}

          {cartLength < 1 ? (
            <></>
          ) : (
            <h1 style={{ textAlign: "center" }}>Total = Rs. {total}.00</h1>
          )}
        </div>
        {cartLength < 1 ? (
          <></>
        ) : (
          <button className="checkout" onClick={() => handleCheckout()}>
            CheckOut
          </button>
        )}
      </div>
    </>
  );
};

export default CartItem;
