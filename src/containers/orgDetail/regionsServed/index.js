import React, { Component, Fragment } from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";

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
import Can from "../../Can";
import { regionsListSelector } from "../../../selectors/regionsListSelector";

import FilterableSelect from "../../common/virtualizedSelect";

class RegionsServed extends Component {
  state = {
    isEdited: false,
    suggestions: [],

    regionsServed: {
      region: { regionName: "" }
    }
  };

  componentDidMount() {
    this.props.startLoaderAction();
    this.props.fetchOrgRegionsServed(this.props.orgId, this.props.type);
    //rba
    if (
      Can({
        role: this.props.user.role,
        perform: "organizationDetailsRegionsServed:edit"
      })
    )
      this.onEdit();
  }

  componentDidUpdate(prevProps) {
    if (
      prevProps.regionsServed !== this.props.regionsServed &&
      prevProps.regionsList !== this.props.regionsList &&
      this.props.regionsServed.data
    ) {
      this.props.stopLoaderAction();
    }
  }

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
                {isEdited && this.props.regionsList && (
                  <div className="row mt-2">
                    <div className="col-sm-22">
                      <FilterableSelect
                        className="position-relative mt-2"
                        name="regionName"
                        placeholder="Search regions (for ex. Seattle, WA, USA)"
                        options={this.props.regionsList}
                        onSuggestChange={this.onSuggestChange}
                        value={regionName}
                      />
                    </div>
                  </div>
                )}
                {isEdited &&
                  regionsServedList.map((region, idx) => {
                    return region.isActive && region.region ? (
                      <div className="row mt-2" key={idx}>
                        <div className="col-sm-22">
                          {region.region.regionName}
                        </div>
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
                    return region.isActive && region.region ? (
                      <li className="mt-2" key={idx}>
                        {region.region.regionName}
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

  onSuggestChange = (field, val) => {
    this.setState(
      {
        regionsServed: {
          region: { regionName: val.label }
        }
      },
      () => this.onSubmit(val)
    );
  };

  onSubmit = data => {
    const { type, orgId } = this.props;
    const { regionsServed: { region } = {} } = this.state;
    const updatedRegions = [
      {
        organizationId: orgId,
        region: {
          regionId: data.value,
          regionName: data.label
        }
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

  // //when selected from suggested list call on submit method
  // onSuggestionSelected = (e, data) => {
  //   e.preventDefault();
  //   this.onSubmit(e, data);
  // };

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
  regionsServed: state.regionsServed,
  regionsList: regionsListSelector(state)
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
