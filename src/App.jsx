import Products from "./Components/Products/Products";
import LogIn from "./Components/Log In/LogIn";
import Registration from "./Components/Registration/Registration";
import Home from "./Components/Home/Home";
import "./index.css";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Navbar from "./Components/Navbar/Nabar";
import { useContext } from "react";
import { AuthContext } from "./Components/Context/context";
import NotFound from "./Components/Not Found/NotFound";
import Cart from "./Components/Products copy/cart";
import ProductDetailsPage from "./Components/ProductsRenderingPage/ProductDetailsPage";
function App() {
  const { login } = useContext(AuthContext);

  return (
    <BrowserRouter>
      <Routes>
        {login ? (
          <>
            <Route path="/" element={<Home />} />
            <Route path="/products" element={<Products />} />
            <Route
              path="/product-details/:id"
              element={<ProductDetailsPage />}
            />

            <Route path="/cart" element={<Cart />} />
          </>
        ) : (
          <>
            <Route path="/login" element={<LogIn />} />
            <Route path="/register" element={<Registration />} />
          </>
        )}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
