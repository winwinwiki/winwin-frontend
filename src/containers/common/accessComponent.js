import React from "react";

const AccessComponent = props => {
  return (
    <React.Fragment>
      {props.access.includes("all") ||
      (props.access.includes("data-seeder") && props.role === "data-seeder") ||
      (props.access.includes("admin") && props.role === "admin")
        ? props.children
        : null}
    </React.Fragment>
  );
};

export default AccessComponent;
