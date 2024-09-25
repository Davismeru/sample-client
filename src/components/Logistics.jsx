import "../css/Logistics.css";
import { company_name } from "../assets/constants";
import { Link } from "react-router-dom";
function Logistics() {
  return (
    <div className="logistics-container">
      {/* logistic details section */}
      <div className="logistic-details">
        {/* section header */}
        <section className="logistics-header">Real-time logistics</section>

        {/* package details */}
        <section className="logistics-card card-1">
          <h1>Active Package</h1>
          <h2>Basic</h2>
          <div className="card-info">
            <h3>About packages</h3>
          </div>
        </section>

        {/* Current Balance */}
        <section className="logistics-card card-2">
          <h1>Total earnings</h1>
          <h2>Ksh 500</h2>
          <div className="card-info">
            <h3>
              Refferals: <span>Ksh 250</span>
            </h3>
            <h3>
              Investements: <span>Ksh 150</span>
            </h3>
          </div>
        </section>

        {/* upgrade package */}
        <Link to="/packages" className="w-[45%]">
          <section className="logistics-card card-3">
            <h1>Upgrade Package</h1>
            <div className="card-info">
              <h3>Current package: Basic</h3>
            </div>
          </section>
        </Link>
      </div>
    </div>
  );
}

export default Logistics;
