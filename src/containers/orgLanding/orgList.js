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
            orgList: []
        }
        this.onDropdownChange = this.onDropdownChange.bind(this);
        this.filterOrgList = this.filterOrgList.bind(this);
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
        const { entity, orgList } = this.state;
        const {isFetchOrgSuccess} = this.props;
        if(!isFetchOrgSuccess || !orgList) {
            return null;
        }
        return (
        <section className="dashboard-content p-0">
        <OrgFilters filterOrgList={this.filterOrgList}/>
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
            <AppliedOrgFilters/>
            <div className="clear-filters">
                <a href="javascript:;" className="text-primary">Clear All Filters</a>
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
        </div>
    </section>
        )
    }

    onDropdownChange() {

    }

    filterOrgList(filter) {
        const { orgList } = this.props;
        let orgListCopy = JSON.parse(JSON.stringify(orgList));
         let filteredList = orgListCopy.filter((org => {
            return Object.keys(filter).map((key) => {
               return (filter[key].toLowerCase() === org[key].toLowerCase() || filter[key] === 'All')[0];
            });
        }));

        this.setState({
            orgList: filteredList
        });
    }

    filterOrgList(filter) {
        const { orgList, appliedFilterList } = this.props;
        let orgListCopy = JSON.parse(JSON.stringify(orgList));
         let filteredList = orgListCopy.filter((org => {
            return Object.keys(filter).map((key) => {
                switch(key) {
                    case 'userMod':
                    case 'priority':
                    case 'subIndustryCls':
                    case 'industryCls': 
                    case 'frameworkTag':
                    case 'level1':
                    case 'level2':
                    case 'level3':
                        return appliedFilterList[key].includes('Select') || !appliedFilterList[key] ? false :  (filter[key].toLowerCase() === org[key].toLowerCase())[0];
                    case 'revenueRange':
                        break;
                    case 'assetsRange':
                        return  filter[key]['min'] >= org[key] && filter[key]['max'] <= org[key];
                    default:
                        break;
        
                }
               return;
            });
        }));
        
        this.setState({
            orgList: filteredList
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
    filterOrganisationsList
}, dispatch)

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(OrgList);