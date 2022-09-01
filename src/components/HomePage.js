import Cookies from "js-cookie";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import "../asserts/home.scss";
import { logOut, getJWT } from "../dataSlice";

const HomePage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const jwtData = useSelector(getJWT);

  const handleLogout = () => {
    dispatch(logOut(null));
    Cookies.remove("user");
    // if ((jwtData === null)) {
    //   console.log("jwt",jwtData)
    //   navigate("/login");
    // }
  };

  useEffect(() => {
    console.log("jwt", jwtData);
    if (jwtData === null) {
      navigate("/login");
    }
  }, [jwtData]);

  return (
    <div className="home-page-container">
      <h1>Congragulations! you logged in.</h1>
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
};

export default HomePage;
