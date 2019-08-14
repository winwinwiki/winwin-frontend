import React from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { Link } from "react-router-dom";
import { logoutAction } from "../../actions/auth/loginAction";
import Can from "../Can";
import { REACT_APP_KIBANA_DASHBOARD_URL } from "../../buildConfig/apiConfig";

const Header = props => {
  const { session, history } = props;
  let userInfo = session && session.user ? session.user : {};
  return (
    <nav className="navbar main-nav navbar-dark bg-dark navbar-expand-md">
      <div className="container">
        <a href="#" className="navbar-brand" onClick={() => history.push("/")}>
          <img
            src="/images/winwin-logo-white.svg"
            alt="WinWin logo"
            height="30"
            className="mb-2"
          />
        </a>
        <div className="navbar-nav-scroll">
          <ul className="navbar-nav mr-auto">
            <li className="nav-item mx-4">
              <a href="javascript:;" className="nav-link">
                Explore<span className="sr-only">(current)</span>
              </a>
            </li>
            <li className="nav-item mx-4">
              <a href="javascript:;" className="nav-link">
                Inspirations
              </a>
            </li>
            <li className="nav-item mx-4">
              <a href="javascript:;" className="nav-link">
                Raves &amp; Rants
              </a>
            </li>
            <li className="nav-item mx-4">
              <a href="javascript:;" className="nav-link">
                Expert Spotlight
              </a>
            </li>
          </ul>
        </div>
        <div>
          <ul className="navbar-nav">
            <li className="nav-item dropdown">
              <a
                href="#"
                id="navbarDropdownMenuLink"
                data-toggle="dropdown"
                aria-haspopup="true"
                aria-expanded="false"
                className="nav-link dropdown-toggle active"
              >
                {userInfo.userDisplayName}
                {/* <img
                  src="/images/profile-pic.png"
                  alt="Profile Pic"
                  width="30"
                  className="mb-2 mx-2"
                /> */}
              </a>
              <div
                aria-labelledby="navbarDropdownMenuLink"
                className="dropdown-menu dropdown-menu-right"
              >
                <Can
                  role={userInfo.role}
                  perform="organizations:list"
                  yes={() => (
                    <Link to="/organizations" className="dropdown-item">
                      Organization Management
                    </Link>
                  )}
                />
                <Can
                  role={userInfo.role}
                  perform="organizations:list"
                  yes={() => (
                    <a
                      href={REACT_APP_KIBANA_DASHBOARD_URL}
                      target="_blank"
                      className="dropdown-item"
                    >
                      Wiki Dashboard (Kibana)
                    </a>
                  )}
                />
                <Can
                  role={userInfo.role}
                  perform="users:list"
                  yes={() => (
                    <Link to="/user-management" className="dropdown-item">
                      User Management
                    </Link>
                  )}
                />
                <Can
                  role={userInfo.role}
                  perform="users:getSelf"
                  yes={() => (
                    <Link
                      to={`/user-management/${encodeURIComponent(
                        userInfo.email
                      )}`}
                      className="dropdown-item"
                    >
                      My Profile
                    </Link>
                  )}
                />
                <Can
                  role={userInfo.role}
                  perform="users:changePassword"
                  yes={() => (
                    <Link to="/change-password" className="dropdown-item">
                      Change Password
                    </Link>
                  )}
                />
                <a
                  href="javascript:;"
                  className="dropdown-item"
                  onClick={props.logoutAction}
                >
                  Logout
                </a>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

const mapStateToProps = state => ({
  session: state.session
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      logoutAction
    },
    dispatch
  );

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Header);
