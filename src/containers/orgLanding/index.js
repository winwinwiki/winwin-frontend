import React from 'react';
import Header from '../header';

const OrgLanding = (props) => {
    return (
    <div className="d-flex flex-column h-100">
        <Header/>
      <div className="main-content d-flex flex-grow-1">
            {props.children}
      </div>
    </div>
    )
}

export default OrgLanding;