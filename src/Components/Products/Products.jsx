import axios from "axios";
import { useEffect } from "react";
import Navbar from "../Navbar/Nabar"

function Products() {
  useEffect(() => {
    const fetchData = async () => {
      const res = await axios.get("/public/products.json");
      console.log(res.data);
    };

    fetchData();
  }, []);

  return (
    <>
    <Navbar/>
        <p className="font-light">
          this is from products
        </p>
    </>
  );
}
export default Products;
