import { TextField } from "@radix-ui/themes";
import { Button } from "@radix-ui/themes";
import { PersonIcon } from "@radix-ui/react-icons";
import { EnvelopeClosedIcon } from "@radix-ui/react-icons";
import { LockClosedIcon } from "@radix-ui/react-icons";
import { SewingPinIcon } from "@radix-ui/react-icons";
import { ExclamationTriangleIcon } from "@radix-ui/react-icons";
import { useState } from "react";
import { enqueueSnackbar } from "notistack";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import Navbar from "../Navbar/Nabar";

function Registration() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [formError, setFormError] = useState(null);
  const [erroricon, setErrorIcon] = useState(null);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    setFormError("");
    setErrorIcon("");
  };
  const handleSubmit = (e) => {
    e.preventDefault();

    const registeredUsers =
      JSON.parse(localStorage.getItem("registerUsers")) || [];

    if (
      !formData.name ||
      !formData.email ||
      !formData.password ||
      !formData.confirmPassword
    ) {
      setErrorIcon(<ExclamationTriangleIcon className="w-4 h-4" />);
      setFormError("All feilds are required");
      enqueueSnackbar("All feilds are required", { variant: "error" });
      return;
    }
    const filterUser = registeredUsers.filter(
      (each) => each.email === formData.email
    );
    if (filterUser.length > 0) {
      setErrorIcon(<ExclamationTriangleIcon className="w-4 h-4" />);
      setFormError("User already exists. Use different email");
      enqueueSnackbar("User already exists. Use different email", {
        variant: "error",
      });

      return;
    }

    if (formData.password.length < 8) {
      setErrorIcon(<ExclamationTriangleIcon className="w-4 h-4" />);
      setFormError("Pasword atleast 8 characters");
      enqueueSnackbar("Pasword atleast 8 characters", { variant: "error" });

      return;
    }

    if (formData.password !== formData.confirmPassword) {
      setErrorIcon(<ExclamationTriangleIcon className="w-4 h-4" />);
      setFormError("Paswords didn't match");
      enqueueSnackbar("Paswords didn't match", { variant: "error" });

      return;
    }

    registeredUsers.push(formData);
    localStorage.setItem("registerUsers", JSON.stringify(registeredUsers));

    setFormError("");
    setErrorIcon("");
    enqueueSnackbar("User Registred Successfully", { variant: "success" });
    navigate("/login");

    console.log(formData);
  };

  return (
   <>
  <div className="h-screen flex flex-col">
    <Navbar textColor="text-black" />

    <div className="flex flex-1 justify-center items-center px-4">
      <form
        onSubmit={handleSubmit}
        className="bg-[#F24445] w-full sm:w-96 md:w-[420px] flex flex-col text-white rounded-2xl shadow-lg py-10 px-8"
      >
        {/* Title */}
        <p className="text-3xl font-bold mb-6 text-center tracking-wide">
          Register
        </p>

        {/* Name */}
        <div className="flex items-center gap-3 mb-2 rounded-lg px-3 py-2">
          <PersonIcon className="w-5 h-5" />
          <TextField.Root
            className="flex-1"
            radius="rounded"
            onChange={handleChange}
            name="name"
            placeholder="Enter Name"
            type="text"
            style={{ backgroundColor: "white" }}
          />
        </div>

        {/* Email */}
        <div className="flex items-center gap-3 mb-2 rounded-lg px-3 py-2">
          <EnvelopeClosedIcon className="w-5 h-5" />
          <TextField.Root
            className="flex-1"
            radius="rounded"
            onChange={handleChange}
            name="email"
            placeholder="Enter Email"
            type="email"
            style={{ backgroundColor: "white" }}
          />
        </div>

        {/* Password */}
        <div className="flex items-center gap-3 mb-2 rounded-lg px-3 py-2">
          <LockClosedIcon className="w-5 h-5" />
          <TextField.Root
            className="flex-1"
            radius="rounded"
            onChange={handleChange}
            name="password"
            placeholder="Enter Password"
            type="password"
            style={{ backgroundColor: "white" }}
          />
        </div>

        {/* Confirm Password */}
        <div className="flex items-center gap-3 mb-2 rounded-lg px-3 py-2">
          <SewingPinIcon className="w-5 h-5 rotate-45" />
          <TextField.Root
            className="flex-1"
            radius="rounded"
            onChange={handleChange}
            name="confirmPassword"
            placeholder="Confirm Password"
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
            type="submit"
          >
            Register
          </Button>
        </div>

        {/* Login link */}
        <p className="text-sm text-center mt-6">
          Already have an account?{" "}
          <Link className="text-blue-200 underline hover:text-white" to="/login">
            Login
          </Link>
        </p>
      </form>
    </div>
  </div>
</>

  );
}
export default Registration;
