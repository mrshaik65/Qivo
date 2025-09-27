import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Navbar from "../Navbar/Nabar";
import { Button } from "@radix-ui/themes";
import { ShoppingCart } from "lucide-react";
import { StarFilledIcon } from "@radix-ui/react-icons";
import Stack from "@mui/material/Stack";
import CircularProgress from "@mui/material/CircularProgress";
import Footer from "../Footer/Footer";

// 🔹 Helper function to get current quantity of product in cart
const getCartItemQuantity = (productId) => {
  const cart = JSON.parse(localStorage.getItem("cart")) || [];
  const item = cart.find((item) => item.id === productId);
  return item ? item.quantity : 0;
};

// 🔹 Helper function to add/update/remove items in the cart
const updateCart = (product, newQuantity) => {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];
  const item = cart.find((item) => item.id === product.id);

  if (item) {
    item.quantity = newQuantity;
    if (newQuantity <= 0) {
      cart = cart.filter((item) => item.id !== product.id); // Remove item if quantity is 0
    }
  } else if (newQuantity > 0) {
    cart.push({ ...product, quantity: newQuantity }); // Add new item
  }

  localStorage.setItem("cart", JSON.stringify(cart));
};

function ProductDetailsPage() {
  const [product, setProduct] = useState(null); // Store product details
  const [loader, setLoader] = useState(false); // Loader state for API call
  const { id } = useParams(); // Get product ID from URL
  const [quantity, setQuantity] = useState(0); // Quantity in cart

  // Fetch product details on mount or when ID changes
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoader(true);
        const res = await axios.get("/products.json");
        const productData = res.data.find((p) => p.id === parseInt(id));
        setProduct(productData);

        const qty = getCartItemQuantity(productData.id); // Load quantity from cart
        setQuantity(qty);
      } catch (error) {
        console.log(error, "Error occurred during API call");
      } finally {
        setLoader(false);
      }
    };

    fetchData();
  }, [id]);

  // Show loader while fetching data
  if (loader) return (
    <div className="flex items-center justify-center h-screen">
      <Stack sx={{ color: "grey.500" }} spacing={2} direction="row">
        <CircularProgress color="error" />
      </Stack>
    </div>
  );

  // Show message if product not found
  if (!product) return <p className="flex items-center justify-center h-screen">Product not found</p>;

  return (
    <>
      <Navbar />
      <div className="flex flex-col max-w-5xl gap-8 p-5 mx-auto">

        {/* Product Image and Details */}
        <div className="flex flex-col gap-8 md:flex-row">

          {/* Image */}
          <div className="flex items-start justify-center md:flex-1">
            <img
              src={product.image}
              alt={product.name}
              className="object-contain w-full h-auto max-w-sm shadow-lg rounded-xl"
            />
          </div>

          {/* Details */}
          <div className="space-y-4 md:flex-1">
            <h1 className="text-3xl font-bold text-gray-800">{product.name}</h1>

            {/* Brand, Category, Delivery */}
            <div className="flex flex-wrap gap-4 text-gray-600">
              <p><span className="font-semibold">Brand:</span> {product.brand}</p>
              <p><span className="font-semibold">Category:</span> {product.category.join(" › ")}</p>
              <p><span className="font-semibold">Delivery:</span> {product.delivery_estimate}</p>
            </div>

            {/* Rating */}
            <div className="flex items-center gap-2 text-sm font-semibold">
              <StarFilledIcon className="w-4 h-4 text-green-500" />
              <span className="text-gray-800">
                {product.rating} ({product.number_of_ratings} ratings)
              </span>
              <span className="text-green-700">- {product.rating_category}</span>
              <span className="text-gray-600">{product.purchase_count}+ bought</span>
            </div>

            {/* Price */}
            <div className="flex items-center gap-4">
              <span className="text-2xl font-bold text-red-500">
                ₹{product.discounted_price.toFixed(2)}
              </span>
              {product.discount && (
                <span className="text-gray-400 line-through">
                  ₹{product.price.toFixed(2)}
                </span>
              )}
            </div>

            {/* Description */}
            <p className="text-gray-700">{product.description}</p>

            {/* Add/Update Cart & Buy Buttons */}
            {quantity < 1 ? (
              <div className="flex flex-col justify-center gap-2 mb-2 sm:flex-row">
                {/* Add to Cart */}
                <Button
                  className="flex items-center justify-center gap-2 px-4 py-2 text-sm sm:text-base md:text-lg"
                  onClick={() => {
                    updateCart(product, 1);
                    setQuantity(1);
                  }}
                >
                  <ShoppingCart size={14} /> Add to Cart
                </Button>

                {/* Buy Now */}
                <Button
                  className="flex items-center justify-center px-4 py-2 text-sm text-white bg-red-500 sm:text-base md:text-lg hover:bg-red-600"
                  onClick={() => alert("Proceed to Buy Now")}
                >
                  Buy Now
                </Button>
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center gap-2 mb-2 sm:flex-row">
                {/* Quantity Control */}
                <div className="flex items-center gap-2 sm:gap-3">
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

                {/* Buy Now */}
                <Button
                  className="px-4 py-2 text-sm text-white bg-red-500 sm:text-base md:text-lg hover:bg-red-600"
                  onClick={() => alert("Proceed to Buy Now")}
                >
                  Buy Now
                </Button>
              </div>
            )}
          </div>
        </div>

        {/* Reviews Section */}
        {product.reviews?.length > 0 && (
          <div className="mt-6">
            <h2 className="mb-3 text-lg font-semibold">
              <u>Ratings & Reviews</u>
            </h2>
            <div className="space-y-4">
              {product.reviews.map((r) => (
                <div key={r.review_id} className="p-3 border rounded-md bg-gray-50">
                  <p className="text-sm font-semibold text-yellow-500">
                    ⭐ {r.review_rating} - <span className="text-gray-700">{r.review_title}</span>
                  </p>
                  <p className="mt-1 text-sm text-gray-600">{r.review}</p>
                  <div className="flex gap-5 mt-1 text-xs text-gray-400">
                    <p>{r.user_name}</p>
                    <p>{r.date_posted}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      <Footer />
    </>
  );
}

export default ProductDetailsPage;
