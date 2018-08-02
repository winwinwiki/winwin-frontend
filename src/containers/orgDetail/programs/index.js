import React from 'react';
import { push } from 'react-router-redux';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import { Link } from 'react-router-dom';

import {fetchProgramsList} from '../../../actions/program/programListAction';

class ProgramList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            programList: []
        }
        this.changePage = this.changePage.bind(this);
    }

    componentDidMount() {
        this.props.fetchProgramsList(this.props.match.params.id);
    }

    componentWillReceiveProps(nextProps) {
        if(JSON.stringify(nextProps.programList) !== JSON.stringify(this.props.programList) ) {
            this.setState({
                programList: nextProps.programList
            });
        }
    }

    render() {
        const { programList } = this.state;
        const {isFetchProgramSuccess} = this.props;
        if(!isFetchProgramSuccess || !programList) {
           return null;
        }
        var programListArray = [];
        for (var i = 0; i < programList.length; i++) {
            programListArray.push(<li className="list-group-item" key={programList[i].id}><Link to={`${this.props.match.url}/${programList[i].id}`}>{programList[i].name}</Link></li>);
        }
        return (
        <section className="dashboard-content p-0">
            <ul className="list-group">
                {programListArray}
            </ul>
        </section>
        )
    }

    changePage(programId) {
        this.props.changePage(programId);
    }

}

const mapStateToProps = state => ({
    isFetchProgramPending: state.programList.isFetchProgramPending,
    isFetchProgramSuccess: state.programList.isFetchProgramSuccess,
    fetchProgramError: state.programList.fetchProgramError,
    programList: state.programList.programList
})

const mapDispatchToProps = dispatch => bindActionCreators({
    changePage: (id) => push('/programs/'+ id),
    fetchProgramsList
}, dispatch)

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ProgramList);