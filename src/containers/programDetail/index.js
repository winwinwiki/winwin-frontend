import React from 'react';
import SideBar from '../sidebar';

const ProgramDetail = (props) => {
    return (
    <React.Fragment>
        <div className="py-4 border-bottom d-flex justify-content-between">
            <h2>Classes, camps, events and location rentals</h2>
        </div>
        <div className="d-flex h-100">
            <SideBar url={props.url} type={'Programs'}/>
            {props.children}
        </div>
    </React.Fragment>
    )
}

export default ProgramDetail;