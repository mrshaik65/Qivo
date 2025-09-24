import { Button } from "@radix-ui/themes";
import { useState } from "react";
import { ShoppingCart } from "lucide-react";
import { StarFilledIcon } from "@radix-ui/react-icons";
import { useNavigate } from "react-router-dom";

function ProductsRenderingPage({ product }) {
  const [quantity, setQuantity] = useState(0);
  const navigate = useNavigate();

  // Common text class for brand, rating, purchase, price
  const infoTextClass =
    "text-xs sm:text-sm md:text-sm lg:text-sm xl:text-sm text-gray-600";

  return (
    <div
      className="w-full max-w-xs sm:max-w-sm  hover:shadow-xl transition-shadow duration-300 overflow-hidden flex flex-col py-2"
      onClick={() => navigate(`/product-details/${product.id}`)}
    >
      {/* Image + Discount Badge */}
      <div className="relative">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-40 sm:h-44 md:h-52 lg:h-60 object-contain p-2 sm:p-3"
        />
        {product.discount && (
          <span
            className="absolute top-2 left-2 bg-green-500 text-white 
      text-[10px] sm:text-[11px] md:text-sm lg:text-[11px] xl:text-[11px] 
      font-semibold px-2 sm:px-2.5 md:px-3 
      py-0.5 sm:py-0.5 md:py-1 
      rounded-full shadow"
          >
            {product.discount} OFF
          </span>
        )}
      </div>

      {/* Content */}
      <div className="px-2 sm:px-3 md:px-4 lg:px-5 py-2 flex-1">
        {/* Name */}
        <h2 className="text-sm sm:text-base md:text-lg lg:text-base xl:text-base font-semibold text-gray-800 leading-snug line-clamp-2 mb-1">
          {product.name}
        </h2>

        {/* Brand */}
        <p className={`${infoTextClass} mb-1`}>
          <span className="font-medium">Brand:</span> {product.brand}
        </p>

        {/* Ratings */}
        <div className={`flex items-center gap-1 mb-1  ${infoTextClass}`}>
          <span className="text-green-500 flex items-center gap-1">
            <StarFilledIcon /> {product.rating}
          </span>
          <span>({product.number_of_ratings})</span>
        </div>

        {/* Purchase Count */}
        <p className={`${infoTextClass} mb-1`}>
          {product.purchase_count}+ bought
        </p>

        {/* Price */}
        <div
          className={`flex items-center gap-1 sm:gap-2 md:gap-3 mb-1 ${infoTextClass}`}
        >
          <span className="font-bold text-[#F24445]">
            ₹{product.discounted_price.toFixed(2)}
          </span>
          <span className="line-through text-gray-400">
            ₹{product.price.toFixed(2)}
          </span>
        </div>
      </div>

      {/* Action Buttons */}
      {quantity < 1 ? (
        <div className="flex justify-center mb-2">
          <Button
            className="px-2 sm:px-4 py-1 sm:py-2 text-sm sm:text-base md:text-lg lg:text-sm xl:text-sm items-center flex"
            onClick={() => setQuantity(quantity + 1)}
          >
            <ShoppingCart size={14} className="" />
            Add
          </Button>
        </div>
      ) : (
        <div className="flex justify-center gap-2 sm:gap-3 items-center mb-2">
          <Button
            className="px-2 py-1 text-sm sm:text-base lg:text-sm xl:text-sm"
            onClick={() => setQuantity(quantity - 1)}
          >
            -
          </Button>
          <h1 className="text-sm sm:text-base md:text-lg lg:text-sm xl:text-sm">
            {quantity}
          </h1>
          <Button
            className="px-2 py-1 text-sm sm:text-base lg:text-sm xl:text-sm"
            onClick={() => setQuantity(quantity + 1)}
          >
            +
          </Button>
        </div>
      )}
    </div>
  );
}

export default ProductsRenderingPage;
