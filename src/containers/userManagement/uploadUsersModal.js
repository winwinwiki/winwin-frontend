import React from 'react';
import Upload from '../ui/upload';

class UploadUsersModal extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            file: null
        }
        this.onUploadUsers = this.onUploadUsers.bind(this);
    }
    render() {
        // let { uploadUsersFormError } = this.props;
        return (
            <div className="modal fade" id="uploadUsersModal" tabIndex="-1" role="dialog" aria-labelledby="uploadUsersModalLabel" aria-hidden="true">
                <div className="modal-dialog modal-dialog-centered" role="document">
                    <div className="modal-content">
                        <div className="dashboard-container">
                            <div className="dashboard-header">
                                <div className="modal-header flex-column">
                                    <div className="d-flex w-100 p-3">
                                        <h5 className="modal-title" id="uploadUsersModalLabel">Upload Users</h5>
                                        <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                            <span aria-hidden="true">&times;</span>
                                        </button>
                                    </div>
                                </div>
                            </div>
                            <div className="modal-body dashboard-content">
                                <form action="">
                                    <ul className="list-group list-group-flush">
                                        <li className="list-group-item px-0">
                                            <div className="row">
                                                <div className="col">
                                                    <div className="form-group">
                                                        <label htmlFor="file">Select File</label>
                                                        <Upload 
                                                            type="file"
                                                            onDrop={this.onDrop} 
                                                            accept=".csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel"
                                                            text=".csv or .xls files only"/>
                                                        {/* {uploadUsersFormError.file && <div className="text-danger small">{uploadUsersFormError.file}</div>} */}
                                                    </div>
                                                </div>
                                            </div>
                                            {this.renderSelectedFile()}
                                        </li>
                                    </ul>
                                </form>
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
                                <button type="button" className="btn btn-primary" onClick={this.onUploadUsers}>Upload</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }

    renderSelectedFile = () => {
        const { file } = this.state;
        if (file) {
            return (
                <div className="upload-image-wrap d-flex flex-wrap mb-4">
                    <div className="col-sm-22">
                        <a href={file.preview}>{file.name}</a>
                    </div>
                    <div className="col-sm-2">
                        <span className="icon-close" onClick={this.dropFile} />
                    </div>
                </div>
            );
        } else {
            return null;
        }
    }

    dropFile = () => {
        this.setState({ file: null });
    }

    onDrop = (recievedFiles, rejectedFiles) => {
        const { file } = this.state;
        if (rejectedFiles && rejectedFiles.length) {
            // this.setState({ dropError: true });
        }
        if (!rejectedFiles || !rejectedFiles.length) {
            // this.setState({ dropError: false });  
        }
        Object.keys(recievedFiles).forEach((key) => {
            let reader = new FileReader();
            reader.onload = () => {
                this.setState({ file: recievedFiles[key] });
                // this.props.validateDataFeedForm('file', recievedFiles[key]);
                // this.props.onFileChange(files, deleteImages);
            };
            reader.readAsDataURL(recievedFiles[key]);
        });
    }

    onUploadUsers() {
        const { file } = this.state;
        if (!file) {
            // this.props.validateDataFeedForm('file', file);
            return;
        }
        // this.props.onDataFeed(this.state, () => {
        //     this.setState({
        //         file: null
        //     });
        //     this.props.changePage();
        // });
    }
}


export default UploadUsersModal;
