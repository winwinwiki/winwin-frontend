import React from "react";
import { push } from "react-router-redux";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import ReactTable from "react-table";
import matchSorter from "match-sorter";
import "react-table/react-table.css";
import OrgFilters from "./orgFilter";
import AppliedOrgFilters from "./appliedOrgFilters/index";
import Dropdown from "../ui/dropdown";
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

const filterList = [
  "Set Priority High",
  "Set Priority Normal",
  "Mark 'Ready for Tagging'"
];
const buttonList = [
  { id: "all", name: "All" },
  { id: "public", name: "Public" },
  { id: "private", name: "Private" },
  { id: "social", name: "Social" }
];
const columns = [
  {
    id: "select",
    Header: (
      <span>
        <input type="checkbox" />
      </span>
    ),
    accessor: "id",
    sortable: false,
    Cell: () => (
      <div className="centerText">
        <input type="checkbox" />
      </div>
    ),
    width: 50
  },
  {
    id: "org",
    Header: "Organisation Name",
    accessor: row => (
      <React.Fragment>
        <div className="org-tag orange card d-inline-block mr-1">
          <div className="px-1 py-0">A</div>
          <div className="org-tag-footer" />
        </div>
        <a
          href={"organizations/" + row.id}
          className="centerText d-inline-block"
        >
          {row.name}
        </a>
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
      // console.log(filter),
      // console.log(rows);
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
    Header: "Total Revenue",
    accessor: "totalRevenue[0][value]",
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
    Cell: row => <span className="centerText" />,
    width: 50
  }
];

class OrgList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      entity: "",
      orgList: [],
      activeButton: ["All"],
      searchText: ""
    };
    this.changePage = this.changePage.bind(this);
    this.onDropdownChange = this.onDropdownChange.bind(this);
    this.filterOrgList = this.filterOrgList.bind(this);
    this.resetAllFilters = this.resetAllFilters.bind(this);
    this.getFilteredListOfOrg = this.getFilteredListOfOrg.bind(this);
  }

  componentDidMount() {
    this.props.startLoaderAction();
    this.props.fetchOrganisationsList();
    //this.props.fetchSdgTagsList();
    //this.props.fetchSpiTagsList();
  }

  componentDidUpdate(prevProps){
    if (prevProps.orgList !== this.props.orgList &&
      this.props.orgList.data) {
      console.log("new org list received 2",this.props.orgList);
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
  //   if (nextProps &&
  //     nextProps.orgList !== this.props.orgList) {
  //       console.log("new org list received 1",nextProps.orgList);
  //     if (!nextProps.orgList.error) {
  //       this.setState({
  //         orgList: nextProps.orgList.data
  //       });
  //     } else {
  //     }
  //     this.props.stopLoaderAction();
  //   }
  // }

  render() {
    const { entity, orgList, activeButton, searchText } = this.state;
    const { appliedFilterList } = this.props;
    // if (!orgList || !orgList.length) {
    //   return null;
    // }
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
            onChange={this.onDropdownChange.bind(this)}
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
            columns={columns}
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
      </section>
    );
  }

  getFilteredListOfOrg(e) {
    this.setState({
      searchText: e.target.value
    });
  }

  changePage(orgId) {
    this.props.changePage(orgId);
  }

  onDropdownChange() {}

  filterOrgList(filter) {
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
  }

  appliedFilterOrgList(filters) {
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
  }

  resetAllFilters() {
    this.props.fetchOrganisationsList({});
    this.props.setAppliedFilters(null, {});
    this.setState({
      activeButton: ["All"]
    });
  }
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
      stopLoaderAction
    },
    dispatch
  );

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(OrgList);
