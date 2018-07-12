import React from 'react';
import SideBar from '../sidebar';

const OrgDetail = (props) => {
    return (
    <div className="d-flex flex-column h-100">
        <SideBar url={props.url}/>
        <h1>Changing the way the world finds opportunities and solves problems in org detail</h1>
        {props.children}
    </div>
    )
}

export default OrgDetail;