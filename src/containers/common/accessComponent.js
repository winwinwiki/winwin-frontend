import React from "react";

const AccessComponent = props => {
  return (
    <React.Fragment>
      {props.access.includes("all") ||
      (props.access.includes("DataSeeder") && props.role === "DataSeeder") ||
      (props.access.includes("Administrator") && props.role === "Administrator")
        ? props.children
        : null}
    </React.Fragment>
  );
};

export default AccessComponent;
