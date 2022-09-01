import React,{ useEffect} from "react";
import { useFormik } from "formik";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "../asserts/login.scss";
import { addJWT, getJWT } from "../dataSlice";
import { useDispatch, useSelector } from "react-redux";
import Cookies from "js-cookie";

const validate = (values) => {
  const errors = {};
  if (!values.username) {
    errors.name = "Required";
  } 

  if (!values.password) {
    errors.password = "Required";
  }
  //   else if (values.password.length < 5) {
  //     errors.password = "Must be more than 5 characters long";
  //   }
  return errors;
};

const LoginPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch()
  const jwtData = useSelector(getJWT)

useEffect(() => {
  if(jwtData){
    navigate('/')
  }
}, [jwtData])



  const formik = useFormik({
    initialValues: {
      username: "",
      password: "",
    },
    validate,
    onSubmit: (values) => {
      // alert(JSON.stringify(values, null, 2));

      if (values) {
        const variables = {
          identifier: values.username,
          password: values.password,
        };

        axios
          .post(
            "https://creato-api.herokuapp.com/api/auth/local",
            variables
          )
          .then(function (response) {
            console.log(response);
            console.log(response.data.jwt);
            dispatch(addJWT(response.data.jwt))
            Cookies.set("user", response.data.jwt, { expires: 1 });
          })
          .catch(function (error) {
            console.log(error);
          });
      }
    },
  });
  return (
    <form onSubmit={formik.handleSubmit} className="login-page-container">
      <h1>Account Login</h1>

     
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
          Don't have an account yet ?
          <span onClick={() => navigate("/register")}> Sign up </span>
        </p>
        <button type="submit">Submit</button>
      </div>
    </form>
  );
};

export default LoginPage;
