import React from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import LoadingSpinner from "../common/loadingSpinner";
import FooterComponent from "../footer";
import Header from "../header";
import { loadUserFromStorageAction } from "../../actions/common/localStorageAction";

class App extends React.Component {
  componentDidMount() {
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
    const { loader } = this.props;
    return (
      <React.Fragment>
        {loader.loading && (
          <LoadingSpinner message={loader.message} fullscreen={true} />
        )}
        <div className="main-content d-flex flex-column container">
          {this.props.children}
        </div>
        <FooterComponent />
      </React.Fragment>
    );
  }
}
const mapStateToProps = state => ({
  loader: state.loader
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
