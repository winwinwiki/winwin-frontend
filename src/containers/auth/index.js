import React from "react";
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
                  src="../images/winwin-logo.svg"
                  alt="WinWin logo"
                  className="mb-2"
                />
              </div>
              {props.children}
            </div>
            <div className="login-text">
              <h1>
                Changing the way the world finds opportunities and solves problems
              </h1>
              <p className="mt-5">
                <ul>
                  <li><a className="login-page" href="http://wiki.winwin.care/" target="_blank" rel="noopener noreferrer">Explore</a> the Wiki Dashboard</li>
                  <li><a className="login-page" href="mailto:beth.roberts@winwin.care" target="_blank" rel="noopener noreferrer">Request</a> permission to edit wiki</li>
                  <li><a className="login-page" href="http://www.winwin.care" target="_blank" rel="noopener noreferrer">Learn</a> more about WinWin</li>
                </ul>
              </p>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Auth;
