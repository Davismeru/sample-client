import React, { useContext, useEffect, useState, useRef } from "react";
import "../css/CheckIn.css";
import { FcCheckmark, FcClock } from "react-icons/fc";
import axios from "axios";
import { AuthContext, base_api_uri } from "../assets/constants";

function CheckIn() {
  const { userData } = useContext(AuthContext);
  const phone_no = userData?.phone_no;

  const checkInDetails = JSON.parse(localStorage.getItem("checkInDetails"));
  const initialTimeDiffInSecs = checkInDetails
    ? Math.floor(checkInDetails.timeDiff / 1000)
    : 0;

  const [timer, setTimer] = useState(initialTimeDiffInSecs); // Timer state
  const [timeFomart, setTimeFomart] = useState("");
  const diffFromLocal = JSON.parse(localStorage.getItem("timeDiff")); // Days checked
  const intervalRef = useRef(null); // Using useRef to store interval id

  useEffect(() => {
    // Fetch check-in details from the server when component mounts
    axios
      .patch(`${base_api_uri}/check_in`, {
        phone_no: phone_no,
      })
      .then((res) => {
        // Store the fetched details in localStorage
        localStorage.setItem("checkInDetails", JSON.stringify(res.data));

        // Set the initial time difference in seconds
        const timeDiffInSecs = Math.floor(res.data.timeDiff / 1000);
        setTimer(timeDiffInSecs);

        // Clear any existing interval to prevent multiple intervals
        if (intervalRef.current) {
          clearInterval(intervalRef.current);
        }

        // Set up a single interval to decrease the timer every second
        intervalRef.current = setInterval(() => {
          setTimer((prevTime) => {
            if (prevTime > 0) {
              return prevTime - 1;
            } else {
              clearInterval(intervalRef.current); // Clear interval if time reaches 0
              return 0;
            }
          });
        }, 1000);
      })
      .catch((error) => {
        console.error("Error fetching check-in details:", error);
      });

    // Clean up interval when component unmounts
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [phone_no]); // Ensure this effect runs only when phone_no changes

  return (
    <div className="checkin-container">
      <div>
        <h1 className="welcome-note">
          Welcome back to <br /> <span>Company name</span>
        </h1>
        <h1>
          Next withdrawal in:{" "}
          <span>
            {Math.floor(timer / 3600)}h : {Math.floor((timer % 3600) / 60)}m :{" "}
            {timer % 60}s
          </span>
        </h1>

        <div className="days-list">
          {Array.from({ length: 20 }).map((_, index) => (
            <section className="checked" key={index}>
              <p className="icon">
                {index < diffFromLocal?.daysChecked ? (
                  <FcCheckmark />
                ) : (
                  <FcClock />
                )}
              </p>
              {index + 1}
            </section>
          ))}
        </div>

        <button className="button-1 disabled:bg-gray-600">Check in</button>
      </div>
    </div>
  );
}

export default CheckIn;
