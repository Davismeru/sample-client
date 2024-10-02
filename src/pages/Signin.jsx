import React, { useState } from "react";
import "../css/Signin.css";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { base_api_uri } from "../assets/constants";

function Signin() {
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  // sign in function
  const handleSignin = (e) => {
    e.preventDefault();
    setLoading(true);
    axios
      .post(`${base_api_uri}/sign_in`, {
        phone_no: phone,
        password: password,
      })
      .then((res) => {
        if (res?.data?.error) {
          setErrorMessage(res?.data?.error);
          setLoading(false);
        } else {
          sessionStorage.setItem("token", res?.data);
          setErrorMessage("");
          setLoading(false);
          navigate("/");
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <div className="signin-container">
      {/* logo section */}
      <div className="logo">
        <img src="/logo.png" alt="Logo" />
      </div>
      <p className="text-gray-400 font-semibold">Login to your account</p>
      <form className="">
        {/* form fields */}
        <div className="form-fields">
          <input
            type="text"
            placeholder="Phone Number"
            onChange={(e) => setPhone(`+254${e.target.value.slice(-9)}`)}
          />
          <input
            type="password"
            placeholder="Password"
            onChange={(e) => setPassword(e.target.value)}
          />

          {/* next button */}
          <section>
            <button type="submit" className="button-1" onClick={handleSignin}>
              {loading ? "Loading..." : "Sign in"}
            </button>

            {/* show error messages */}
            {errorMessage && (
              <p className="text-red-500 text-center">{errorMessage}</p>
            )}

            {/*  sign in link */}
            <p className="text-center mt-3">
              Dont have an account yet?{" "}
              <Link to="/signup" className="text-blue-500">
                Sign up
              </Link>
            </p>
          </section>
        </div>
      </form>
    </div>
  );
}

export default Signin;
