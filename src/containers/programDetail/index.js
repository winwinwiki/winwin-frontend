import React from 'react';
import SideBar from '../sidebar/programSidebar';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import { fetchOrganisationDetail } from '../../actions/orgDetail/orgDetailAction';
import { addToAppNavigation, removeFromAppNavigation } from '../../actions/sectionHeader/sectionHeaderAction';

class ProgramDetail extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            programDetail: {}
        }
    }

    componentDidMount() {
        this.props.fetchOrganisationDetail(this.props.url.params.id, this.props.url.params.programId, () => {
            this.props.removeFromAppNavigation({
                title: this.state.programDetail.name,
                path: this.props.url.url
            });
            this.props.addToAppNavigation({
                title: this.state.programDetail.name,
                path: this.props.url.url
            });
        });

    }

    componentWillReceiveProps(nextProps) {
        if (JSON.stringify(nextProps.programDetail) !== JSON.stringify(this.props.programDetail)) {
            this.setState({
                programDetail: nextProps.programDetail
            });
        }
    }

    render() {
        const { programDetail } = this.state;
        const { isFetchProgDetailSuccess } = this.props;
        if (!isFetchProgDetailSuccess || !programDetail) {
            return null;
        }
        return (
            <React.Fragment>
                <div className="d-flex h-100">
                    <SideBar url={this.props.url} history={this.props.history} type={'Programs'} programDetail={programDetail} />
                    {this.props.children}
                </div>
            </React.Fragment>
        )
    }
}

const mapStateToProps = state => ({
    isFetchProgDetailPending: state.programDetail.isFetchProgDetailPending,
    isFetchProgDetailSuccess: state.programDetail.isFetchProgDetailSuccess,
    fetchProgDetailError: state.programDetail.fetchProgDetailError,
    programDetail: state.programDetail.programDetail,
})

const mapDispatchToProps = dispatch => bindActionCreators({
    addToAppNavigation,
    removeFromAppNavigation,
    fetchOrganisationDetail
}, dispatch)

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ProgramDetail);