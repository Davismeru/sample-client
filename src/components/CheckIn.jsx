import React, { useContext, useEffect, useState, useRef } from "react";
import "../css/CheckIn.css";
import { FcCheckmark, FcClock } from "react-icons/fc";
import axios from "axios";
import { AuthContext, base_api_uri } from "../assets/constants";

function CheckIn() {
  const { userData } = useContext(AuthContext);
  const phone_no = userData?.phone_no;

  // Fetch initial time difference from localStorage if available
  const checkInDetails = JSON.parse(localStorage.getItem("checkInDetails"));
  const initialTimeDiffInSecs = checkInDetails
    ? Math.floor(checkInDetails.timeDiff / 1000)
    : 0;

  const [timer, setTimer] = useState(initialTimeDiffInSecs); // Timer state
  const [canCheckIn, setCanCheckIn] = useState(timer <= 0); // Disable button if timer is running
  const diffFromLocal = JSON.parse(localStorage.getItem("timeDiff")); // Days checked
  const intervalRef = useRef(null); // Using useRef to store interval id

  // Function to fetch check-in details (used both on page load and button click)
  const fetchCheckInDetails = () => {
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
        setCanCheckIn(timeDiffInSecs <= 0); // Disable button if timer is running

        // Clear any existing interval
        if (intervalRef.current) {
          clearInterval(intervalRef.current);
        }

        // Set up the interval to decrease the timer every second
        if (timeDiffInSecs > 0) {
          intervalRef.current = setInterval(() => {
            setTimer((prevTime) => {
              if (prevTime > 0) {
                return prevTime - 1;
              } else {
                clearInterval(intervalRef.current); // Clear interval if time reaches 0
                setCanCheckIn(true); // Enable the button
                return 0;
              }
            });
          }, 1000);
        }
      })
      .catch((error) => {
        console.error("Error fetching check-in details:", error);
      });
  };

  // Only fetch the details on page load if the timer is greater than 0
  useEffect(() => {
    if (timer > 0) {
      fetchCheckInDetails();
    }
  }, [phone_no]); // This effect runs only when phone_no changes or on component mount

  // Clean up interval when component unmounts
  useEffect(() => {
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, []);

  // Handle button click to fetch check-in details when timer is 0
  const handleCheckIn = () => {
    if (timer <= 0) {
      fetchCheckInDetails();
    }
  };

  return (
    <div className="checkin-container">
      <div>
        <h1 className="welcome-note">
          Welcome back to <br /> <span>Company name</span>
        </h1>
        <h1>
          Next withdrawal in:{" "}
          <span>
            {timer > 0
              ? `${Math.floor(timer / 3600)}h : ${Math.floor(
                  (timer % 3600) / 60
                )}m : ${timer % 60}s`
              : "Now"}
          </span>
        </h1>

        <div className="days-list">
          {Array.from({ length: 20 }).map((_, index) => (
            <section className="checked" key={index}>
              <p className="icon">
                {index < checkInDetails?.daysChecked ? (
                  <FcCheckmark />
                ) : (
                  <FcClock />
                )}
              </p>
              {index + 1}
            </section>
          ))}
        </div>

        <button
          className={`button-1 ${canCheckIn ? "" : "disabled:bg-gray-600"}`}
          onClick={handleCheckIn}
          disabled={!canCheckIn} // Disable button when timer is running
        >
          {canCheckIn ? "Check in" : "Come back later"}
        </button>
      </div>
    </div>
  );
}

export default CheckIn;
