import React from 'react';

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
                                                <input type="text" className="form-control" id="programName" readOnly={`${!editProgramDetail ? "readOnly":''}`} placeholder="Enter Program Name" value="Classes, camps, events and location rentals" />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col">
                                            <div className="form-group">
                                                <label htmlFor="description">Program Description</label>
                                                <textarea className="form-control" name="" id="description" readOnly={`${!editProgramDetail ? "readOnly":''}`} rows="5">Arts center conducts classes on any artistic or cultural topics ranging from ?crafts, dance, singing, painting. Camps for youth and adults and events ?open to the public. They also offer open space for private events.</textarea>
                                            </div>
                                        </div>
                                    </div>
                                    <div className={`row justify-content-center footer-actions ${editProgramDetail ? 'active' : ''}`}>
                                        <button className="btn" onClick={() => this.onCancelProgramEdit()}>Cancel</button>
                                        <button className="btn btn-primary" onClick={()=>this.onSave()}>Save</button>
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
    onCancelProgramEdit(){
        this.setState({
            editProgramDetail: false
        });
    }
    onSave(){
        this.setState({
            editProgramDetail: false
        }); 
    }
}

export default ProgramDetailPage;