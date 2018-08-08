import React from 'react';
import SideBar from '../sidebar';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import { fetchOrganisationDetail } from '../../actions/orgDetail/orgDetailAction';
import { addToAppNavigation, removeFromAppNavigation } from '../../actions/sectionHeader/sectionHeaderAction';

class OrgDetail extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            orgDetail: {},
        }
    }

    componentDidMount() {
        console.log("orgID: " + this.props.url.params.id);
        this.props.fetchOrganisationDetail(this.props.url.params.id, () => {
            this.props.removeFromAppNavigation({
                title: this.props.orgDetail.name,
                path: this.props.url.url
            });
            this.props.addToAppNavigation({
                title: this.props.orgDetail.name,
                path: this.props.url.url
            });
        });
    }

    componentWillReceiveProps(nextProps) {
        if (JSON.stringify(nextProps.orgDetail) !== JSON.stringify(this.props.orgDetail)) {
            this.setState({
                orgDetail: nextProps.orgDetail
            });
        }
    }
    render() {
        const { orgDetail } = this.state;
        const { isFetchOrgDetailSuccess } = this.props;
        if (!isFetchOrgDetailSuccess || !orgDetail) {
            return null;
        }
        return (
            <React.Fragment>
                <div className="py-4 border-bottom d-flex justify-content-between">
                    <h2>{orgDetail.name}</h2>
                    <div className="d-flex align-items-center">
                        <h6 className="font-weight-light m-0">Last update: Jens Molbak on 1 Mar’18</h6>
                        <div className="dropdown">
                            <a href="javascript:;"  className="mr-1 dropdown-toggle plain" href="#" role="button"
                               id="dropdownMenuLink" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"><i className="icon-menu mr-2 ml-5"></i> Menu</a>

                            <div className="dropdown-menu dropdown-menu-right" aria-labelledby="dropdownMenuLink">
                                <a className="dropdown-item" href="#">Change Status</a>
                                <a className="dropdown-item" href="#">Add Program</a>
                                <a className="dropdown-item" href="#">Add Child Organization</a>
                                <a className="dropdown-item" href="#">Edit Organization Name</a>
                                <a className="dropdown-item" href="#">View History</a>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="d-flex h-100">
                    <SideBar url={this.props.url} history={this.props.history} type={'Organisation'} />
                    {this.props.children}
                </div>
            </React.Fragment>
        )
    }
}

const mapStateToProps = state => ({
    isFetchOrgDetailPending: state.orgDetail.isFetchOrgDetailPending,
    isFetchOrgDetailSuccess: state.orgDetail.isFetchOrgDetailSuccess,
    fetchOrgDetailError: state.orgDetail.fetchOrgDetailError,
    orgDetail: state.orgDetail.orgDetail,
})

const mapDispatchToProps = dispatch => bindActionCreators({
    fetchOrganisationDetail,
    addToAppNavigation,
    removeFromAppNavigation
}, dispatch)

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(OrgDetail);