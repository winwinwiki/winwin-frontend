import React from 'react';
import './sidebar.css';
import { Link } from 'react-router-dom';

const SideBar = (props) => {

    return (
        <div id="mySidenav" className="sidenav">
            <a href="javascript:void(0)" className="closebtn" onclick="closeNav()">&times;</a>
            <Link to={`${props.url.url}`}>Basic Info</Link>
            <Link to={`${props.url.url}/data-sets`}>Data Sets</Link>
            <Link to={`${props.url.url}/data-sets`}>Regions Served </Link>
            <Link to={`${props.url.url}/spi-tags`}>Spi Tag</Link>
            <Link to={`${props.url.url}/sdg-tags`}>Sdg Tag</Link>
        </div>
    )
}

export default SideBar;

