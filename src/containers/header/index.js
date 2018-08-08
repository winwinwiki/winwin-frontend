import React from 'react';
import './header.css';
import AccessComponent from '../common/accessComponent';

const Header = (props) => {
    return (
    <nav className="navbar fixed-top navbar-dark bg-dark navbar-expand-md">
        <div className="container"><a href="#" className="navbar-brand"><img src="/images/winwin-logo-white.svg" alt="WinWin logo" height="30" className="mb-2"/></a>
            <div className="navbar-nav-scroll">
                <ul className="navbar-nav mr-auto">
                    <li className="nav-item mx-4"><a href="javascript:;" className="nav-link">Explore<span className="sr-only">(current)</span></a></li>
                    <li className="nav-item mx-4"><a href="javascript:;" className="nav-link">Inspirations</a></li>
                    <li className="nav-item mx-4"><a href="javascript:;" className="nav-link">Raves &amp; Rants</a></li>
                    <li className="nav-item mx-4"><a href="javascript:;" className="nav-link">Expert Spotlight</a></li>
                </ul>
            </div>
            <div>
                <ul className="navbar-nav">
                    <li className="nav-item dropdown"><a href="#" id="navbarDropdownMenuLink" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" className="nav-link dropdown-toggle active">{props.userInfo.name}<img src="/images/profile-pic.png" alt="Profile Pic" width="30" className="mb-2 mx-2"/></a>
                        <div aria-labelledby="navbarDropdownMenuLink" className="dropdown-menu dropdown-menu-right">
                            <AccessComponent role={props.userInfo.role} access={['admin', 'data-seeder']}> <a href="#" className="dropdown-item">Settings</a></AccessComponent>
                            <AccessComponent role={props.userInfo.role} access={['admin']}> <a href="#" className="dropdown-item">Admin Access</a></AccessComponent>
                            <AccessComponent role={props.userInfo.role} access={['admin', 'data-seeder']}> <a href="#" className="dropdown-item">Logout</a></AccessComponent>
                        </div>
                    </li>
                </ul>
            </div>
        </div>
    </nav>
    )
}

export default Header;