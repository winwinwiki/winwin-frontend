import React from 'react';
import { push } from 'react-router-redux';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import ReactTable from "react-table";
import 'react-table/react-table.css'
import './orgList.css';

import OrgFilters from './orgFilter';
import Dropdown from '../ui/dropdown';
import {fetchOrganisationsList} from '../../actions/orgLanding/orgLandingAction';

const filterList = ['Federal', 'Private', 'Social'];
const columns = [{
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
            entity: filterList[0]
        }
        this.onDropdownChange = this.onDropdownChange.bind(this);
    }

    componentDidMount() {
        this.props.fetchOrganisationsList();
    }

    render() {
        const { entity } = this.state;
        const {isFetchOrgSuccess, orgList} = this.props;
        if(!isFetchOrgSuccess || !orgList) {
            console.log("org list ")
            console.log(orgList)
            return null;
        }
        return (
        <section className="dashboard-content p-0">
        <OrgFilters/>
        <div className="d-flex py-3 align-items-center applied-filters-container">
            <Dropdown
                selectedItem={entity}
                name="filterEntity"
                onChange={this.onDropdownChange.bind(this)}
                items={filterList}/>
            <div className="result-count">
                1,203 organizations found
            </div>
            <div className="applied-filters col align-items-center d-flex">
                <span className="badge badge-pill badge-secondary">Arts &amp; Culture (A20) <a href="javascript:;" className=""><i className="icon-close"></i></a></span>
                <span className="badge badge-pill badge-secondary">Allison Zimmerman  <a href="javascript:;" className=""><i className="icon-close"></i></a></span>
                <span className="badge badge-pill badge-secondary">Basic Human Need - Opportunity - All  <a href="javascript:;" className=""><i className="icon-close"></i></a></span>
                <a href="javascript:;" className="text-primary">+ 2 More</a>
            </div>
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
            getTrProps={(state, rowInfo) => {
                return {
                  onClick: (e) => {
                    this.props.changePage(rowInfo.original.id);
                  }
                }
              }
            }
            getTdProps={(state, rowInfo) => {
                return {
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
}

const mapStateToProps = state => ({
    isFetchOrgPending: state.orgLanding.isFetchOrgPending,
    isFetchOrgSuccess: state.orgLanding.isFetchOrgSuccess,
    fetchOrgError: state.orgLanding.fetchOrgError,
    orgList: state.orgLanding.orgList
})

const mapDispatchToProps = dispatch => bindActionCreators({
    changePage: (id) => push('/organizations/'+ id),
    fetchOrganisationsList
}, dispatch)

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(OrgList);