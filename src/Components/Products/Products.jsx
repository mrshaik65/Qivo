import axios from "axios";
import { useEffect, useState } from "react";
import Navbar from "../Navbar/Nabar";
import { TextField } from "@radix-ui/themes/dist/cjs/index.js";
import { MagnifyingGlassIcon } from "@radix-ui/react-icons";
import Stack from "@mui/material/Stack";
import CircularProgress from "@mui/material/CircularProgress";
import ProductsRenderingPage from "../ProductsRenderingPage/ProductsRenderingPage";

function Products() {
  const [apiData, setApiData] = useState([]);
  const [loader, setLoader] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoader(true);
        const res = await axios.get("products.json");
        console.log(res.data);
        setApiData(res.data);
      } catch (error) {
        console.log(error, "Error accured during api call");
      } finally {
        setLoader(false);
        console.log("api call sucessfull completed");
      }
    };

    fetchData();
  }, []);
  const handleChange = (e) => {
    setSearchTerm(e.target.value);
  };
  const filterData = apiData.filter(
    (each) =>
      each.name.toLowerCase().includes(searchTerm.toLocaleLowerCase()) ||
      each.brand.toLowerCase().includes(searchTerm.toLocaleLowerCase())
  );
  console.log(filterData);

  return (
    <>
      <Navbar />
      <div className="flex justify-center mb-10">
        <div className="w-100 mx-10 ">
          <TextField.Root
            placeholder="Search products..."
            style={{ border: "1px solid #F24445", borderRadius: "8px" }}
            onChange={handleChange}
            value={searchTerm}
          >
            <TextField.Slot className="">
              <MagnifyingGlassIcon
                height="16"
                width="16"
                className=""
                color="red"
              />
            </TextField.Slot>
          </TextField.Root>
        </div>
      </div>
<div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 my-10">  
        {!loader ? (
          filterData.length > 0 ? (
            filterData.map((each, _index) => {
              return <ProductsRenderingPage product={each} key={each.id} />;
            })
          ) : (
            <div className="bg-amber-500">
              <p className="flex justify-center items-center">
                No products found
              </p>
            </div>
          )
        ) : (
          <div className="flex justify-center items-center h-screen">
            <Stack sx={{ color: "grey.500" }} spacing={2} direction="row">
              <CircularProgress color="secondary" />
            </Stack>
          </div>
        )}
      </div>
    </>
  );
}
export default Products;
