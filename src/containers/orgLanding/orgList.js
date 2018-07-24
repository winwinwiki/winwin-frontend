import React from 'react';
import { push } from 'react-router-redux';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import ReactTable from "react-table";
import 'react-table/react-table.css'
import './orgList.css';

import OrgFilters from './orgFilter';
import AppliedOrgFilters from './appliedOrgFilters/index';
import Dropdown from '../ui/dropdown';
import {fetchOrganisationsList, filterOrganisationsList} from '../../actions/orgLanding/orgLandingAction';
import {fetchFilteredOrgList, setAppliedFilters} from '../../actions/orgLanding/orgFilterAction';

const filterList = ['Federal', 'Private', 'Social'];
const columns = [{
    id: 'select',
    Header: <span><input type="checkbox"/></span>,
    accessor: 'name',
    Cell: () => <div className="centerText"><input type="checkbox"/></div>,
    width: 50
  }, {
    id: 'org',
    Header: 'Organisation Name',
    accessor: 'name',
    Cell: (row) => <div className="centerText">{row.value}</div>
  }, {
    id: 'Sector',
    Header: 'Sector',
    accessor: 'sector',
    Cell: (row) => <div className="centerText">{row.value}</div>
  }, {
    id: 'Revenue',
    Header: 'Total Revenue',
    accessor: 'totalRevenue[0][value]',
    Cell: (row) => <div className="centerText">{row.value}</div>
  },
  {
    id: 'Assets',
    Header: 'Total Assets',
    accessor: 'totalAssets',
    Cell: (row) => <div className="centerText">{row.value}</div>
  }]

class OrgList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            entity: filterList[0],
            orgList: [],
            activeButton: 'All'
        }
        this.onDropdownChange = this.onDropdownChange.bind(this);
        this.filterOrgList = this.filterOrgList.bind(this);
        this.resetAllFilters = this.resetAllFilters.bind(this);
    }

    componentDidMount() {
        this.props.fetchOrganisationsList();
    }

    componentWillReceiveProps(nextProps) {
        if(JSON.stringify(nextProps.orgList) !== JSON.stringify(this.props.orgList) ) {
            this.setState({
                orgList: nextProps.orgList
            });
        }
    }

    render() {
        const { entity, orgList, activeButton } = this.state;
        const {isFetchOrgSuccess} = this.props;
        if(!isFetchOrgSuccess || !orgList) {
            return null;
        }
        return (
        <section className="dashboard-content p-0">
        <OrgFilters activeButton={activeButton} filterOrgList={this.filterOrgList} />
        <div className="d-flex py-3 align-items-center applied-filters-container">
            <Dropdown
                selectedItem={entity}
                name="filterEntity"
                containerClass="dropdown dropdown-with-searchbox"
                onChange={this.onDropdownChange.bind(this)}
                items={filterList}/>
            <div className="result-count">
                1,203 organizations found
            </div>
            <AppliedOrgFilters />
            <div className="clear-filters">
                <a onClick={this.resetAllFilters} className="text-primary">Clear All Filters</a>
            </div>
        </div>
        <div>
            <ReactTable
                pageSize={10}
                data={orgList}
                columns={columns}
                className="-highlight"
                getTdProps={(state, rowInfo, column) => {
                    return {
                      onClick: (e) => {
                          if(column.id !== 'select') {
                            this.props.changePage(rowInfo.original.id);
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
            <button type="button" className="btn btn-primary" data-toggle="modal" data-target="#exampleModal">
                Launch demo modal
            </button>

            <div className="modal progress-index-modal fade bd-example-modal-lg" id="exampleModal" tabIndex="-1"
                 role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog modal-xl modal-dialog-centered" role="document">
                    <div className="modal-content">
                        <div className="dashboard-container">
                            <div className="dashboard-header">
                                <div className="modal-header flex-column">
                                    <div className="d-flex w-100 p-3">
                                        <h5 className="modal-title" id="exampleModalLabel">Social Progress Index</h5>
                                        <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                            <span aria-hidden="true">&times;</span>
                                        </button>
                                    </div>
                                    <div className="w-100 border-top">
                                        <div className="w-100 col d-flex align-content-center py-3">
                                            <div className="form-group search mb-0">
                                                <label htmlFor="inputDropdown1" className="sr-only">Search Input</label>
                                                <input id="inputDropdown1" type="search" aria-describedby="emailHelp"
                                                       placeholder="Search State/Country/City"
                                                       className="form-control"/>
                                            </div>
                                            <div className="ml-auto">
                                                <button type="button" className="btn btn-link"
                                                        data-dismiss="modal">Cancel
                                                </button>
                                                <button type="button" className="btn btn-primary">Save</button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="modal-body dashboard-content progress-index-options">
                                <div className="d-flex flex-column h-100 pt-4">
                                    <div className="row">
                                        <div className="col">
                                            <h3>Opportunity</h3>
                                        </div>
                                        <div className="col">
                                            <h3>Opportunity</h3>
                                        </div>
                                        <div className="col">
                                            <h3>Opportunity</h3>
                                        </div>
                                    </div>
                                    <div className="row d-flex">
                                        <div className="col">
                                            <p className="border-bottom pb-3">Access to Advance Education</p>
                                            <div className="item-list mb-4">
                                                <div className="custom-control custom-checkbox">
                                                    <input id="customCheckCustom-1" type="checkbox"
                                                           className="custom-control-input"/>
                                                    <label htmlFor="customCheckCustom-1"
                                                           className="custom-control-label"> Globally Ranked
                                                        Universities</label>
                                                </div>
                                                <div className="custom-control custom-checkbox">
                                                    <input id="customCheckCustom-2" type="checkbox"
                                                           className="custom-control-input"/>
                                                    <label htmlFor="customCheckCustom-2"
                                                           className="custom-control-label">Inequality in the Attainment
                                                        of Education</label>
                                                </div>
                                                <div className="custom-control custom-checkbox">
                                                    <input id="customCheckCustom-3" type="checkbox"
                                                           className="custom-control-input"/>
                                                    <label htmlFor="customCheckCustom-3"
                                                           className="custom-control-label">Women’s Average Years in
                                                        School</label>
                                                </div>
                                                <div className="custom-control custom-checkbox">
                                                    <input id="customCheckCustom-4" type="checkbox"
                                                           className="custom-control-input"/>
                                                    <label htmlFor="customCheckCustom-4"
                                                           className="custom-control-label">Years of Tertiary
                                                        Schooling</label>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col">
                                            <p className="border-bottom pb-3">Access to Advance Education</p>
                                            <div className="item-list mb-4">
                                                <div className="custom-control custom-checkbox">
                                                    <input id="customCheckCustom-5" type="checkbox"
                                                           className="custom-control-input"/>
                                                    <label htmlFor="customCheckCustom-5"
                                                           className="custom-control-label"> Globally Ranked
                                                        Universities</label>
                                                </div>
                                                <div className="custom-control custom-checkbox">
                                                    <input id="customCheckCustom-6" type="checkbox"
                                                           className="custom-control-input"/>
                                                    <label htmlFor="customCheckCustom-6"
                                                           className="custom-control-label">Inequality in the Attainment
                                                        of Education</label>
                                                </div>
                                                <div className="custom-control custom-checkbox">
                                                    <input id="customCheckCustom-7" type="checkbox"
                                                           className="custom-control-input"/>
                                                    <label htmlFor="customCheckCustom-7"
                                                           className="custom-control-label">Women’s Average Years in
                                                        School</label>
                                                </div>
                                                <div className="custom-control custom-checkbox">
                                                    <input id="customCheckCustom-8" type="checkbox"
                                                           className="custom-control-input"/>
                                                    <label htmlFor="customCheckCustom-8"
                                                           className="custom-control-label">Years of Tertiary
                                                        Schooling</label>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col">
                                            <p className="border-bottom pb-3">Access to Advance Education</p>
                                            <div className="item-list mb-4">
                                                <div className="custom-control custom-checkbox">
                                                    <input id="customCheckCustom-9" type="checkbox"
                                                           className="custom-control-input"/>
                                                    <label htmlFor="customCheckCustom-9"
                                                           className="custom-control-label"> Globally Ranked
                                                        Universities</label>
                                                </div>
                                                <div className="custom-control custom-checkbox">
                                                    <input id="customCheckCustom-10" type="checkbox"
                                                           className="custom-control-input"/>
                                                    <label htmlFor="customCheckCustom-10"
                                                           className="custom-control-label">Inequality in the Attainment
                                                        of Education</label>
                                                </div>
                                                <div className="custom-control custom-checkbox">
                                                    <input id="customCheckCustom-11" type="checkbox"
                                                           className="custom-control-input"/>
                                                    <label htmlFor="customCheckCustom-11"
                                                           className="custom-control-label">Women’s Average Years in
                                                        School</label>
                                                </div>
                                                <div className="custom-control custom-checkbox">
                                                    <input id="customCheckCustom-12" type="checkbox"
                                                           className="custom-control-input"/>
                                                    <label htmlFor="customCheckCustom-12"
                                                           className="custom-control-label">Years of Tertiary
                                                        Schooling</label>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="w-100"></div>
                                        <div className="col">
                                            <p className="border-bottom pb-3">Personal Freedom and Choice</p>
                                            <div className="item-list mb-4">
                                                <div className="custom-control custom-checkbox">
                                                    <input id="customCheckCustom-13" type="checkbox"
                                                           className="custom-control-input"/>
                                                    <label htmlFor="customCheckCustom-13"
                                                           className="custom-control-label"> Corruption</label>
                                                </div>
                                                <div className="custom-control custom-checkbox">
                                                    <input id="customCheckCustom-14" type="checkbox"
                                                           className="custom-control-input"/>
                                                    <label htmlFor="customCheckCustom-14"
                                                           className="custom-control-label">Early Marriage</label>
                                                </div>
                                                <div className="custom-control custom-checkbox">
                                                    <input id="customCheckCustom-15" type="checkbox"
                                                           className="custom-control-input"/>
                                                    <label htmlFor="customCheckCustom-15"
                                                           className="custom-control-label">Freedom of Religion</label>
                                                </div>
                                                <div className="custom-control custom-checkbox">
                                                    <input id="customCheckCustom-16" type="checkbox"
                                                           className="custom-control-input"/>
                                                    <label htmlFor="customCheckCustom-16"
                                                           className="custom-control-label">Freedom Over Life
                                                        Choices</label>
                                                </div>
                                                <div className="custom-control custom-checkbox">
                                                    <input id="customCheckCustom-17" type="checkbox"
                                                           className="custom-control-input"/>
                                                    <label htmlFor="customCheckCustom-17"
                                                           className="custom-control-label">Satisfied Demand for
                                                        Contraception</label>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col">
                                            <p className="border-bottom pb-3">Personal Freedom and Choice</p>
                                            <div className="item-list mb-4">
                                                <div className="custom-control custom-checkbox">
                                                    <input id="customCheckCustom-18" type="checkbox"
                                                           className="custom-control-input"/>
                                                    <label htmlFor="customCheckCustom-18"
                                                           className="custom-control-label"> Corruption</label>
                                                </div>
                                                <div className="custom-control custom-checkbox">
                                                    <input id="customCheckCustom-19" type="checkbox"
                                                           className="custom-control-input"/>
                                                    <label htmlFor="customCheckCustom-19"
                                                           className="custom-control-label">Early Marriage</label>
                                                </div>
                                                <div className="custom-control custom-checkbox">
                                                    <input id="customCheckCustom-20" type="checkbox"
                                                           className="custom-control-input"/>
                                                    <label htmlFor="customCheckCustom-20"
                                                           className="custom-control-label">Freedom of Religion</label>
                                                </div>
                                                <div className="custom-control custom-checkbox">
                                                    <input id="customCheckCustom-21" type="checkbox"
                                                           className="custom-control-input"/>
                                                    <label htmlFor="customCheckCustom-21"
                                                           className="custom-control-label">Freedom Over Life
                                                        Choices</label>
                                                </div>
                                                <div className="custom-control custom-checkbox">
                                                    <input id="customCheckCustom-22" type="checkbox"
                                                           className="custom-control-input"/>
                                                    <label htmlFor="customCheckCustom-22"
                                                           className="custom-control-label">Satisfied Demand for
                                                        Contraception</label>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col">
                                            <p className="border-bottom pb-3">Personal Freedom and Choice</p>
                                            <div className="item-list mb-4">
                                                <div className="custom-control custom-checkbox">
                                                    <input id="customCheckCustom-23" type="checkbox"
                                                           className="custom-control-input"/>
                                                    <label htmlFor="customCheckCustom-23"
                                                           className="custom-control-label"> Corruption</label>
                                                </div>
                                                <div className="custom-control custom-checkbox">
                                                    <input id="customCheckCustom-24" type="checkbox"
                                                           className="custom-control-input"/>
                                                    <label htmlFor="customCheckCustom-24"
                                                           className="custom-control-label">Early Marriage</label>
                                                </div>
                                                <div className="custom-control custom-checkbox">
                                                    <input id="customCheckCustom-25" type="checkbox"
                                                           className="custom-control-input"/>
                                                    <label htmlFor="customCheckCustom-25"
                                                           className="custom-control-label">Freedom of Religion</label>
                                                </div>
                                                <div className="custom-control custom-checkbox">
                                                    <input id="customCheckCustom-26" type="checkbox"
                                                           className="custom-control-input"/>
                                                    <label htmlFor="customCheckCustom-26"
                                                           className="custom-control-label">Freedom Over Life
                                                        Choices</label>
                                                </div>
                                                <div className="custom-control custom-checkbox">
                                                    <input id="customCheckCustom-27" type="checkbox"
                                                           className="custom-control-input"/>
                                                    <label htmlFor="customCheckCustom-27"
                                                           className="custom-control-label">Satisfied Demand for
                                                        Contraception</label>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="w-100"></div>
                                        <div className="col">
                                            <p className="border-bottom pb-3">Personal Freedom and Choice</p>
                                            <div className="item-list mb-4">
                                                <div className="custom-control custom-checkbox">
                                                    <input id="customCheckCustom-28" type="checkbox"
                                                           className="custom-control-input"/>
                                                    <label htmlFor="customCheckCustom-28"
                                                           className="custom-control-label"> Corruption</label>
                                                </div>
                                                <div className="custom-control custom-checkbox">
                                                    <input id="customCheckCustom-29" type="checkbox"
                                                           className="custom-control-input"/>
                                                    <label htmlFor="customCheckCustom-29"
                                                           className="custom-control-label">Early Marriage</label>
                                                </div>
                                                <div className="custom-control custom-checkbox">
                                                    <input id="customCheckCustom-30" type="checkbox"
                                                           className="custom-control-input"/>
                                                    <label htmlFor="customCheckCustom-30"
                                                           className="custom-control-label">Freedom of Religion</label>
                                                </div>
                                                <div className="custom-control custom-checkbox">
                                                    <input id="customCheckCustom-31" type="checkbox"
                                                           className="custom-control-input"/>
                                                    <label htmlFor="customCheckCustom-31"
                                                           className="custom-control-label">Freedom Over Life
                                                        Choices</label>
                                                </div>
                                                <div className="custom-control custom-checkbox">
                                                    <input id="customCheckCustom-32" type="checkbox"
                                                           className="custom-control-input"/>
                                                    <label htmlFor="customCheckCustom-32"
                                                           className="custom-control-label">Satisfied Demand for
                                                        Contraception</label>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col">
                                            <p className="border-bottom pb-3">Personal Freedom and Choice</p>
                                            <div className="item-list mb-4">
                                                <div className="custom-control custom-checkbox">
                                                    <input id="customCheckCustom-33" type="checkbox"
                                                           className="custom-control-input"/>
                                                    <label htmlFor="customCheckCustom-33"
                                                           className="custom-control-label"> Corruption</label>
                                                </div>
                                                <div className="custom-control custom-checkbox">
                                                    <input id="customCheckCustom-34" type="checkbox"
                                                           className="custom-control-input"/>
                                                    <label htmlFor="customCheckCustom-34"
                                                           className="custom-control-label">Early Marriage</label>
                                                </div>
                                                <div className="custom-control custom-checkbox">
                                                    <input id="customCheckCustom-35" type="checkbox"
                                                           className="custom-control-input"/>
                                                    <label htmlFor="customCheckCustom-35"
                                                           className="custom-control-label">Freedom of Religion</label>
                                                </div>
                                                <div className="custom-control custom-checkbox">
                                                    <input id="customCheckCustom-36" type="checkbox"
                                                           className="custom-control-input"/>
                                                    <label htmlFor="customCheckCustom-36"
                                                           className="custom-control-label">Freedom Over Life
                                                        Choices</label>
                                                </div>
                                                <div className="custom-control custom-checkbox">
                                                    <input id="customCheckCustom-37" type="checkbox"
                                                           className="custom-control-input"/>
                                                    <label htmlFor="customCheckCustom-37"
                                                           className="custom-control-label">Satisfied Demand for
                                                        Contraception</label>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col">
                                            <p className="border-bottom pb-3">Personal Freedom and Choice</p>
                                            <div className="item-list mb-4">
                                                <div className="custom-control custom-checkbox">
                                                    <input id="customCheckCustom-38" type="checkbox"
                                                           className="custom-control-input"/>
                                                    <label htmlFor="customCheckCustom-38"
                                                           className="custom-control-label"> Corruption</label>
                                                </div>
                                                <div className="custom-control custom-checkbox">
                                                    <input id="customCheckCustom-39" type="checkbox"
                                                           className="custom-control-input"/>
                                                    <label htmlFor="customCheckCustom-39"
                                                           className="custom-control-label">Early Marriage</label>
                                                </div>
                                                <div className="custom-control custom-checkbox">
                                                    <input id="customCheckCustom-40" type="checkbox"
                                                           className="custom-control-input"/>
                                                    <label htmlFor="customCheckCustom-40"
                                                           className="custom-control-label">Freedom of Religion</label>
                                                </div>
                                                <div className="custom-control custom-checkbox">
                                                    <input id="customCheckCustom-41" type="checkbox"
                                                           className="custom-control-input"/>
                                                    <label htmlFor="customCheckCustom-41"
                                                           className="custom-control-label">Freedom Over Life
                                                        Choices</label>
                                                </div>
                                                <div className="custom-control custom-checkbox">
                                                    <input id="customCheckCustom-42" type="checkbox"
                                                           className="custom-control-input"/>
                                                    <label htmlFor="customCheckCustom-42"
                                                           className="custom-control-label">Satisfied Demand for
                                                        Contraception</label>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
        )
    }

    onDropdownChange() {

    }

    filterOrgList(filter) {
        this.props.fetchFilteredOrgList(filter);
        // const { orgList } = this.props;
        // let orgListCopy = JSON.parse(JSON.stringify(orgList));
        //  let filteredList = orgListCopy.filter((org => {
        //     return Object.keys(filter).map((key) => {
        //        return (filter[key].toLowerCase() === org[key].toLowerCase() || filter[key] === 'All');
        //     })[0];
        // }));

        this.setState({
            activeButton: filter['sector']
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
        this.props.setAppliedFilters([]);
        this.setState({
            activeButton: 'All'
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
    changePage: (id) => push('/organizations/'+ id),
    fetchOrganisationsList,
    filterOrganisationsList,
    fetchFilteredOrgList,
    setAppliedFilters
}, dispatch)

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(OrgList);