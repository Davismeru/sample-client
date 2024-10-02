import { useEffect, useState } from "react";
import "../css/Nav.css";
import { RiMenu2Fill } from "react-icons/ri";
import { useLocation, Link } from "react-router-dom";
import axios from "axios";
import { base_api_uri } from "../assets/constants";

function Nav() {
  const location = useLocation();
  const [errorMessage, setErrorMessage] = useState("");

  const hideComponent =
    location.pathname == "/signin" ||
    location.pathname == "/signup" ||
    location.pathname == "/confirm_otp" ||
    errorMessage;

  const [userData, setUserData] = useState("");
  const token = sessionStorage.getItem("token");
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
    <div className={hideComponent ? "hidden" : "nav"}>
      {/* left section */}
      <Link to="/">
        <section className="left-nav">
          <img src="/user.png" alt="Logo" className="alt-logo" />
          <p>Hello, {userData?.username}</p>
        </section>
      </Link>

      {/* right section */}
      <section className="right-nav">
        {/* menubar for small screens */}
        <RiMenu2Fill className="menubar" />

        {/* nav links for larger screens */}
        <div>
          <p>Invite & earn</p>
          <p>My team</p>
          <p>Account: {userData?.balance}</p>
        </div>
      </section>
    </div>
  );
}

export default Nav;
