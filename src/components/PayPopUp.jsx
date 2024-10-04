import React, { useEffect, useState } from "react";
import "../css/PayPopUp.css";
import axios from "axios";
import { base_api_uri } from "../assets/constants";

function PayPopUp({ selectedPackage, setHidePopup }) {
  const token = sessionStorage.getItem("token");
  const [phoneNo, setPhoneNo] = useState(0);

  // close payments popup functionality
  const closePopup = (e) => {
    e.preventDefault();
    setHidePopup(true);
  };

  // stk push functionality
  const handleStk = async (e) => {
    e.preventDefault();
    const res = await axios.post(`${base_api_uri}/stk`);
    console.log(res?.data);
  };
  useEffect(() => {
    axios.post(`${base_api_uri}/checkAuth`, { token }).then((res) => {
      setPhoneNo(res?.data?.phone_no);
    });
  }, []);
  return (
    <div className="popup-container">
      {/* mpesa logo */}
      <img src="/mpesa.png" alt="mpesa logo" />
      <form>
        <h1>
          <span className="poppins-bold">KSH {selectedPackage?.price}</span>/20
          days
        </h1>
        <p>You can pay using a different number</p>
        <h2>{selectedPackage?.name}</h2>
        <input
          type="text"
          value={phoneNo}
          onChange={(e) => setPhoneNo(e.target.value)}
        />

        {/* specs */}
        <ul>
          <li>Lorem ipsum dolor sit.</li>
          <li>Lorem ipsum dolor.</li>
          <li>Lorem ipsum dolor sit.</li>
          <li>Lorem ipsum dolor.</li>
        </ul>

        <button className="button-1" onClick={(e) => handleStk(e)}>
          Confirm
        </button>
        <button onClick={(e) => closePopup(e)}>Cancel</button>
      </form>
    </div>
  );
}

export default PayPopUp;
