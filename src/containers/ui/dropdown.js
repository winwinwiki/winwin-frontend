import React from 'react';

const Dropdown = () => {
    return (
        <div className="dropdown dropdown-with-searchbox">
            <button id="dropdownMenuButton1" type="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" className="btn btn-dropdown btn-block btn-sm">Actions</button>
            <div aria-labelledby="dropdownMenuButton1" className="dropdown-menu">
                <div className="menu-conteiner">
                    <div className="menu-section">
                        <a href="#" className="dropdown-item">Action</a>
                        <a href="#" className="dropdown-item">Another action</a>
                        <a href="#" className="dropdown-item">Something else here</a>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Dropdown;