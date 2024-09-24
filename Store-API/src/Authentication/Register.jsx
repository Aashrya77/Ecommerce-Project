import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Auth.css";
import axios from "axios";
const Register = () => {
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");

  const navigate = useNavigate();

  const createUser = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:5500/api/v1/auth/register", 
        {
          name: name,
          email: email,
          password: password,
        }
      );
      navigate("/api/v1/auth/login");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <div className="log-container">
        <h1 style={{ textAlign: "center" }}>Register</h1>
        <form action="" onSubmit={createUser}>
          <label htmlFor="name">Name: </label>
          <input
            type="name"
            id="name"
            name="name"
            required
            onChange={(e) => setName(e.target.value)}
            value={name}
          />
          <label htmlFor="email">Email: </label>
          <input
            type="email"
            id="Email"
            name="Email"
            required
            onChange={(e) => setEmail(e.target.value)}
            value={email}
          />
          <label htmlFor="Password">Password: </label>
          <input
            type="password"
            id="Password"
            name="Password"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
          />
          <button>Register</button>
        </form>
      <Link style={{textAlign: 'center', textDecoration: 'none'}} to={'/login'}>Already Registered? Login</Link>
      </div>
    </>
  );
};

export default Register;
