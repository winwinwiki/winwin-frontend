import React from 'react';
import './home.css';
import Login from '../auth/login';

const Home = (props) => {
    return (
    <div className="d-flex flex-column h-100">
      <div className="main-content d-flex flex-grow-1">
        <main className="section-login p-3 flex-fill d-flex align-items-center">
          <div className="login-container d-flex px-4">
            <div className="card card-login align-items-center">
              <div className="my-5"><img src="../images/cisco-logo.svg" alt="cisco logo" className="mb-2"/></div>
               {props.children}
            </div>
            <div className="login-text">
              <h1>Changing the way the world finds opportunities and solves problems</h1>
              <p className="mt-5">Some supporting text would be good to have here.</p>
            </div>
          </div>
        </main>
      </div>
    </div>
    )
}

export default Home;