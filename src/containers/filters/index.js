import React from 'react';
import './filters.css';
import ButtonGroup from '../button-group/';
import Search from '../search/';

const Filters = () => {
    return (
    <div className="d-flex align-content-center border-bottom py-3">
        <Search/>
        <ButtonGroup/>
        <div className="ml-auto">
            <a href="javascript:;" className="btn btn-link"><i className="icon-add mr-1"></i> Create</a>
            <a href="javascript:;" className="btn btn-link pr-0"><i className="icon-upload mr-1"></i> Upload</a>
        </div>
    </div>
    )
}

export default Filters;