import React from 'react';
import { Link } from 'react-router-dom';
import Dropdown from '../ui/dropdown';
const sectoryList = ['Public', 'Private', 'Social'];
const entityList = ['Federal', 'Private', 'Social'];

class CreateOrg extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            orgName: '',
            sector : sectoryList[0],
            entity : entityList[0]
        }

        this.onChange = this.onChange.bind(this);
        this.validateField = this.validateField.bind(this);
    }
    render() {
        const { orgName, sector, entity} = this.state;
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
                    <div>
                        <Dropdown
                            selectedItem={sector}
                            name="sector"
                            onChange={this.onDropdownChange.bind(this)}
                            items={sectoryList}/>
                    </div>
                    <div>
                        <Dropdown
                            selectedItem={entity}
                            name="entity"
                            onChange={this.onDropdownChange.bind(this)}
                            items={entityList}/>
                    </div>
                    <button className="btn btn-lg btn-light w-100 mt-4" onClick={this.onLoginSubmit}>Login</button>
            </div>
        )
    }

    onChange(e) {
        this.setState({[e.target.name]: e.target.value});
    }

    onDropdownChange(field, value) {
        this.setState({[field]: value});
    }

    validateField() {

    }
}

export default CreateOrg;

