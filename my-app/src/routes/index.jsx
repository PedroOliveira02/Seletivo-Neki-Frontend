import React from "react";
import { Route, Routes } from "react-router-dom";
import Home from "../pages/Home";
import Login from "../pages/Login";
import Register from "../pages/Register";
import { PrivateRoutes } from "./privateRoutes";

const RoutesApp = () => {
  // const { authenticated, loading } = useContext(AuthContext);


  return (
    
     
        <Routes>
          <Route exact path="/Home" element={<PrivateRoutes> <Home /> </PrivateRoutes>} />
          <Route path="/" element={<Login />} />
          <Route exact path="/Register" element={<Register />} />
          <Route path="*" element={<Login />} />
        </Routes>
      
    
  );
};

export default RoutesApp;