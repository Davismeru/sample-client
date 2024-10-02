import React, { useEffect, useState } from "react";
import Logistics from "../components/Logistics";
import axios from "axios";
import { base_api_uri } from "../assets/constants";
import ErrorComponent from "../components/ErrorComponent";
import { AuthContext } from "../assets/constants";
import CheckIn from "../components/CheckIn";
import "../css/Home.css";

function Home() {
  const token = sessionStorage.getItem("token");

  const [errorMessage, setErrorMessage] = useState("");
  const [userData, setUserData] = useState("");
  useEffect(() => {
    axios
      .post(`${base_api_uri}/checkAuth`, {
        token: token,
      })
      .then((res) => {
        if (res?.data?.error) {
          setErrorMessage(res.data.error);
        } else {
          setErrorMessage("");
          setUserData(res?.data);
        }
      });
  }, []);
  return (
    <AuthContext.Provider value={{ errorMessage, userData }}>
      <div className="home-container">
        {!errorMessage && (
          <main>
            {userData && <CheckIn />}
            <Logistics />
          </main>
        )}

        {errorMessage && <ErrorComponent />}
      </div>
    </AuthContext.Provider>
  );
}

export default Home;
