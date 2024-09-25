import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Signup from "./pages/Signup";
import Signin from "./pages/Signin";
import Home from "./pages/Home";
import Nav from "./components/Nav";
import Packages from "./pages/Packages";
import ConfirmOTP from "./pages/ConfirmOTP";

function App() {
  return (
    <div className="md:bg-blue-100">
      <Router>
        <nav>
          <Nav />
        </nav>
        {/* routes */}
        <Routes>
          <Route path="/" Component={Home} />
          <Route path="/signup" Component={Signup} />
          <Route path="/signin" Component={Signin} />
          <Route path="/packages" Component={Packages} />
          <Route path="/confirm_otp" Component={ConfirmOTP} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
