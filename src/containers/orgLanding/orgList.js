import React, { Fragment } from "react";
//import { push } from "react-router-redux";
import { push } from 'connected-react-router';
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import ReactTable from "react-table";
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
import isEqualWith from "lodash/isEqualWith";
import findKey from "lodash/findKey";
import {
  modifiyFilterList,
  filterComparator,
  getFromLocalStorage
} from "../../util/util";
import NotificationToaster from "../ui/notificationToaster";
import { APPLIED_ORG_FILTER_LSO_NAME } from '../../constants';

const setPriorityHigh = "Set Priority High";
const setPriorityNormal = "Set Priority Normal";
const markReadyForTagging = "Mark 'Ready for Tagging'";

const filterList = [setPriorityHigh, setPriorityNormal, markReadyForTagging];

const priorityStatus = {
  "Set Priority High": "High",
  "Set Priority Normal": "Normal",
  "Mark 'Ready for Tagging'": "Ready For Tagging"
};

const tags = {
  "Auto Tag": "autotag",
  "Complete Tag": "completetag",
  "Unfinished Tag": "unfinishedtag",
  "Ready For Tagging": "readyfortagging"
};

const sectorButtonList = [
  { id: "all", name: "All" },
  { id: "public", name: "Public" },
  { id: "private", name: "Private" },
  { id: "social", name: "Social" }
];

const tagIcon = {
  autotag: "A",
  completetag: "C",
  unfinishedtag: "U",
  readyfortagging: "R"
};

const tagColor = {
  Normal: "green",
  High: "red"
};

export const filtersObj = {
  assets: { min: "", max: "" },
  city: "",
  country: "",
  county: "",
  createdBy: [],
  editedBy: [],
  frameworkTag: "",
  industryCls: "",
  level1: "",
  level1List: [],
  level2: "",
  level2List: [],
  level3: "",
  level3List: [],
  pageNo: 0,
  pageSize: 10,
  priority: "",
  revenue: { min: "", max: "" },
  sectorLevel: [],
  state: "",
  subIndustryCls: "",
  // nameSearch: "",
  tagStatus: []
};

const getNoDataProps = props => ({
  loading: props.loading
});

const NoDataComponent = props => {
  const { children, loading } = props;

  return loading ? null : <div className="rt-noData">{children}</div>;
};

class OrgList extends React.Component {
  state = {
    entity: "",
    orgList: [],
    activeButton: ["All"],
    searchText: "",
    nameSearch: "",
    selectedOrgList: [],
    assestsMin: 0,
    assestsMax: 100,
    revenueMin: 0,
    revenueMax: 100,
    selected: {},
    selectAll: 0,
    pageNo: 0,
    pageSize: 10,
    page: 0,
    totalPages: 0,
    orgCount: 0
  };

  constructor(props) {
    super(props);
    this.nameSearchInput = React.createRef();
  }

  componentDidMount() {
    this.applyInitialFilters();
  }

  componentWillUnmount() {
    //this.resetAllFilters();
  }

  componentDidUpdate(prevProps) {
    if (
      prevProps.orgList !== this.props.orgList &&
      this.props.orgList.data &&
      this.props.orgList.data.response
    ) {
      this.setState({
        orgList: this.props.orgList.data.response.payload,
        totalPages: Math.ceil(
          this.props.orgList.data.response.filter.orgCount / this.state.pageSize
        ),
        orgCount: this.props.orgList.data.response.filter.orgCount,
        activeButton: this.props.orgList.data.response.filter.sectors || [
          "All"
        ],
        page: this.props.orgList.data.response.filter.pageNo,
        pageSize: this.props.orgList.data.response.filter.pageSize,
        nameSearch: this.props.orgList.data.response.filter.nameSearch
      });

      this.props.stopLoaderAction();
    }
  }

  applyInitialFilters = () => {
    this.props.startLoaderAction();
    const values = getFromLocalStorage(APPLIED_ORG_FILTER_LSO_NAME, 'appliedFilters');
    const { appliedFilterList, filters } = this.props;
    const allFilters = {
      ...filters,
      ...(appliedFilterList ? appliedFilterList : filtersObj),
      ...values
    };
    if (!allFilters.pageNo || !allFilters.pageSize) {
      allFilters.pageNo = 0;
      allFilters.pageSize = 10;
    }
    this.props.fetchOrganisationsList(modifiyFilterList(allFilters));
    this.props.setAppliedFilters(allFilters, modifiyFilterList(allFilters));
  };

  toggleRow = id => {
    const newSelected = Object.assign({}, this.state.selected);
    newSelected[id] = !this.state.selected[id];
    this.setState({
      selected: newSelected,
      selectAll: 2
    });
    //when selected row is found
    if (newSelected[id]) {
      this.setState({
        selectedOrgList: [
          ...this.state.selectedOrgList,
          this.state.orgList.find(x => x.id === id)
        ]
      });
    }
    if (!newSelected[id]) {
      this.setState({
        selectedOrgList: this.state.selectedOrgList.filter(x => x.id !== id)
      });
    }
  };

  toggleSelectAll = () => {
    let newSelected = {};

    if (this.state.selectAll === 0) {
      this.state.orgList.forEach(x => {
        newSelected[x.id] = true;
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
              checked={this.state.selected[original.id] === true}
              onChange={() => this.toggleRow(original.id)}
            />
          </div>
        );
      },
      Header: (
        x //adding fat arrow fixed the checkbox not showing when checked
      ) => (
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
      id: "tag",
      Header: "",
      accessor: "id",
      sortable: false,
      resizable: false,
      Cell: row => (
        <div className="mt-1">
          <div className="px-1 py-0">
            <h1
              className={`org-tag ${
                row.original.priority ? tagColor[row.original.priority] : ""
              }`}
            >
              {row.original.tagStatus
                ? tagIcon[tags[row.original.tagStatus]]
                : tagIcon["unfinishedtag"]}
            </h1>
          </div>
        </div>
      ),
      width: 30
    },
    {
      id: "name",
      Header: "Organization Name",
      accessor: "name",
      Cell: row => (
        <React.Fragment>
          <a
            className="centerText orgName d-inline-block ml-1"
            style={{
              width: "100%",
              overflow: "hidden",
              textOverflow: "ellipsis",
              whiteSpace: "nowrap"
            }}
            href={"organizations/" + row.original.id}
            target="_blank"
            title={row.value}
          >
            {row.value}
          </a>
        </React.Fragment>
      ),
      width: 280,
      // resizable: false,
      placeholder: "Search by Organization Name",
      sortable: true,
      filterable: true,
      //Allow filter on enter key press
      Filter: ({ filter, onChange }) => {
        return (
          <input
            style={{ width: "100%" }}
            placeholder="Search"
            ref={this.nameSearchInput}
            //value={this.state.nameSearch || ""}
            defaultValue={this.state.nameSearch || ""}
            onKeyPress={event => {
              if (this.nameSearchInput.current.value !== this.nameSearchInput.current.defaultValue &&
                  (event.keyCode === 13 || event.which === 13)) {
                this.handleFilteredChange(event.target.value);
              }
            }}
          />
        );
      },
      style: {
        height: 50
      }
    },
    {
      id: "sector",
      Header: "Sector",
      accessor: "sector",
      sortable: true,
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
      sortable: true,
      Cell: row => <div className="centerText">{row.value}</div>
    },
    {
      id: "state",
      Header: "State",
      accessor: "address[state]",
      sortable: true,
      Cell: row => <div className="centerText">{row.value}</div>
    },
    {
      id: "created_by",
      Header: "Created By",
      accessor: "createdBy",
      sortable: true,
      Cell: row => (
        <div title={row.original.createdByEmail} className="centerText">
          <a href={`mailto:${row.original.createdByEmail}`}>{row.value}</a>
        </div>
      )
    },
    {
      id: "updated_by",
      Header: "Edited By",
      accessor: "lastEditedBy",
      sortable: true,
      Cell: row => (
        <div title={row.original.lastEditedByEmail} className="centerText">
          <a href={`mailto:${row.original.lastEditedByEmail}`}>{row.value}</a>
        </div>
      )
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
    const {
      entity,
      activeButton,
      searchText,
      pageSize,
      orgCount,
      totalPages,
      page
    } = this.state;
    const {
      userRole,
      appliedFilterList,
      orgList: { loading } = {},
      session
    } = this.props;

    let orgList = this.state.orgList;
    if (!orgList) {
      return null;
    }

    return (
      <section className="dashboard-content p-0">
        <NotificationToaster />
        <OrgFilters
          activeButton={activeButton}
          buttonList={sectorButtonList}
          searchText={searchText}
          getSearchedText={this.getSearchedText}
          getFilteredListOfOrg={this.getFilteredListOfOrg}
          onSectorChange={this.onSectorChange}
          resetFilters={this.resetFilters}
          resetPagination={this.resetPagination}
          userRole={userRole}
        />
        <div className="d-flex py-3 align-items-center applied-filters-container">
          <Dropdown
            disabled={Can({
              role: session.user && session.user.role,
              perform: "organizationDetails:edit",
              yes: () => false,
              no: () => true
            })}
            selectedItem={entity}
            name="filterEntity"
            placeholder="Actions"
            containerClass="dropdown dropdown-with-searchbox"
            onChange={this.onDropdownChange}
            items={filterList}
          />

          <div className="result-count">
            {orgCount.toLocaleString()} organizations found
          </div>

          <AppliedOrgFilters />
          {appliedFilterList && !isEqualWith(appliedFilterList, filtersObj, filterComparator) && (
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
            pageSize={pageSize}
            manual //allow server side pagination
            showPageSizeOptions
            pageSizeOptions={[10, 25, 50, 100]}
            onPageSizeChange={this.onPageSizeChange}
            pages={totalPages} //indicates total number of pages
            page={page}
            // noDataText={!this.props.loading ? "No organizations found" : ""}
            getNoDataProps={getNoDataProps}
            NoDataComponent={NoDataComponent}
            data={orgList}
            columns={this.columns}
            className="-highlight"
            sortable={true}
            multiSort={true}
            loading={loading}
            defaultSorted={[
              {
                id: "org",
                asc: true
              }
            ]}
            sorted={(this.props.filters && this.props.filters.sortObj) || []}
            getTheadThProps={(state, rowInfo) => {
              return {
                style: {
                  height: 50,
                  verticalAlign: "middle",
                  lineHeight: 3
                }
              };
            }}
            onPageChange={page => {
              this.setState({ page });
              this.handlePageChange(page);
            }}
            onSortedChange={sorted => this.handleSortedChange(sorted)}
          />
        </div>

        <PopupModal
          modalid="deleteModal"
          modaltitle="Alert!"
          modalcontent={`Are you sure you want to delete '${this.state.orgName}' ?`}
          primarybuttontext="Delete Organization"
          secondarybuttontext="Cancel"
          handleDelete={() => this.handleOrgDelete(this.state.orgId)}
        />
      </section>
    );
  }

  resetPagination = resetAll =>
    resetAll
      ? this.setState({
          searchText: "",
          page: 0,
          pageSize: 10,
          activeButton: ["All"],
          nameSearch: ""
        })
      : this.setState({ page: 0, pageSize: 10 });

  resetFilters = () => {
    this.resetPagination({ resetAll: true });
    const { pageSize } = this.state;
    const { filters } = this.props;

    this.props.fetchOrganisationsList({
      ...filters,
      pageNo: 0,
      pageSize
    });
  };

  resetAllFilters = () => {
    const { pageNo } = this.state;
    this.props.fetchOrganisationsList({ pageNo, pageSize: 10 });
    this.props.setAppliedFilters(filtersObj, { pageNo, pageSize: 10 }); // Only affects the UI. Do not make fetch call.
    this.nameSearchInput.current.value = "";
    this.nameSearchInput.current.defaultValue = "";
    this.resetPagination({ resetAll: true });
  };

  onPageSizeChange = pageSize => {
    const { page } = this.state;
    this.setState({ pageSize });
    const { appliedFilterList, filters } = this.props;

    const apiObj = {
      ...filters,
      ...(appliedFilterList ? appliedFilterList : filtersObj),
      pageNo: page,
      pageSize
    };
    this.props.setAppliedFilters(apiObj, modifiyFilterList(apiObj));
  };

  handleSortedChange = sorted => {
    const { page, pageSize } = this.state;
    const { appliedFilterList, filters } = this.props;
    const sortOrder = findKey(sorted[0], v => v === true);
    this.props.fetchOrganisationsList(
      {
        ...filters,
        ...(appliedFilterList && modifiyFilterList(appliedFilterList)),
        pageNo: 0,
        pageSize,
        sortBy: sorted[0].id,
        sortOrder
      },
      sorted
    );
  };

  handleFilteredChange = nameSearch => {
    const { pageSize } = this.state;
    const { appliedFilterList, filters } = this.props;
    const apiObj = {
      ...filters,
      ...(appliedFilterList ? appliedFilterList : filtersObj),
      pageNo: 0,
      pageSize,
      nameSearch
    };
    this.props.setAppliedFilters(apiObj, modifiyFilterList(apiObj));
    // this.props.fetchOrganisationsList(
    //   appliedFilterList ? modifiyFilterList(apiObj) : apiObj
    // );
  };

  handlePageChange = page => {
    const { pageSize } = this.state;
    const { appliedFilterList, filters } = this.props;

    const apiObj = {
      ...filters,
      ...(appliedFilterList ? appliedFilterList : filtersObj),
      pageNo: page,
      pageSize
    };
    this.props.setAppliedFilters(apiObj, modifiyFilterList(apiObj));
  };

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

  getFilteredListOfOrg = val => {
    this.setState(
      {
        searchText: val
      },
      () => {
        const { appliedFilterList, filters } = this.props;
        return this.state.searchText
          ? this.props.fetchOrganisationsList({
              ...filters,
              ...(appliedFilterList && modifiyFilterList(appliedFilterList)),
              pageNo: this.state.pageNo,
              pageSize: this.state.pageSize,
              address: this.state.searchText
            })
          : this.props.fetchOrganisationsList({
              ...(appliedFilterList && modifiyFilterList(appliedFilterList)),
              pageNo: this.state.pageNo,
              pageSize: this.state.pageSize
            });
      }
    );
  };

  getSearchedText = val => {
    this.setState({
      searchText: val
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
    if (selectedOrgList && selectedOrgList.length) {
      if (val === markReadyForTagging) {
        selectedOrgList.map(x => {
          x.tagStatus = priorityStatus[val];
          x.naicsCode = (x.naicsCode && x.naicsCode.id) || x.naicsCode || "";
          x.nteeCode = (x.nteeCode && x.nteeCode.id) || x.nteeCode || "";
          return x;
        });
      } else {
        selectedOrgList.map(x => {
          x.priority = priorityStatus[val];
          x.naicsCode = (x.naicsCode && x.naicsCode.id) || x.naicsCode || "";
          x.nteeCode = (x.nteeCode && x.nteeCode.id) || x.nteeCode || "";
          return x;
        });
      }
      this.props.onSaveOrgBasicInfo(selectedOrgList);
    }
    else{
      setTimeout(()=> {
        alert(` You need to select at least one organization!`);
      }, 200);
      
    }
  };

  onSectorChange = newSector => {
    const { pageSize } = this.state;
    const { appliedFilterList, filters } = this.props;
    
    if (newSector == undefined || newSector == null || !newSector)
      newSector = "All";

    this.setState({
      activeButton: [newSector],
      page: 0
    });

    const apiObj = {
      ...filters,
      ...(appliedFilterList ? appliedFilterList : filtersObj),
      pageNo: 0,
      pageSize,
      sectors: [newSector],
    };
    this.props.setAppliedFilters(apiObj, modifiyFilterList(apiObj));
  };
}

const mapStateToProps = state => ({
  orgList: state.orgList,
  appliedFilterList: state.orgList.appliedFilterList,
  userRole: state.session.user.role,
  filters: state.orgList.filters,
  session: state.session
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
