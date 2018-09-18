import React from 'react';
import Note from './note';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { fetchOrgNotes } from '../../../actions/orgDetail/notesAction';
class Notes extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            newNote: null,
            editNote: null,
            isAddNew: false
        }
        this.addNewNote = this.addNewNote.bind(this);
        this.cancelNewNote = this.cancelNewNote.bind(this);
        this.saveNewNote = this.saveNewNote.bind(this);
    }

    componentDidMount() {
        this.props.fetchOrgNotes();
    }

    componentWillReceiveProps(nextProps) {
        // if (JSON.stringify(nextProps.notesList) !== JSON.stringify(this.props.dataSetList)) {
        //     this.setState({
        //         dataSetList: nextProps.dataSetList
        //     });
        // }
    }

    render() {
        const { isAddNew } = this.state;
        const { isNotesSuccess, notesList } = this.props;
        if (!isNotesSuccess || !notesList) { return null; }
        return (
            <section className="dashboard-content p-0 py-3 org-details-container">
                <div className="col-md-18 m-auto card">
                    <div className="col-md-18 m-auto d-flex flex-column py-3">
                        <h3>{this.props.type} Description</h3>
                        <p>Arts center conducts classes on any artistic or cultural topics ranging from ?crafts, dance, singing, painting. Camps for youth and adults and events ?open to the public. They also offer open space for private events.</p>

                        <div className="section-title border-bottom pb-3 mb-3">
                            Notes
                        </div>
                        <form>
                            <ul className="list-group list-group-flush">
                                {notesList.map(note => <Note key={note.id} data={note} />)}
                                <li className="list-group-item border-0 px-0 pt-4">
                                    {!isAddNew ? <a href="javascript:;" onClick={this.addNewNote}><i className="icon-add mr-2"></i> Add Another</a>
                                        : <React.Fragment>
                                            <div className="row">
                                                <div className="col">
                                                    <div className="form-group">
                                                        <label htmlFor="note" class="sr-only">Added by</label>
                                                        <textarea row="5" className="form-control" id="note" placeholder="Enter New Note" />
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="row mx-0 justify-content-end footer-actions active">
                                                <button className="btn btn-sm" onClick={() => this.cancelNewNote()}>Cancel</button>
                                                <button className="btn btn-sm btn-primary" onClick={() => this.saveNewNote()}>Save</button>
                                            </div>
                                        </React.Fragment>}
                                </li>
                            </ul>
                        </form>
                    </div>
                </div>

                {/* Delete Modal */}
                <div className="modal fade" id="deleteModal" tabIndex="-1" role="dialog"
                    aria-labelledby="exampleModalLabel" aria-hidden="true">
                    <div className="modal-dialog modal-sm modal-dialog-centered" role="document">
                        <div className="modal-content">
                            <div className="dashboard-container">
                                <div className="dashboard-header">
                                    <div className="modal-header flex-column">
                                        <div className="d-flex w-100 p-3">
                                            <h5 className="modal-title" id="exampleModalLabel">Alert!</h5>
                                            <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                                <span aria-hidden="true">&times;</span>
                                            </button>
                                        </div>
                                    </div>
                                </div>
                                <div className="modal-body dashboard-content">
                                    Are you sure you want to delete this Note?
                                </div>
                                <div className="modal-footer">
                                    <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
                                    <button type="button" className="btn btn-primary">Delete</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        )
    }

    addNewNote(){
        this.setState({
            isAddNew: true
        })
    }

    cancelNewNote(){
        this.setState({
            isAddNew: false
        })
    }

    saveNewNote(){
        this.setState({
            isAddNew: false
        })
    }
}

const mapStateToProps = state => ({
    notesList: state.notes.notesList,
    isNotesSuccess: state.notes.isNotesSuccess
})

const mapDispatchToProps = dispatch => bindActionCreators({
    fetchOrgNotes
}, dispatch)

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Notes);