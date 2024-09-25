import { useEffect, useState } from "react";
import "../css/ConfirmOTP.css";
import axios from "axios";
import { base_api_uri } from "../assets/constants";
import { useNavigate } from "react-router-dom";

function ConfirmOTP() {
  const [otp, setOtp] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  // get auth credentials from local storage
  const userData = JSON.parse(localStorage.getItem("userData"));

  const navigate = useNavigate();
  const handleSignUp = async (e) => {
    e.preventDefault();
    await axios
      .post(`${base_api_uri}/verify_otp`, {
        phone_no: userData.phone_no,
        username: userData.username,
        password: userData.password,
        otp: otp,
      })
      .then((res) => {
        if (res.data.error) {
          setErrorMessage(res.data.error);
        } else {
          localStorage.removeItem("userData");
          navigate("/signin");
        }
      });
  };

  useEffect(() => {
    axios.post(`${base_api_uri}/verify_otp`, {
      phone_no: userData.phone_no,
    });
  }, []);

  return (
    <div className="otp-container">
      {/* logo section */}
      <img src="./logo.png" alt="Logo" className="otp-logo" />
      <p className="my-5">
        Enter the verification code sent to{"  "}
        <span className="text-blue-500 font-bold">
          {userData.phone_no}
        </span>{" "}
      </p>
      {/* confirm otp form */}
      <form className="otp-form">
        <input
          type="text"
          placeholder="Enter OTP"
          onChange={(e) => setOtp(e.target.value)}
        />
        <button className="button-1" onClick={handleSignUp}>
          Verify & Proceed
        </button>

        {/* error message */}
        {errorMessage && <p className="text-red-500">{errorMessage}</p>}
      </form>
    </div>
  );
}

export default ConfirmOTP;
