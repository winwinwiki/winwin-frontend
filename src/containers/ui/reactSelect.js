import React, { Component } from "react";
import Select from "react-select";
import "./reactSelect.css";
import { bindActionCreators } from "redux";
import { setAppliedFilters } from "../../actions/orgLanding/orgLandingAction";
import { connect } from "react-redux";
import { CITY, COUNTY, STATE, COUNTRY } from "../../constants";
import { filtersObj } from "../orgLanding/orgList";
import { cleanObj, modifiyFilterList } from "../../util/util";

class ReactSelect extends Component {
  state = {
    value: ""
  };

  handleChange = option => {
    if (!option.value) return;
    let optionObj = { [option.id]: option.value };
    let filters = {
      ...filtersObj,
      ...this.props.appliedFilterList,
      ...optionObj
    };

    for (var prop in filters) {
      if (["city", "country", "state", "county"].includes(prop)) {
        if (optionObj[prop]) optionObj[prop] = option.value;
        else optionObj[prop] = filters[prop];
      }
    }
    const { appliedFilterList } = this.props;

    this.props.setAppliedFilters(
      { ...this.props.filters, ...filters, pageNo: 0 },
      cleanObj({
        ...this.props.filters,
        ...(appliedFilterList && modifiyFilterList(appliedFilterList)),
        ...optionObj,
        pageNo: 0
      })
    );
  };

  render() {
    const { placeholder } = this.props;
    return (
      <Select
        className="customSelect"
        placeholder={placeholder}
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
  appliedFilterList: state.orgList.appliedFilterList,
  filters: state.orgList.filters
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
