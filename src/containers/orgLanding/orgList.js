import React from 'react';
import { push } from 'react-router-redux';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import ReactTable from "react-table";
import matchSorter from 'match-sorter'
import 'react-table/react-table.css'

import { addToAppNavigation, removeFromAppNavigation } from '../../actions/sectionHeader/sectionHeaderAction';
import LoadingSpinner from '../common/loadingSpinner';
import OrgFilters from './orgFilter';
import AppliedOrgFilters from './appliedOrgFilters/index';
import Dropdown from '../ui/dropdown';
import { fetchOrganisationsList, filterOrganisationsList } from '../../actions/orgLanding/orgLandingAction';
import { fetchFilteredOrgList, setAppliedFilters } from '../../actions/orgLanding/orgFilterAction';


const filterList = ["Set Priority High", "Set Priority Normal", "Mark 'Ready for Tagging'"];
const buttonList = [{ id: 'all', name: 'All' }, { id: 'public', name: 'Public' }, { id: 'private', name: 'Private' }, { id: 'social', name: 'Social' }]
const columns = [{
    id: 'select',
    Header: <span><input type="checkbox" /></span>,
    accessor: 'id',
    sortable: false,
    Cell: () => <div className="centerText"><input type="checkbox" /></div>,
    width: 50
}, {
    id: 'org',
    Header: 'Organisation Name',
    accessor: 'name',
    Cell: (row) => <div className="centerText">{row.value}</div>,
    sortable: true,
    filterable: true, 
    filterMethod: (filter, rows) => {
        // console.log(filter),
        // console.log(rows);
        return matchSorter(rows, filter.value, {keys: [{threshold: matchSorter.rankings.CONTAINS, key: 'org'}]})
    },
    filterAll: true
}, {
    id: 'sector',
    Header: 'Sector',
    accessor: 'sector',
    sortable: false,
    Cell: (row) => <div className="centerText">{row.value}</div>
}, {
    id: 'revenue',
    Header: 'Total Revenue',
    accessor: 'totalRevenue[0][value]',
    sortable: true,
    Cell: (row) => <div className="centerText">{row.value}</div>
},
{
    id: 'city',
    Header: 'City',
    accessor: 'address[city]',
    sortable: false,
    Cell: (row) => <div className="centerText">{row.value}</div>
},
{
    id: 'industryClassification',
    Header: 'Industry Classification',
    accessor: 'industryCls',
    sortable: false,
    Cell: (row) => <div className="centerText">{row.value}</div>
},
{
    id: 'delete',
    Header: '',
    accessor: 'id',
    sortable: false,
    Cell: (row) => <span className="centerText"></span>,
    width: 50
}]

class OrgList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            entity: '',
            orgList: [],
            activeButton: ['All'],
            searchText: ''
        }
        this.changePage = this.changePage.bind(this);
        this.onDropdownChange = this.onDropdownChange.bind(this);
        this.filterOrgList = this.filterOrgList.bind(this);
        this.resetAllFilters = this.resetAllFilters.bind(this);
        this.getFilteredListOfOrg = this.getFilteredListOfOrg.bind(this);
    }

    componentDidMount() {
        this.props.fetchOrganisationsList();
        this.props.removeFromAppNavigation({
            title: "Organisation Management",
            path: "/organizations"
        });
        this.props.removeFromAppNavigation({
            title: "User Management",
            path: "/user-management"
        });
        this.props.addToAppNavigation({
            title: "Organisation Management",
            path: "/organizations"
        });
    }

    componentWillReceiveProps(nextProps) {
        if (JSON.stringify(nextProps.orgList) !== JSON.stringify(this.props.orgList)) {
            this.setState({
                orgList: nextProps.orgList
            });
        }
    }

    render() {
        const { entity, orgList, activeButton, searchText } = this.state;
        const { isFetchOrgPending, isFetchOrgSuccess, appliedFilterList } = this.props;
        if (isFetchOrgPending) {
            return <LoadingSpinner />
        }
        if (!isFetchOrgSuccess || !orgList) {
            return null;
        }
        return (
            <section className="dashboard-content p-0">
                <OrgFilters activeButton={activeButton} buttonList={buttonList} searchText={searchText} getFilteredListOfOrg={this.getFilteredListOfOrg} filterOrgList={this.filterOrgList} />
                <div className="d-flex py-3 align-items-center applied-filters-container">
                    <Dropdown
                        selectedItem={entity}
                        name="filterEntity"
                        placeholder="Actions"
                        containerClass="dropdown dropdown-with-searchbox"
                        onChange={this.onDropdownChange.bind(this)}
                        items={filterList} />
                    <div className="result-count">
                        {orgList.length} organizations found
            </div>
                    <AppliedOrgFilters />
                    {appliedFilterList && <div className="clear-filters">
                        <a href="javascript:;" onClick={this.resetAllFilters} className="text-primary">Clear All Filters</a>
                    </div>}
                </div>
                <div>
                    <ReactTable
                        pageSize={10}
                        data={orgList}
                        columns={columns}
                        className="-highlight"
                        sortable={true}
                        multiSort={true}
                        defaultSorted={[{
                            id: "org",
                            asc: true
                        }]}
                        getTdProps={(state, rowInfo, column) => {
                            return {
                                onClick: (e) => {
                                    if (column.id !== 'select' && column.id !== 'delete') {
                                        this.changePage(rowInfo.original.id);
                                    }
                                },
                                style: {
                                    height: 50
                                }
                            }
                        }
                        }
                        getTheadThProps={(state, rowInfo) => {
                            return {
                                style: {
                                    height: 50,
                                    verticalAlign: 'middle',
                                    lineHeight: 3
                                }
                            }
                        }
                        }
                    />
                </div>
            </section>
        )
    }

    getFilteredListOfOrg(e) {
        this.setState({
            searchText: e.target.value
        });
    }

    changePage(orgId) {
        this.props.changePage(orgId);
    }

    onDropdownChange() {

    }

    filterOrgList(filter) {
        const { activeButton } = this.state;
        let newSectors = activeButton.slice();
        if (filter['sector'] === "All") {
            newSectors = ["All"];
        } else {
            newSectors.indexOf("All") > -1 ? newSectors.splice(newSectors.indexOf("All"), 1) : '';
            newSectors.indexOf(filter['sector']) > -1 ? newSectors.splice(newSectors.indexOf(filter['sector']), 1) : newSectors.push(filter['sector']);
        }
        newSectors.length === 0 ? newSectors.push("All") : '';
        this.props.fetchFilteredOrgList(newSectors);
        // const { orgList } = this.props;
        // let orgListCopy = JSON.parse(JSON.stringify(orgList));
        //  let filteredList = orgListCopy.filter((org => {
        //     return Object.keys(filter).map((key) => {
        //        return (filter[key].toLowerCase() === org[key].toLowerCase() || filter[key] === 'All');
        //     })[0];
        // }));

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
        this.props.fetchFilteredOrgList([]);
        this.props.setAppliedFilters(null);
        this.setState({
            activeButton: ['All']
        });
    }
}

const mapStateToProps = state => ({
    isFetchOrgPending: state.orgLanding.isFetchOrgPending,
    isFetchOrgSuccess: state.orgLanding.isFetchOrgSuccess,
    fetchOrgError: state.orgLanding.fetchOrgError,
    orgList: state.orgLanding.orgList,
    appliedFilterList: state.orgFilter.appliedFilterList
})

const mapDispatchToProps = dispatch => bindActionCreators({
    changePage: (id) => push('/organizations/' + id),
    addToAppNavigation,
    removeFromAppNavigation,
    fetchOrganisationsList,
    filterOrganisationsList,
    fetchFilteredOrgList,
    setAppliedFilters
}, dispatch)

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(OrgList);