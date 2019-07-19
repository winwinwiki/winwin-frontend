import React, { Component } from "react";
import Select from "react-select";
import "./reactSelect.css";
import { bindActionCreators } from "redux";
import { setAppliedFilters } from "../../actions/orgLanding/orgLandingAction";
import { connect } from "react-redux";
import { CITY, COUNTY, STATE, COUNTRY } from "../../constants";
import { filtersObj } from "../orgLanding/orgList";

class ReactSelect extends Component {
  state = {
    value: ""
  };

  handleChange = option => {
    const optionObj = { [option.id]: option.value };
    let filters = {
      ...filtersObj,
      ...this.props.appliedFilterList,
      ...optionObj
      // pageNo: 0,
      // pageSize: 10
    };
    this.props.setAppliedFilters(filters, optionObj);
  };

  render() {
    return (
      <Select
        className="customSelect"
        // defaultValue={this.searchOptions}
        isSearchable={true}
        name="reactSelect"
        options={[
          {
            id: CITY,
            value: this.state.value,
            label: `Look for "${this.state.value}" in City`
          },
          {
            id: COUNTY,
            value: this.state.value,
            label: `Look for "${this.state.value}" in County`
          },
          {
            id: STATE,
            value: this.state.value,
            label: `Look for "${this.state.value}" in State`
          },
          {
            id: COUNTRY,
            value: this.state.value,
            label: `Look for "${this.state.value}" in Country`
          }
        ]}
        onInputChange={value => this.setState({ value })}
        value
        onChange={this.handleChange}
      />
    );
  }
}

const mapStateToProps = state => ({
  appliedFilterList: state.orgList.appliedFilterList
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      setAppliedFilters
    },
    dispatch
  );

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ReactSelect);
