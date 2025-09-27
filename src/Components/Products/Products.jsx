import axios from "axios";
import { useEffect, useState } from "react";
import Navbar from "../Navbar/Nabar";
import { TextField } from "@radix-ui/themes/dist/cjs/index.js";
import { MagnifyingGlassIcon } from "@radix-ui/react-icons";
import Stack from "@mui/material/Stack";
import CircularProgress from "@mui/material/CircularProgress";
import ProductsRenderingPage from "../ProductsRenderingPage/ProductsRenderingPage";
import Footer from "../Footer/Footer";

function Products() {
  const [apiData, setApiData] = useState([]); // Stores products fetched from API
  const [loader, setLoader] = useState(false); // Loading state
  const [searchTerm, setSearchTerm] = useState(""); // Search input state

  // Fetch product data on component mount
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoader(true); // Show loader while fetching
        const res = await axios.get("products.json"); // Fetch data from JSON
        setApiData(res.data); // Set data to state
      } catch (error) {
        console.log(error, "Error accured during api call"); // Log errors
      } finally {
        setLoader(false); // Hide loader after fetch
        console.log("api call sucessfull completed"); // Log success
      }
    };

    fetchData();
  }, []);

  // Handle search input changes
  const handleChange = (e) => {
    setSearchTerm(e.target.value);
  };

  // Filter products based on search term
  const filterData = apiData.filter(
    (each) =>
      each.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      each.brand.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <>
      <Navbar />

      {/* Search Bar */}
      <div className="flex justify-center mb-10">
        <div className="mx-10 w-100 ">
          <TextField.Root
            placeholder="Search products..."
            style={{ border: "1px solid #F24445", borderRadius: "8px" }}
            onChange={handleChange}
            value={searchTerm}
          >
            <TextField.Slot>
              <MagnifyingGlassIcon
                height="16"
                width="16"
                color="red"
              />
            </TextField.Slot>
          </TextField.Root>
        </div>
      </div>

      {/* Products Grid */}
      <div className="grid grid-cols-2 my-10 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6">
        {!loader ? (
          filterData.length > 0 ? (
            // Map filtered products
            filterData.map((each) => (
              <ProductsRenderingPage product={each} key={each.id} />
            ))
          ) : (
            // No products found message
            <div className="flex items-center justify-center min-w-screen h-100">
              <p>No products found</p>
            </div>
          )
        ) : (
          // Loader while fetching products
          <div className="flex items-center justify-center h-100 min-w-screen">
            <Stack sx={{ color: "grey.500" }} spacing={2} direction="row">
              <CircularProgress color="error" />
            </Stack>
          </div>
        )}
      </div>

      <Footer />
    </>
  );
}

export default Products;
