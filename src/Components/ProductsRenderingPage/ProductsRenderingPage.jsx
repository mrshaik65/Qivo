import { Button } from "@radix-ui/themes";
import { useState } from "react";
import { ShoppingCart } from "lucide-react";

function ProductsRenderingPage({ product }) {
  const [quantity, setQuantity] = useState(0);

  return (
    <div className="w-full max-w-xs sm:max-w-sm bg-white rounded-2xl shadow-md hover:shadow-xl transition-shadow duration-300 overflow-hidden border border-gray-200 flex flex-col">
      {/* Image + Discount Badge */}
      <div className="relative">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-40 sm:h-44 md:h-52 lg:h-60 object-contain p-2 sm:p-3 bg-gray-50"
        />
        <span
          className="absolute top-2 left-2 bg-[#F24445] text-white 
          text-[9px] sm:text-[10px] md:text-xs lg:text-sm 
          font-semibold px-2 sm:px-2.5 md:px-3 
          py-0.5 sm:py-0.5 md:py-1 
          rounded-full shadow"
        >
          {product.discount} OFF
        </span>
      </div>

      {/* Content */}
      <div className="px-2 sm:px-3 md:px-4 lg:px-5 py-2 flex-1">
        {/* Name */}
        <h2 className="text-[11px] sm:text-sm md:text-base lg:text-lg font-semibold text-gray-800 leading-snug line-clamp-2 mb-1">
          {product.name}
        </h2>

        {/* Brand */}
        <p className="text-[10px] sm:text-xs md:text-sm text-gray-600 mb-1">
          <span className="font-medium">Brand:</span> {product.brand}
        </p>

        {/* Ratings */}
        <div className="flex items-center gap-1 mb-1">
          <span className="text-green-500 text-[10px] sm:text-xs md:text-sm lg:text-base">
            ⭐ {product.rating}
          </span>
          <span className="text-gray-500 text-[9px] sm:text-[10px] md:text-xs lg:text-sm">
            ({product.number_of_ratings})
          </span>
        </div>

        {/* Purchase Count */}
        <p className="text-gray-500 text-[9px] sm:text-xs md:text-sm mb-2">
          {product.purchase_count}+ bought
        </p>

        {/* Price */}
        <div className="flex items-center gap-1 sm:gap-2 md:gap-3 mb-2">
          <span className="font-bold text-[#F24445] text-sm sm:text-base md:text-lg lg:text-xl">
            ₹{product.discounted_price.toFixed(2)}
          </span>
          <span className="line-through text-gray-400 text-[9px] sm:text-xs md:text-sm lg:text-base">
            ₹{product.price.toFixed(2)}
          </span>
        </div>
      </div>

      {/* Action Buttons */}
      {quantity < 1 ? (
        <div className="flex justify-center mb-3">
          <Button
            className="px-2 sm:px-4 py-1 sm:py-2 
            text-[11px] sm:text-sm md:text-base"
            onClick={() => setQuantity(quantity + 1)}
          >
            <ShoppingCart size={14} className="mr-1" />
            Add
          </Button>
        </div>
      ) : (
        <div className="flex justify-center gap-2 sm:gap-3 items-center mb-3">
          <Button
            className="px-2 py-1 text-[11px] sm:text-sm"
            onClick={() => setQuantity(quantity - 1)}
          >
            -
          </Button>
          <h1 className="text-[11px] sm:text-sm md:text-base">{quantity}</h1>
          <Button
            className="px-2 py-1 text-[11px] sm:text-sm"
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
