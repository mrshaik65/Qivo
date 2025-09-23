function ProductsRenderingPage({ product }) {
  return (
    <div className="max-w-sm bg-white rounded-2xl shadow-md hover:shadow-xl transition-shadow duration-300 overflow-hidden border border-gray-200">
      {/* Image + Discount Badge */}
      <div className="relative">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-60 object-contain p-4 bg-gray-50"
        />
        <span className="absolute top-3 left-3 bg-[#F24445] text-white text-xs font-semibold px-3 py-1 rounded-full shadow-md">
          {product.discount} OFF
        </span>
      </div>

      {/* Content */}
      <div className="p-5 space-y-3">
        {/* Name */}
        <h2 className="text-lg font-semibold text-gray-800 line-clamp-2">
          {product.name}
        </h2>

        {/* Brand */}
        <p className="text-sm text-gray-600">
          <span className="font-medium">Brand:</span> {product.brand}
        </p>

        {/* Ratings */}
<div className="flex items-center gap-2">
  <span className="text-green-500">⭐ {product.rating}</span>
  <span className="text-xs text-gray-500">
    ({product.number_of_ratings} ratings)
  </span>
</div>


        {/* Purchase Count */}
        <p className="text-xs text-gray-500">
          {product.purchase_count}+ bought
        </p>

        {/* Price */}
        <div className="flex items-center gap-3">
          <span className="text-xl font-bold text-[#F24445]">
            ₹{product.discounted_price.toFixed(2)}
          </span>
          <span className="text-sm line-through text-gray-400">
            ₹{product.price.toFixed(2)}
          </span>
        </div>
      </div>
    </div>
  );
}

export default ProductsRenderingPage;
