import { TextField } from "@radix-ui/themes";
import { Button } from "@radix-ui/themes";
import { EnvelopeClosedIcon } from "@radix-ui/react-icons";
import { LockClosedIcon } from "@radix-ui/react-icons";
import { ExclamationTriangleIcon } from "@radix-ui/react-icons";
import { useContext, useState } from "react";
import { enqueueSnackbar } from "notistack";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../Context/context";
import Navbar from "../Navbar/Nabar";

function LogIn() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [formError, setFormError] = useState(null);
  const [erroricon, setErrorIcon] = useState(null);
  const navigate = useNavigate();

  const { setLogin } = useContext(AuthContext);

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    setFormError("");
    setErrorIcon("");
  };
  const handleSubmit = (e) => {
    e.preventDefault();

    const registeredUsers =
      JSON.parse(localStorage.getItem("registerUsers")) || [];

    if (!formData.email || !formData.password) {
      setErrorIcon(<ExclamationTriangleIcon className="w-4 h-4" />);
      setFormError("All fields are required");
      enqueueSnackbar("All fields are required", { variant: "error" });
      return;
    }
    const filterUser = registeredUsers.filter(
      (each) => each.email === formData.email
    );
    if (filterUser.length === 0) {
      setErrorIcon(<ExclamationTriangleIcon className="w-4 h-4" />);
      setFormError("User Doesn't exists. Please register");
      enqueueSnackbar("User Doesn't exists. Please register", {
        variant: "error",
      });

      return;
    }
    if (filterUser[0].password !== formData.password) {
      setErrorIcon(<ExclamationTriangleIcon className="w-4 h-4" />);
      setFormError("Incorrect Pasword");
      enqueueSnackbar("Incorrect Pasword", {
        variant: "error",
      });
      return;
    }

    setFormError("");
    setErrorIcon("");
    enqueueSnackbar("User LogIn Successfully", { variant: "success" });
    setLogin(true);
    localStorage.setItem("setLogin", JSON.stringify(true));

    navigate("/");
    console.log(formData);
  };

  return (
    <>
      <div className="h-screen flex flex-col ">
        <Navbar textColor="text-black" />

        <div className="flex flex-1 justify-center items-center px-4">
          <form
            onSubmit={handleSubmit}
            className="bg-[#F24445] w-full sm:w-96 md:w-[420px] flex flex-col text-white rounded-2xl shadow-lg py-10 px-8"
          >
            {/* Title */}
            <p className="text-3xl font-bold mb-6 text-center tracking-wide">
              Log In
            </p>

            {/* Email */}
            <div className="flex items-center gap-3 mb-2  rounded-lg px-3 py-2">
              <EnvelopeClosedIcon className="w-5 h-5 " />
              <TextField.Root
                className="flex-1"
                radius="rounded"
                onChange={handleChange}
                name="email"
                placeholder="Enter email"
                type="email"
                style={{ backgroundColor: "white" }}
              />
            </div>

            {/* Password */}
            <div className="flex items-center gap-3 mb-2  rounded-lg px-3 py-2">
              <LockClosedIcon className="w-5 h-5 " />
              <TextField.Root
                className="flex-1 "
                radius="rounded"
                onChange={handleChange}
                name="password"
                placeholder="Enter password"
                type="password"
                style={{ backgroundColor: "white" }}
              />
            </div>

            {/* Error */}
            {formError && (
              <div className="flex items-center gap-2 text-sm  mb-3 ml-4">
                <ExclamationTriangleIcon className="w-4 h-4" />
                <p>{formError}</p>
              </div>
            )}

            {/* Button */}
            <div className="flex justify-center">
              <Button
                style={{
                  padding: "0px 20px",
                  backgroundColor: "white",
                  color: "black",
                  
                }}
                className=""
                type="submit"
              >
                LogIn
              </Button>
            </div>
            {/* Register link */}
            <p className="text-sm text-center mt-6">
              Don’t have an account?{" "}
              <Link
                className="text-blue-200 underline hover:text-white"
                to="/register"
              >
                Register
              </Link>
            </p>
          </form>
        </div>
      </div>
    </>
  );
}
export default LogIn;
