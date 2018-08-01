import React from 'react';

const ProgramListPage = () => {
    return (
        <div className="form-group search-input-group search mb-0">
            <label htmlFor="inputDropdown1" className="sr-only">Search Input</label>
            <input id="inputDropdown1" type="search" aria-describedby="emailHelp" placeholder="Search State/Country/City" className="form-control"/><small id="emailHelp" className="sr-only">We'll never share your email with anyone else.</small>
        </div>
    )
}

export default ProgramListPage;