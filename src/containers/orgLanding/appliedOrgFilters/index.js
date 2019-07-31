import React from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { setAppliedFilters } from "../../../actions/orgLanding/orgLandingAction";
import { modifiyFilterList } from "../../../util/util";
import { CITY, COUNTY, STATE, COUNTRY } from "../../../constants";

class AppliedOrgFilters extends React.Component {
  constructor(props) {
    super(props);
    this.removeFilter = this.removeFilter.bind(this);
  }

  render() {
    const { appliedFilterList } = this.props;
    if (!appliedFilterList) {
      return null;
    }
    let valueArr = this.filterTagList();
    let tagCount = this.calculateTagCount(valueArr);
    return (
      <div className="applied-filters col align-items-center d-flex">
        {this.createTag(valueArr)}
        {/* {appliedFilterList.map(filter => <span className="badge badge-pill badge-secondary"> {filter} <a href="javascript:;" className=""><i className="icon-close"></i></a></span>)} */}
        {!tagCount && <span> No filters applied</span>}
        {tagCount > 4 && (
          <a
            href="javascript:;"
            className="dropdown-toggle plain text-primary"
            role="button"
            id="dropdownMenuLink1"
            data-toggle="dropdown"
            aria-haspopup="true"
            aria-expanded="false"
          >
            + {tagCount - 4} More
          </a>
        )}
        {tagCount > 4 && (
          <div
            className="dropdown-menu dropdown-menu-left"
            aria-labelledby="dropdownMenuLink1"
          >
            {this.createMoreTag(valueArr)}
          </div>
        )}
      </div>
    );
  }

  calculateTagCount(valueArr) {
    const { appliedFilterList } = this.props;
    let count =
      valueArr.length +
      appliedFilterList["tagStatus"].length +
      appliedFilterList["sectorLevel"].length +
      appliedFilterList["editedBy"].length +
      appliedFilterList["createdBy"].length;
    if (
      appliedFilterList["revenue"].min >= 0 &&
      appliedFilterList["revenue"].max > 0
    ) {
      count++;
    }
    if (
      appliedFilterList["assets"].min >= 0 &&
      appliedFilterList["assets"].max > 0
    ) {
      count++;
    }
    if (
      appliedFilterList[CITY].length ||
      appliedFilterList[COUNTY].length ||
      appliedFilterList[STATE].length ||
      appliedFilterList[COUNTRY].length
    ) {
      count++;
    }
    return count;
  }

  createTag(valueArr) {
    const { appliedFilterList } = this.props;
    let count = 0;
    let flatUserModArray = appliedFilterList["editedBy"].map(user => {
      return { type: "editedBy", value: user.label };
    });
    let flatCreatedByArray = appliedFilterList["createdBy"].map(user => {
      return { type: "createdBy", value: user.label };
    });
    let flatStatusArray = appliedFilterList["tagStatus"].map(tagStatus => {
      return { type: "tagStatus", value: tagStatus };
    });
    let flatSectorArray = appliedFilterList["sectorLevel"].map(sectorLevel => {
      return { type: "sectorLevel", value: sectorLevel };
    });
    let flatAssetsObj = {};
    let flatRevenueObj = {};
    let flatCityArray = appliedFilterList[CITY] && [
      { type: CITY, value: `City: ${appliedFilterList[CITY]}` }
    ];
    let flatCountyrArray = appliedFilterList[COUNTY] && [
      { type: COUNTY, value: `County: ${appliedFilterList[COUNTY]}` }
    ];
    let flatStateArray = appliedFilterList[STATE] && [
      { type: STATE, value: `State: ${appliedFilterList[STATE]}` }
    ];
    let flatCountryArray = appliedFilterList[COUNTRY] && [
      {
        type: COUNTRY,
        value: `Country: ${appliedFilterList[COUNTRY]}`
      }
    ];

    if (
      appliedFilterList["revenue"].min >= 0 &&
      appliedFilterList["revenue"].max > 0
    ) {
      flatRevenueObj = [
        {
          type: "revenue",
          value: `Revenue: $${appliedFilterList["revenue"].min} - $${
            appliedFilterList["revenue"].max
          }`
        }
      ];
    }

    if (
      appliedFilterList["assets"].min >= 0 &&
      appliedFilterList["assets"].max > 0
    ) {
      flatAssetsObj = [
        {
          type: "assets",
          value: `Assets: $${appliedFilterList["assets"].min} - $${
            appliedFilterList["assets"].max
          }`
        }
      ];
    }

    //save only bottom most level of data for framework tags
    valueArr = [valueArr[valueArr.length - 1]];

    let tagValues =
      flatUserModArray &&
      flatCreatedByArray &&
      flatStatusArray &&
      flatSectorArray &&
      flatRevenueObj &&
      flatAssetsObj
        ? // flatCityArray &&
          // flatCountyrArray &&
          // flatStateArray &&
          // flatCountryArray
          [
            ...valueArr,
            ...flatCreatedByArray,
            ...flatUserModArray,
            ...flatStatusArray,
            ...flatSectorArray,
            ...flatRevenueObj,
            ...flatAssetsObj,
            ...flatCityArray,
            ...flatCountyrArray,
            ...flatStateArray,
            ...flatCountryArray
          ]
        : valueArr;
    return tagValues.map((val, idx) => {
      if (val && count <= 3) {
        count++;
        return (
          <span key={idx} className="badge badge-pill badge-secondary">
            {" "}
            {val.value}
            <a
              href="javascript:;"
              className=""
              onClick={() => this.removeFilter(val.type, val.value)}
            >
              <i className="icon-close" />
            </a>
          </span>
        );
      }
    });
  }
  createMoreTag(valueArr) {
    const { appliedFilterList } = this.props;
    let count = 0;
    let flatUserModArray = appliedFilterList["editedBy"].map(user => {
      return { type: "editedBy", value: user.label };
    });
    let flatCreatedByArray = appliedFilterList["createdBy"].map(user => {
      return { type: "createdBy", value: user.label };
    });
    let flatStatusArray = appliedFilterList["tagStatus"].map(tagStatus => {
      return { type: "tagStatus", value: tagStatus };
    });
    let flatSectorArray = appliedFilterList["sectorLevel"].map(sectorLevel => {
      return { type: "sectorLevel", value: sectorLevel };
    });
    let flatAssetsObj = {};
    let flatRevenueObj = {};
    let flatCityArray = appliedFilterList[CITY] && [
      { type: CITY, value: `City: ${appliedFilterList[CITY]}` }
    ];
    let flatCountyrArray = appliedFilterList[COUNTY] && [
      { type: COUNTY, value: `County: ${appliedFilterList[COUNTY]}` }
    ];
    let flatStateArray = appliedFilterList[STATE] && [
      { type: STATE, value: `State: ${appliedFilterList[STATE]}` }
    ];
    let flatCountryArray = appliedFilterList[COUNTRY] && [
      {
        type: COUNTRY,
        value: `Country: ${appliedFilterList[COUNTRY]}`
      }
    ];
    if (
      appliedFilterList["revenue"].min >= 0 &&
      appliedFilterList["revenue"].max > 0
    ) {
      flatRevenueObj = [
        {
          type: "revenue",
          value: `Revenue: $${appliedFilterList["revenue"].min} - $${
            appliedFilterList["revenue"].max
          }`
        }
      ];
    }

    if (
      appliedFilterList["assets"].min >= 0 &&
      appliedFilterList["assets"].max > 0
    ) {
      flatAssetsObj = [
        {
          type: "assets",
          value: `Assets: $${appliedFilterList["assets"].min} - $${
            appliedFilterList["assets"].max
          }`
        }
      ];
    }
    //save only bottom most level of data for framework tags
    valueArr = [valueArr[valueArr.length - 1]];
    let tagValues =
      flatUserModArray &&
      flatCreatedByArray &&
      flatStatusArray &&
      flatSectorArray &&
      flatRevenueObj &&
      flatAssetsObj
        ? // flatCityArray &&
          // flatCountyrArray &&
          // flatStateArray &&
          // flatCountryArray
          [
            ...valueArr,
            ...flatCreatedByArray,
            ...flatUserModArray,
            ...flatStatusArray,
            ...flatSectorArray,
            ...flatRevenueObj,
            ...flatAssetsObj,
            ...flatCityArray,
            ...flatCountyrArray,
            ...flatStateArray,
            ...flatCountryArray
          ]
        : valueArr;
    return tagValues.map((val, idx) => {
      if (val) {
        if (count > 3) {
          return (
            <span key={idx} className="badge badge-pill badge-secondary">
              {" "}
              {val.value}
              <a
                href="javascript:;"
                className=""
                onClick={() => this.removeFilter(val.type, val.value)}
              >
                <i className="icon-close" />
              </a>
            </span>
          );
        }
        count++;
      }
    });
  }

  filterTagList() {
    const { appliedFilterList } = this.props;
    return Object.keys(appliedFilterList)
      .map((filterKey, idx) => {
        switch (filterKey) {
          case "priority":
            return !appliedFilterList[filterKey]
              ? null
              : { type: filterKey, value: appliedFilterList[filterKey] };
          case "subIndustryCls":
          case "industryCls":
          case "frameworkTag":
          case "level1":
          case "level2":
          case "level3":
            return !appliedFilterList[filterKey]
              ? null
              : { type: filterKey, value: appliedFilterList[filterKey].label };
          case "revenueRange":
          case "assetsRange":
            return !appliedFilterList[filterKey]["max"]
              ? null
              : {
                  type: filterKey,
                  value: `$ ${appliedFilterList[filterKey]["min"]} - $ ${
                    appliedFilterList[filterKey]["max"]
                  }`
                };
          default:
            break;
        }
      })
      .filter(key => key);
  }

  removeFilter(type, value) {
    const { appliedFilterList } = this.props;
    let filterList = Object.assign({}, appliedFilterList);
    Object.keys(filterList).map((filterKey, idx) => {
      if (type === filterKey) {
        switch (type) {
          case "frameworkTag":
            filterList[type] = "";
            filterList["level1"] = "";
            filterList["level2"] = "";
            filterList["level3"] = "";
            break;
          case "level1":
            filterList[type] = "";
            filterList["level2"] = "";
            filterList["level3"] = "";
            break;
          case "level2":
            filterList["frameworkTag"] = "";
            filterList["level1"] = "";
            filterList["level2"] = "";
            filterList["level3"] = "";
            break;
          case "level3":
            filterList["frameworkTag"] = "";
            filterList["level1"] = "";
            filterList["level2"] = "";
            filterList["level3"] = "";
          case "priority":
          case "subIndustryCls":
          case "industryCls":
            filterList[type] = "";
            break;
          case "revenue":
            filterList["revenue"].min = 0;
            filterList["revenue"].max = 0;
            break;
          case "assets":
            filterList["assets"].min = 0;
            filterList["assets"].max = 0;
            break;
          case "editedBy":
            filterList[type] = filterList[type].filter(
              item => item.label !== value
            );
            break;
          case "createdBy":
            filterList[type] = filterList[type].filter(
              item => item.label !== value
            );
            break;
          case "tagStatus":
          case "sectorLevel":
            filterList[type].splice(filterList[type].indexOf(value), 1);
            break;
          case CITY:
            filterList[CITY] = "";
            break;
          case COUNTY:
            filterList[COUNTY] = "";
            break;
          case STATE:
            filterList[STATE] = "";
            break;
          case COUNTRY:
            filterList[COUNTRY] = "";
            break;
          default:
            break;
        }
      }
    });
    if (!filterList.pageNo && !filterList.pageSize) {
      filterList.pageNo = 0;
      filterList.pageSize = 10;
    }
    this.props.setAppliedFilters(filterList, modifiyFilterList(filterList));
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
)(AppliedOrgFilters);
