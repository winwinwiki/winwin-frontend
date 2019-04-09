import React, { Component, Fragment } from "react";
import Geosuggest from "react-geosuggest";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import filter from "lodash/filter";
import {
  startLoaderAction,
  stopLoaderAction
} from "../../../actions/common/loaderActions";

import {
  saveOrgRegionsServed,
  fetchOrgRegionsServed,
  removeRegionAction,
  resetRegionsAction,
  updateRegionsAction
} from "../../../actions/orgDetail/regionsServedAction";

const addressComponents = {
  street_number: "short_name",
  route: "long_name",
  locality: "long_name",
  administrative_area_level_1: "long_name",
  administrative_area_level_2: "long_name",
  country: "long_name",
  postal_code: "short_name"
};

class RegionsServed extends Component {
  state = {
    location: null,
    isEdited: false,
    newRegions: [],
    regionsServed: {
      data: {}
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

  render() {
    const { isEdited } = this.state;
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
            <p>
              Arts center conducts classes on any artistic or cultural topics
              ranging from ?crafts, dance, singing, painting. Camps for youth
              and adults and events ?open to the public. They also offer open
              space for private events.
            </p>

            <div className="section-title">Regions Served</div>
            <form>
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
                  <Geosuggest
                    ref={el => (this._geoSuggest = el)}
                    placeholder="Search regions (for ex. Seattle, WA, USA)"
                    initialValue=""
                    className="form-control position-relative mt-2"
                    fixtures={[]}
                    onSuggestSelect={suggest => {
                      if (suggest) this.onSuggestSelect(suggest.label);
                    }}
                  />
                )}
                {isEdited &&
                  regionsServedList.map((region, idx) => {
                    const {
                      address: { city, state, country } = {},
                      isActive
                    } = region;
                    return isActive ? (
                      <div className="row mt-2" key={idx}>
                        <div className="col-sm-22">
                          {city}, {state}, {country}
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
                    const {
                      address: { city, state, country } = {},
                      isActive
                    } = region;
                    return isActive ? (
                      <li className="mt-2" key={idx}>
                        {" "}
                        {city}, {state}, {country}{" "}
                      </li>
                    ) : (
                      ""
                    );
                  })}
                {isEdited && (
                  <div className="modal-footer">
                    <button
                      type="button"
                      className="btn btn-secondary"
                      data-dismiss="modal"
                      onClick={this.onClose}
                    >
                      Close
                    </button>
                    <button
                      type="submit"
                      onClick={this.saveRegions}
                      data-dismiss="modal"
                      className="btn btn-primary"
                    >
                      Save changes
                    </button>
                  </div>
                )}
              </ul>
            </form>
          </div>
        </div>
      </section>
    );
  }

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
    this.setState({
      isEdited: true
    });
  };

  deleteRegion = id => {
    this.props.removeRegionAction(id);
  };

  onSuggestSelect = place => {
    this._geoSuggest.clear(); //clear inputtext
    const {
      regionsServed: { data: { response: regionsServedList } = {} } = {}
    } = this.props;
    let placesObj = {};

    //convert places api response to extract address properties
    const { gmaps: { address_components } = {}, placeId } = place;
    for (let i = 0; i < address_components.length; i++) {
      let addressType = address_components[i].types[0];
      if (addressComponents[addressType]) {
        let val = address_components[i][addressComponents[addressType]];
        placesObj[addressType] = typeof val !== undefined ? val : null;
      }
    }
    const {
      administrative_area_level_1,
      administrative_area_level_2,
      country,
      locality,
      postal_code,
      street_number,
      route
    } = placesObj;

    let apiObj = {
      organizationId: this.props.orgId,
      isActive: true,
      address: {
        placeId,
        street:
          street_number && !route
            ? street_number
            : !street_number && route
            ? route
            : street_number && route
            ? street_number + " " + route
            : null,
        state: administrative_area_level_1,
        county: administrative_area_level_2 || null,
        country,
        city: locality || null,
        zip: postal_code || null
      }
    };

    //add only unique addresses according to placeId
    if (!regionsServedList.filter(x => x.address.placeId === placeId).length) {
      this.props.updateRegionsAction(apiObj);
    }
    this.setState({
      location: place
    });
  };
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
      stopLoaderAction
    },
    dispatch
  );

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(RegionsServed);
