import React from 'react';
import './button-group.css';

class ButtonGroup extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        const {activeButton} = this.props;
    return (
        <div className="">
            <div className="btn-group btn-group-toggle mx-3">
                <label className={`btn btn-outline-secondary ${activeButton === 'All' ? 'active': ''}`}>
                    <input type="radio" name="options" id="option1" onChange={this.onChange.bind(this, 'All')} autoComplete="off"/> All
                </label>
                <label className={`btn btn-outline-secondary ${activeButton === 'Public' ? 'active': ''}`}>
                    <input type="radio" name="options" id="option2" onChange={this.onChange.bind(this, 'Public')} autoComplete="off"/> Public
                </label>
                <label className={`btn btn-outline-secondary ${activeButton === 'Private' ? 'active': ''}`}>
                    <input type="radio" name="options" id="option3" onChange={this.onChange.bind(this, 'Private')} autoComplete="off"/> Private
                </label>
                <label className={`btn btn-outline-secondary ${activeButton === 'Social' ? 'active': ''}`}>
                    <input type="radio" name="options" id="option4" onChange={this.onChange.bind(this, 'Social')} autoComplete="off"/> Social
                </label>
            </div>
        </div>
        )
    }

    onChange(field) {
        this.props.onChange(field);
    }
}

export default ButtonGroup;