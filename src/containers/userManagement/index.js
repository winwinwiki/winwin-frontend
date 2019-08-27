import React from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";

import Header from "../header";
import SectionHeader from "../section-header/";

class UserManagement extends React.Component {
  componentDidMount() {
    const { session, history } = this.props;
    if (!session || !session.user || !session.isAuthenticated) {
      history.push("/");
    }
  }

  componentWillReceiveProps(nextProps) {
    const { session, history } = this.props;
    if (nextProps && nextProps.session !== session && !nextProps.session.user) {
      history.push("/");
    }
  }

  render() {
    const { session, userInfo, history } = this.props;
    if (!session || !session.user || !userInfo || userInfo.error) {
      return null;
    }
    return (
      <div className="main-content d-flex flex-column container">
        <div className="d-flex flex-column h-100 w-100">
          <Header history={history} />
          <main role="main" className="dashboard-container">
            <React.Fragment>
              <SectionHeader />
              {this.props.children}
            </React.Fragment>
          </main>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  userInfo: state.userInfo,
  session: state.session
});

const mapDispatchToProps = dispatch => bindActionCreators({}, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(UserManagement);
