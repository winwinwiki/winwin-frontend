import React from "react";
import { Async, AsyncCreatable } from "react-select";
import VirtualizedSelect from "react-virtualized-select"; // or from 'react-select'
import "react-virtualized/styles.css";
import "react-virtualized-select/styles.css";

import { connect } from "react-redux";
import { getIndexedOptions } from "../../selectors/regionsListSelector";

// Render your Select, complete with the fast-filter index
const FilterableSelect = props => {
  return (
    <VirtualizedSelect
      {...props}
      selectComponent={AsyncCreatable}
      onChange={o => props.onSuggestChange(props.name, o)}
    />
  );
};

const mapStateToProps = state => ({
  // filterOptions: getIndexedOptions(state)
});

export default connect(mapStateToProps)(FilterableSelect);
