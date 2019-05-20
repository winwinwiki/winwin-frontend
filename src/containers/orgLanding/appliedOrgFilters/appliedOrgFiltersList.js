import React, { Fragment } from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import Checkbox from "../../ui/checkbox";
import { setAppliedFilters } from "../../../actions/orgLanding/orgLandingAction";
import InputRange from "react-input-range";
import ReactSelect from "react-select";
import "react-input-range/lib/css/index.css";
import {
  modifiyFilterList,
  customNumberFormatter,
  getSPIDataByIndicators,
  getSDGDataBySubGoals
} from "../../../util/util";
import { entityList, tagStatusList } from "../../../constants";
import { fetchUsersList } from "../../../actions/userManagement/userListAction";
import {
  fetchNAICSList,
  fetchNTEEList
} from "../../../actions/orgDetail/industryClassificationAction";
import {
  fetchSdgTagsList,
  fetchSpiTagsList
} from "../../../actions/orgLanding/orgLandingAction";
import { spiTagsListSelector } from "../../../selectors/spiTagsSelector";
import { sdgTagsListSelector } from "../../../selectors/sdgTagsSelector";
import { InputGroup, InputGroupAddon, Input } from "reactstrap";
import "./filters.css";

var classNames = require("classnames");

const Priority = ["Normal", "High"];
// const userList = [
//   { value: "abc", label: "abc abc" },
//   { value: "sumit", label: "sumit chaudhari" },
//   { value: "Sunny", label: "Sunny tambi" }
// ];
export const frameworkTagList = [
  { value: "SPI", label: "Social Progress Index" },
  {
    value: "SDG",
    label: "Sustainable Developement Goals"
  }
];

const frameworkLabels = {
  "Social Progress Index": {
    level1: "Dimensions",
    level2: "Components",
    level3: "Indicators"
  },
  "Sustainable Developement Goals": {
    level1: "Goals",
    level2: "Sub-Goals"
  }
};

export const industryClassification = [
  { value: "NAICS", label: "NAICS" },
  { value: "NTEE", label: "NTEE" }
];
// const SubIndustryClassification = [
//   { value: "1", label: "select 1" },
//   { value: "2", label: "select 2" },
//   { value: "3", label: "select 3" }
// ];
class AppliedOrgFiltersList extends React.Component {
  state = {
    editedBy: [],
    industryCls: "",
    subIndustryCls: "",
    frameworkTag: "",
    level1: "",
    level2: "",
    level3: "",
    sectorLevel: [],
    tagStatus: [],
    priority: "",
    revenue: { min: 0, max: 0 },
    assets: { min: 0, max: 0 },
    level1List: [],
    level2List: [],
    level3List: []
  };

  componentDidMount() {
    this.props.fetchUsersList();
    this.props.fetchNAICSList();
    this.props.fetchNTEEList();
    this.props.fetchSpiTagsList();
    this.props.fetchSdgTagsList();
  }

  componentWillReceiveProps(nextProps) {
    // console.log('modal open');
    if (
      nextProps.appliedFilterList &&
      JSON.stringify(nextProps.appliedFilterList) !== JSON.stringify(this.state)
    ) {
      this.setState(nextProps.appliedFilterList);
    }
  }

  render() {
    const {
      editedBy,
      sectorLevel,
      tagStatus,
      revenue,
      assets,
      priority,
      industryCls,
      subIndustryCls,
      frameworkTag,
      level1,
      level2,
      level3,
      level1List
      // level2List
      // level3List
    } = this.state;
    const { isFilterModalVisible, activeOrg, orgDetail } = this.props;

    let assestsMin = 500000;
    let assestsMax = 1000000000;
    let revenueMin = 500000;
    let revenueMax = 1000000000;

    let userList = [];
    let SubIndustryClassification = [];
    let level3List = [];
    let level2List = [];
    let showFilterCls = classNames(
      { show: isFilterModalVisible },
      { "dropdown-menu": true },
      { "px-3": true }
    );
    let isIndustryClsShow =
      activeOrg.indexOf("Public") > -1 && activeOrg.length === 1;
    let isSectorLevelShow =
      activeOrg.indexOf("Public") > -1 || activeOrg.indexOf("All") > -1;

    //userLists
    if (this.props.userList.data)
      userList = this.props.userList.data.map(function(value) {
        return { value: value.email, label: value.userDisplayName };
      });

    //SubIndustryClassification lists

    if (
      this.props.NAICSList.data &&
      industryCls.value === industryClassification[0].value
    )
      SubIndustryClassification = this.props.NAICSList.data.map(function(
        value
      ) {
        return { value: value.id, label: value.name };
      });
    if (
      this.props.NTEEList.data &&
      industryCls.value === industryClassification[1].value
    )
      SubIndustryClassification = this.props.NTEEList.data.map(function(value) {
        return { value: value.id, label: value.name };
      });

    //frameworkTag
    if (
      this.props.customSPIList &&
      frameworkTag.value === frameworkTagList[0].value
    )
      level3List = this.props.customSPIList.map(value => {
        return { value: value.indicatorId, label: value.indicatorName };
      });

    if (
      this.props.customSDGList &&
      frameworkTag.value === frameworkTagList[1].value
    )
      level2List = this.props.customSDGList.map(value => {
        return { value: value.subGoalCode, label: value.subGoalName };
      });

    return (
      <form
        aria-labelledby="filterDropdown"
        className={showFilterCls}
        style={{ left: -500 }}
      >
        <div className="row">
          <div className="col col-sm-5">
            {isSectorLevelShow && <h5>Sector Level</h5>}
            {isSectorLevelShow && (
              <Checkbox
                name={entityList[0]}
                label="Federal"
                checked={sectorLevel.indexOf(entityList[0]) > -1}
                onChange={this.onSectorCheckboxChange}
              />
            )}
            {isSectorLevelShow && (
              <Checkbox
                name={entityList[1]}
                label="State"
                checked={sectorLevel.indexOf(entityList[1]) > -1}
                onChange={this.onSectorCheckboxChange}
              />
            )}
            {isSectorLevelShow && (
              <Checkbox
                name={entityList[2]}
                label="County"
                checked={sectorLevel.indexOf(entityList[2]) > -1}
                onChange={this.onSectorCheckboxChange}
              />
            )}
            {isSectorLevelShow && (
              <Checkbox
                name={entityList[3]}
                label="City"
                checked={sectorLevel.indexOf(entityList[3]) > -1}
                onChange={this.onSectorCheckboxChange}
              />
            )}
            {isSectorLevelShow && (
              <Checkbox
                name={entityList[4]}
                label="District"
                checked={sectorLevel.indexOf(entityList[4]) > -1}
                onChange={this.onSectorCheckboxChange}
              />
            )}

            <h5 className={isSectorLevelShow ? "mt-4" : ""}>Status</h5>
            <Checkbox
              name={tagStatusList[0]}
              label="Auto Tag"
              checked={tagStatus.indexOf(tagStatusList[0]) > -1}
              onChange={this.onStatusCheckboxChange}
            />
            <Checkbox
              name={tagStatusList[1]}
              label="Complete Tag"
              checked={tagStatus.indexOf(tagStatusList[1]) > -1}
              onChange={this.onStatusCheckboxChange}
            />
            <Checkbox
              name={tagStatusList[2]}
              label="Organization Tag"
              checked={tagStatus.indexOf(tagStatusList[2]) > -1}
              onChange={this.onStatusCheckboxChange}
            />
            <Checkbox
              name={tagStatusList[3]}
              label="Untagged"
              checked={tagStatus.indexOf(tagStatusList[3]) > -1}
              onChange={this.onStatusCheckboxChange}
            />
          </div>
          <div className="col col-sm-6">
            <h5>Priority</h5>
            <div className="btn-group btn-group-toggle mb-4">
              <label
                className={`btn btn-outline-secondary ${
                  priority === Priority[0] ? "active" : ""
                }`}
                onClick={this.setPriority.bind(this, Priority[0])}
              >
                <input
                  type="radio"
                  name="options"
                  id="normal"
                  autoComplete="off"
                />{" "}
                Normal
              </label>
              <label
                className={`btn btn-outline-secondary ${
                  priority === Priority[1] ? "active" : ""
                }`}
                onClick={this.setPriority.bind(this, Priority[1])}
              >
                <input
                  type="radio"
                  name="options"
                  id="high"
                  autoComplete="off"
                />{" "}
                High
              </label>
            </div>

            <h5>Edited by User</h5>
            <ReactSelect
              name="editedBy"
              className="mb-3"
              classNamePrefix="react-select"
              isMulti="true"
              placeholder="Select User"
              value={editedBy}
              onChange={selectedOption =>
                this.onSelectChange("editedBy", selectedOption)
              }
              options={userList}
              closeMenuOnSelect="false"
            />

            {!isIndustryClsShow && <h5>Industry Classification</h5>}
            {!isIndustryClsShow && (
              <ReactSelect
                name="industryCls"
                className="mb-3"
                classNamePrefix="react-select"
                isMulti={false}
                placeholder="Select Industry"
                value={industryCls}
                onChange={selectedOption =>
                  this.onSelectChange("industryCls", selectedOption)
                }
                options={industryClassification}
              />
            )}

            {!isIndustryClsShow && (
              <ReactSelect
                name="subIndustryCls"
                className="mb-3"
                classNamePrefix="react-select"
                isMulti={false}
                placeholder="Select Sub Industry"
                value={subIndustryCls}
                onChange={selectedOption =>
                  this.onSelectChange("subIndustryCls", selectedOption)
                }
                options={SubIndustryClassification}
              />
            )}
          </div>
          <div className="col col-sm-7">
            <h5>Revenue</h5>
            <div className="input-group mb-3 my-4">
              <div className="input-group-prepend">
                <span className="input-group-text">$</span>
              </div>
              <input
                type="number"
                className="form-control mr-3"
                placeholder="min"
                onChange={e =>
                  this.setState({
                    revenue: { ...this.state.revenue, min: e.target.value }
                  })
                }
              />
              <span className="mt-2">to</span>
              <div className="input-group-prepend ml-3">
                <span className="input-group-text">$</span>
              </div>
              <input
                type="number"
                className="form-control"
                placeholder="max"
                onChange={e =>
                  this.setState({
                    revenue: { ...this.state.revenue, max: e.target.value }
                  })
                }
              />
              {/* <InputRange
                draggableTrack
                step={2500000}
                maxValue={revenueMax}
                minValue={revenueMin}
                formatLabel={value => `$ ${customNumberFormatter(value, 2)}`}
                value={revenue}
                onChange={value => {
                  const processedValues = { ...value };

                  if (processedValues.min < revenueMin) {
                    processedValues.min = revenueMin;
                  }

                  if (processedValues.max > revenueMax) {
                    processedValues.max = revenueMax;
                  }

                  this.setState({ revenue: processedValues });
                }}
                onChangeComplete={value => {}}
              /> */}
            </div>
            <h5>Assets</h5>
            {/* <div className="my-4">
              <InputRange
                draggableTrack
                step={2500000}
                maxValue={assestsMax}
                minValue={assestsMin}
                formatLabel={value => `$ ${customNumberFormatter(value, 2)}`}
                value={assets}
                onChange={value => {
                  const processedValues = { ...value };

                  if (processedValues.min < assestsMin) {
                    processedValues.min = assestsMin;
                  }

                  if (processedValues.max > assestsMax) {
                    processedValues.max = assestsMax;
                  }

                  this.setState({ assets: processedValues });
                }}
                onChangeComplete={value => {}}
              />
            </div> */}
            <div className="input-group mb-3 my-4">
              <div className="input-group-prepend">
                <span className="input-group-text">$</span>
              </div>
              <input
                type="number"
                className="form-control mr-3"
                placeholder="min"
                onChange={e =>
                  this.setState({
                    assets: { ...this.state.revenue, min: e.target.value }
                  })
                }
              />
              <span className="mt-2">to</span>
              <div className="input-group-prepend ml-3">
                <span className="input-group-text">$</span>
              </div>
              <input
                type="number"
                className="form-control"
                placeholder="max"
                onChange={e =>
                  this.setState({
                    assets: { ...this.state.revenue, max: e.target.value }
                  })
                }
              />
            </div>
          </div>
          <div className="col col-sm-6">
            <h5>Framework Tag</h5>
            <ReactSelect
              name="frameworkTag"
              className="mb-3"
              classNamePrefix="react-select"
              isMulti={false}
              placeholder="Select Framework Tag"
              value={frameworkTag}
              onChange={this.onFrameworkTagChange}
              options={frameworkTagList}
            />

            {frameworkTag &&
              frameworkTag.label === frameworkTagList[0].label && (
                <h5>{frameworkLabels[frameworkTag.label].level3}</h5>
              )}
            {frameworkTag &&
              frameworkTag.label === frameworkTagList[0].label && (
                <ReactSelect
                  name="level3"
                  className="mb-3"
                  classNamePrefix="react-select"
                  isMulti={false}
                  placeholder="Select Level 3"
                  value={level3}
                  onChange={this.onLevel3Change}
                  options={level3List}
                />
              )}

            {frameworkTag && (
              <Fragment>
                <h5>{frameworkLabels[frameworkTag.label].level2}</h5>
                <ReactSelect
                  name="level2"
                  className="mb-3"
                  classNamePrefix="react-select"
                  isMulti={false}
                  placeholder="Select Level 2"
                  value={level2}
                  onChange={this.onLevel2Change}
                  options={level2List}
                />

                <h5>{frameworkLabels[frameworkTag.label].level1}</h5>
                <ReactSelect
                  name="level1"
                  className="mb-3"
                  classNamePrefix="react-select"
                  isMulti={false}
                  placeholder="Select Level 1"
                  value={level1}
                  onChange={this.onLevel1Change}
                  options={level1List}
                />
              </Fragment>
            )}
          </div>
        </div>
        <div className="row mt-5">
          <div className="col justify-content-end d-flex">
            <button
              type="button"
              className="btn btn-link"
              onClick={this.clearAppliedFilters}
            >
              Reset Filters
            </button>
            <button
              type="button"
              className="btn btn-primary"
              onClick={this.addFiltersTag}
            >
              Done
            </button>
          </div>
        </div>
      </form>
    );
  }

  onLevel2Change = level2 => {
    let sdg = getSDGDataBySubGoals(this.props.SDGList.response, level2.value);

    this.setState({
      level2,
      level1: { value: sdg.goalCode, label: sdg.goalName }
    });
  };

  onLevel3Change = level3 => {
    let spi = getSPIDataByIndicators(this.props.SPIList.response, level3.value);

    this.setState({
      level3: { value: spi.indicatorId, label: spi.indicatorName },
      level2: { value: spi.componentId, label: spi.componentName },
      level1: { value: spi.dimensionId, label: spi.dimensionName }
    });
  };
  onDropdownChange = (field, value) => {
    this.setState({ [field]: value });
  };

  onSelectChange = (field, value) => {
    this.setState({ [field]: value });
  };

  onFrameworkTagChange = value => {
    this.setState({
      frameworkTag: value,
      level1: "",
      level2: "",
      level3: ""
    });
  };

  onSectorCheckboxChange = name => {
    let sectorList = JSON.parse(JSON.stringify(this.state.sectorLevel));
    let index = sectorList.indexOf(name);
    index > -1 ? sectorList.splice(index, 1) : sectorList.push(name);
    this.setState({
      sectorLevel: sectorList
    });
  };

  onStatusCheckboxChange = name => {
    let statusList = JSON.parse(JSON.stringify(this.state.tagStatus));
    let index = statusList.indexOf(name);
    index > -1 ? statusList.splice(index, 1) : statusList.push(name);
    this.setState({
      tagStatus: statusList
    });
  };

  addFiltersTag = () => {
    let filters = modifiyFilterList(this.state);
    this.props.setAppliedFilters(this.state, filters);
    this.props.toggleAppliedFilterModal();
  };

  clearAppliedFilters = () => {
    this.props.setAppliedFilters(null, {});
    this.setState({
      editedBy: [],
      industryCls: "",
      subIndustryCls: "",
      frameworkTag: "",
      level1: "",
      level2: "",
      level3: "",
      sectorLevel: [],
      tagStatus: [],
      priority: "",
      revenue: { min: 0, max: 0 },
      assets: { min: 0, max: 0 },
      level1List: [],
      level2List: [],
      level3List: []
    });
  };

  percentFormatter = v => {
    return `${v} %`;
  };

  setPriority = priority => {
    this.setState({
      priority
    });
  };
}

const mapStateToProps = state => ({
  appliedFilterList: state.orgList.appliedFilterList,
  customSDGList: sdgTagsListSelector(state),
  customSPIList: spiTagsListSelector(state),
  SPIList: state.orgList.spiList,
  SDGList: state.orgList.sdgList,
  NAICSList: state.naicsList,
  NTEEList: state.nteeList,
  userList: state.userManagement
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      setAppliedFilters,
      fetchUsersList,
      fetchNAICSList,
      fetchNTEEList,
      fetchSdgTagsList,
      fetchSpiTagsList
    },
    dispatch
  );

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AppliedOrgFiltersList);
