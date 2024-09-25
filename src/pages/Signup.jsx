import React, { useEffect } from "react";

import "../css/Signup.css";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { base_api_uri } from "../assets/constants";
import axios from "axios";

function Signup() {
  // error states
  const [nameError, setNameError] = useState(true);
  const [phoneError, setPhoneError] = useState(true);
  const [passwordError, setPasswordError] = useState(true);

  // form input states
  const [username, setUsername] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  // loading state
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  // next button function (go to otp page if data fields are correct)
  const handleNext = async (e) => {
    e.preventDefault();
    setLoading(true);

    // check if phone number is already registered
    if (!phone) {
      setPhoneError("Phone number is required");
      setLoading(false);
    } else {
      const res = await axios.post(`${base_api_uri}/sign_up`, {
        phone_no: phone,
      });
      setLoading(false);
      if (res.data.error) {
        setPhoneError("Phone number already registered");
      } else {
        setPhoneError("");
      }
    }

    // check if passwords match
    if (!password && !confirmPassword) {
      setPasswordError("Please enter a valid passoword");
    } else {
      if (password != confirmPassword) {
        setPasswordError("Passwords do not match");
      } else {
        setPasswordError("");
      }
    }

    // check if username field is filled
    !username ? setNameError("Username is required") : setNameError("");

    if (!nameError && !phoneError && !passwordError) {
      setNameError(false);
      setPhoneError(false);
      setPasswordError(false);
      localStorage.setItem(
        "userData",
        JSON.stringify({
          username: username,
          phone_no: phone,
          password: password,
        })
      );
      navigate("/confirm_otp");
    }
  };
  return (
    <div className="signup-container">
      {/* logo section */}
      <div className="logo">
        <img src="/logo.png" alt="Logo" />
      </div>
      <p className="text-gray-400 font-semibold">Create account!!</p>
      <form>
        {/* form fields */}
        <div className="form-fields">
          <input
            type="text"
            placeholder="Username"
            onChange={(e) => setUsername(e.target.value)}
          />
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
          <input
            type="password"
            placeholder="Confirm Password"
            onChange={(e) => setConfirmPassword(e.target.value)}
          />

          {/* next button */}
          <section>
            <button type="submit" className="button-1" onClick={handleNext}>
              {loading ? "Checking..." : "Next"}
            </button>
            {/* error messages */}
            {nameError && (
              <p className="text-red-500 text-center">{nameError}</p>
            )}
            {passwordError && (
              <p className="text-red-500 text-center">{passwordError}</p>
            )}
            {phoneError && (
              <p className="text-red-500 text-center">{phoneError}</p>
            )}

            {/*  sign in link */}
            <p className="text-center mt-3">
              Already have an account?{" "}
              <Link to="/signin" className="text-blue-400">
                {" "}
                Sign in
              </Link>
            </p>
          </section>
        </div>
      </form>
    </div>
  );
}

export default Signup;
