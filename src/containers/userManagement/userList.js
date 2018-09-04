import React from 'react';
import { push } from 'react-router-redux';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import ReactTable from "react-table";
import 'react-table/react-table.css'

import { addToAppNavigation, removeFromAppNavigation } from '../../actions/sectionHeader/sectionHeaderAction';
import { fetchUsersList } from '../../actions/userManagement/userListAction';

import Dropdown from '../ui/dropdown';
import Search from '../ui/searchBar';
import ButtonGroup from '../ui/buttonGroup';

const actionList = ['Make Active', 'Make Inactive'];
const buttonList = [{ id: 'all', name: 'All' }, { id: 'active', name: 'Active' }, { id: 'inactive', name: 'Inactive' }]
const columns = [{
    id: 'select',
    Header: <span><input type="checkbox" /></span>,
    accessor: 'name',
    Cell: () => <div className="centerText"><input type="checkbox" /></div>,
    width: 50
}, {
    id: 'user',
    Header: 'User Name',
    accessor: 'name',
    Cell: (row) => <div className="centerText">{row.value}</div>
}, {
    id: 'role',
    Header: 'Role',
    accessor: 'role',
    Cell: (row) => <div className="centerText">{row.value}</div>
}, {
    id: 'team',
    Header: 'Team',
    accessor: 'team',
    Cell: (row) => <div className="centerText">{row.value}</div>
}]

class UserList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            action: '',
            userList: [],
            activeButton: 'Active',
            searchText: ''
        }
        this.onChange = this.onChange.bind(this);
        this.changePage = this.changePage.bind(this);
        this.onDropdownChange = this.onDropdownChange.bind(this);
        this.setActiveButton = this.setActiveButton.bind(this);
    }

    componentDidMount() {
        this.props.fetchUsersList();
        this.props.removeFromAppNavigation({
            title: "User Management",
            path: "/user-management"
        });
        this.props.removeFromAppNavigation({
            title: "Organisation Management",
            path: "/organizations"
        });
        this.props.addToAppNavigation({
            title: "User Management",
            path: "/user-management"
        });
    }

    componentWillReceiveProps(nextProps) {
        if (JSON.stringify(nextProps.userList) !== JSON.stringify(this.props.userList)) {
            this.setState({
                userList: nextProps.userList
            });
        }
    }

    render() {
        const { action, userList, activeButton, searchText } = this.state;
        const { isFetchUserSuccess } = this.props;
        if (!isFetchUserSuccess || !userList) {
            return null;
        }
        return (
            <section className="dashboard-content p-0">

                <div className="d-flex align-content-center border-bottom py-3">
                    <Search placeholder="Search by name or team" onChange={this.onChange} value={searchText} />
                    <ButtonGroup activeButton={activeButton} buttonList={buttonList} onChange={this.setActiveButton} />
                    <div className="ml-auto">
                        <button className="btn btn-primary mr-2" onClick={() => this.changePage('upload-users')}>Upload</button>
                    </div>
                </div>

                <div className="d-flex py-3 align-items-center applied-filters-container">
                    <Dropdown
                        selectedItem={action}
                        placeholder="Actions"
                        name="filterEntity"
                        containerClass="dropdown dropdown-with-searchbox"
                        onChange={this.onDropdownChange.bind(this)}
                        items={actionList} />
                    <div className="result-count">
                        {userList.length} users found
                    </div>
                </div>
                <div>
                    <ReactTable
                        pageSize={10}
                        data={userList}
                        columns={columns}
                        className="-highlight"
                        sorted={[{
                            id: "user",
                            asc: true
                        }]}
                        getTdProps={(state, rowInfo, column) => {
                            return {
                                onClick: (e) => {
                                    if (column.id !== 'select') {
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

    onChange(e) {
        this.setState({
            searchText: e.target.value
        });
    }

    changePage(orgId) {
        this.props.changePage(orgId);
    }

    onDropdownChange() {

    }

    setActiveButton(field) {
        //this.props.fetchFilteredUserList({type: field});

        this.setState({
            activeButton: field
        })
    }
}

const mapStateToProps = state => ({
    isFetchUserPending: state.userManagement.isFetchUserPending,
    isFetchUserSuccess: state.userManagement.isFetchUserSuccess,
    fetchUserError: state.userManagement.fetchUserError,
    userList: state.userManagement.userList
})

const mapDispatchToProps = dispatch => bindActionCreators({
    changePage: (id) => push('/user-management/' + id),
    addToAppNavigation,
    removeFromAppNavigation,
    fetchUsersList
}, dispatch)

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(UserList);