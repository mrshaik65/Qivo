import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../Context/context";
import { HomeIcon, BackpackIcon, ExitIcon, EnterIcon} from "@radix-ui/react-icons";
import { HiOutlineMenu } from "react-icons/hi";
import { ShoppingCart } from "lucide-react";
import { Key } from "lucide-react";
import "../Navbar/navbar.css"

function Navbar({textColor},) {
  const { login, setLogin } = useContext(AuthContext);
  const navigate = useNavigate();
  const [drawerOpen, setDrawerOpen] = useState(false);

  const handleLogout = () => {
    setLogin(false);
    localStorage.setItem("setLogin", JSON.stringify(false));
    navigate("/login");
    setDrawerOpen(false);
  };

  return (
    <nav className="w-full z-50 lg:pt-5">
      <div className={`flex justify-between items-center p-4 bg-transparent ${textColor}`}
>
        
        {/* Logo Left */}
        <div className="flex justify-start">
<h2 className="hero-logo-text text-3xl  text-white px-2 py-1 rounded-3xl bg-red-500">Qivo</h2>        </div>
        

        {/* Desktop Menu Right */}
        <ul className="hidden md:flex gap-6 items-center">
          {login ? (
            <>
              <li className="flex items-center gap-1 ">
                <Link to="/" className="flex items-center gap-1">
                  <HomeIcon className="h-4 w-4" /> Home
                </Link>
              </li>
              <li className="flex items-center gap-1">
                <Link to="/products" className="flex items-center gap-1">
                  <BackpackIcon className="h-4 w-4" /> Products
                </Link>
              </li>
              <li className="flex items-center gap-1">
                <Link to="/cart" className="flex items-center gap-1">
                  <ShoppingCart className="h-4 w-4 font-light" /> Cart
                </Link>
              </li>
              <li>
                <button
                  onClick={handleLogout}
                  className="flex items-center gap-1"
                >
                  <ExitIcon className="h-4 w-4" /> Log Out
                </button>
              </li>
            </>
          ) : (
            <>
              <li className="flex items-center gap-1">
                <EnterIcon className="h-4 w-4" /> <Link to="/login">Log In</Link>
              </li>
              <li className="flex items-center gap-1">
                <Key className="h-4 w-4" /> <Link to="/register">Register</Link>
              </li>
            </>
          )}
        </ul>

        {/* Mobile Hamburger */}
        <div className="md:hidden">
          <button onClick={() => setDrawerOpen(!drawerOpen)}>
            <HiOutlineMenu className="h-6 w-6" />
          </button>
        </div>
      </div>

      {/* Mobile Drawer (Left Side) */}
      <div
        className={`fixed top-0 left-0 h-full w-64 bg-white shadow-lg transfor-transform duration-300 z-40 ${
          drawerOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {/* UL with solid white background */}
        <ul className="flex flex-col gap-6 h-screen px-6 bg-white pt-16">
          {login ? (
            <>
              <li>
                <Link
                  onClick={() => setDrawerOpen(false)}
                  to="/"
                  className="flex items-center gap-2 "
                >
                  <HomeIcon className="h-5 w-5" /> Home
                </Link>
              </li>
              <li>
                <Link
                  onClick={() => setDrawerOpen(false)}
                  to="/products"
                  className="flex items-center gap-2 "
                >
                  <BackpackIcon className="h-5 w-5" /> Products
                </Link>
              </li>
              <li>
                <Link
                  onClick={() => setDrawerOpen(false)}
                  to="/cart"
                  className="flex items-center gap-2 "
                >
                  <ShoppingCart className="h-5 w-5" /> Cart
                </Link>
              </li>
              <li>
                <button
                  onClick={handleLogout}
                  className="flex items-center gap-2 "
                >
                  <ExitIcon className="h-5 w-5" /> Log Out
                </button>
              </li>
            </>
          ) : (
            <>
              <li className="flex items-center gap-2 ">
                <EnterIcon className="h-5 w-5" />{" "}
                <Link onClick={() => setDrawerOpen(false)} to="/login">Log In</Link>
              </li>
              <li className="flex items-center gap-2 ">
                <Key className="h-5 w-5" />{" "}
                <Link onClick={() => setDrawerOpen(false)} to="/register">Register</Link>
              </li>
            </>
          )}
        </ul>
      </div>

      {/* Overlay */}
      {drawerOpen && (
        <div
          className="fixed inset-0 bg-black/30 z-30"
          onClick={() => setDrawerOpen(false)}
        ></div>
      )}
    </nav>
  );
}

export default Navbar;
