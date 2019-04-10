import React from "react";
import "./button-group.css";

class Dropdown extends React.Component {
  constructor(props) {
    super(props);

    this.onChange = this.onChange.bind(this);
  }
  render() {
    const {
      items,
      selectedItem,
      placeholder,
      containerClass,
      ...m
    } = this.props;
    return (
      <div className={containerClass}>
        <button
          {...m}
          id="dropdownMenuButton1"
          type="button"
          data-toggle="dropdown"
          aria-haspopup="true"
          aria-expanded="false"
          className="btn btn-dropdown btn-block btn-sm"
        >
          {selectedItem ? selectedItem : placeholder}
        </button>
        <div aria-labelledby="dropdownMenuButton1" className="dropdown-menu">
          {items &&
            items.map((item, idx) => (
              <a
                href="javascript:;"
                key={idx}
                onClick={this.onChange.bind(this, item)}
                className="dropdown-item"
              >
                {item.value}
              </a>
            ))}
        </div>
      </div>
    );
  }

  onChange(item) {
    this.props.onChange(this.props.name, item);
  }
}

export default Dropdown;
