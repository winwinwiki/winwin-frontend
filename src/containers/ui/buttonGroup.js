import React from "react";
import "./button-group.css";

class ButtonGroup extends React.Component {
  render() {
    return (
      <div className="">
        <div className="btn-group btn-group-toggle mx-3">
          {this.renderButtons()}
        </div>
      </div>
    );
  }

  renderButtons() {
    const { activeButton, buttonList } = this.props;
    return buttonList.map(button => (
      <label
        key={button.id}
        className={`btn btn-outline-secondary ${
          activeButton.indexOf(button.name) > -1 ? "active" : ""
        }`}
      >
        <input
          type="checkbox"
          checked={activeButton.indexOf(button.name) > -1 ? "checked" : ""}
          name="options"
          id={button.id}
          onChange={this.onChange.bind(this, button.name)}
          autoComplete="off"
        />{" "}
        {button.name}
      </label>
    ));
  }

  onChange(field) {
    this.props.onChange(field);
  }
}

export default ButtonGroup;
