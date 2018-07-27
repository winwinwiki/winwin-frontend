import React from 'react';
import './sidebar.css';
import { Link } from 'react-router-dom';

const SideBar = (props) => {

    return (
        <div id="mySidenav" className="sidenav d-flex flex-column">
            <ul className="list-group list-group-flush pr-3">
                <li className="list-group-item"><a href="javascript:;">Basic Information</a></li>
                <li className="list-group-item"><a href="javascript:;" className="active" data-toggle="collapse" href="#collapseExample" role="button" aria-expanded="false" aria-controls="collapseExample">Organization Details</a>
                    <div className="collapse" id="collapseExample">
                        <ul className="subnav">
                            <li><Link className="active" to={`${props.url.url}/data-sets`}><i></i>Data Sets</Link></li>
                            <li><Link to={`${props.url.url}/resources`}><i></i>Resources</Link></li>
                            <li><Link to={`${props.url.url}/regions-served`}><i></i>Regions Served </Link></li>
                            <li><Link to={`${props.url.url}/spi-tags`}><i></i>Spi Tag</Link></li>
                            <li><Link to={`${props.url.url}/sdg-tags`}><i></i>Sdg Tag</Link></li>
                        </ul>
                    </div>
                </li>
                <li className="list-group-item"><a href="javascript:;">Programs</a></li>
            </ul>
            <div className="social-footer mt-auto">
                <ul className="d-flex flex-row justify-content-between pl-1 pr-3">
                    <li><a href="javascript:;"><i className="icon-globe"></i></a></li>
                    <li><a href="javascript:;"><i className="icon-facebook"></i></a></li>
                    <li><a href="javascript:;"><i className="icon-twitter"></i></a></li>
                    <li><a href="javascript:;"><i className="icon-linkedin"></i></a></li>
                    <li><a href="javascript:;"><i className="icon-pinterest"></i></a></li>
                </ul>
            </div>
        </div>
    )
}

export default SideBar;

