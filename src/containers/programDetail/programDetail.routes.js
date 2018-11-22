import React from 'react';
import { Switch } from 'react-router';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import { fetchOrganisationDetail } from '../../actions/orgDetail/orgDetailAction';
import { addToAppNavigation, removeFromAppNavigation } from '../../actions/sectionHeader/sectionHeaderAction';

import PrivateRoute from '../privateRouter';
import ProgramDetail from './';
import ProgramDetailPage from './programDetailPage';

import DataSets from '../orgDetail/dataSets';
import Resources from '../orgDetail/resources';
import SpiTags from '../orgDetail/spiTag';
import SdgTags from '../orgDetail/sdgTag';
import RegionsServed from '../orgDetail/regionsServed';


class ProgramDetailRoutes extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            programDetail: {}
        }
    }

    componentDidMount() {
        this.props.fetchOrganisationDetail(this.props.match.params.id, this.props.match.params.programId, () => {
            this.props.removeFromAppNavigation({
                title: this.state.programDetail.name,
                path: this.props.match.url
            });
            this.props.addToAppNavigation({
                title: this.state.programDetail.name,
                path: this.props.match.url
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
        const {programDetail} = this.state;
        const props = this.props;
        return (
            <ProgramDetail match={props.match} history={props.history} programDetail={this.state.programDetail}>
                <Switch>
                    <PrivateRoute authenticated={props.isAuthenticated} exact path={`${props.match.path}/data-sets`} component={DataSets} type={"Program"} />
                    <PrivateRoute authenticated={props.isAuthenticated} exact path={`${props.match.path}/resources`} component={Resources} type={"Program"} />
                    <PrivateRoute authenticated={props.isAuthenticated} exact path={`${props.match.path}/regions-served`} component={RegionsServed} type={"Program"} />
                    <PrivateRoute authenticated={props.isAuthenticated} exact path={`${props.match.path}/spi-tags`} component={SpiTags} type={"Program"} />
                    <PrivateRoute authenticated={props.isAuthenticated} exact path={`${props.match.path}/sdg-tags`} component={SdgTags} type={"Program"} />
                    <PrivateRoute authenticated={props.isAuthenticated} path={`${props.match.path}`} component={ProgramDetailPage} programDetail={programDetail}/>
                </Switch>
            </ProgramDetail>
        )
    }
}

const mapStateToProps = state => ({
    isAuthenticated: state.session.isAuthenticated,
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
)(ProgramDetailRoutes);