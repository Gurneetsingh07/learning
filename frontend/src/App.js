
import Products from "./components/products";
import Pagination from "./components/pagination.jsx";
import { Route, Routes } from "react-router-dom";
import Cart from "./pages/cart.jsx";
import Navbar from "./components/Navbar.jsx";
import Signup from "./pages/Signup.jsx";
import Login from "./pages/Login.jsx";
function App() {
  const limit = 10;
  return (
    <div>
      <Routes>
        <Route path="/" element={
          <>
            <Navbar />
            <Products />
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
