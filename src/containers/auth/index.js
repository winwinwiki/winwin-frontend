import React from "react";
import { REACT_APP_KIBANA_DASHBOARD_URL } from "../../buildConfig/apiConfig";
import "./index.css";

const Auth = props => {
  return (
    <div className="main-content d-flex flex-column container">
      <div className="main-content d-flex flex-grow-1">
        <main className="section-login p-3 flex-fill d-flex align-items-center">
          <div className="login-container d-flex px-4">
            <div className="card card-login align-items-center">
              <div className="my-5">
                <img
                  src="../images/newimpact_logo.svg"
                  alt="NewImpact logo"
                  className="mb-2"
                />
              </div>
              {props.children}
            </div>
            <div className="login-text">
              <h1>
                Changing the way the world finds opportunities and solves problems
              </h1>
              <ul className="mt-5 pl-4">
                <li><a className="login-page" href={REACT_APP_KIBANA_DASHBOARD_URL} target="_blank" rel="noopener noreferrer">Explore</a> the Wiki Dashboard</li>
                <li><a className="login-page" href="mailto:beth.roberts@newimpact.care" target="_blank" rel="noopener noreferrer">Request</a> permission to edit wiki</li>
                <li><a className="login-page" href="http://www.newimpact.care" target="_blank" rel="noopener noreferrer">Learn</a> more about NewImpact</li>
              </ul>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Auth;
