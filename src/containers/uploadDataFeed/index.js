import React from 'react';
import { push } from 'react-router-redux';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Geosuggest from 'react-geosuggest';

import Dropdown from '../ui/dropdown';
import Upload from '../ui/upload';
import { onDataFeed, validateDataFeedForm } from '../../actions/dataFeed/dataFeedAction';
import { addToAppNavigation, removeFromAppNavigation } from '../../actions/sectionHeader/sectionHeaderAction';

const sectoryList = ['Public', 'Private', 'Social'];
const fileSourceList = ['IRS', 'Other'];


class UploadDataFeed extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            file: null,
            sector: sectoryList[0],
            fileSource: fileSourceList[0],
            location: null
        }
        this._geoSuggest = null;
        this.onChange = this.onChange.bind(this);
        this.validateField = this.validateField.bind(this);
        this.onDataFeed = this.onDataFeed.bind(this);
        this.onSuggestSelect = this.onSuggestSelect.bind(this);
        this.validateLocationField = this.validateLocationField.bind(this);
    }
    componentDidMount() {
        this.props.removeFromAppNavigation({
            title: "Upload Data Feed",
            path: this.props.match.url
        });
        this.props.addToAppNavigation({
            title: "Upload Data Feed",
            path: this.props.match.url
        });
    }
    render() {
        const { file, sector, fileSource } = this.state;
        let { dataFeedFormError } = this.props;
        return (
            <div className="container">
                <div className="row ">
                    <div className="col-sm-12 mx-auto my-3">
                        <p>Basic Information</p><hr />
                        <Geosuggest
                            ref={el => this._geoSuggest = el}
                            placeholder="Search State/County/City/District"
                            className="form-control position-relative"
                            initialValue=""
                            fixtures={[]}
                            onBlur={this.validateLocationField}
                            onSuggestSelect={this.onSuggestSelect} />
                        {dataFeedFormError.location && <div className="text-danger small">{dataFeedFormError.location}</div>}
                        <div className="my-3">
                            <Dropdown
                                selectedItem={sector}
                                name="sector"
                                containerClass="dropdown dropdown-with-searchbox"
                                onChange={this.onDropdownChange.bind(this)}
                                items={sectoryList} />
                        </div>
                        <p>File Selection</p><hr />
                        <Upload 
                            type="file"
                            onDrop={this.onDrop} 
                            accept=".csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel"
                            text=".csv or .xls files only"/> 
                        {dataFeedFormError.file && <div className="text-danger small">{dataFeedFormError.file}</div>}
                        {this.renderSelectedFile()}
                        <div className="my-3">
                            <Dropdown
                                selectedItem={fileSource}
                                name="fileSource"
                                containerClass="dropdown dropdown-with-searchbox"
                                onChange={this.onDropdownChange.bind(this)}
                                items={fileSourceList} />
                        </div>
                        <button className="btn btn-link w-50 mt-4" onClick={this.props.history.goBack}>Cancel</button>
                        <button className="btn btn-lg btn-primary w-50 mt-4" onClick={this.onDataFeed}>Upload</button>
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
                this.props.validateDataFeedForm('file', recievedFiles[key]);
                // this.props.onFileChange(files, deleteImages);
            };
            reader.readAsDataURL(recievedFiles[key]);
        });
    }

    onChange(e) {
        this.setState({ [e.target.name]: e.target.value });
    }

    onDropdownChange(field, value) {
        this.setState({ [field]: value });
    }

    validateField(e) {
        this.props.validateDataFeedForm(e.target.name, e.target.value);
    }

    validateLocationField(location) {
        this.props.validateDataFeedForm('location', location);
    }

    onDataFeed() {
        const { file, location } = this.state;
        if (!file || !location) {
            this.props.validateDataFeedForm('file', file);
            this.props.validateDataFeedForm('location', location);
            return;
        }
        this.props.onDataFeed(this.state, () => {
            this.setState({
                file: null,
                sector: sectoryList[0],
                fileSource: fileSourceList[0],
                location: null
            });
            this.props.changePage();
        });
    }

    onSuggestSelect(suggest) {
        this.props.validateDataFeedForm('location', suggest);
        this.setState({
            location: suggest
        });
    }
}

const mapStateToProps = state => ({
    isDataFeedPending: state.dataFeed.isDataFeedPending,
    isDataFeedSuccess: state.dataFeed.isDataFeedSuccess,
    dataFeedError: state.dataFeed.dataFeedError,
    dataFeedFormError: state.dataFeed.dataFeedFormError
})

const mapDispatchToProps = dispatch => bindActionCreators({
    changePage: () => push('/organizations'),
    addToAppNavigation,
    removeFromAppNavigation,
    validateDataFeedForm,
    onDataFeed
}, dispatch)

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(UploadDataFeed);
