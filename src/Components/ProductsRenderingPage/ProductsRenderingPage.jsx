import { Button } from "@radix-ui/themes";
import { useState, useEffect } from "react";
import { ShoppingCart } from "lucide-react";
import { StarFilledIcon } from "@radix-ui/react-icons";
import { useNavigate } from "react-router-dom";

function ProductsRenderingPage({ product }) {
  const [quantity, setQuantity] = useState(0); // Quantity in cart
  const navigate = useNavigate();

  const infoTextClass = "text-xs sm:text-sm md:text-sm lg:text-sm xl:text-sm text-gray-600";

  // 🔹 Load quantity from localStorage when component mounts
  useEffect(() => {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    const existingItem = cart.find((item) => item.id === product.id);
    if (existingItem) setQuantity(existingItem.quantity);
  }, [product.id]);

  // 🔹 Update cart in localStorage
  const updateCart = (newQuantity) => {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    const existingItem = cart.find((item) => item.id === product.id);

    if (existingItem) {
      if (newQuantity <= 0) {
        cart = cart.filter((item) => item.id !== product.id); // Remove item
      } else {
        existingItem.quantity = newQuantity; // Update quantity
      }
    } else if (newQuantity > 0) {
      cart.push({ ...product, quantity: newQuantity }); // Add new item
    }

    localStorage.setItem("cart", JSON.stringify(cart));
    setQuantity(newQuantity); // Update local state
  };

  return (
    <div className="flex flex-col w-full max-w-xs py-2 overflow-hidden transition-shadow duration-300 sm:max-w-sm hover:shadow-xl">

      {/* Image + Discount Badge */}
      <div onClick={() => navigate(`/product-details/${product.id}`)}>
        <div className="relative">
          <img
            src={product.image}
            alt={product.name}
            className="object-contain w-full h-40 p-2 sm:h-44 md:h-52 lg:h-60 sm:p-3"
          />
          {product.discount && (
            <span
              className="absolute top-2 left-2 bg-green-500 text-white text-[10px] sm:text-[11px] md:text-sm lg:text-[11px] xl:text-[11px]
                         font-semibold px-2 sm:px-2.5 md:px-3 py-0.5 sm:py-0.5 md:py-1 rounded-full shadow"
            >
              {product.discount} OFF
            </span>
          )}
        </div>

        {/* Product Info */}
        <div className="flex-1 px-2 py-2 sm:px-3 md:px-4 lg:px-5">
          <h2 className="mb-1 text-sm font-semibold leading-snug text-gray-800 sm:text-base md:text-lg lg:text-base xl:text-base line-clamp-2">
            {product.name}
          </h2>
          <p className={`${infoTextClass} mb-1`}>
            <span className="font-medium">Brand:</span> {product.brand}
          </p>
          <div className={`flex items-center gap-1 mb-1 ${infoTextClass}`}>
            <span className="flex items-center gap-1 text-green-500">
              <StarFilledIcon /> {product.rating}
            </span>
            <span>({product.number_of_ratings})</span>
          </div>
          <p className={`${infoTextClass} mb-1`}>{product.purchase_count}+ bought</p>
          <div className={`flex items-center gap-1 sm:gap-2 md:gap-3 mb-1 ${infoTextClass}`}>
            <span className="font-bold text-[#F24445]">₹{product.discounted_price.toFixed(2)}</span>
            <span className="text-gray-400 line-through">₹{product.price.toFixed(2)}</span>
          </div>
        </div>
      </div>

      {/* Cart Buttons */}
      {quantity < 1 ? (
        // 🔹 Show "Add" button if not in cart
        <div className="flex justify-center mb-2">
          <Button
            className="flex items-center px-2 py-1 text-sm sm:px-4 sm:py-2 sm:text-base md:text-lg lg:text-sm xl:text-sm"
            onClick={() => updateCart(1)}
          >
            <ShoppingCart size={14} /> Add
          </Button>
        </div>
      ) : (
        // 🔹 Show quantity controls if already in cart
        <div className="flex items-center justify-center gap-2 mb-2 sm:gap-3">
          <Button
            className="px-2 py-1 text-sm sm:text-base lg:text-sm xl:text-sm"
            onClick={() => updateCart(quantity - 1)}
          >
            -
          </Button>
          <h1 className="text-sm sm:text-base md:text-lg lg:text-sm xl:text-sm">{quantity}</h1>
          <Button
            className="px-2 py-1 text-sm sm:text-base lg:text-sm xl:text-sm"
            onClick={() => updateCart(quantity + 1)}
          >
            +
          </Button>
        </div>
      )}
    </div>
  );
}

export default ProductsRenderingPage;
