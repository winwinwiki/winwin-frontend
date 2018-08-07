import React from 'react';
import { push } from 'react-router-redux';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import { Link } from 'react-router-dom';

import {fetchProgramsList} from '../../../actions/program/programListAction';
import Search from '../../ui/searchBar';
import AddProgram from './addProgram';

class ProgramList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            programList: [],
            filteredProgramList: []
        }
        this.changePage = this.changePage.bind(this);
    }

    componentDidMount() {
        this.props.fetchProgramsList(this.props.match.params.id);
    }

    componentWillReceiveProps(nextProps) {
        if(JSON.stringify(nextProps.programList) !== JSON.stringify(this.props.programList) ) {
            this.setState({
                programList: nextProps.programList,
                filteredProgramList: nextProps.programList
            });
        }
    }

    render() {
        const { programList, filteredProgramList } = this.state;
        const {isFetchProgramSuccess} = this.props;
        if(!isFetchProgramSuccess || !programList) {
           return null;
        }
        return (
            <section className="dashboard-content p-0 py-3 org-details-container">
                <div className="col-md-18 m-auto card">
                    <div className="col-md-18 m-auto d-flex flex-column py-3">
                        <div className="row mb-4">
                            <div className="col">
                                <Search placeholder="Search Program" onChange={(e) =>this.getFilteredListOfPrograms(e)} />
                            </div>
                            <div className="col col-md-auto" data-toggle="modal" data-target="#addProgramModal">
                                <a href="javascript:;" className="btn btn-primary">Add Program</a>
                            </div>
                        </div>
                        <AddProgram />
                        <div className="row">
                            <div className="col">
                                <div className="list-group">
                                    {this.renderProgramList()}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        )
    }

    changePage(programId) {
        this.props.changePage(programId);
    }

    renderProgramList(){
        return this.state.filteredProgramList.map(program =><Link to={`${this.props.match.url}/${program.id}`} className="list-group-item list-group-item-action">{program.name}</Link>);
    }

    getFilteredListOfPrograms(e){
        var filteredProgramList = [];
        if(e.target.value){
            filteredProgramList = this.state.programList.filter( program => program.name.toLowerCase().indexOf(e.target.value.toLowerCase()) >-1);
        } else {
            filteredProgramList = this.state.programList.slice();
        }
        this.setState({
            filteredProgramList: filteredProgramList
        });
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