import React, { Fragment } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { Link } from "react-router-dom";
import { logoutAction } from "../../actions/auth/loginAction";
import { publishToKibanaAction } from "../../actions/auth/publishToKibanaAction";
import Can from "../Can";
import { REACT_APP_KIBANA_DASHBOARD_URL } from "../../buildConfig/apiConfig";
import { PopupModal } from "../ui/popupModal";
import { toast } from "react-toastify";
import NotificationToaster from "../ui/notificationToaster";

const Header = props => {
  const { session } = props;
  let userInfo = session && session.user ? session.user : {};
  return (
    <Fragment>
      <NotificationToaster />
      <nav className="navbar main-nav navbar-dark bg-dark navbar-expand-md">
        <div className="container">
          <Link to="/" className="navbar-brand">
            <img
              src="/images/winwin-logo-white.svg"
              alt="WinWin logo"
              height="30"
              className="mb-2"
            />
          </Link>
          <div className="navbar-nav-scroll">
            <ul className="navbar-nav mr-auto">
              <li className="nav-item mx-4">
                <a href="javascript:void(0);" className="nav-link">
                  Explore<span className="sr-only">(current)</span>
                </a>
              </li>
              <li className="nav-item mx-4">
                <a href="javascript:void(0);" className="nav-link">
                  Inspirations
                </a>
              </li>
              <li className="nav-item mx-4">
                <a href="javascript:void(0);" className="nav-link">
                  Raves &amp; Rants
                </a>
              </li>
              <li className="nav-item mx-4">
                <a href="javascript:void(0);" className="nav-link">
                  Expert Spotlight
                </a>
              </li>
            </ul>
          </div>
          <div>
            <ul className="navbar-nav">
              <li className="nav-item dropdown">
                <a
                  href="javascript:void(0);"
                  id="navbarDropdownMenuLink"
                  data-toggle="dropdown"
                  aria-haspopup="true"
                  aria-expanded="false"
                  className="nav-link dropdown-toggle active"
                >
                  {userInfo.userDisplayName}
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
                    perform="kibana:publish"
                    yes={() => (
                      <span
                        className="dropdown-item cursor-pointer"
                        data-toggle="modal"
                        data-target="#confirmationModal"
                      >
                        Publish To Kibana
                      </span>
                    )}
                  />
                  <hr/>
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
                    href="javascript:void(0);"
                    className="dropdown-item"
                    onClick={() => handleLogout (props)}
                  >
                    Logout
                  </a>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </nav>
      <PopupModal
        modalid="confirmationModal"
        modaltitle="Alert!"
        modalcontent={`Are you sure you want to sync with Kibana ?`}
        primarybuttontext="Yes"
        secondarybuttontext="Cancel"
        handleDelete={() => handlePublish(props)}
      />
    </Fragment>
  );
};

const message = () => (
  <Fragment>
    <div>Please wait while the sync is in progress.</div>
    <div>We will send you a notification on your registered slack channel.</div>
  </Fragment>
);

const handlePublish = props => {
  toast.info(message(), {
    position: "top-right",
    autoClose: 5000,
    hideProgressBar: true,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true
  });
  return props.publishToKibanaAction();
};

const handleLogout = props => {
  props.history.entries = [];
  props.history.index = -1;
  props.logoutAction();
}

const mapStateToProps = state => ({
  session: state.session
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      logoutAction,
      publishToKibanaAction
    },
    dispatch
  );

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Header);
