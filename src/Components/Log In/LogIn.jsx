import { TextField, Button } from "@radix-ui/themes"; // Merged imports from Radix Themes
import { EnvelopeClosedIcon, LockClosedIcon, ExclamationTriangleIcon } from "@radix-ui/react-icons";
import { useContext, useState } from "react";
import { enqueueSnackbar } from "notistack";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../Context/context";
import Navbar from "../Navbar/Nabar";

function LogIn() {
  // Form state to store email and password
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  // Error state for displaying form errors
  const [formError, setFormError] = useState(null);
  const [erroricon, setErrorIcon] = useState(null);

  const navigate = useNavigate(); // Hook to navigate programmatically
  const { setLogin } = useContext(AuthContext); // Auth context to update login state

  // Handle input changes
  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    setFormError(""); // Clear error message on input change
    setErrorIcon(""); // Clear error icon
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();

    // Get registered users from localStorage
    const registeredUsers =
      JSON.parse(localStorage.getItem("registerUsers")) || [];

    // Validate empty fields
    if (!formData.email || !formData.password) {
      setErrorIcon(<ExclamationTriangleIcon className="w-4 h-4" />);
      setFormError("All fields are required");
      enqueueSnackbar("All fields are required", { variant: "error" });
      return;
    }

    // Check if the user exists
    const filterUser = registeredUsers.filter(
      (each) => each.email === formData.email
    );
    if (filterUser.length === 0) {
      setErrorIcon(<ExclamationTriangleIcon className="w-4 h-4" />);
      setFormError("User Doesn't exists. Please register");
      enqueueSnackbar("User Doesn't exists. Please register", { variant: "error" });
      return;
    }

    // Validate password
    if (filterUser[0].password !== formData.password) {
      setErrorIcon(<ExclamationTriangleIcon className="w-4 h-4" />);
      setFormError("Incorrect Password");
      enqueueSnackbar("Incorrect Password", { variant: "error" });
      return;
    }

    // Successful login
    setFormError("");
    setErrorIcon("");
    enqueueSnackbar("User LogIn Successfully", { variant: "success" });
    setLogin(true); // Update context login state
    localStorage.setItem("setLogin", JSON.stringify(true)); // Persist login in localStorage

    navigate("/"); // Redirect to home page
    console.log(formData); // Optional: debug
  };

  return (
    <>
      <div className="flex flex-col h-screen">
        {/* Navbar */}
        <Navbar textColor="text-black" />

        {/* Form container */}
        <div className="flex items-center justify-center flex-1 px-4">
          <form
            onSubmit={handleSubmit}
            className="bg-[#F24445] w-full sm:w-96 md:w-[420px] flex flex-col text-white rounded-2xl shadow-lg py-10 px-8"
          >
            {/* Title */}
            <p className="mb-6 text-3xl font-bold tracking-wide text-center">
              Log In
            </p>

            {/* Email input */}
            <div className="flex items-center gap-3 px-3 py-2 mb-2 rounded-lg">
              <EnvelopeClosedIcon className="w-5 h-5" />
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

            {/* Password input */}
            <div className="flex items-center gap-3 px-3 py-2 mb-2 rounded-lg">
              <LockClosedIcon className="w-5 h-5" />
              <TextField.Root
                className="flex-1"
                radius="rounded"
                onChange={handleChange}
                name="password"
                placeholder="Enter password"
                type="password"
                style={{ backgroundColor: "white" }}
              />
            </div>

            {/* Display error if any */}
            {formError && (
              <div className="flex items-center gap-2 mb-3 ml-4 text-sm">
                <ExclamationTriangleIcon className="w-4 h-4" />
                <p>{formError}</p>
              </div>
            )}

            {/* Submit button */}
            <div className="flex justify-center">
              <Button
                style={{
                  padding: "0px 20px",
                  backgroundColor: "white",
                  color: "black",
                }}
                type="submit"
              >
                LogIn
              </Button>
            </div>

            {/* Register link */}
            <p className="mt-6 text-sm text-center">
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
