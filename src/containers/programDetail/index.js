import React from 'react';
import SideBar from '../sidebar';

const ProgramDetail = (props) => {
    return (
    <React.Fragment>
        <div className="d-flex h-100">
            <SideBar url={props.url} type={'Programs'}/>
            {props.children}
        </div>
    </React.Fragment>
    )
}

export default ProgramDetail;