import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import { Theme } from "@radix-ui/themes";
import { SnackbarProvider } from "notistack";
import { MyContext } from "./Components/Context/context.jsx";
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";


createRoot(document.getElementById("root")).render(
  <MyContext>
    <SnackbarProvider>
  <Theme>
    <App />
  </Theme>
  </SnackbarProvider>
  </MyContext>
);
