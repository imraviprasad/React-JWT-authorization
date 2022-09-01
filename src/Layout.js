import Cookies from "js-cookie";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Header from "./components/Header";
import HomePage from "./components/HomePage";
import LoginPage from "./components/LoginPage";
import RegistrationPage from "./components/RegistrationPage";
import { addJWT, getJWT } from "./dataSlice";

const Layout = () => {
  const dispatch = useDispatch();
  const jwtData = useSelector(getJWT);
  const userJwt = Cookies.get("user");

  useEffect(() => {
    if (userJwt) {
      dispatch(addJWT(userJwt));
    }
  }, []);

  return (
    <div>
      {/* <Header /> */}
      <Router>
        <Routes>
          <Route path="/register" element={<RegistrationPage />} />
          <Route
            path="/login"
            element={jwtData ? <Navigate replace to={"/"} /> : <LoginPage />}
          />
          <Route
            path="/"
            element={
              jwtData ? <HomePage /> : <Navigate replace to={"/login"} />
            }
          />
          <Route path="*" element={<LoginPage />} />
        </Routes>
      </Router>
    </div>
  );
};

export default Layout;
