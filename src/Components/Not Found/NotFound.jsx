import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../Context/context";
import { useNavigate } from "react-router-dom";

function NotFound() {
  const navigate = useNavigate();
  const { login } = useContext(AuthContext);
  
  useEffect(()=>{
    if (!login) {
    navigate("/login");
  }
  },[])
  if(!login){
    return null
  }
  return (
    <h1>
      Lorem ipsum dolor sit amet consectetur adipisicing elit. Explicabo nobis,
      saepe eveniet qui dicta quaerat! Dicta, blanditiis voluptatem cumque
      obcaecati sunt esse mollitia dolore officiis hic, dolorem itaque
      cupiditate excepturi.dfdf
    </h1>
  );
}
export default NotFound;
