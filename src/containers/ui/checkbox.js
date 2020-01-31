import React from "react";

class Checkbox extends React.Component {
  constructor(props) {
    super(props);
    const checked = "checked" in props ? props.checked : false;

    this.state = {
      checked
    };

    //this.onChange = this.onChange.bind(this);
  }
  componentWillReceiveProps(nextProps) {
    if ("checked" in nextProps) {
      this.setState({
        checked: nextProps.checked
      });
    }
  }

  render() {
    const { label, name } = this.props;
    const { checked } = this.state;
    return (
      <div
        className="custom-control custom-checkbox"
        onClick={this.onChange.bind(this, name)}
      >
        <input
          readOnly
          name={name}
          type="checkbox"
          value={name}
          className="custom-control-input"
          checked={!!checked}
        />
        <label htmlFor="customCheckCustom1" className="custom-control-label">
          {label}
        </label>
      </div>
    );
  }

  onChange(name, e) {
    e.preventDefault();
    this.props.onChange(name);
  }
}

export default Checkbox;
