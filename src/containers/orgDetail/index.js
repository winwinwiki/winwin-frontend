import React from 'react';
import SideBar from '../sidebar';
import { Link } from 'react-router-dom';
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
        // console.log("orgID: " + this.props.match.params.id);
        this.props.fetchOrganisationDetail(this.props.match.params.id, null, () => {
            this.props.removeFromAppNavigation({
                title: this.props.orgDetail.name,
                path: this.props.match.url
            });
            this.props.addToAppNavigation({
                title: this.props.orgDetail.name,
                path: this.props.match.url
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
                    <div aria-label="breadcrumb" className="col breadcrumb-container pr-0">
                        <ol className="breadcrumb row flex-row flex-nowrap pl-0">
                            <li className="breadcrumb-item pl-0 pr-4"><h1>A</h1></li>
                            <li className="breadcrumb-item col" title="Administration for children &amp; families">
                                <h2 className="float-left">Administration for children &amp; families</h2>
                                <i className="icon icon-arrow float-left"></i>
                            </li>
                            <li className="breadcrumb-item col" title="Administration for children &amp; families">
                                <div className="dropdown">
                                    <a href="javascript:;"  className="mr-1 dropdown-toggle plain" href="#" role="button"
                                       id="orgLevels" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                        ..... <i className="icon icon-arrow float-right"></i>
                                    </a>
                                    <div className="dropdown-menu dropdown-menu-left org-levels" aria-labelledby="orgLevels">
                                        <div className="dropdown-container">
                                            <a className="dropdown-item" href="#"><i
                                                className="icon icon-arrow"></i> Administration for children &amp; families</a>
                                            <Link className="dropdown-item" to={`${this.props.match.url}/new-program`}><i
                                                className="icon icon-arrow"></i> Administration for children &amp; families</Link>
                                            <a className="dropdown-item" href="#"><i
                                                className="icon icon-arrow"></i> Administration for children &amp; families</a>
                                            <a className="dropdown-item" href="#"><i
                                                className="icon icon-arrow"></i> Administration for children &amp; families</a>
                                            <a className="dropdown-item" href="#"><i
                                                className="icon icon-arrow"></i> Administration for children &amp; families</a>
                                        </div>
                                    </div>
                                </div>
                            </li>
                            <li className="breadcrumb-item col" title="Administration for children &amp; families">
                                <h2 className="float-left">Administration for children &amp; families</h2>
                                <i className="icon icon-arrow float-left"></i>
                            </li>
                            <li className="breadcrumb-item col active" title={orgDetail.name} aria-current="page">
                                <h2 className="float-left">{orgDetail.name} Administration for children &amp; families</h2>
                                <i className="icon icon-arrow float-left"></i>
                            </li>
                            <li className="breadcrumb-item col" title="Administration for children &amp; families">
                                <h2 className="mr-5">Administration for <a href="javascript:;">+ 4 more</a></h2>
                            </li>
                        </ol>
                    </div>
                    <div className="ml-auto">
                        <div className="d-flex align-items-center">
                            <div className="dropdown">
                                <a href="javascript:;"  className="mr-1 dropdown-toggle plain" href="#" role="button"
                                   id="dropdownMenuLink" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"><i className="icon-menu mr-2 ml-0"></i> Menu</a>
                                <div className="dropdown-menu dropdown-menu-right" aria-labelledby="dropdownMenuLink">
                                    <a className="dropdown-item" href="#">Change Status</a>
                                    <Link className="dropdown-item" to={`${this.props.match.url}/new-program`}>Add Program</Link>
                                    <a className="dropdown-item" href="#">Add Child Organization</a>
                                    <a className="dropdown-item" href="#">Edit Organization Name</a>
                                    <Link className="dropdown-item" to={`${this.props.match.url}/view-history`}>View History</Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                    <div className="d-flex h-100">
                        { (this.props.history.location.pathname.indexOf('view-history') == -1) &&
                            <SideBar match={this.props.match} history={this.props.history} type={'Organisation'} />}
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