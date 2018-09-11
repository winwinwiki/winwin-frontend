import React from 'react';
import { push } from 'react-router-redux';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import ReactTable from "react-table";
import 'react-table/react-table.css'

import { addToAppNavigation, removeFromAppNavigation } from '../../actions/sectionHeader/sectionHeaderAction';
import { fetchUsersList } from '../../actions/userManagement/userListAction';
import UploadUserModal from './uploadUsersModal';
import Dropdown from '../ui/dropdown';
import Search from '../ui/searchBar';
import ButtonGroup from '../ui/buttonGroup';

const actionList = ['Make Active', 'Make Inactive', 'Edit User', 'Delete User'];
const buttonList = [{ id: 'all', name: 'All' }, { id: 'active', name: 'Active' }, { id: 'inactive', name: 'Inactive' }]
const uploadOptions = ['Create Users', 'Update Users'];
const columns = [{
    id: 'select',
    Header: <span><input type="checkbox" /></span>,
    accessor: 'select',
    sortable: false,
    Cell: (row) => <div className="centerText"><input type="checkbox" checked={row.value} /></div>,
    width: 50
}, {
    id: 'user',
    Header: 'User Name',
    accessor: 'name',
    sortable: true,
    Cell: (row) => <div className="centerText">{row.value}</div>
}, {
    id: 'role',
    Header: 'Role',
    accessor: 'role',
    sortable: false,
    Cell: (row) => <div className="centerText">{row.value}</div>
}, {
    id: 'team',
    Header: 'Team',
    accessor: 'team',
    sortable: false,
    Cell: (row) => <div className="centerText">{row.value}</div>
}]

class UserList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            action: '',
            userList: [],
            activeButton: ['Active'],
            searchText: '',
            upload: ''
        }
        this.onChange = this.onChange.bind(this);
        this.changePage = this.changePage.bind(this);
        this.onDropdownChange = this.onDropdownChange.bind(this);
        this.setActiveButton = this.setActiveButton.bind(this);
        this.onSingleRowSelect = this.onSingleRowSelect.bind(this);
        this.onColumnSelect = this.onColumnSelect.bind(this);
        this.onEditUser = this.onEditUser.bind(this);
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
        if (this.props.userList.length > 0) {
            this.setState({
                userList: this.props.userList
            })
        }
    }

    componentWillReceiveProps(nextProps) {
        if (JSON.stringify(nextProps.userList) !== JSON.stringify(this.props.userList)) {
            this.setState({
                userList: nextProps.userList
            });
        }
    }

    render() {
        const { action, userList, activeButton, searchText, upload } = this.state;
        const { isFetchUserSuccess } = this.props;
        if (!isFetchUserSuccess || !userList) {
            return null;
        }
        return (
            <section className="dashboard-content p-0">

                <div className="d-flex align-content-center border-bottom py-3">
                    <Search placeholder="Search by name or team" onChange={this.onChange} value={searchText} />
                    <ButtonGroup activeButton={activeButton} buttonList={buttonList} onChange={this.setActiveButton} />
                    <div className="dropdown ml-auto">
                        <button id="uploadUsers" type="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" className="btn btn-primary dropdown-toggle btn-block btn-sm">Upload Users</button>
                        <div aria-labelledby="uploadUsers" className="dropdown-menu">
                            {uploadOptions && uploadOptions.map((item, idx) => <a href="javascript:;" key={idx} data-toggle="modal" data-target="#uploadUsersModal" className="dropdown-item" onClick={() => this.onDropdownChange('upload', item)}>{item}</a>)}
                        </div>
                    </div>
                </div>

                <div className="d-flex py-3 align-items-center applied-filters-container">
                    <Dropdown
                        placeholder="Actions"
                        name="action"
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
                        className=""
                        sortable={true}
                        multiSort={true}
                        defaultSorted={[{
                            id: "user",
                            asc: true
                        }]}
                        getTdProps={(state, rowInfo, column) => {
                            return {
                                onClick: (e) => {
                                    if (column.id !== 'select') {
                                        this.changePage(rowInfo.original.id);
                                    } else {
                                        this.onSingleRowSelect(rowInfo.original.id, e.target.checked);
                                    }
                                },
                                style: {
                                    height: 50
                                }
                            }
                        }
                        }
                        getTheadThProps={(state, rowInfo, column) => {
                            return {
                                onClick: (e) => {
                                    if (column.id == 'select') {
                                        this.onColumnSelect(e.target.checked);
                                    }
                                },
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
                <UploadUserModal action={upload} />
            </section>
        )
    }

    onSingleRowSelect(id, value) {
        const { userList } = this.state;
        let newUserList = userList.slice();
        newUserList = newUserList.map(user => { if (user.id == id) { user.select = value } return user; });
        this.setState({
            userList: newUserList
        })
    }

    onColumnSelect(value) {
        const { userList } = this.state;
        let newUserList = userList.slice();
        newUserList = newUserList.map(user => { user.select = value; return user; });
        this.setState({
            userList: newUserList
        })
    }

    onChange(e) {
        this.setState({
            searchText: e.target.value
        });
    }

    changePage(orgId) {
        this.props.changePage(orgId);
    }

    onDropdownChange(field, value) {
        this.setState({ [field]: value });
        if (field == "action" && value == "Edit User") {
            this.onEditUser();
        }
    }

    onEditUser() {
        const { userList } = this.state;
        let selectedUsers = userList.slice();
        selectedUsers = selectedUsers.filter(user => user.select);
        if (selectedUsers && selectedUsers.length > 0) {
            selectedUsers = selectedUsers.map(user => { delete user.select; delete user.status; return user; });
            this.downloadCSVFile("Edit-User.csv", selectedUsers);
        }
    }

    createCSVFile(selectedUsers) {
        let result = '', ctr,
            keys = Object.keys(selectedUsers[0]);

        result += keys.join(",");
        result += "\n";

        selectedUsers.map(user => {
            ctr = 0;
            keys.map(key => {
                if (ctr > 0) result += ",";
                result += user[key];
                ctr++;
            });
            result += "\n";
        });
        return result;
    }

    downloadCSVFile(fileName, selectedUsers) {
        let data, filename, link;
        let csv = this.createCSVFile(selectedUsers);
        if (csv == null) return;

        filename = fileName || 'export.csv';

        if (!csv.match(/^data:text\/csv/i)) {
            csv = 'data:text/csv;charset=utf-8,' + csv;
        }
        data = encodeURI(csv);

        link = document.createElement('a');
        link.setAttribute('href', data);
        link.setAttribute('download', filename);
        link.click();
    }

    setActiveButton(field) {
        const { activeButton } = this.state;
        let newSectors = activeButton.slice();
        if (field == "All") {
            newSectors = ["All"];
        } else {
            newSectors.indexOf("All") > -1 ? newSectors.splice(newSectors.indexOf("All"),1): '';
            newSectors.indexOf(field) > -1 ? newSectors.splice(newSectors.indexOf(field), 1) : newSectors.push(field);
        }
        newSectors.length == 0 ? newSectors.push("All"): '';
        //this.props.fetchFilteredUserList({type: field});

        this.setState({
            activeButton: newSectors
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