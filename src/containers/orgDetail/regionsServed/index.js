import React, { Component, Fragment } from "react";
import Geosuggest from "react-geosuggest";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import filter from "lodash/filter";
import Autosuggest from "react-autosuggest";
import {
  startLoaderAction,
  stopLoaderAction
} from "../../../actions/common/loaderActions";

import {
  saveOrgRegionsServed,
  fetchOrgRegionsServed,
  removeRegionAction,
  resetRegionsAction,
  updateRegionsAction,
  fetchRegionsList
} from "../../../actions/orgDetail/regionsServedAction";
import { compareStrings } from "../../../util/util";

// const addressComponents = {
//   street_number: "short_name",
//   route: "long_name",
//   locality: "long_name",
//   administrative_area_level_1: "long_name",
//   administrative_area_level_2: "long_name",
//   country: "long_name",
//   postal_code: "short_name"
// };

const getSuggestionValue = suggestion => suggestion.regionName;

class RegionsServed extends Component {
  state = {
    // location: null,
    isEdited: false,
    suggestions: [],
    // regionsServed: {
    //   data: {}
    // }
    regionsServed: {
      region: { regionName: "" }
    }
  };

  componentDidMount() {
    this.props.startLoaderAction();
    this.props.fetchOrgRegionsServed(this.props.orgId, this.props.type);
  }

  componentDidUpdate(prevProps) {
    if (
      prevProps.regionsServed !== this.props.regionsServed &&
      this.props.regionsServed.data
    ) {
      this.props.stopLoaderAction();
    }
  }

  // Use your imagination to render suggestions.
  renderSuggestion = suggestion => <div>{suggestion.regionName}</div>;

  getSuggestions = value => {
    const inputValue = value.trim().toLowerCase();
    const inputLength = inputValue.length;
    const {
      regionsServed: { regionsList: { response: regionsList = [] } = {} } = {}
    } = this.props;

    return inputLength === 0
      ? []
      : regionsList
          .sort(function(a, b) {
            if (a.regionName.toLowerCase() < b.regionName.toLowerCase()) {
              return -1;
            }
            if (a.regionName.toLowerCase() > b.regionName.toLowerCase()) {
              return 1;
            }
            return 0;
          })
          .filter(x =>
            x.regionName.toLowerCase().includes(inputValue.toLowerCase())
          );
  };

  onSuggestionsFetchRequested = ({ value }) => {
    this.setState({
      suggestions: this.getSuggestions(value)
    });
  };

  onSuggestionsClearRequested = () => {
    this.setState({
      suggestions: []
    });
  };

  onChange = e => {
    e.preventDefault();
    const {
      regionsServed: { regionsList: { response: regionsList = [] } = {} } = {}
    } = this.props;
    const target = e.target;
    const value = target.type === "checkbox" ? target.checked : target.value;
    let name = target.name;
    const { regionsServed } = this.state;
    regionsServed.region[name] = value;

    if (value) {
      //to find the regionId from masters region list
      let filteredRegion = regionsList.find(x => {
        return x.regionName.toLowerCase() === value.toLowerCase() ? x : "";
      });

      //check if regions id is not already present
      if (
        filteredRegion &&
        filteredRegion.regionId &&
        filteredRegion.regionId !== -1
      )
        regionsServed.region.regionId = filteredRegion.regionId;
      //add region if not present in masters list
      else regionsServed.region.regionId = -1;
      this.setState({ regionsServed });
    }
  };

  render() {
    const {
      isEdited,
      suggestions,
      regionsServed: { region: { regionId, regionName } = {} } = {}
    } = this.state;
    if (
      !this.props.regionsServed ||
      !this.props.regionsServed.data ||
      this.props.regionsServed.error
    ) {
      return null;
    }
    const {
      data: { response: regionsServedList } = {}
    } = this.props.regionsServed;
    const inputProps = {
      // id,
      name: "regionName",
      placeholder: "Search regions (for ex. Seattle, WA, USA)",
      className: "form-control position-relative mt-2",
      value: regionName,
      onChange: this.onChange
    };
    return (
      <section className="dashboard-content p-0 py-3 org-details-container">
        <div className="col-md-18 m-auto card">
          <div className="col-md-18 m-auto d-flex flex-column py-3">
            <h3>{this.props.type} Description</h3>
            <p>{this.props.description}</p>

            <div className="section-title">Regions Served</div>
            <form onSubmit={this.onSubmit}>
              <ul className="list-group list-group-flush">
                {!isEdited && (
                  <li className="list-group-item px-0">
                    <div className="row">
                      <ul className="action-icons">
                        <li>
                          <a href="javascript:;" onClick={this.onEdit}>
                            <i className="icon-edit" />
                          </a>
                        </li>
                      </ul>
                    </div>
                  </li>
                )}
                {isEdited && (
                  // <Geosuggest
                  //   ref={el => (this._geoSuggest = el)}
                  //   placeholder="Search regions (for ex. Seattle, WA, USA)"
                  //   initialValue=""
                  //   className="form-control position-relative mt-2"
                  //   fixtures={[]}
                  //   onSuggestSelect={suggest => {
                  //     if (suggest) this.onSuggestSelect(suggest);
                  //   }}
                  // />
                  <div className="row mt-2">
                    <div className="col-sm-22">
                      <Autosuggest
                        id="regionName"
                        suggestions={suggestions}
                        onSuggestionsFetchRequested={
                          this.onSuggestionsFetchRequested
                        }
                        onSuggestionsClearRequested={
                          this.onSuggestionsClearRequested
                        }
                        getSuggestionValue={getSuggestionValue}
                        onSuggestionSelected={this.onSuggestionSelected}
                        renderSuggestion={this.renderSuggestion}
                        inputProps={inputProps}
                        onSelect={this.onSelect}
                      />
                    </div>
                  </div>
                )}
                {isEdited &&
                  regionsServedList.map((region, idx) => {
                    const { region: { regionName } = {}, isActive } = region;
                    return isActive ? (
                      <div className="row mt-2" key={idx}>
                        <div className="col-sm-22">{regionName}</div>
                        <div className="col-sm-2">
                          <a
                            href="javascript:;"
                            className="icon-close"
                            onClick={() => this.deleteRegion(region.id)}
                          >
                            {" "}
                          </a>
                        </div>
                      </div>
                    ) : (
                      ""
                    );
                  })}
                {!isEdited &&
                  regionsServedList.map((region, idx) => {
                    const { region: { regionName } = {}, isActive } = region;
                    return isActive ? (
                      <li className="mt-2" key={idx}>
                        {regionName}
                      </li>
                    ) : (
                      ""
                    );
                  })}
              </ul>
            </form>
          </div>
        </div>
      </section>
    );
  }

  onSubmit = (e, data) => {
    e.preventDefault();
    const { type, orgId } = this.props;
    const { regionsServed: { region } = {} } = this.state;
    const updatedRegions = [
      {
        organizationId: orgId,
        region: data ? data.suggestion : region
      }
    ];

    this.props.saveOrgRegionsServed({ updatedRegions, orgId, type });
    this.setState(state => {
      return {
        ...state,
        regionsServed: {
          ...state.regionsServed,
          region: { ...state.regionsServed.region, regionName: "" }
        }
      };
    });
  };

  onClose = () => {
    this.props.startLoaderAction();
    this.props.fetchOrgRegionsServed(this.props.orgId);
    this.setState({ isEdited: false });
  };

  saveRegions = e => {
    e.preventDefault();
    const {
      orgId,
      type,
      regionsServed: { data: { response: updatedRegions } = {} } = {}
    } = this.props;

    this.props.saveOrgRegionsServed({ updatedRegions, orgId, type });
    this.setState({ isEdited: false });
  };

  onEdit = () => {
    this.props.fetchRegionsList(this.props.orgId, this.props.type);
    this.setState({
      isEdited: true
    });
  };

  deleteRegion = id => {
    const {
      orgId,
      type,
      regionsServed: { data: { response: updatedRegions } = {} } = {}
    } = this.props;

    let filteredRegion = updatedRegions
      .filter(x => x.id === id)
      .map(val => {
        val.isActive = false;
        return val;
      });

    this.props.saveOrgRegionsServed({
      updatedRegions: filteredRegion,
      orgId,
      type
    });
  };

  //when selected from suggested list call on submit method
  onSuggestionSelected = (e, data) => {
    e.preventDefault();
    this.onSubmit(e, data);
  };

  // onSuggestSelect = place => {
  //   this._geoSuggest.clear(); //clear inputtext
  //   const {
  //     regionsServed: { data: { response: regionsServedList } = {} } = {}
  //   } = this.props;
  //   let placesObj = {};

  //   //convert places api response to extract address properties
  //   const { gmaps: { address_components } = {}, placeId } = place;
  //   for (let i = 0; i < address_components.length; i++) {
  //     let addressType = address_components[i].types[0];
  //     if (addressComponents[addressType]) {
  //       let val = address_components[i][addressComponents[addressType]];
  //       placesObj[addressType] = typeof val !== undefined ? val : null;
  //     }
  //   }
  //   const {
  //     administrative_area_level_1,
  //     administrative_area_level_2,
  //     country,
  //     locality,
  //     postal_code,
  //     street_number,
  //     route
  //   } = placesObj;

  //   let apiObj = {
  //     organizationId: this.props.orgId,
  //     isActive: true,
  //     address: {
  //       placeId,
  //       street:
  //         street_number && !route
  //           ? street_number
  //           : !street_number && route
  //           ? route
  //           : street_number && route
  //           ? street_number + " " + route
  //           : null,
  //       state: administrative_area_level_1,
  //       county: administrative_area_level_2 || null,
  //       country,
  //       city: locality || null,
  //       zip: postal_code || null
  //     }
  //   };

  //   //add only unique addresses according to placeId
  //   if (!regionsServedList.filter(x => x.address.placeId === placeId).length) {
  //     this.props.updateRegionsAction(apiObj);
  //   }
  //   this.setState({
  //     location: place
  //   });
  // };
}

const mapStateToProps = state => ({
  regionsServed: state.regionsServed
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      saveOrgRegionsServed,
      fetchOrgRegionsServed,
      removeRegionAction,
      resetRegionsAction,
      updateRegionsAction,
      startLoaderAction,
      stopLoaderAction,
      fetchRegionsList
    },
    dispatch
  );

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(RegionsServed);
