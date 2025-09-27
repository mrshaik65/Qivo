import { useEffect, useState } from "react";
import Navbar from "../Navbar/Nabar";   
import { ShoppingCart } from "lucide-react"; 
import Footer from "../Footer/Footer"; 

// Helper function to fetch cart items from localStorage (returns [] if nothing found)
const getCartItems = () => JSON.parse(localStorage.getItem("cart")) || [];

const CartPage = () => {
  const [cartItems, setCartItems] = useState([]);  
  const [total, setTotal] = useState(0);           

  // useEffect runs once on mount to load cart items
  useEffect(() => {
    const items = getCartItems();  
    setCartItems(items);           
    calculateTotal(items);         
  }, []);

  // Function to calculate total amount based on cart items
  const calculateTotal = (items) => {
    const sum = items.reduce(
      (acc, item) => acc + item.discounted_price * item.quantity,
      0
    );
    setTotal(sum); 
  };

  return (
    <>
      <Navbar />
      <div className="max-w-5xl p-5 mx-auto h-200">
        {/* Page heading with Shopping Cart icon */}
        <h1 className="flex items-center gap-2 mb-5 text-2xl font-bold">
          <ShoppingCart /> My Cart
        </h1>

        {/* If no items in cart, show empty message */}
        {cartItems.length === 0 ? (
          <p className="text-gray-600">Your cart is empty.</p>
        ) : (
          <div className="space-y-4">
            {/* Loop through cart items */}
            {cartItems.map((item) => (
              <div
                key={item.id} // Key for React list rendering
                className="flex items-center justify-between gap-4 p-3 border rounded-md shadow-sm"
              >
                {/* Product Image */}
                <div className="flex-shrink-0">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="object-contain w-16 h-16 rounded-md"
                  />
                </div>

                {/* Product Details */}
                <div className="flex-1">
                  <h2 className="font-semibold">{item.name}</h2>
                  <p className="text-sm text-gray-600">Brand: {item.brand}</p>
                  <p className="text-sm text-gray-600">
                    Quantity: {item.quantity}
                  </p>
                  <p className="text-sm font-bold text-red-500">
                    Total: ₹{(item.discounted_price * item.quantity).toFixed(2)}
                  </p>
                </div>
              </div>
            ))}

            {/* Cart Total Section */}
            <div className="flex justify-end gap-2 mt-6 text-right">
              <h2 className="text-xl font-bold">Total Amount:</h2>
              <h2 className="text-xl font-bold text-[#F24445]">
                ₹{total.toFixed(2)}
              </h2>
            </div>
          </div>
        )}
      </div>
      <Footer />
    </>
  );
};

export default CartPage;
