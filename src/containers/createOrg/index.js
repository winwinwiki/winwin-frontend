import React from 'react';
import { push } from 'react-router-redux';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Geosuggest from 'react-geosuggest';

import Dropdown from '../ui/dropdown';
import {
    onCreateOrg,
    validateCreateOrgForm
} from '../../actions/createOrg/createOrgAction';
import './createOrg.css';

const sectoryList = ['Public', 'Private', 'Social'];
const entityList = ['Federal', 'Private', 'Social'];


class CreateOrg extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            orgName: '',
            sector : sectoryList[0],
            entity : entityList[0],
            location: null
        }
        this._geoSuggest =  null;
        this.onChange = this.onChange.bind(this);
        this.validateField = this.validateField.bind(this);
        this.onCreateOrg = this.onCreateOrg.bind(this);
        this.onSuggestSelect = this.onSuggestSelect.bind(this);
        this.validateLocationField = this.validateLocationField.bind(this);
    }
    render() {
        const { orgName, sector, entity} = this.state;
        let {createOrgFormError} = this.props;
        return (
            <div>
                <label for="orgName" className="sr-only">User Name</label>
                    <input id="orgName" type="text" aria-describedby="orgNameDesc" 
                        placeholder="Organization Name" 
                        className="form-control"
                        onBlur={this.validateField} 
                        onChange={this.onChange} 
                        name="orgName" 
                        value={orgName} />
                    <small id="orgNameDesc" className="sr-only">Org Name</small>
                    { createOrgFormError.orgName && <div>{createOrgFormError.orgName}</div> }
                    <div style={{margin: 15}}>
                        <Dropdown
                            selectedItem={sector}
                            name="sector"
                            onChange={this.onDropdownChange.bind(this)}
                            items={sectoryList}/>
                    </div>
                    <div style={{margin: 15}}>
                        <Dropdown
                            selectedItem={entity}
                            name="entity"
                            onChange={this.onDropdownChange.bind(this)}
                            items={entityList}/>
                    </div>
                    <Geosuggest
                        ref={el=>this._geoSuggest=el}
                        placeholder="Start typing!"
                        initialValue=""
                        fixtures={[]}
                        onBlur={this.validateLocationField}
                        onSuggestSelect={this.onSuggestSelect} />
                        { createOrgFormError.location && <div>{createOrgFormError.location}</div> }
                    <button className="btn btn-lg btn-light w-100 mt-4" onClick={this.onCreateOrg}>Create</button>
            </div>
        )
    }

    onChange(e) {
        this.setState({[e.target.name]: e.target.value});
    }

    onDropdownChange(field, value) {
        this.setState({[field]: value});
    }

    validateField(e) {
        this.props.validateCreateOrgForm(e.target.name, e.target.value);
    }

    validateLocationField(location) {
        this.props.validateCreateOrgForm('location', location);
    }

    onCreateOrg() {
        const {orgName, location} = this.state;
        if(!orgName || !location) { 
            this.props.validateCreateOrgForm('orgName', orgName);
            this.props.validateCreateOrgForm('location', location);
            return;
        }
        this.props.onCreateOrg(this.state, () => {
            this.setState({
                orgName: '',
                sector : sectoryList[0],
                entity : entityList[0],
                location: null 
            });
            this.props.changePage();
        });
    }

    onSuggestSelect(suggest) {
        this.props.validateCreateOrgForm('location', suggest);
        this.setState({
            location: suggest
        });
    }
}

const mapStateToProps = state => ({
    isCreateOrgPending: state.createOrg.isCreateOrgPending,
    isCreateOrgSuccess: state.createOrg.isCreateOrgSuccess,
    createOrgError: state.createOrg.createOrgError,
    createOrgFormError: state.createOrg.createOrgFormError
})

const mapDispatchToProps = dispatch => bindActionCreators({
    changePage: () => push('/organizations'),
    onCreateOrg,
    validateCreateOrgForm
}, dispatch)

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(CreateOrg);
