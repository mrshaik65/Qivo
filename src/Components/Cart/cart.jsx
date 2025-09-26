import { useEffect, useState } from "react";
import Navbar from "../Navbar/Nabar";
import { ShoppingCart } from "lucide-react";

const getCartItems = () => JSON.parse(localStorage.getItem("cart")) || [];

const CartPage = () => {
  const [cartItems, setCartItems] = useState([]);

  const [total, setTotal] = useState(0);

  useEffect(() => {
    const items = getCartItems();
    setCartItems(items);
    calculateTotal(items);
  }, []);

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
      <div className="max-w-5xl mx-auto p-5">
        <h1 className="text-2xl font-bold mb-5 flex items-center gap-2">
          <ShoppingCart /> My Cart
        </h1>

        {cartItems.length === 0 ? (
          <p className="text-gray-600">Your cart is empty.</p>
        ) : (
          <div className="space-y-4">
            {cartItems.map((item) => (
              <div
                key={item.id}
                className="flex justify-between items-center border p-3 rounded-md shadow-sm gap-4"
              >
                <div className="flex-shrink-0">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-16 h-16 object-contain rounded-md"
                  />
                </div>

                <div className="flex-1">
                  <h2 className="font-semibold">{item.name}</h2>
                  <p className="text-gray-600 text-sm">Brand: {item.brand}</p>
                  <p className="text-gray-600 text-sm">
                    Quantity: {item.quantity}
                  </p>
                  <p className="font-bold text-red-500 text-sm">
                    Total: ₹{(item.discounted_price * item.quantity).toFixed(2)}
                  </p>
                </div>
              </div>
            ))}

            <div className="mt-6 text-right">
              <h2 className="text-xl font-bold">
                Total Amount: ₹{total.toFixed(2)}
              </h2>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default CartPage;
