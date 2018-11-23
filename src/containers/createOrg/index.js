import React from 'react';
import { push } from 'react-router-redux';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Geosuggest from 'react-geosuggest';
import Dropdown from '../ui/dropdown';
import { onCreateOrg } from '../../actions/createOrg/createOrgAction';
import './createOrg.css';
import validate from '../../util/validation';

const sectoryList = ['Public', 'Private', 'Social'];
const entityList = ['Federal', 'State', 'County', 'City', 'District'];


class CreateOrg extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            orgName: '',
            sector: sectoryList[0],
            entity: entityList[0],
            location: null,
            formError: {
                orgName: '',
                location: ''
            }
        }
        this._geoSuggest = null;
        this.onChange = this.onChange.bind(this);
        this.validateField = this.validateField.bind(this);
        this.onCreateOrg = this.onCreateOrg.bind(this);
        this.onSuggestSelect = this.onSuggestSelect.bind(this);
        this.validateLocationField = this.validateLocationField.bind(this);
    }
    componentWillReceiveProps(nextProps){
        const { createOrg } = this.props;
         if(nextProps && nextProps.createOrg !== createOrg && nextProps.createOrg.data){
             if(!nextProps.createOrg.error){
                this.setState({
                    orgName: '',
                    sector: sectoryList[0],
                    entity: entityList[0],
                    location: null
                });
                this.props.changePage();
             }
         }
    }
    render() {
        const { orgName, sector, entity, formError } = this.state;
        let { createOrg } = this.props;
        return (
            <div className="container">
                <div className="row ">
                    <div className="col-sm-12 mx-auto my-3">
                        <form>
                            <div className="row">
                                <div className="col">
                                    <div className="form-group">
                                        <label htmlFor="orgName">Organization Name</label>
                                        <input id="orgName" type="text" aria-describedby="orgNameDesc"
                                            placeholder="Organization Name"
                                            className="form-control"
                                            onBlur={this.validateField}
                                            onChange={this.onChange}
                                            name="orgName"
                                            value={orgName} />
                                        <small id="orgNameDesc" className="sr-only">Org Name</small>
                                        {formError.orgName && <div className="text-danger small">{formError.orgName}</div>}
                                    </div>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col">
                                    <div className="form-group">
                                        <label htmlFor="sector">Sector</label>
                                        <Dropdown
                                            selectedItem={sector}
                                            name="sector"
                                            containerClass="dropdown dropdown-with-searchbox"
                                            onChange={this.onDropdownChange.bind(this)}
                                            items={sectoryList} />
                                    </div>
                                </div>
                                <div className="col">
                                    <div className="form-group">
                                        <label htmlFor="entity">Sector Level</label>
                                        <Dropdown
                                            selectedItem={entity}
                                            name="entity"
                                            containerClass="dropdown dropdown-with-searchbox"
                                            onChange={this.onDropdownChange.bind(this)}
                                            items={entityList} />
                                    </div>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col">
                                    <div className="form-group">
                                        <label htmlFor="newOrgLocation">Location</label>
                                        <Geosuggest
                                            id="newOrgLocation"
                                            ref={el => this._geoSuggest = el}
                                            placeholder="Search State/County/City/District"
                                            className="form-control position-relative"
                                            initialValue=""
                                            fixtures={[]}
                                            onBlur={this.validateLocationField}
                                            onSuggestSelect={this.onSuggestSelect} />
                                        {formError.location && <div className="text-danger small">{formError.location}</div>}
                                    </div>
                                </div>
                            </div>
                        </form>

                        <button className="btn btn-link w-50 mt-4" onClick={this.props.history.goBack}>Cancel</button>
                        <button className="btn btn-lg btn-primary w-50 mt-4" onClick={this.onCreateOrg}>Create</button>
                    </div>
                </div>
            </div>
        )
    }

    onChange(e) {
        this.setState({ [e.target.name]: e.target.value });
    }

    onDropdownChange(field, value) {
        this.setState({ [field]: value });
    }

    validateField(e) {
        this.validateCreateOrgForm(e.target.name, e.target.value);
    }

    validateLocationField(location) {
        this.validateCreateOrgForm('location', location);
    }

    validateCreateOrgForm = (field, value) => {
        const { formError } = this.state;
        if (field === 'orgName') {
            if (!value) {
                formError.orgName = "Org name is required.";
                this.setState({ formError });
                return;
            }
            let isValid = validate.name(value);
            if (!isValid) {
                formError.orgName = "Enter valid org name.";
                this.setState({ formError });
                return;
            }
            formError.orgName = "";
            this.setState({ formError });
            return;
        }
        if (!value) {
            formError.location = "Location is required.";
            this.setState({ formError });
            return;
        }
        formError.location = "";
        this.setState({ formError });
        return;
    }

    onCreateOrg() {
        const { orgName, location, sector, entity } = this.state;
        if (!orgName || !location) {
            this.validateCreateOrgForm('orgName', orgName);
            this.validateCreateOrgForm('location', location);
            return;
        }
        this.props.onCreateOrg({orgName, location, sector, entity});
    }

    onSuggestSelect(suggest) {
        this.validateCreateOrgForm('location', suggest);
        this.setState({
            location: suggest
        });
    }
}

const mapStateToProps = state => ({
    createOrg: state.createOrg
})

const mapDispatchToProps = dispatch => bindActionCreators({
    changePage: () => push('/organizations'),
    onCreateOrg
}, dispatch)

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(CreateOrg);
