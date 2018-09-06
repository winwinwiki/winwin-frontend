import React from 'react';
import { push } from 'react-router-redux';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import Upload from '../ui/upload';
import { addToAppNavigation, removeFromAppNavigation } from '../../actions/sectionHeader/sectionHeaderAction';

class UploadUsers extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            file: null
        }
        this.onUploadUsers = this.onUploadUsers.bind(this);
    }
    componentDidMount() {
        this.props.removeFromAppNavigation({
            title: "Upload Users",
            path: this.props.match.url
        });
        this.props.addToAppNavigation({
            title: "Upload Users",
            path: this.props.match.url
        });
    }
    render() {
        // let { uploadUsersFormError } = this.props;
        return (
            <div className="container">
                <div className="row ">
                    <div className="col-sm-12 mx-auto my-3">
                        <p>Select File</p><hr />
                        <Upload onDrop={this.onDrop}/> 
                        {/* {uploadUsersFormError.file && <div className="text-danger small">{uploadUsersFormError.file}</div>} */}
                        {this.renderSelectedFile()}
                        <button className="btn btn-link w-50 mt-4" onClick={this.props.history.goBack}>Cancel</button>
                        <button className="btn btn-lg btn-primary w-50 mt-4" onClick={this.onUploadUsers}>Upload</button>
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


const mapDispatchToProps = dispatch => bindActionCreators({
    changePage: () => push('/user-management'),
    addToAppNavigation,
    removeFromAppNavigation
}, dispatch)

export default connect(
    null,
    mapDispatchToProps
)(UploadUsers);
