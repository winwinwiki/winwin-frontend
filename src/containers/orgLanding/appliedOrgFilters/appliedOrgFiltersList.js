import React from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import Checkbox from "../../ui/checkbox";
import { setAppliedFilters } from "../../../actions/orgLanding/orgLandingAction";
import InputRange from "react-input-range";
import ReactSelect from "react-select";
import "react-input-range/lib/css/index.css";
import { modifiyFilterList } from "../../../util/util";
var classNames = require("classnames");

const Priority = ["normal", "high"];
const userList = [
  { value: "abc", label: "abc abc" },
  { value: "sumit", label: "sumit chaudhari" },
  { value: "Sunny", label: "Sunny tambi" }
];
const frameworkTagList = [
  { value: "Social Progress Index", label: "Social Progress Index" },
  {
    value: "Sustainable Developement Goals",
    label: "Sustainable Developement Goals"
  }
];
const industryClassification = [
  { value: "NAICS", label: "NAICS" },
  { value: "NTEE", label: "NTEE" }
];
const SubIndustryClassification = [
  { value: "1", label: "select 1" },
  { value: "2", label: "select 2" },
  { value: "3", label: "select 3" }
];
class AppliedOrgFiltersList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userMod: [],
      industryCls: "",
      subIndustryCls: "",
      frameworkTag: "",
      level1: "",
      level2: "",
      level3: "",
      sector: [],
      status: [],
      priority: "",
      revenueRange: { min: 0, max: 0 },
      assetsRange: { min: 0, max: 0 },
      level1List: [],
      level2List: [],
      level3List: []
    };
    this.onDropdownChange = this.onDropdownChange.bind(this);
    this.onFrameworkTagChange = this.onFrameworkTagChange.bind(this);
    this.onSectorCheckboxChange = this.onSectorCheckboxChange.bind(this);
    this.onStatusCheckboxChange = this.onStatusCheckboxChange.bind(this);
    this.addFiltersTag = this.addFiltersTag.bind(this);
    this.clearAppliedFilters = this.clearAppliedFilters.bind(this);
    this.onSelectChange = this.onSelectChange.bind(this);
    this.onLevel3Change = this.onLevel3Change.bind(this);
    this.onLevel2Change = this.onLevel2Change.bind(this);
    this.onLevel1Change = this.onLevel1Change.bind(this);
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
      userMod,
      sector,
      status,
      revenueRange,
      assetsRange,
      priority,
      industryCls,
      subIndustryCls,
      frameworkTag,
      level1,
      level2,
      level3,
      level1List,
      level2List,
      level3List
    } = this.state;
    const { isFilterModalVisible, activeOrg } = this.props;

    let showFilterCls = classNames(
      { show: isFilterModalVisible },
      { "dropdown-menu": true },
      { "px-3": true }
    );
    let isIndustryClsShow =
      activeOrg.indexOf("Public") > -1 && activeOrg.length === 1;
    let isSectorLevelShow =
      activeOrg.indexOf("Public") > -1 || activeOrg.indexOf("All") > -1;
    return (
      <form
        aria-labelledby="filterDropdown"
        className={showFilterCls}
        style={{ left: -500 }}
      >
        <div className="row">
          <div className="col">
            {isSectorLevelShow && <h5>Sector Level</h5>}
            {isSectorLevelShow && (
              <Checkbox
                name="federal"
                label="Federal"
                checked={sector.indexOf("federal") > -1}
                onChange={this.onSectorCheckboxChange}
              />
            )}
            {isSectorLevelShow && (
              <Checkbox
                name="state"
                label="State"
                checked={sector.indexOf("state") > -1}
                onChange={this.onSectorCheckboxChange}
              />
            )}
            {isSectorLevelShow && (
              <Checkbox
                name="county"
                label="County"
                checked={sector.indexOf("county") > -1}
                onChange={this.onSectorCheckboxChange}
              />
            )}
            {isSectorLevelShow && (
              <Checkbox
                name="city"
                label="City"
                checked={sector.indexOf("city") > -1}
                onChange={this.onSectorCheckboxChange}
              />
            )}
            {isSectorLevelShow && (
              <Checkbox
                name="district"
                label="District"
                checked={sector.indexOf("district") > -1}
                onChange={this.onSectorCheckboxChange}
              />
            )}

            <h5 className={isSectorLevelShow ? "mt-4" : ""}>Status</h5>
            <Checkbox
              name="autoTag"
              label="Auto Tag"
              checked={status.indexOf("autoTag") > -1}
              onChange={this.onStatusCheckboxChange}
            />
            <Checkbox
              name="completeTag"
              label="Complete Tag"
              checked={status.indexOf("completeTag") > -1}
              onChange={this.onStatusCheckboxChange}
            />
            <Checkbox
              name="orgTag"
              label="Organization Tag"
              checked={status.indexOf("orgTag") > -1}
              onChange={this.onStatusCheckboxChange}
            />
            <Checkbox
              name="unTaggged"
              label="Untagged"
              checked={status.indexOf("unTaggged") > -1}
              onChange={this.onStatusCheckboxChange}
            />
          </div>
          <div className="col">
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
              name="userMod"
              className="mb-3"
              classNamePrefix="react-select"
              isMulti="true"
              placeholder="Select User"
              value={userMod}
              onChange={selectedOption =>
                this.onSelectChange("userMod", selectedOption)
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
                placeholder="Select Industry Classification"
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
                placeholder="Select Sub Industry Classification"
                value={subIndustryCls}
                onChange={selectedOption =>
                  this.onSelectChange("subIndustryCls", selectedOption)
                }
                options={SubIndustryClassification}
              />
            )}
          </div>
          <div className="col">
            <h5>Revenue</h5>
            <div className="my-4">
              <InputRange
                draggableTrack
                maxValue={100}
                minValue={0}
                formatLabel={value => `$ ${value}`}
                value={revenueRange}
                onChange={value => this.setState({ revenueRange: value })}
                onChangeComplete={value => {}}
              />
            </div>
            <h5>Assets</h5>
            <div className="my-4">
              <InputRange
                draggableTrack
                maxValue={100}
                minValue={0}
                formatLabel={value => `$ ${value}`}
                value={assetsRange}
                onChange={value => this.setState({ assetsRange: value })}
                onChangeComplete={value => {}}
              />
            </div>
          </div>
          <div className="col">
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
                <h5>Level 3</h5>
              )}
            {frameworkTag &&
              frameworkTag.label === frameworkTagList[0].label && (
                <ReactSelect
                  name="level3"
                  className="mb-3"
                  classNamePrefix="react-select"
                  isMulti={false}
                  placeholder="Select Level3"
                  value={level3}
                  onChange={this.onLevel3Change}
                  options={level3List}
                />
              )}

            {frameworkTag && <h5>Level 2</h5>}
            {frameworkTag && (
              <ReactSelect
                name="level2"
                className="mb-3"
                classNamePrefix="react-select"
                isMulti={false}
                placeholder="Select Level2"
                value={level2}
                onChange={this.onLevel2Change}
                options={level2List}
              />
            )}

            {frameworkTag && <h5>Level 1</h5>}
            {frameworkTag && (
              <ReactSelect
                name="level1"
                className="mb-3"
                classNamePrefix="react-select"
                isMulti={false}
                placeholder="Select Level1"
                value={level1}
                onChange={this.onLevel1Change}
                options={level1List}
              />
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
  onLevel1Change(level1) {
    if (!Array.isArray(level1)) {
      this.setState({
        level1: level1,
        level2: "",
        level3: ""
      });
    } else {
      this.setState({
        level1: "",
        level2: "",
        level3: ""
      });
    }
  }
  onLevel2Change(level2) {
    const { frameworkTag } = this.state;
    if (
      !Array.isArray(level2) &&
      frameworkTag &&
      frameworkTag.label === frameworkTagList[1].label
    ) {
      const { SDGList } = this.props;
      let frameworkList = JSON.parse(JSON.stringify(SDGList));
      let selectedFramework;
      selectedFramework = frameworkList.find(l2 => l2.level2 === level2.label);
      this.setState({
        level1: {
          value: selectedFramework.level1Id,
          label: selectedFramework.level1
        },
        level2: { value: selectedFramework.id, label: selectedFramework.level2 }
      });
    } else if (
      !Array.isArray(level2) &&
      frameworkTag &&
      frameworkTag.label === frameworkTagList[0].label
    ) {
      this.setState({
        level1: "",
        level2: level2,
        level3: ""
      });
    } else {
      this.setState({
        level1: "",
        level2: "",
        level3: ""
      });
    }
  }
  onLevel3Change(level3) {
    if (!Array.isArray(level3)) {
      const { SPIList } = this.props;
      let frameworkList = JSON.parse(JSON.stringify(SPIList));
      let selectedFramework;
      selectedFramework = frameworkList.find(
        l3 => l3.indicator === level3.label
      );
      this.setState({
        level3: {
          value: selectedFramework.id,
          label: selectedFramework.indicator
        },
        level1: {
          value: selectedFramework.dimension,
          label: selectedFramework.dimension
        },
        level2: {
          value: selectedFramework.component,
          label: selectedFramework.component
        }
      });
    } else {
      this.setState({
        level1: "",
        level2: "",
        level3: ""
      });
    }
  }
  onDropdownChange(field, value) {
    this.setState({ [field]: value });
  }

  onSelectChange(field, value) {
    this.setState({ [field]: value });
  }

  onFrameworkTagChange(value) {
    const { SPIList, SDGList } = this.props;
    let frameworkList =
      value && value.label === frameworkTagList[0].label
        ? JSON.parse(JSON.stringify(SPIList))
        : JSON.parse(JSON.stringify(SDGList));
    let level1 = [],
      level2 = [],
      level3 = [];
    if (value && value.label === frameworkTagList[0].label) {
      level3 = frameworkList.map(l3 => {
        if (
          !(
            level1[level1.length - 1] &&
            level1[level1.length - 1].label === l3.dimension
          )
        ) {
          level1.push({ value: l3.dimension, label: l3.dimension });
        }
        if (
          !(
            level2[level2.length - 1] &&
            level2[level2.length - 1].label === l3.component
          )
        ) {
          level2.push({ value: l3.component, label: l3.component });
        }

        return { value: l3.id, label: l3.indicator };
      });
    } else if (!Array.isArray(value)) {
      level2 = frameworkList.map(l2 => {
        if (
          !(
            level1[level1.length - 1] &&
            level1[level1.length - 1].label === l2.level1
          )
        )
          level1.push({ value: l2.level1Id, label: l2.level1 });
        return { value: l2.id, label: l2.level2 };
      });
    }
    this.setState({
      frameworkTag: value,
      level1List: level1,
      level2List: level2,
      level3List: level3,
      level1: "",
      level2: "",
      level3: ""
    });
  }

  onSectorCheckboxChange(name) {
    let sectorList = JSON.parse(JSON.stringify(this.state.sector));
    let index = sectorList.indexOf(name);
    index > -1 ? sectorList.splice(index, 1) : sectorList.push(name);
    this.setState({
      sector: sectorList
    });
  }

  onStatusCheckboxChange(name) {
    let statusList = JSON.parse(JSON.stringify(this.state.status));
    let index = statusList.indexOf(name);
    index > -1 ? statusList.splice(index, 1) : statusList.push(name);
    this.setState({
      status: statusList
    });
  }

  addFiltersTag() {
    let filters = modifiyFilterList(this.state);
    this.props.setAppliedFilters(this.state, filters);
    this.props.toggleAppliedFilterModal();
  }

  clearAppliedFilters() {
    this.props.setAppliedFilters(null, {});
    this.setState({
      userMod: [],
      industryCls: "",
      subIndustryCls: "",
      frameworkTag: "",
      level1: "",
      level2: "",
      level3: "",
      sector: [],
      status: [],
      priority: "",
      revenueRange: { min: 0, max: 0 },
      assetsRange: { min: 0, max: 0 },
      level1List: [],
      level2List: [],
      level3List: []
    });
  }

  percentFormatter(v) {
    return `${v} %`;
  }

  setPriority(priority) {
    this.setState({
      priority
    });
  }
}

const mapStateToProps = state => ({
  appliedFilterList: state.orgList.appliedFilterList,
  SDGList: state.orgList.sdgList,
  SPIList: state.orgList.spiList
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
)(AppliedOrgFiltersList);
