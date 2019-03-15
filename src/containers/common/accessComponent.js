import React from "react";

const AccessComponent = props => {
  return (
    <React.Fragment>
      {props.access.includes("all") ||
      (props.access.includes("data-seeder") && props.role === "data-seeder") ||
      (props.access.includes("Administrator") && props.role === "Administrator")
        ? props.children
        : null}
    </React.Fragment>
  );
};

export default AccessComponent;
