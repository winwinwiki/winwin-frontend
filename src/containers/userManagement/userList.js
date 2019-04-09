import React from "react";
import { push } from "react-router-redux";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import ReactTable from "react-table";
import "react-table/react-table.css";
import { fetchUsersList } from "../../actions/userManagement/userListAction";
import UploadUserModal from "./uploadUsersModal";
import Dropdown from "../ui/dropdown";
import Search from "../ui/searchBar";
import ButtonGroup from "../ui/buttonGroup";

const actionList = ["Make Active", "Make Inactive"];
const buttonList = [
  { id: "all", name: "All" },
  { id: "active", name: "Active" },
  { id: "inactive", name: "Inactive" }
];
const columns = [
  {
    id: "select",
    Header: (
      <span>
        <input type="checkbox" />
      </span>
    ),
    accessor: "select",
    sortable: false,
    Cell: row => (
      <div className="centerText">
        <input type="checkbox" checked={row.value} />
      </div>
    ),
    width: 50
  },
  {
    id: "user",
    Header: "User Name",
    accessor: row => {
      return { name: row.name, status: row.status };
    },
    sortable: true,
    Cell: row => {
      return (
        <React.Fragment>
          <div
            className={`statusCircle d-inline-block mx-2 ${
              row.value.status === "Active" ? "active" : ""
            }`}
          />
          <div className="d-inline-block centerText">{row.value.name}</div>
        </React.Fragment>
      );
    }
  },
  {
    id: "role",
    Header: "Role",
    accessor: "role",
    sortable: false,
    Cell: row => <div className="centerText">{row.value}</div>
  },
  {
    id: "team",
    Header: "Team",
    accessor: "team",
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

class UserList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      action: "",
      userList: [],
      activeButton: ["Active"],
      searchText: "",
      upload: ""
    };
    this.onChange = this.onChange.bind(this);
    this.changePage = this.changePage.bind(this);
    this.onDropdownChange = this.onDropdownChange.bind(this);
    this.setActiveButton = this.setActiveButton.bind(this);
    this.onSingleRowSelect = this.onSingleRowSelect.bind(this);
    this.onColumnSelect = this.onColumnSelect.bind(this);
    this.onEditUser = this.onEditUser.bind(this);
    this.onCreateUserDownload = this.onCreateUserDownload.bind(this);
  }

  componentDidMount() {
    this.props.fetchUsersList();
    if (this.props.userList.length > 0) {
      this.setState({
        userList: this.props.userList
      });
    }
  }

  componentWillReceiveProps(nextProps) {
    if (
      JSON.stringify(nextProps.userList) !== JSON.stringify(this.props.userList)
    ) {
      this.setState({
        userList: nextProps.userList
      });
    }
  }

  render() {
    const { userList, activeButton, searchText } = this.state;
    const { isFetchUserSuccess } = this.props;
    if (!isFetchUserSuccess || !userList) {
      return null;
    }
    return (
      <section className="dashboard-content p-0">
        <div className="d-flex align-content-center border-bottom py-3">
          <Search
            placeholder="Search by name or team"
            onChange={this.onChange}
            value={searchText}
          />

          <ButtonGroup
            activeButton={activeButton}
            buttonList={buttonList}
            onChange={this.setActiveButton}
          />

          <div className="dropdown ml-auto">
            {/* <button
              id="uploadUsers"
              type="button"
              data-toggle="dropdown"
              aria-haspopup="true"
              aria-expanded="false"
              className="btn btn-primary dropdown-toggle btn-block btn-sm"
            >
              Create Users
            </button> */}
            <a
              href="javascript:;"
              onClick={() => this.changePage("new")}
              className="btn btn-link"
            >
              <i className="icon-add mr-1" /> Create
            </a>

            <div aria-labelledby="uploadUsers" className="dropdown-menu">
              <a
                href="javascript:;"
                className="dropdown-item"
                onClick={this.onCreateUserDownload}
              >
                Download Template
              </a>
              <a
                href="javascript:;"
                data-toggle="modal"
                data-target="#uploadUsersModal"
                className="dropdown-item"
              >
                Upload Template
              </a>
            </div>
          </div>
        </div>
        <div className="d-flex py-3 align-items-center applied-filters-container">
          <Dropdown
            placeholder="Actions"
            name="action"
            containerClass="dropdown dropdown-with-searchbox"
            onChange={this.onDropdownChange.bind(this)}
            items={actionList}
          />
          <div className="result-count">{userList.length} users found</div>
        </div>
        <div>
          <ReactTable
            pageSize={10}
            data={userList}
            columns={columns}
            className="-highlight"
            sortable={true}
            multiSort={true}
            defaultSorted={[
              {
                id: "user",
                asc: true
              }
            ]}
            getTdProps={(state, rowInfo, column) => {
              return {
                onClick: e => {
                  if (column.id !== "select" && column.id !== "delete") {
                    this.changePage(rowInfo.original.id);
                  } else if (column.id !== "select") {
                    this.onSingleRowSelect(
                      rowInfo.original.id,
                      e.target.checked
                    );
                  } else if (column.id !== "delete") {
                  }
                },
                style: {
                  height: 50
                }
              };
            }}
            getTheadThProps={(state, rowInfo, column) => {
              return {
                onClick: e => {
                  if (column.id === "select") {
                    this.onColumnSelect(e.target.checked);
                  }
                },
                style: {
                  height: 50,
                  verticalAlign: "middle",
                  lineHeight: 3
                }
              };
            }}
          />
        </div>
        <UploadUserModal />
      </section>
    );
  }

  onSingleRowSelect(id, value) {
    const { userList } = this.state;
    let newUserList = userList.slice();
    newUserList = newUserList.map(user => {
      if (user.id === id) {
        user.select = value;
      }
      return user;
    });
    this.setState({
      userList: newUserList
    });
  }

  onColumnSelect(value) {
    const { userList } = this.state;
    let newUserList = userList.slice();
    newUserList = newUserList.map(user => {
      user.select = value;
      return user;
    });
    this.setState({
      userList: newUserList
    });
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
    if (field === "action" && value === "Edit User") {
      this.onEditUser();
    }
  }

  onCreateUserDownload() {
    let createUser = [
      {
        firstname: "",
        lastname: "",
        email: "",
        role: "",
        location: "",
        status: ""
      }
    ];
    this.downloadCSVFile("Create-User.csv", createUser);
  }

  onEditUser() {
    const { userList } = this.state;
    let selectedUsers = userList.slice();
    selectedUsers = selectedUsers.filter(user => user.select);
    if (selectedUsers && selectedUsers.length > 0) {
      selectedUsers = selectedUsers.map(user => {
        delete user.select;
        delete user.status;
        return user;
      });
      this.downloadCSVFile("Edit-User.csv", selectedUsers);
    }
  }

  createCSVFile(selectedUsers) {
    let result = "",
      ctr,
      keys = Object.keys(selectedUsers[0]);

    result += keys.join(",");
    result += "\n";

    selectedUsers.map(user => {
      ctr = 0;
      keys.map(key => {
        if (ctr > 0) result += ",";
        result += user[key];
        ctr++;
        return result;
      });
      result += "\n";
      return result;
    });
    return result;
  }

  downloadCSVFile(fileName, selectedUsers) {
    let data, filename, link;
    let csv = this.createCSVFile(selectedUsers);
    if (csv == null) return;

    filename = fileName || "export.csv";

    if (!csv.match(/^data:text\/csv/i)) {
      csv = "data:text/csv;charset=utf-8," + csv;
    }
    data = encodeURI(csv);

    link = document.createElement("a");
    link.setAttribute("href", data);
    link.setAttribute("download", filename);
    link.click();
  }

  setActiveButton(field) {
    const { activeButton } = this.state;
    let newSectors = activeButton.slice();
    if (field === "All") {
      newSectors = ["All"];
    } else {
      if (newSectors.indexOf("All") > -1)
        newSectors.splice(newSectors.indexOf("All"), 1);

      newSectors.indexOf(field) > -1
        ? newSectors.splice(newSectors.indexOf(field), 1)
        : newSectors.push(field);
    }
    if (newSectors.length === 0) newSectors.push("All");
    //this.props.fetchFilteredUserList({type: field});

    this.setState({
      activeButton: newSectors
    });
  }
}

const mapStateToProps = state => ({
  isFetchUserPending: state.userManagement.isFetchUserPending,
  isFetchUserSuccess: state.userManagement.isFetchUserSuccess,
  fetchUserError: state.userManagement.fetchUserError,
  userList: state.userManagement.userList
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      changePage: id => push("/user-management/" + id),
      fetchUsersList
    },
    dispatch
  );

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(UserList);
