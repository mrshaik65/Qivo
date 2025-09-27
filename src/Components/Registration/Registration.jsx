import { TextField, Button } from "@radix-ui/themes";
import { PersonIcon, EnvelopeClosedIcon, LockClosedIcon, SewingPinIcon, ExclamationTriangleIcon } from "@radix-ui/react-icons";
import { useState } from "react";
import { enqueueSnackbar } from "notistack";
import { Link, useNavigate } from "react-router-dom";
import Navbar from "../Navbar/Nabar";

function Registration() {
  // 🔹 Form state
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [formError, setFormError] = useState(null); // 🔹 Error message
  const [erroricon, setErrorIcon] = useState(null); // 🔹 Error icon
  const navigate = useNavigate();

  // 🔹 Handle input change
  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    setFormError("");
    setErrorIcon("");
  };

  // 🔹 Form submit handler
  const handleSubmit = (e) => {
    e.preventDefault();

    const registeredUsers = JSON.parse(localStorage.getItem("registerUsers")) || [];

    // 🔹 Validate all fields filled
    if (!formData.name || !formData.email || !formData.password || !formData.confirmPassword) {
      setErrorIcon(<ExclamationTriangleIcon className="w-4 h-4" />);
      setFormError("All fields are required");
      enqueueSnackbar("All fields are required", { variant: "error" });
      return;
    }

    // 🔹 Check if email already exists
    const filterUser = registeredUsers.filter((each) => each.email === formData.email);
    if (filterUser.length > 0) {
      setErrorIcon(<ExclamationTriangleIcon className="w-4 h-4" />);
      setFormError("User already exists. Use different email");
      enqueueSnackbar("User already exists. Use different email", { variant: "error" });
      return;
    }

    // 🔹 Validate password length
    if (formData.password.length < 8) {
      setErrorIcon(<ExclamationTriangleIcon className="w-4 h-4" />);
      setFormError("Password must be at least 8 characters");
      enqueueSnackbar("Password must be at least 8 characters", { variant: "error" });
      return;
    }

    // 🔹 Confirm password match
    if (formData.password !== formData.confirmPassword) {
      setErrorIcon(<ExclamationTriangleIcon className="w-4 h-4" />);
      setFormError("Passwords didn't match");
      enqueueSnackbar("Passwords didn't match", { variant: "error" });
      return;
    }

    // 🔹 Save user in localStorage
    registeredUsers.push(formData);
    localStorage.setItem("registerUsers", JSON.stringify(registeredUsers));

    setFormError("");
    setErrorIcon("");
    enqueueSnackbar("User Registered Successfully", { variant: "success" });
    navigate("/login"); // 🔹 Redirect to login
  };

  return (
    <>
      <div className="flex flex-col h-screen">
        <Navbar textColor="text-black" />

        <div className="flex items-center justify-center flex-1 px-4">
          <form
            onSubmit={handleSubmit}
            className="bg-[#F24445] w-full sm:w-96 md:w-[420px] flex flex-col text-white rounded-2xl shadow-lg py-10 px-8"
          >
            {/* Title */}
            <p className="mb-6 text-3xl font-bold tracking-wide text-center">Register</p>

            {/* Name */}
            <div className="flex items-center gap-3 px-3 py-2 mb-2 rounded-lg">
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
            <div className="flex items-center gap-3 px-3 py-2 mb-2 rounded-lg">
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
            <div className="flex items-center gap-3 px-3 py-2 mb-2 rounded-lg">
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
            <div className="flex items-center gap-3 px-3 py-2 mb-2 rounded-lg">
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

            {/* Error Message */}
            {formError && (
              <div className="flex items-center gap-2 mb-3 ml-4 text-sm">
                <ExclamationTriangleIcon className="w-4 h-4" />
                <p>{formError}</p>
              </div>
            )}

            {/* Submit Button */}
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

            {/* Login Link */}
            <p className="mt-6 text-sm text-center">
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
