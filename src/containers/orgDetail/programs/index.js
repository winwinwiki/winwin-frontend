import React from 'react';
import { push } from 'react-router-redux';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import { Link } from 'react-router-dom';

import {fetchProgramsList} from '../../../actions/program/programListAction';
import Search from '../../ui/searchBar';

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
            <section className="dashboard-content p-0 py-3 org-details-container">
            <div className="col-md-18 m-auto card">
                <div className="col-md-18 m-auto d-flex flex-column py-3">
                <div className="d-flex align-content-center border-bottom py-3">
                    <Search placeholder="Search Program"/>
                    <div className="ml-auto">
                        <a className="btn btn-link"><i className="icon-add mr-1"></i> Add</a>
                    </div>
                </div>
                <ul className="list-group py-3">
                    {programListArray}
                </ul>
            </div>
            </div>
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