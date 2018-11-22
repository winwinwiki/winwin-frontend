import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import Header from '../header';
import SectionHeader from '../section-header/';
import { fetchUserInfo } from '../../actions/users/userInfoAction';

class UserManagement extends React.Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        const { session } = this.props;
        if (!session || !session.user || !session.isAuthenticated) {
            this.props.history.push("/");
        }
    }

    componentWillReceiveProps(nextProps){
        const { session } = this.props;
        if(nextProps  && nextProps.session !== session && !nextProps.session.user){
            this.props.history.push("/");
        }
    }

    render() {
        const { session, userInfo } = this.props;
        if (!session || !session.user || !userInfo || userInfo.error) { return null; }
        return (
            <div className="d-flex flex-column h-100 w-100">
                <Header />
                <main role="main" className="dashboard-container">
                    <React.Fragment>
                        <SectionHeader />
                        {this.props.children}
                    </React.Fragment>
                </main>
            </div>
        )
    }
}

const mapStateToProps = state => ({
    userInfo: state.userInfo,
    session: state.session
})

const mapDispatchToProps = dispatch => bindActionCreators({
    fetchUserInfo
}, dispatch)

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(UserManagement);