import React from "react";
import "./NavBar.css";
import { Link } from "react-router-dom";
import { IoReturnUpBack } from "react-icons/io5";

const CartNav = ({ name, user }) => {

  return (
    <>
      <div className="heading">
       <Link style={{textDecoration: 'none', color: 'black'}} to={'/products'}> <h1>STORE-API</h1></Link> 
        <div className="right">
          <div className="return">
          
            
            <Link
              to={"/products"}
              style={{ textDecoration: "none", color: "darkGrey", fontSize: '20px' }}
            >
                <IoReturnUpBack  style={{ color: "darkGrey", marginRight: '6px'}}/>
              Continue Shopping
            </Link>
          </div>

          <p>Hi, {name || user}</p>
        </div>
      </div>
    </>
  );
};

export default CartNav;
