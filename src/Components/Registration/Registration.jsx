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
import "./registration.css";

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
    <div className="h-screen">
      <Navbar textColor="text-black"/>
      <div className="flex justify-center flex-col items-center mt-20 ">
        <form
          action=""
         className="w-11/12 sm:w-96 md:w-fit flex flex-col rounded-xl shadow shadow-gray-800 py-10 px-7 bg-yellow-300/95 justify-center "
          onSubmit={handleSubmit}
        >
          <div>
            <p className="text-2xl mb-2 text-center">Register Here,</p>
          </div>

          <div className="flex items-center gap-2">
            <PersonIcon className="w-5 h-5" />
            <TextField.Root
              className=" my-2 w-70 border-0"
              radius="rounded"
              onChange={handleChange}
              name="name"
              placeholder="Enter Name"
              type="name"
            />
          </div>
          <div className="flex items-center gap-2">
            <EnvelopeClosedIcon className="w-5 h-5" />
            <TextField.Root
              className=" my-2 w-70 border-0"
              radius="rounded"
              onChange={handleChange}
              name="email"
              placeholder="Enter email"
              type="email"
            />
          </div>
          <div className="flex items-center gap-2">
            <LockClosedIcon className="w-5 h-5" />
            <TextField.Root
              className=" my-2 w-70 border-0"
              radius="rounded"
              onChange={handleChange}
              name="password"
              placeholder="Enter Password"
              type="password"
            />
          </div>
          <div className="flex items-center gap-2">
            <SewingPinIcon className=" w-5 h-5 rotate-45" />
            <TextField.Root
              className=" my-2 w-70 border-0"
              radius="rounded"
              onChange={handleChange}
              name="confirmPassword"
              placeholder="Confirm Password"
            />
          </div>
          {formError && (
            <div className="flex items-center gap-1 text-rose-500 ms-1">
              <p className="">{erroricon}</p>
              <p className="font-medium text-sm">{formError}</p>
            </div>
          )}

          <div
            className="flex justify-center "
            style={{ margin: "10px 0px 10px 0px" }}
          >
            <Button style={{ padding: "0px 20px"}} type="submit">
              Reister
            </Button>
          </div>
          <div className="flex justify-center">
            <p>
              Have an account?{" "}
              <Link className="text-blue-500 underline" to={"/login"}>
                Login
              </Link>
            </p>
          </div>
        </form>
      </div>
      </div>
    </>
  );
}
export default Registration;
