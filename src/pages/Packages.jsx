import Nav from "../components/Nav";
import "../css/Packages.css";
import { FcMoneyTransfer } from "react-icons/fc";

function Packages() {
  return (
    <div className="packages-container">
      {/* package plans */}
      <div className="package-plans">
        <h1>Select your package</h1>
        <section>
          <div className="package-card">
            <h2>Level 1</h2>

            {/* package icon */}
            <FcMoneyTransfer className="package-icon" />

            {/* Price */}
            <h3 className="package-price">
              <span>Ksh 500</span> only
            </h3>

            {/* package perks */}
            <ul>
              <li>Lorem ipsum dolor sit amet.</li>
              <li>Lorem ipsum dolor sit amet.</li>
              <li>Lorem ipsum dolor sit amet.</li>
              <li>Lorem ipsum dolor sit amet.</li>
            </ul>

            {/* upgrade button */}
            <button>Upgrade</button>
          </div>

          <div className="package-card">
            <h2>Level 1</h2>

            {/* package icon */}
            <FcMoneyTransfer className="package-icon" />

            {/* Price */}
            <h3 className="package-price">
              <span>Ksh 500</span> only
            </h3>

            {/* package perks */}
            <ul>
              <li>Lorem ipsum dolor sit amet.</li>
              <li>Lorem ipsum dolor sit amet.</li>
              <li>Lorem ipsum dolor sit amet.</li>
              <li>Lorem ipsum dolor sit amet.</li>
            </ul>

            {/* upgrade button */}
            <button>Upgrade</button>
          </div>

          <div className="package-card">
            <h2>Level 1</h2>

            {/* package icon */}
            <FcMoneyTransfer className="package-icon" />

            {/* Price */}
            <h3 className="package-price">
              <span>Ksh 500</span> only
            </h3>

            {/* package perks */}
            <ul>
              <li>Lorem ipsum dolor sit amet.</li>
              <li>Lorem ipsum dolor sit amet.</li>
              <li>Lorem ipsum dolor sit amet.</li>
              <li>Lorem ipsum dolor sit amet.</li>
            </ul>

            {/* upgrade button */}
            <button>Upgrade</button>
          </div>

          <div className="package-card">
            <h2>Level 1</h2>

            {/* package icon */}
            <FcMoneyTransfer className="package-icon" />

            {/* Price */}
            <h3 className="package-price">
              <span>Ksh 500</span> only
            </h3>

            {/* package perks */}
            <ul>
              <li>Lorem ipsum dolor sit amet.</li>
              <li>Lorem ipsum dolor sit amet.</li>
              <li>Lorem ipsum dolor sit amet.</li>
              <li>Lorem ipsum dolor sit amet.</li>
            </ul>

            {/* upgrade button */}
            <button>Upgrade</button>
          </div>
        </section>
      </div>
    </div>
  );
}

export default Packages;
