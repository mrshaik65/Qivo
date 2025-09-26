import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Navbar from "../Navbar/Nabar";
import { Button } from "@radix-ui/themes";
import { ShoppingCart } from "lucide-react";
import { StarFilledIcon } from "@radix-ui/react-icons";

// 🔹 Helper functions using 'item' like PRP
const getCartItemQuantity = (productId) => {
  const cart = JSON.parse(localStorage.getItem("cart")) || [];
  const item = cart.find((item) => item.id === productId); // PRP style
  return item ? item.quantity : 0;
};

const updateCart = (product, newQuantity) => {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];
  const item = cart.find((item) => item.id === product.id); // PRP style

  if (item) {
    item.quantity = newQuantity;
    if (newQuantity <= 0) {
      cart = cart.filter((item) => item.id !== product.id); // PRP style
    }
  } else if (newQuantity > 0) {
    cart.push({ ...product, quantity: newQuantity });
  }

  localStorage.setItem("cart", JSON.stringify(cart));
};

function ProductDetailsPage() {
  const [product, setProduct] = useState(null);
  const [loader, setLoader] = useState(false);
  const { id } = useParams();
  const [quantity, setQuantity] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoader(true);
        const res = await axios.get("/products.json");
        const productData = res.data.find((p) => p.id === parseInt(id));
        setProduct(productData);

        const qty = getCartItemQuantity(productData.id); // load quantity from cart
        setQuantity(qty);
      } catch (error) {
        console.log(error, "Error occurred during API call");
      } finally {
        setLoader(false);
      }
    };

    fetchData();
  }, [id]);

  if (loader) return <p className="text-center mt-10">Loading...</p>;
  if (!product) return <p className="text-center mt-10">Product not found</p>;

  return (
    <>
      <Navbar />
      <div className="max-w-5xl mx-auto p-5 flex flex-col gap-8">
        <div className="flex flex-col md:flex-row gap-8">
          {/* Image */}
          <div className="md:flex-1 flex justify-center items-start">
            <img
              src={product.image}
              alt={product.name}
              className="w-full max-w-sm h-auto object-contain rounded-xl shadow-lg"
            />
          </div>

          {/* Details */}
          <div className="md:flex-1 space-y-4">
            <h1 className="text-3xl font-bold text-gray-800">{product.name}</h1>

            <div className="flex flex-wrap gap-4 text-gray-600">
              <p>
                <span className="font-semibold">Brand:</span> {product.brand}
              </p>
              <p>
                <span className="font-semibold">Category:</span>{" "}
                {product.category.join(" › ")}
              </p>
              <p>
                <span className="font-semibold">Delivery:</span>{" "}
                {product.delivery_estimate}
              </p>
            </div>

            {/* Rating */}
            <div className="flex items-center gap-2 font-semibold text-sm">
              <StarFilledIcon className="text-green-500 w-4 h-4" />
              <span className="text-gray-800">
                {product.rating} ({product.number_of_ratings} ratings)
              </span>
              <span className="text-green-700">- {product.rating_category}</span>
              <span className="text-gray-600">{product.purchase_count}+ bought</span>
            </div>

            {/* Price */}
            <div className="flex items-center gap-4">
              <span className="text-red-500 text-2xl font-bold">
                ₹{product.discounted_price.toFixed(2)}
              </span>
              {product.discount && (
                <span className="line-through text-gray-400">
                  ₹{product.price.toFixed(2)}
                </span>
              )}
            </div>

            <p className="text-gray-700">{product.description}</p>

            {/* Cart Buttons */}
            {quantity < 1 ? (
              <div className="flex flex-col sm:flex-row justify-center gap-2 mb-2">
                <Button
                  className="px-4 py-2 text-sm sm:text-base md:text-lg flex items-center justify-center gap-2"
                  onClick={() => {
                    updateCart(product, 1);
                    setQuantity(1);
                  }}
                >
                  <ShoppingCart size={14} />
                  Add to Cart
                </Button>

                <Button
                  className="px-4 py-2 text-sm sm:text-base md:text-lg bg-red-500 text-white hover:bg-red-600 flex items-center justify-center"
                  onClick={() => alert("Proceed to Buy Now")}
                >
                  Buy Now
                </Button>
              </div>
            ) : (
              <div className="flex flex-col sm:flex-row justify-center gap-2 mb-2 items-center">
                <div className="flex gap-2 sm:gap-3 items-center">
                  <Button
                    className="px-2 py-1 text-sm sm:text-base"
                    onClick={() => {
                      updateCart(product, quantity - 1);
                      setQuantity(quantity - 1);
                    }}
                  >
                    -
                  </Button>
                  <h1 className="text-sm sm:text-base md:text-lg">{quantity}</h1>
                  <Button
                    className="px-2 py-1 text-sm sm:text-base"
                    onClick={() => {
                      updateCart(product, quantity + 1);
                      setQuantity(quantity + 1);
                    }}
                  >
                    +
                  </Button>
                </div>

                <Button
                  className="px-4 py-2 text-sm sm:text-base md:text-lg bg-red-500 text-white hover:bg-red-600"
                  onClick={() => alert("Proceed to Buy Now")}
                >
                  Buy Now
                </Button>
              </div>
            )}
          </div>
        </div>

        {/* Reviews */}
        {product.reviews?.length > 0 && (
          <div className="mt-6">
            <h2 className="font-semibold text-lg mb-3">
              <u>Ratings & Reviews</u>
            </h2>
            <div className="space-y-4">
              {product.reviews.map((r) => (
                <div key={r.review_id} className="border rounded-md p-3 bg-gray-50">
                  <p className="text-sm text-yellow-500 font-semibold">
                    ⭐ {r.review_rating} - <span className="text-gray-700">{r.review_title}</span>
                  </p>
                  <p className="text-sm text-gray-600 mt-1">{r.review}</p>
                  <div className="text-xs text-gray-400 mt-1 gap-5 flex">
                    <p>{r.user_name}</p>
                    <p>{r.date_posted}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </>
  );
}

export default ProductDetailsPage;
