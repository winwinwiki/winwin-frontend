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
import Can from "../Can";

const setPriorityHigh = "Set Priority High";
const setPriorityNormal = "Set Priority Normal";
const markReadyForTagging = "Mark 'Ready for Tagging'";

const filterList = [setPriorityHigh, setPriorityNormal, markReadyForTagging];

const priorityStatus = {
  "Set Priority High": "High",
  "Set Priority Normal": "Normal",
  "Mark 'Ready for Tagging'": "Untagged"
};

const tags = {
  "Auto Tag": "autotag",
  "Complete Tag": "completetag",
  "Organization Tag": "organizationtag",
  Untagged: "untagged",
  "Ready For Tagging": "readyfortagging"
};

const buttonList = [
  { id: "all", name: "All" },
  { id: "public", name: "Public" },
  { id: "private", name: "Private" },
  { id: "social", name: "Social" }
];

const tagIcon = {
  autotag: "A",
  completetag: "C",
  organizationtag: "O",
  untagged: "U",
  readyfortagging: "R"
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
    selectedOrgList: [],
    assestsMin: 0,
    assestsMax: 100,
    revenueMin: 0,
    revenueMax: 100,
    selected: {},
    selectAll: 0
  };

  componentDidMount() {
    this.props.startLoaderAction();
    this.props.fetchOrganisationsList();
  }

  componentDidUpdate(prevProps) {
    if (
      prevProps.orgList !== this.props.orgList &&
      this.props.orgList.data &&
      this.props.orgList.data.response
    ) {
      console.log("new org list received 2", this.props.orgList);
      //if (!this.props.orgList.error) {
      this.setState({
        orgList: this.props.orgList.data.response.payload
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

  toggleRow = name => {
    const newSelected = Object.assign({}, this.state.selected);
    newSelected[name] = !this.state.selected[name];
    this.setState({
      selected: newSelected,
      selectAll: 2
    });
    //when selected row is found
    if (newSelected[name]) {
      this.setState({
        selectedOrgList: [
          ...this.state.selectedOrgList,
          this.state.orgList.find(x => x.name === name)
        ]
      });
    }
    if (!newSelected[name]) {
      this.setState({
        selectedOrgList: this.state.selectedOrgList.filter(x => x.name !== name)
      });
    }
  };

  toggleSelectAll = () => {
    let newSelected = {};

    if (this.state.selectAll === 0) {
      this.state.orgList.forEach(x => {
        newSelected[x.name] = true;
      });
    }

    this.setState(
      {
        selected: newSelected,
        selectAll: this.state.selectAll === 0 ? 1 : 0
      },
      () =>
        this.state.selectAll === 1
          ? this.setState({ selectedOrgList: this.state.orgList })
          : this.setState({ selectedOrgList: [] })
    );
  };

  columns = [
    {
      id: "select",
      Cell: ({ original }) => {
        return (
          <div className="centerText">
            <input
              type="checkbox"
              className="checkbox"
              checked={this.state.selected[original.name] === true}
              onChange={() => this.toggleRow(original.name)}
            />
          </div>
        );
      },
      Header: (
        <span>
          <input
            type="checkbox"
            className="checkbox"
            checked={this.state.selectAll === 1}
            ref={input => {
              if (input) {
                input.indeterminate = this.state.selectAll === 2;
              }
            }}
            onChange={() => this.toggleSelectAll()}
          />
        </span>
      ),

      accessor: "id",
      sortable: false,
      // Cell: row => (
      //   <div className="centerText">
      //     <input
      //       type="checkbox"
      //       onClick={e => this.onSelectCheckbox(e, row.value)}
      //     />
      //   </div>
      // ),
      width: 50
    },
    {
      id: "org",
      Header: "Organization Name",
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
                  ? tagIcon[tags[row.original.tagStatus]]
                  : tagIcon["readyfortagging"]}
              </h1>
            </div>
            {/* <div className="org-tag-footer" /> */}
          </div>
          <Link
            className="centerText d-inline-block"
            style={{
              maxWidth: 190,
              overflow: "hidden",
              textOverflow: "ellipsis",
              whiteSpace: "nowrap"
            }}
            to={"organizations/" + row.original.id}
            title={row.value}
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
      width: 280,
      resizable: false,
      sortable: true,
      filterable: true,
      filterMethod: (filter, rows) => {
        return matchSorter(rows, filter.value, {
          keys: [{ threshold: matchSorter.rankings.CONTAINS, key: "org" }]
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
      Header: "Total Revenue($)",
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
        <Can
          role={this.props.userRole}
          perform="organizations:delete"
          yes={() => (
            <span
              className="centerText"
              data-toggle="modal"
              data-target="#deleteModal"
              onClick={() => this.setOrg(row.original)}
            />
          )}
        />
      ),
      width: 50
    }
  ];

  render() {
    const { entity, activeButton, searchText } = this.state;
    const { appliedFilterList } = this.props;

    let orgList = this.state.orgList;
    if (!orgList) {
      return null;
    }
    //filter by searched text
    if (this.state.searchText) {
      orgList = orgList.filter(row => {
        return (
          (row.address.state &&
            row.address.state
              .toLowerCase()
              .includes(this.state.searchText.toLowerCase())) ||
          (row.address.county &&
            row.address.county
              .toLowerCase()
              .includes(this.state.searchText.toLowerCase())) ||
          (row.address.city &&
            row.address.city
              .toLowerCase()
              .includes(this.state.searchText.toLowerCase())) ||
          (row.address.country &&
            row.address.country
              .toLowerCase()
              .includes(this.state.searchText.toLowerCase())) ||
          (row.address.street &&
            row.address.street
              .toLowerCase()
              .includes(this.state.searchText.toLowerCase()))
        );
      });
    }
    {
      /* /**` */
    }
    //search by sector
    if (this.state.activeButton.length === 1) {
      if (this.state.activeButton.indexOf("Public") > -1)
        orgList = orgList.filter(row => row.sector === "Public");
      if (this.state.activeButton.indexOf("Private") > -1)
        orgList = orgList.filter(row => row.sector === "Private");
      if (this.state.activeButton.indexOf("Social") > -1)
        orgList = orgList.filter(row => row.sector === "Social");
    }
    {
      /* /**` */
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
            showPageSizeOptions={false}
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

  // //when checkbox is checked
  // onSelectCheckbox = (e, id) => {
  //   let { orgList, selectedOrgList } = this.state;
  //   const target = e.target;
  //   const isChecked = target.type === "checkbox" ? target.checked : false;
  //   if (isChecked) {
  //     selectedOrgList = [
  //       ...selectedOrgList,
  //       orgList.filter(x => x.id === id)[0]
  //     ];
  //   } else {
  //     selectedOrgList = selectedOrgList.filter(x => x.id !== id);
  //   }
  //   this.setState({ selectedOrgList });
  // };

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

  getSelectedOrgList = (orgList, key) => {
    return orgList.find(x => x.name === key);
  };

  getCustomFilteredOrgList = (orgList, key) => {
    return orgList.filter(x => x.name !== key);
  };

  onDropdownChange = (e, val) => {
    let { selectedOrgList } = this.state;
    if (val === markReadyForTagging) {
      selectedOrgList.map(x => {
        x.tagStatus = priorityStatus[val];
        x.naicsCode = (x.naicsCode && x.naicsCode.id) || "";
        x.nteeCode = (x.nteeCode && x.nteeCode.id) || "";
        return x;
      });
    } else {
      selectedOrgList.map(x => {
        x.priority = priorityStatus[val];
        x.naicsCode = (x.naicsCode && x.naicsCode.id) || "";
        x.nteeCode = (x.nteeCode && x.nteeCode.id) || "";
        return x;
      });
    }
    this.props.onSaveOrgBasicInfo(selectedOrgList);
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
        : (newSectors[0] = filter["sector"]);
    }
    if (newSectors.length === 0) newSectors.push("All");
    this.props.fetchOrganisationsList({ newSectors });

    this.setState({
      activeButton: newSectors
    });
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
  appliedFilterList: state.orgList.appliedFilterList,
  userRole: state.session.user.role
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
