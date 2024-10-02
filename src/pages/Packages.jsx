import axios from "axios";
import "../css/Packages.css";
import { FcMoneyTransfer } from "react-icons/fc";
import { useEffect, useState } from "react";
import { base_api_uri } from "../assets/constants";
import PayPopUp from "../components/PayPopUp";

function Packages() {
  const [packages, setPackages] = useState(null);
  const [hidePopup, setHidePopup] = useState(true);
  const [selectedPackage, setSelectedPackage] = useState({});

  // upgrade function
  const handleUpgrade = (data) => {
    setHidePopup(false);
    setSelectedPackage(data);
  };
  useEffect(() => {
    axios.get(`${base_api_uri}/packages`).then((res) => {
      setPackages(Object.values(res?.data[0]));
    });
  }, []);
  return (
    <div className="packages-container">
      {/* paypop up section */}
      <section className={hidePopup ? "hide-popup" : "pay-popup"}>
        <PayPopUp
          selectedPackage={selectedPackage}
          setHidePopup={setHidePopup}
        />
      </section>
      {/* package plans */}
      <div className="package-plans">
        <h1>Select your package</h1>
        {}
        <section>
          {packages?.map((item, i) => {
            return (
              <div className="package-card" key={i}>
                <h2>{item?.name}</h2>

                {/* package icon */}
                <FcMoneyTransfer className="package-icon" />

                {/* Price */}
                <h3 className="package-price">
                  <span>KES {item?.price}</span>
                </h3>

                {/* package perks */}
                <ul>
                  <li>Lorem ipsum dolor sit amet.</li>
                  <li>Lorem ipsum dolor sit amet.</li>
                  <li>Lorem ipsum dolor sit amet.</li>
                  <li>Lorem ipsum dolor sit amet.</li>
                </ul>

                {/* upgrade button */}
                {item?.price > 0 && (
                  <button onClick={() => handleUpgrade(item)}>Upgrade</button>
                )}
              </div>
            );
          })}
        </section>
      </div>
    </div>
  );
}

export default Packages;
