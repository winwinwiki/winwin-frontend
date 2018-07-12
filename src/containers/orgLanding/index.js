import React from 'react';
import Header from '../header';
import SectionHeader from '../section-header/';

const OrgLanding = (props) => {
    return (
    <div className="d-flex flex-column h-100">
        <Header/>
        <main role="main" className="dashboard-container">
            <SectionHeader/>
            {props.children}
      </main>
    </div>
    )
}

export default OrgLanding;