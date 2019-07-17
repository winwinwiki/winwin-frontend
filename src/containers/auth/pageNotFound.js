import React from "react";
import { Link } from "react-router-dom";
const PageNotFound = () => (
  <div>
    <h1>Page Not Found (404 Error)</h1>
    <center>
      <Link to="/" className="cursor-pointer" style={{ color: "blue" }}>
        Return to Home Page
      </Link>
    </center>
  </div>
);
export default PageNotFound;
