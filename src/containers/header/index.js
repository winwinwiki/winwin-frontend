import React from 'react';
import { Link } from 'react-router-dom';
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
                            <AccessComponent role={props.userInfo.role} access={['admin', 'data-seeder']}> <Link to="/organizations" className="dropdown-item">Organization Management</Link></AccessComponent>
                            <AccessComponent role={props.userInfo.role} access={['admin']}> <Link to="/user-management" className="dropdown-item">User Management</Link></AccessComponent>
                            <AccessComponent role={props.userInfo.role} access={['all']}> <Link to="/my-profile/12" className="dropdown-item">My Profile</Link></AccessComponent>
                            <AccessComponent role={props.userInfo.role} access={['all']}> <Link to="/change-password" className="dropdown-item">Change Password</Link></AccessComponent>
                            <AccessComponent role={props.userInfo.role} access={['all']}> <a href="#" className="dropdown-item">Logout</a></AccessComponent>
                        </div>
                    </li>
                </ul>
            </div>
        </div>
    </nav>
    )
}

export default Header;