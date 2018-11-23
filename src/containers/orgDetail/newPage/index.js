import React from 'react';
class NewPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isEditable: false
        }
    }

    render() {
        const { isEditable } = this.state;
        let readOnly = isEditable ? '' : "readOnly"
        return (
            <section className="dashboard-content p-0 py-3 org-details-container">
                <div className="col-md-18 m-auto card">
                    <div className="col-md-18 m-auto d-flex flex-column py-3">
                        <h3>{this.props.type} Description</h3>
                        <p>Arts center conducts classes on any artistic or cultural topics ranging from ?crafts, dance, singing, painting. Camps for youth and adults and events ?open to the public. They also offer open space for private events.</p>
                        <form>
                            <ul className="list-group list-group-flush">
                                <li className="list-group-item px-0">
                                    {isEditable ? '' : <div className="row">
                                        <ul className="action-icons active">
                                            <li><a href="javascript:;" onClick={() => this.editBasicInfo()}><i className="icon-edit"></i></a></li>
                                        </ul>
                                    </div>}

                                    <div className="section-title border-bottom pb-3 mb-3">Self Interest</div>
                                    <div className="form-group">
                                        <label htmlFor="category">Key Activities</label>
                                        <input type="text" className="form-control" id="keyActivities" readOnly={readOnly} placeholder="Enter Key Activities" value='' />
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="category">Organization Driver</label>
                                        <input type="text" className="form-control" id="orgDrivers" readOnly={readOnly} placeholder="Enter Organizational Drivers" value='' />
                                    </div>
                                    <div className="section-title border-bottom pb-3 mb-3">Other</div>
                                    {isEditable ? 
                                    <div className="form-group">
                                        <label htmlFor="category">Business Model</label>
                                        <textarea className="form-control" id="businessModel" readOnly={readOnly} placeholder="Enter Business Model" value="Arts center conducts classes on any artistic or cultural topics ranging from ?crafts, dance, singing, painting. Camps for youth and adults and events ?open to the public. They also offer open space for private events. Arts center conducts classes on any artistic or cultural topics ranging from ?crafts, dance, singing, painting. Camps for youth and adults and events ?open to the public. They also offer open space for private events. Arts center conducts classes on any artistic or cultural topics ranging from ?crafts, dance, singing, painting. Camps for youth and adults and events ?open to the public. They also offer open space for private events." />
                                    </div>
                                    :<div className="form-group">
                                        <label htmlFor="category">Business Model</label>
                                        <p className="readOnlyTextarea">Arts center conducts classes on any artistic or cultural topics ranging from crafts, dance, singing, painting. Camps for youth and adults and events open to the public. They also offer open space for private events. Arts center conducts classes on any artistic or cultural topics ranging from crafts, dance, singing, painting. Camps for youth and adults and events open to the public. They also offer open space for private events. Arts center conducts classes on any artistic or cultural topics ranging from crafts, dance, singing, painting. Camps for youth and adults and events open to the public. They also offer open space for private events.</p>
                                    </div>
                                    }
                                    <div className="form-group">
                                        <label htmlFor="category">Population Served</label>
                                        <input type="text" className="form-control" id="populationServed" readOnly={readOnly} placeholder="Enter Population Served" value='' />
                                    </div><div className="form-group">
                                        <label htmlFor="category">Mission Statement</label>
                                        <input type="text" className="form-control" id="missionStatement" readOnly={readOnly} placeholder="Enter Mission Statement" value='' />
                                    </div>
                                    {isEditable ? <div className="row justify-content-center footer-actions active">
                                        <button className="btn" onClick={() => this.onCancelBasicInfo()}>Cancel</button>
                                        <button className="btn btn-primary" onClick={() => this.saveBasicInfo()}>Save</button>
                                    </div> : ''}
                                </li>
                            </ul>
                        </form>
                    </div>
                </div>
            </section>
        )
    }

    editBasicInfo() {
        this.setState({
            isEditable: true
        });
    }

    saveBasicInfo() {
        this.setState({
            isEditable: false
        })
    }

    onCancelBasicInfo() {
        this.setState({
            isEditable: false
        })
    }

}


export default NewPage;