import React from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import LoadingSpinner from "../common/loadingSpinner";
import FooterComponent from "../footer";
import { loadUserFromStorageAction } from "../../actions/common/localStorageAction";
import { loadReCaptcha } from "react-recaptcha-google";
import KibanaLanding from "../auth/login/kibana";

class App extends React.Component {
  componentDidMount() {
    loadReCaptcha();
    // if (typeof window !== "undefined") {
    //   window.addEventListener("storage", this.handleLocalStorageChange);
    // }
    this.handleLocalStorageChange();
  }

  handleLocalStorageChange = () => {
    const user =
      localStorage.user && JSON.parse(localStorage._auth).accessToken
        ? JSON.parse(localStorage.user)
        : null;
    this.props.loadUserFromStorageAction({ user });
  };

  render() {
    const { loader, userInfo } = this.props;
    return (
      <React.Fragment>
        {loader.loading && (
          <LoadingSpinner message={loader.message} fullscreen={true} />
        )}

        {userInfo && userInfo.role === "Reader" ? (
          <KibanaLanding />
        ) : (
          <React.Fragment>
            <div className="main-content d-flex flex-column container">
              {this.props.children}
            </div>
            <FooterComponent />
          </React.Fragment>
        )}
      </React.Fragment>
    );
  }
}
const mapStateToProps = state => ({
  loader: state.loader,
  userInfo: state.session.user
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      loadUserFromStorageAction
    },
    dispatch
  );

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);
