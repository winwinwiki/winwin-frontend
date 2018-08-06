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
                <div className="d-flex align-content-center border-bottom py-3">
                    <Search placeholder="Search Program" onChange={(e) =>this.getFilteredListOfPrograms(e)} />
                    <div className="ml-auto" data-toggle="modal" data-target="#addProgramModal">
                        <a className="btn btn-link"><i className="icon-add mr-1"></i> Add</a>
                    </div>
                    <div className="modal progress-index-modal fade bd-example-modal-lg" id="addProgramModal" tabIndex="-1"
                 role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                        <div className="modal-dialog modal-xl modal-dialog-centered" role="document">
                            <div className="modal-content">
                                <div className="dashboard-container">
                                    <div className="dashboard-header">
                                        <div className="modal-header flex-column">
                                            <div className="d-flex w-100 p-3">
                                                <h5 className="modal-title" id="exampleModalLabel">New Program</h5>
                                                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                                    <span aria-hidden="true">&times;</span>
                                                </button>
                                            </div>
                                            <div className="w-100 border-top">
                                                <div className="w-100 col d-flex align-content-center py-3">
                                                    <div className="ml-auto">
                                                        <button type="button" className="btn btn-link"
                                                                data-dismiss="modal">Cancel
                                                        </button>
                                                        <button type="button" className="btn btn-primary">Save</button>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="modal-body dashboard-content progress-index-options">
                                        <form>
                                            <div className="form-group">
                                                <label htmlFor="programName">Program Name</label>
                                                <input type="text" className="form-control" id="programName" placeholder="Enter Program Name"/>
                                            </div>
                                            <div className="form-group">
                                                <label htmlFor="description">Program Description</label>
                                                <textarea className="form-control" name="" id="description" rows="5"placeholder="Enter Program Description"></textarea>
                                            </div>
                                        </form>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <ul className="list-group py-3">
                    {this.renderProgramList()}
                </ul>
            </div>
            </div>
        </section>
        )
    }

    changePage(programId) {
        this.props.changePage(programId);
    }

    renderProgramList(){
        return this.state.filteredProgramList.map(program =><li className="list-group-item" key={program.id}><Link to={`${this.props.match.url}/${program.id}`}>{program.name}</Link></li>);
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