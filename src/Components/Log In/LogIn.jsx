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
import "./login.css"

function LogIn() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [formError, setFormError] = useState(null);
  const [erroricon, setErrorIcon] = useState(null);
    const navigate = useNavigate()

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
      setFormError("All feilds are required");
      enqueueSnackbar("All feilds are required", { variant: "error" });
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
      return
    }

    setFormError("");
    setErrorIcon("");
    enqueueSnackbar("User LogIn Successfully", { variant: "success" });
    setLogin(true)
        localStorage.setItem("setLogin",JSON.stringify(true))

    navigate("/")
    console.log(formData);
  };

  return (
    <>
    <div className="h-screen">
      <Navbar textColor="text-black"/>
      <div className="flex justify-center flex-col items-center mt-30 ">
        <form
          action=""
          className="w-11/12 sm:w-96 md:w-fit flex flex-col rounded-xl shadow shadow-gray-800 py-10 px-7 bg-cyan-200/95 justify-center "
          onSubmit={handleSubmit}
        >
          <div>
            <p className="text-2xl mb-2 text-center">LogIn Here,</p>
          </div>

          <div className="flex items-center gap-2">
            <EnvelopeClosedIcon className="w-5 h-5" />
            <TextField.Root
              className=" my-2 w-70 border"
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
              className=" my-2 w-70 border"
              radius="rounded"
              onChange={handleChange}
              name="password"
              placeholder="Enter Password"
              type="password"
            />
          </div>

          <div className="flex items-center gap-1 text-rose-500 ms-1">
            <p className="">{erroricon}</p>
            <p className="font-medium text-sm">{formError}</p>
          </div>
          <div
            className="flex justify-center "
            style={{ margin: "10px 0px 10px 0px" }}
          >
            <Button style={{ padding: "0px 20px" }} type="submit">
              LogIn
            </Button>
          </div>
          <div className="flex justify-center">
            <p>
              Don't Have an account?{" "}
              <Link className="text-blue-500 underline" to={"/register"}>
                Register
              </Link>
            </p>
          </div>
        </form>
      </div>
      </div>
    </>
  );
}
export default LogIn;
