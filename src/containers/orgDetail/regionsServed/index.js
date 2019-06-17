import React, { Component, Fragment } from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";

import debounce from "lodash/debounce";
import {
  saveOrgRegionsServed,
  fetchOrgRegionsServed,
  removeRegionAction,
  resetRegionsAction,
  updateRegionsAction,
  // fetchRegionsList,
  _loadRegionsMaster
} from "../../../actions/orgDetail/regionsServedAction";
import Can from "../../Can";
import { regionsListSelector } from "../../../selectors/regionsListSelector";

import FilterableSelect from "../../common/virtualizedSelect";
import { PROGRAM } from "../../../constants";
import { mapOptionsToRegions } from "../../../util/util";

class RegionsServed extends Component {
  state = {
    isEdited: false,
    isLoading: false,
    suggestions: [],
    regionsList: [],
    pageNo: 0,
    pageSize: 10,
    regionsServed: {
      region: { regionName: "" }
    }
  };

  componentDidMount() {
    const { orgId, programId, type } = this.props;
    this.props.fetchOrgRegionsServed(
      type === PROGRAM ? programId : orgId,
      type
    );
    //rba
    if (
      Can({
        role: this.props.user.role,
        perform: "organizationDetailsRegionsServed:edit"
      })
    )
      this.onEdit();
  }

  onChange = (name, valObj) => {
    const { regionsServed, masterRegionsList } = this.state;
    regionsServed.region[name] = valObj.label;

    if (valObj) {
      //to find the regionId from masters region list
      let filteredRegion = masterRegionsList.find(x => {
        return x.regionId === valObj.value ? x : "";
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
      this.setState({ regionsServed }, () => this.onSubmit());
    }
  };

  render() {
    const {
      isEdited,
      regionsServed: { region: { regionId, regionName } = {} } = {},
      pageNo,
      pageSize
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
                {isEdited && (
                  <div className="row mt-2">
                    <div className="col-sm-22">
                      <FilterableSelect
                        async
                        className="position-relative mt-2"
                        name="regionName"
                        placeholder="Search regions (for ex. Seattle, Washington, United States)"
                        options={this.state.regionsList || []}
                        backspaceRemoves={false}
                        onSuggestChange={this.onChange}
                        counter={100}
                        loadOptions={(input, callback) =>
                          this._getOptionsAsync(
                            input,
                            callback,
                            pageNo,
                            pageSize
                          )
                        }
                        isValidNewOption={(
                          inputValue,
                          selectValue,
                          selectOptions
                        ) => {
                          const isNotDuplicated = !selectOptions
                            .map(option => option.label)
                            .includes(inputValue);
                          const isNotEmpty = inputValue !== "";
                          return isNotEmpty && isNotDuplicated;
                        }}
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

  fetchDebouncedRecords = debounce(
    (type, orgId, programId, input, callback, pageNo, pageSize) => {
      _loadRegionsMaster(type === PROGRAM ? programId : orgId, type, {
        pageNo: 0,
        pageSize: 2147483647,
        nameSearch: input
      })
        .then(res => {
          const regionsList = mapOptionsToRegions(res.response);
          this.setState({ regionsList, masterRegionsList: res.response });
          callback(regionsList);
        })
        .catch(error => callback(error, null));
    },
    1000
  );

  _getOptionsAsync = (input, callback, pageNo, pageSize) => {
    const { orgId, programId, type } = this.props;
    if (input.length >= 3)
      this.fetchDebouncedRecords(
        type,
        orgId,
        programId,
        input,
        callback,
        pageNo,
        pageSize
      );
  };

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

  onSubmit = () => {
    const { type, orgId, programId } = this.props;
    const {
      regionsServed: { region: { regionId, regionName } } = {}
    } = this.state;
    const updatedRegions = [
      {
        organizationId: orgId,
        region: {
          regionId,
          regionName
        }
      }
    ];
    if (type === PROGRAM) {
      updatedRegions[0].programId = programId;
    }

    this.props.saveOrgRegionsServed(updatedRegions, orgId, type, programId);
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
    const { orgId, programId, type } = this.props;
    this.props.fetchOrgRegionsServed(type === PROGRAM ? programId : orgId);
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
    const {
      orgId,
      type,
      programId,
      regionsServed: { data: { response: updatedRegions } = {} } = {}
    } = this.props;

    let filteredRegion = updatedRegions
      .filter(x => x.id === id)
      .map(val => {
        val.isActive = false;
        return val;
      });

    this.props.saveOrgRegionsServed(filteredRegion, orgId, type, programId);
  };
}

const mapStateToProps = state => ({
  regionsServed: state.regionsServed
  // regionsList: regionsListSelector(state)
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      saveOrgRegionsServed,
      fetchOrgRegionsServed,
      removeRegionAction,
      resetRegionsAction,
      updateRegionsAction
      // fetchRegionsList
    },
    dispatch
  );

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(RegionsServed);
