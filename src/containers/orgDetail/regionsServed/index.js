import React from "react";
import Geosuggest from "react-geosuggest";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";

import {
  saveOrgRegionsServed,
  fetchOrgRegionsServed,
  removeOrgRegionsServed
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

class RegionsServed extends React.Component {
  constructor(props) {
    super(props);
    this._geoSuggest = null;
    this.state = {
      location: null,
      isEdited: false,
      addressObj: {}
    };
    this.onSuggestSelect = this.onSuggestSelect.bind(this);
    this.deleteRegion = this.deleteRegion.bind(this);
    this.onEdit = this.onEdit.bind(this);
  }

  componentDidMount() {
    this.props.fetchOrgRegionsServed(this.props.orgId);
  }

  render() {
    const { isEdited } = this.state;
    const { regionsServed } = this.props;
    if (!regionsServed || !regionsServed.data || regionsServed.error) {
      return null;
    }
    const { data: { response: regionsServedList } = {} } = regionsServed;
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
                    onSuggestSelect={this.onSuggestSelect}
                  />
                )}
                {isEdited &&
                  regionsServedList.map((region, idx) => {
                    const { address: { city, state, country } = {} } = region;
                    return (
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
                    );
                  })}
                {!isEdited &&
                  regionsServedList.map((region, idx) => {
                    const { address: { city, state, country } = {} } = region;

                    return (
                      <li className="mt-2" key={idx}>
                        {" "}
                        {city}, {state}, {country}{" "}
                      </li>
                    );
                  })}
              </ul>
            </form>
          </div>
        </div>
      </section>
    );
  }

  onEdit() {
    this.setState({
      isEdited: true
    });
  }

  deleteRegion(id) {
    const { orgId } = this.props;
    const apiObj = {
      id,
      isActive: false
    };
    this.props.removeOrgRegionsServed({ apiObj, orgId });
  }

  onSuggestSelect(place) {
    let { addressObj } = this.state;
    let placesObj = {};
    const { gmaps: { address_components } = {} } = place;
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

    const apiObj = {
      organizationId: this.props.orgId,
      address: {
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
    this.props.saveOrgRegionsServed(apiObj);
    this.setState({
      location: place,
      addressObj
    });
  }
}

const mapStateToProps = state => ({
  regionsServed: state.regionsServed
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      saveOrgRegionsServed,
      fetchOrgRegionsServed,
      removeOrgRegionsServed
    },
    dispatch
  );

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(RegionsServed);
