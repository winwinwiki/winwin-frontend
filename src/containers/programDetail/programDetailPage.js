import React from 'react';

import { connect } from 'react-redux';

class ProgramDetailPage extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            editProgramDetail: false
        }
    }

    render() {
        const {editProgramDetail} = this.state;
        return (
            <section className="dashboard-content p-0 py-3 program-details-container">
                <div className="col-md-18 m-auto card">
                    <div className="col-md-18 m-auto d-flex flex-column py-3">
                        <form>
                            <ul className="list-group list-group-flush">
                                <li className="list-group-item px-0">
                                    <div className="row">
                                        <ul className ={`action-icons ${!editProgramDetail ? 'active' : ''}`}>
                                            <li><a href="javascript:;" onClick={() => this.onEdit()}><i className="icon-edit"></i></a></li>
                                        </ul>
                                    </div>
                                    <div className="row">
                                        <div className="col">
                                            <div className="form-group">
                                                <label htmlFor="programName">Program Name</label>
                                                <input type="text" className="form-control" id="programName" readOnly={`${!editProgramDetail ? "readOnly":''}`} placeholder="Enter Program Name" value={this.props.programDetail.name} />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col">
                                            <div className="form-group">
                                                <label htmlFor="description">Program Description</label>
                                                <textarea className="form-control" name="" id="description" readOnly={`${!editProgramDetail ? "readOnly":''}`} rows="5">{this.props.programDetail.description}</textarea>
                                            </div>
                                        </div>
                                    </div>
                                    <div className={`row justify-content-center footer-actions ${editProgramDetail ? 'active' : ''}`}>
                                        <button className="btn" onClick={(e) => this.onCancelProgramEdit(e)}>Cancel</button>
                                        <button className="btn btn-primary" onClick={(e)=>this.onSave(e)}>Save</button>
                                    </div>
                                </li>
                            </ul>
                        </form>
                    </div>
                </div>
            </section>
        )
    }

    onEdit(){
        this.setState({
            editProgramDetail: true
        });
    }
    onCancelProgramEdit(e){
        e.preventDefault();
        this.setState({
            editProgramDetail: false
        });
    }
    onSave(e){
        e.preventDefault();
        this.setState({
            editProgramDetail: false
        }); 
    }
}

const mapStateToProps = state => ({
    programDetail: state.programDetail.programDetail,
})

export default connect(
    mapStateToProps,
    null
)(ProgramDetailPage);