import React from 'react';
import SideBar from '../sidebar';

const ProgramDetail = (props) => {
    return (
    <React.Fragment>
        <div className="py-4 border-bottom d-flex justify-content-between">
            <h2>Classes, camps, events and location rentals</h2>
            <div className="d-flex align-items-center">
                <h6 className="font-weight-light m-0">Last update: Jens Molbak on 1 Mar’18</h6>
                <a href="javascript:;" className="mr-1"><i className="icon-menu mr-2 ml-5"></i> Menu</a>
            </div>
        </div>
        <div className="d-flex h-100">
            <SideBar url={props.url} type={'Programs'}/>
            {props.children}
        </div>
    </React.Fragment>
    )
}

export default ProgramDetail;