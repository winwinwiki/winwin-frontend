import React from 'react';
import './applied-filters.css';

const AppliedFilters = () => {
    return (
        <div className="applied-filters col align-items-center d-flex">
            <span className="badge badge-pill badge-secondary">Arts &amp; Culture (A20) <a href="javascript:;" className=""><i className="icon-close"></i></a></span>
            <span className="badge badge-pill badge-secondary">Allison Zimmerman  <a href="javascript:;" className=""><i className="icon-close"></i></a></span>
            <span className="badge badge-pill badge-secondary">Basic Human Need - Opportunity - All  <a href="javascript:;" className=""><i className="icon-close"></i></a></span>
            <a href="javascript:;" className="">+ 2 More</a>
        </div>
    )
}

export default AppliedFilters;