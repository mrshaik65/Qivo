import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../Context/context";
import {
  HomeIcon,
  BackpackIcon,
  ExitIcon,
  EnterIcon,
} from "@radix-ui/react-icons";
import { HiOutlineMenu } from "react-icons/hi";
import { ShoppingCart, Key } from "lucide-react";
import "../Navbar/navbar.css";

function Navbar({ textColor }) {
  const { login, setLogin } = useContext(AuthContext); // Get login state from context
  const navigate = useNavigate(); // Hook for programmatic navigation
  const [drawerOpen, setDrawerOpen] = useState(false); // Mobile drawer state

  // Handle logout action
  const handleLogout = () => {
    setLogin(false); // Update context
    localStorage.setItem("setLogin", JSON.stringify(false)); // Persist logout
    navigate("/login"); // Navigate to login page
    setDrawerOpen(false); // Close mobile drawer if open
  };

  return (
    <nav className="z-50 w-full lg:pt-5">
      {/* Main navbar container */}
      <div
        className={`flex justify-between items-center p-4 bg-transparent ${textColor}`}
      >
        {/* Logo on the left */}
        <div className="flex justify-start">
          <h2 className="hero-logo-text
            text-xl sm:text-2xl md:text-2xl lg:text-2xl xl:text-3xl
            px-2 sm:px-2 md:px-2 lg:px-2 xl:px-2
            py-1 sm:py-0.5 md:py-0.5 lg:py-1 xl:py-1
            rounded-3xl
            bg-[#F24445] text-white font-bold
            transition-all duration-300
          ">
            Qivo
          </h2>
        </div>

        {/* Desktop Menu */}
        <ul className="items-center hidden gap-6 md:flex">
          {login ? (
            <>
              <li className="flex items-center gap-1 ">
                <Link to="/" className="flex items-center gap-1">
                  <HomeIcon className="w-4 h-4" /> Home
                </Link>
              </li>
              <li className="flex items-center gap-1">
                <Link to="/products" className="flex items-center gap-1">
                  <BackpackIcon className="w-4 h-4" /> Products
                </Link>
              </li>
              <li className="flex items-center gap-1">
                <Link to="/cart" className="flex items-center gap-1">
                  <ShoppingCart className="w-4 h-4 font-light" /> Cart
                </Link>
              </li>
              <li>
                <button
                  onClick={handleLogout}
                  className="flex items-center gap-1"
                  style={{ cursor: "pointer" }}
                >
                  <ExitIcon className="w-4 h-4" /> Log Out
                </button>
              </li>
            </>
          ) : (
            <>
              <li className="flex items-center gap-1">
                <EnterIcon className="w-4 h-4" />{" "}
                <Link to="/login">Log In</Link>
              </li>
              <li className="flex items-center gap-1">
                <Key className="w-4 h-4" /> <Link to="/register">Register</Link>
              </li>
            </>
          )}
        </ul>

        {/* Mobile Hamburger Icon */}
        <div className="md:hidden">
          <button onClick={() => setDrawerOpen(!drawerOpen)}>
            <HiOutlineMenu className="w-6 h-6" />
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      <div
        className={`fixed top-0 left-0 h-full w-64 bg-white shadow-lg transform duration-300 z-40 ${
          drawerOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {/* Logo inside drawer */}
        <div className="flex justify-start px-6 pt-4">
          <h2 className="hero-logo-text
            text-xl sm:text-2xl md:text-2xl lg:text-2xl xl:text-3xl
            px-2 sm:px-2 md:px-2 lg:px-2 xl:px-2
            py-1 sm:py-0.5 md:py-0.5 lg:py-1 xl:py-1
            rounded-3xl
            bg-red-500 text-white font-bold
            transition-all duration-300
          ">
            Qivo
          </h2>
        </div>

        {/* Drawer Menu Items */}
        <ul className="flex flex-col h-screen gap-6 px-6 pt-6 bg-white">
          {login ? (
            <>
              <li>
                <Link
                  onClick={() => setDrawerOpen(false)} // Close drawer on click
                  to="/"
                  className="flex items-center gap-2 "
                >
                  <HomeIcon className="w-5 h-5" /> Home
                </Link>
              </li>
              <li>
                <Link
                  onClick={() => setDrawerOpen(false)}
                  to="/products"
                  className="flex items-center gap-2 "
                >
                  <BackpackIcon className="w-5 h-5" /> Products
                </Link>
              </li>
              <li>
                <Link
                  onClick={() => setDrawerOpen(false)}
                  to="/cart"
                  className="flex items-center gap-2 "
                >
                  <ShoppingCart className="w-5 h-5" /> Cart
                </Link>
              </li>
              <li>
                <button
                  onClick={handleLogout}
                  className="flex items-center gap-2 "
                >
                  <ExitIcon className="w-5 h-5" /> Log Out
                </button>
              </li>
            </>
          ) : (
            <>
              <li className="flex items-center gap-2 ">
                <EnterIcon className="w-5 h-5" />{" "}
                <Link onClick={() => setDrawerOpen(false)} to="/login">
                  Log In
                </Link>
              </li>
              <li className="flex items-center gap-2 ">
                <Key className="w-5 h-5" />{" "}
                <Link onClick={() => setDrawerOpen(false)} to="/register">
                  Register
                </Link>
              </li>
            </>
          )}
        </ul>
      </div>

      {/* Overlay for drawer */}
      {drawerOpen && (
        <div
          className="fixed inset-0 z-30 bg-black/30"
          onClick={() => setDrawerOpen(false)} // Close drawer when clicking outside
        ></div>
      )}
    </nav>
  );
}

export default Navbar;
