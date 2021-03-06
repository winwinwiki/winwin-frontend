import React from "react";

const SearchBar = props => {
  return (
    <div className="form-group search-input-group search mb-0">
      <label htmlFor="inputDropdown1" className="sr-only">
        Search Input
      </label>
      <input
        id="inputDropdown1"
        type="search"
        aria-describedby="emailHelp"
        placeholder={props.placeholder}
        className="form-control"
        onChange={props.onChange}
        onKeyPress={props.onKeyPress}
        value={props.value}
      />
      <small id="emailHelp" className="sr-only">
        We'll never share your email with anyone else.
      </small>
    </div>
  );
};

export default SearchBar;
