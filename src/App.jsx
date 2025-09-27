import Products from "./Components/Products/Products";
import LogIn from "./Components/Log In/LogIn";
import Registration from "./Components/Registration/Registration";
import Home from "./Components/Home/Home";
import "./index.css";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom"; 
import { useContext } from "react";
import { AuthContext } from "./Components/Context/context";
import NotFound from "./Components/Not Found/NotFound";
import Cart from "./Components/Cart/cart";
import ProductDetailsPage from "./Components/ProductsRenderingPage/ProductDetailsPage";

function App() {
  const { login } = useContext(AuthContext); // 🔹 Get login status from context

  return (
    <BrowserRouter>
      <Routes>
        {/* 🔹 Protected routes if user is logged in */}
        {login ? (
          <>
            <Route path="/" element={<Home />} />
            <Route path="/products" element={<Products />} />
            <Route path="/product-details/:id" element={<ProductDetailsPage />} />
            <Route path="/cart" element={<Cart />} />
            
            {/* 🔹 Redirect login/register if already logged in */}
            <Route path="/login" element={<Navigate to="/" replace />} />
            <Route path="/register" element={<Navigate to="/" replace />} />
          </>
        ) : (
          <>
            {/* 🔹 Public routes for unauthenticated users */}
            <Route path="/login" element={<LogIn />} />
            <Route path="/register" element={<Registration />} />
            
            {/* 🔹 Redirect home and protected routes to login */}
            <Route path="/" element={<Navigate to="/login" replace />} /> 
            <Route path="/products" element={<Navigate to="/login" replace />} />
            <Route path="/cart" element={<Navigate to="/login" replace />} />
            <Route path="/product-details/:id" element={<Navigate to="/login" replace />} />
          </>
        )}

        {/* 🔹 Catch-all for unmatched routes */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
