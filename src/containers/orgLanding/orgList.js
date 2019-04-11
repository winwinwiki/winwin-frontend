import React, { Fragment } from "react";
import { push } from "react-router-redux";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import ReactTable from "react-table";
import matchSorter from "match-sorter";
import "react-table/react-table.css";
import OrgFilters from "./orgFilter";
import AppliedOrgFilters from "./appliedOrgFilters/index";
import Dropdown from "../ui/dropdown";
import { onSaveOrgBasicInfo } from "../../actions/orgDetail/orgDetailAction";
import {
  fetchOrganisationsList,
  fetchSdgTagsList,
  fetchSpiTagsList,
  setAppliedFilters
} from "../../actions/orgLanding/orgLandingAction";
import {
  startLoaderAction,
  stopLoaderAction
} from "../../actions/common/loaderActions";

import { onDeleteOrg } from "../../actions/organization/deleteOrgAction";
import { Link } from "react-router-dom";
import { PopupModal } from "../ui/popupModal";

const setPriorityHigh = "Set Priority High";
const setPriorityNormal = "Set Priority Normal";
const markReadyForTagging = "Mark 'Ready for Tagging'";

const filterList = [setPriorityHigh, setPriorityNormal, markReadyForTagging];

const priorityStatus = {
  "Set Priority High": "High",
  "Set Priority Normal": "Normal",
  "Mark 'Ready for Tagging'": "Untagged"
};

const buttonList = [
  { id: "all", name: "All" },
  { id: "public", name: "Public" },
  { id: "private", name: "Private" },
  { id: "social", name: "Social" }
];

const tagIcon = {
  autoTag: "A",
  completeTag: "C",
  organizationTag: "O",
  untagged: "U"
};

const tagColor = {
  Normal: "green",
  High: "red"
};

class OrgList extends React.Component {
  state = {
    entity: "",
    orgList: [],
    activeButton: ["All"],
    searchText: "",
    selectedOrgList: []
  };

  componentDidMount() {
    this.props.startLoaderAction();
    this.props.fetchOrganisationsList();
  }

  componentDidUpdate(prevProps) {
    if (prevProps.orgList !== this.props.orgList && this.props.orgList.data) {
      console.log("new org list received 2", this.props.orgList);
      //if (!this.props.orgList.error) {
      this.setState({
        orgList: this.props.orgList.data.response
      });
      //} else {
      //}
      this.props.stopLoaderAction();
    }
  }

  // componentWillReceiveProps(nextProps) {
  //   if (nextProps && nextProps.orgList !== this.props.orgList) {
  //     console.log("new org list received 1", nextProps.orgList);
  //     if (!nextProps.orgList.error) {
  //       this.setState({
  //         orgList: nextProps.orgList.data.response
  //       });
  //     } else {
  //     }
  //     this.props.stopLoaderAction();
  //   }
  // }

  columns = [
    {
      id: "select",
      Header: (
        <span>
          <input type="checkbox" />
        </span>
      ),
      accessor: "id",
      sortable: false,
      Cell: row => (
        <div className="centerText">
          <input
            type="checkbox"
            onClick={e => this.onSelectCheckbox(e, row.value)}
          />
        </div>
      ),
      width: 50
    },
    {
      id: "org",
      Header: "Organisation Name",
      accessor: "name",
      Cell: row => (
        <React.Fragment>
          <div className="d-inline-block mr-5">
            <div className="px-1 py-0">
              <h1
                className={`org-tag ${
                  row.original.priority ? tagColor[row.original.priority] : ""
                }`}
              >
                {row.original.tagStatus
                  ? tagIcon[row.original.tagStatus]
                  : tagIcon["autoTag"]}
              </h1>
            </div>
            {/* <div className="org-tag-footer" /> */}
          </div>
          <Link
            className="centerText d-inline-block"
            to={"organizations/" + row.original.id}
          >
            {row.value}
          </Link>
        </React.Fragment>
      ),
      // Cell: row => {
      //   return (
      //     <React.Fragment>
      //       <div className="org-tag orange card d-inline-block mr-1">
      //         <div className="px-1 py-0">A</div>
      //         <div className="org-tag-footer" />
      //       </div>
      //       <a href={row.id} className="centerText d-inline-block">{row.value}</a>
      //     </React.Fragment>
      //   );
      // },
      sortable: true,
      filterable: true,
      filterMethod: (filter, rows) => {
        return matchSorter(rows, filter.value, {
          keys: [
            {
              threshold: matchSorter.rankings.CONTAINS,
              key: "org"
            }
          ]
        });
      },
      filterAll: true,
      style: {
        height: 50
      }
    },
    {
      id: "sector",
      Header: "Sector",
      accessor: "sector",
      sortable: false,
      Cell: row => <div className="centerText">{row.value}</div>
    },
    {
      id: "revenue",
      Header: "Total Revenue",
      accessor: "revenue",
      sortable: true,
      Cell: row => <div className="centerText">{row.value}</div>
    },
    {
      id: "city",
      Header: "City",
      accessor: "address[city]",
      sortable: false,
      Cell: row => <div className="centerText">{row.value}</div>
    },
    {
      id: "industryClassification",
      Header: "Industry Classification",
      accessor: "industryCls",
      sortable: false,
      Cell: row => <div className="centerText">{row.value}</div>
    },
    {
      id: "delete",
      Header: "",
      accessor: "id",
      sortable: false,
      Cell: row => (
        <Fragment>
          <span
            className="centerText"
            data-toggle="modal"
            data-target="#deleteModal"
            onClick={() => this.setOrg(row.original)}
          />
        </Fragment>
      ),
      width: 50
    }
  ];

  render() {
    const { entity, orgList, activeButton, searchText } = this.state;
    const { appliedFilterList } = this.props;
    if (!orgList || !orgList.length) {
      return null;
    }
    return (
      <section className="dashboard-content p-0">
        <OrgFilters
          activeButton={activeButton}
          buttonList={buttonList}
          searchText={searchText}
          getFilteredListOfOrg={this.getFilteredListOfOrg}
          filterOrgList={this.filterOrgList}
        />
        <div className="d-flex py-3 align-items-center applied-filters-container">
          <Dropdown
            selectedItem={entity}
            name="filterEntity"
            placeholder="Actions"
            containerClass="dropdown dropdown-with-searchbox"
            onChange={this.onDropdownChange}
            items={filterList}
          />
          <div className="result-count">
            {orgList.length} organizations found
          </div>
          <AppliedOrgFilters />
          {appliedFilterList && (
            <div className="clear-filters">
              <a
                href="javascript:;"
                onClick={this.resetAllFilters}
                className="text-primary"
              >
                Clear All Filters
              </a>
            </div>
          )}
        </div>
        <div>
          <ReactTable
            pageSize={orgList.length > 10 ? 10 : orgList.length}
            minRows={3}
            noDataText="No organization found"
            data={orgList}
            columns={this.columns}
            className="-highlight"
            sortable={true}
            multiSort={true}
            defaultSorted={[
              {
                id: "org",
                asc: true
              }
            ]}
            getTheadThProps={(state, rowInfo) => {
              return {
                style: {
                  height: 50,
                  verticalAlign: "middle",
                  lineHeight: 3
                }
              };
            }}
          />
        </div>
        <PopupModal
          modalid="deleteModal"
          modaltitle="Alert!"
          modalcontent={`Are you sure you want to delete '${
            this.state.orgName
          }' ?`}
          primarybuttontext="Delete Organization"
          secondarybuttontext="Cancel"
          handleDelete={() => this.handleOrgDelete(this.state.orgId)}
        />
      </section>
    );
  }

  //when checkbox is checked
  onSelectCheckbox = (e, id) => {
    let { orgList, selectedOrgList } = this.state;
    const target = e.target;
    const isChecked = target.type === "checkbox" ? target.checked : false;
    if (isChecked) {
      selectedOrgList = [
        ...selectedOrgList,
        orgList.filter(x => x.id === id)[0]
      ];
    } else {
      selectedOrgList = selectedOrgList.filter(x => x.id !== id);
    }
    this.setState({ selectedOrgList });
  };

  handleOrgDelete = orgId => {
    this.props.onDeleteOrg(orgId);
    const { orgList } = this.state;
    const filteredList = orgList.filter(x => x.id !== orgId);
    this.setState({
      orgList: filteredList
    });
  };

  setOrg = org => {
    this.setState({ orgId: org.id, orgName: org.name });
  };

  getFilteredListOfOrg = e => {
    this.setState({
      searchText: e.target.value
    });
  };

  changePage = orgId => {
    this.props.changePage(orgId);
  };

  onDropdownChange = (e, val) => {
    let { selectedOrgList } = this.state;
    if (val === priorityStatus[markReadyForTagging])
      selectedOrgList.map(x => {
        x.tagStatus = priorityStatus[val];

        return x;
      });
    else
      selectedOrgList.map(x => {
        x.priority = priorityStatus[val];
        return x;
      });
    this.props.onSaveOrgBasicInfo(selectedOrgList);
    this.forceUpdate(); //re-render table when changing the status icon color
  };

  filterOrgList = filter => {
    const { activeButton } = this.state;
    let newSectors = activeButton.slice();
    if (filter["sector"] === "All") {
      newSectors = ["All"];
    } else {
      if (newSectors.indexOf("All") > -1)
        newSectors.splice(newSectors.indexOf("All"), 1);
      newSectors.indexOf(filter["sector"]) > -1
        ? newSectors.splice(newSectors.indexOf(filter["sector"]), 1)
        : newSectors.push(filter["sector"]);
    }
    if (newSectors.length === 0) newSectors.push("All");
    this.props.fetchOrganisationsList({ newSectors });

    this.setState({
      activeButton: newSectors
    });
  };

  appliedFilterOrgList = filters => {
    // console.log(this.props)
    // const { orgList } = this.props;
    // let orgListCopy = JSON.parse(JSON.stringify(orgList));
    //  let filteredList = orgListCopy.filter((org => {
    //     let isFiltered = true;
    //     Object.keys(filters).map((key) => {
    //         if(!isFiltered) { return; }
    //         switch(key) {
    //             case 'userMod':
    //             case 'priority':
    //             case 'subIndustryCls':
    //             case 'industryCls':
    //             case 'frameworkTag':
    //             case 'level1':
    //             case 'level2':
    //             case 'level3':
    //                 isFiltered = filters[key].includes('Select') || !filters[key] ? true :  (filters[key].toLowerCase() === org[key].toLowerCase());
    //                 break;
    //             case 'revenueRange':
    //                 break;
    //             case 'assetsRange':
    //                 isFiltered =  (filters[key]['min'] <= org['totalAssets'] && filters[key]['max'] >= org['totalAssets']);
    //                 break;
    //             case 'status':
    //                 isFiltered = !!filters[key].find(status => status.toLowerCase() === org['sectorLevel']);
    //             default:
    //                 break;
    //         }
    //     });
    //     return isFiltered;
    // }));
    // this.setState({
    //     orgList: filteredList
    // });
  };

  resetAllFilters = () => {
    this.props.fetchOrganisationsList({});
    this.props.setAppliedFilters(null, {});
    this.setState({
      activeButton: ["All"]
    });
  };
}

const mapStateToProps = state => ({
  orgList: state.orgList,
  appliedFilterList: state.orgList.appliedFilterList
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      changePage: id => push("/organizations/" + id),
      fetchOrganisationsList,
      fetchSdgTagsList,
      fetchSpiTagsList,
      setAppliedFilters,
      startLoaderAction,
      stopLoaderAction,
      onDeleteOrg,
      onSaveOrgBasicInfo
    },
    dispatch
  );

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(OrgList);
