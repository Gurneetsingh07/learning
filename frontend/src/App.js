
import Products from "./components/products";
import Pagination from "./components/pagination.jsx";
import { Route, Routes } from "react-router-dom";
import Cart from "./pages/cart.jsx";
import Navbar from "./components/Navbar.jsx";
import Signup from "./pages/Signup.jsx";
import Login from "./pages/Login.jsx";
import { useState } from "react";
function App() {
  const limit = 10;
  const [totalCartItems, setTotalCartItems] = useState(0)
  return (
    <div>
      <Routes>
        <Route path="/" element={
          <>
            <Navbar totalCartItems={totalCartItems} />
            <Products setTotalCartItems={setTotalCartItems} />
            <Pagination limit={limit} />
          </>
        } />
        <Route path="/cart" element={
          <Cart />
        } />
        <Route path="/signup" element={
          <Signup />
        } />
        <Route path="/login" element={
          <Login />
        } />
      </Routes>
    </div>
  );
}

export default App;
