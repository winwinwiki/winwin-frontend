import React from 'react';
import SideBar from '../sidebar/programSidebar';

const ProgramDetail = (props) => {
    return (
        <React.Fragment>
            <div className="d-flex h-100">
                <SideBar match={props.match} history={props.history} type={'Programs'} />
                {props.children}
            </div>
        </React.Fragment>
    )
}

export default ProgramDetail;