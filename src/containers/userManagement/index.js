import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import Header from '../header';
import SectionHeader from '../section-header/';
import {fetchUserInfo} from '../../actions/users/userInfoAction';

class UserManagement extends React.Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        this.props.fetchUserInfo();
    }
    render() {
        const {userInfo} = this.props;
        if(!userInfo) {return null; }
    return (
        <div className="d-flex flex-column h-100 w-100">
            <Header userInfo={userInfo}/>
            <main role="main" className="dashboard-container">
                <React.Fragment>
                    <SectionHeader/>
                    {this.props.children}
                </React.Fragment>
            </main>
        </div>
        )
    }
}

const mapStateToProps = state => ({
    userInfo: state.userInfo.userInfo
})

const mapDispatchToProps = dispatch => bindActionCreators({
    fetchUserInfo
}, dispatch)

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(UserManagement);