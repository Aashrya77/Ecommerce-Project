import React from "react";
import { IoMdCart } from "react-icons/io";
import "./NavBar.css";
import {  Link, useNavigate } from "react-router-dom";


const NavBar = ({ name, user }) => {
  const navigate = useNavigate();


  return (
    <>
      <div className="heading">
      <Link style={{textDecoration: 'none', color: 'black'}} to={'/products'}> <h1>STORE-API</h1></Link> 
      <div className="right">
          <IoMdCart
            className="cart-icon"
            onClick={() => navigate(`/cart`)}
          />
          <p>Hi, {name || user}</p>
        </div>
      </div>
    </>
  );
};

export default NavBar;
