import React, { useState, useEffect } from "react";
import { useFormik } from "formik";
import "../asserts/registration.scss";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { addJWT, getJWT } from "../dataSlice";
import Cookies from "js-cookie";

const validate = (values) => {
  const errors = {};
  if (!values.username) {
    errors.name = "Required";
  } else if (values.username.length < 3) {
    errors.username = "Must be more than 3 characters long";
  }

  if (!values.email) {
    errors.email = "Required";
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
    errors.email = "Invalid email address";
  }

  if (!values.password) {
    errors.password = "Required";
  } else if (values.password.length < 5) {
    errors.password = "Must be more than 5 characters long";
  }
  return errors;
};

const RegistrationPage = () => {
  const [userData, setUserData] = useState({});
  let navigate = useNavigate();
  const axios = require("axios").default;
  const dispatch = useDispatch();
  const jwtData = useSelector(getJWT);

  useEffect(() => {
    if (jwtData) {
      navigate("/");
    }
  }, [jwtData]);

  const formik = useFormik({
    initialValues: {
      username: "",
      email: "",
      password: "",
    },
    validate,
    onSubmit: (values) => {
      // alert(JSON.stringify(values, null, 2));
      if (values) {
        const variables = {
          username: values.username,
          email: values.email,
          password: values.password,
        };

        axios
          .post(
            "https://creato-api.herokuapp.com/api/auth/local/register",
            variables
          )
          .then(function (response) {
            console.log(response);
            console.log(response.data.jwt);
            dispatch(addJWT(response.data.jwt));
            Cookies.set("user", response.data.jwt, { expires: 1 });
          })
          .catch(function (error) {
            console.log(error);
          });
      }
    },
  });

  return (
    <form
      onSubmit={formik.handleSubmit}
      className="registration-page-container"
    >
      <h1>Account Registration</h1>

      <div className="form-div">
        <label htmlFor="name">User Name</label>
        <input
          id="name"
          name="username"
          type="text"
          placeholder="Username"
          onChange={formik.handleChange}
          value={formik.values.username}
        />
        {formik.errors.username ? <div>{formik.errors.username}</div> : null}
      </div>

      <div className="form-div">
        <label htmlFor="email">Email Address</label>
        <input
          id="email"
          name="email"
          type="email"
          placeholder="email"
          onChange={formik.handleChange}
          value={formik.values.email}
        />
        {formik.errors.email ? <div>{formik.errors.email}</div> : null}
      </div>

      <div className="form-div">
        <label htmlFor="password">Password</label>
        <input
          id="password"
          name="password"
          type="text"
          placeholder="password"
          onChange={formik.handleChange}
          value={formik.values.password}
        />
        {formik.errors.password ? <div>{formik.errors.password}</div> : null}
      </div>

      <div className="submit-div">
        <p>
          Already have a account ?
          <span onClick={() => navigate("/login")}> Sign in </span>
        </p>
        <button type="submit">Submit</button>
      </div>
    </form>
  );
};

export default RegistrationPage;
