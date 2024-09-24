import Products from "./Components/Products";
import { Routes, Route } from "react-router-dom";
import Register from "./Authentication/Register";
import Login from "./Authentication/Login";
import NotFound from "./Components/NotFound";
import Cart from "./Cart/Cart";
function App() {
  return (
    <>
      <Routes>
        <Route path="*" element={<NotFound />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />

        <Route path="/products" element={<Products />} />
        <Route path="/cart" element={<Cart />} /> 
      </Routes>
    </>
  );
}

export default App;
