import React from "react";
import { push } from "react-router-redux";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import ReactTable from "react-table";
import "react-table/react-table.css";
import {
  fetchUsersList,
  deleteUser
} from "../../actions/userManagement/userListAction";
import UploadUserModal from "./uploadUsersModal";
import Dropdown from "../ui/dropdown";
import Search from "../ui/searchBar";
import ButtonGroup from "../ui/buttonGroup";
import { Link } from "react-router-dom";
import {
  startLoaderAction,
  stopLoaderAction
} from "../../actions/common/loaderActions";
import { onSaveUserInfo } from "../../actions/users/saveUserInfoAction";
import { PopupModal } from "../ui/popupModal";
import { isUserProfile } from "../../constants";

const actionList = ["Make Active", "Make Inactive"];
const buttonList = [
  { id: "all", name: "All" },
  { id: "active", name: "Active" },
  { id: "inactive", name: "Inactive" }
];

class UserList extends React.Component {
  state = {
    action: "",
    userList: [],
    filteredList: [],
    activeButton: ["Active"],
    search: "",
    upload: "",
    selected: {},
    selectAll: 0
  };

  componentDidMount() {
    this.props.startLoaderAction();
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

  componentDidUpdate(prevProps) {
    if (
      prevProps.userList !== this.props.userList &&
      this.props.userList.data
    ) {
      this.props.stopLoaderAction();
    }
  }

  //******CheckBox**** */
  toggleRow = email => {
    const { userList: { data: userList } = {} } = this.state;
    let { filteredList = [] } = this.state;
    const newSelected = Object.assign({}, this.state.selected);
    newSelected[email] = !this.state.selected[email];
    if (newSelected[email]) {
      filteredList = [...filteredList, userList.find(x => x.email === email)];
    } else filteredList = filteredList.filter(x => x.email !== email);

    this.setState({
      selected: newSelected,
      selectAll: 2,
      filteredList
    });
  };

  toggleSelectAll = () => {
    let newSelected = {};

    if (this.state.selectAll === 0) {
      this.state.userList.data.forEach(x => {
        newSelected[x.email] = "true";
      });
    }

    this.setState(
      {
        selected: newSelected,
        selectAll: this.state.selectAll === 0 ? 1 : 0
      },
      () => {
        this.setState({
          filteredList:
            this.state.selectAll === 1 ? this.state.userList.data : []
        });
      }
    );
  };
  //******CheckBox**** */

  columns = [
    {
      id: "select",
      Cell: ({ original, value }) => {
        return (
          <div className="centerText">
            <input
              type="checkbox"
              className="checkbox"
              checked={this.state.selected[original.email] === true}
              onChange={() => this.toggleRow(original.email)}
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
      width: 50
    },
    {
      id: "user",
      Header: "User Name",
      // accessor: row => {
      //   return { name: row.name, status: row.status };
      // },
      accessor: "userDisplayName",
      sortable: true,
      Cell: row => {
        return (
          <React.Fragment>
            <div
              className={`statusCircle d-inline-block mx-2 ${
                JSON.parse(row.original.isActive) === true ? "active" : ""
              }`}
            />
            <Link
              className="centerText d-inline-block"
              to={{
                pathname:
                  "user-management/" + encodeURIComponent(row.original.email),
                state: {
                  email: row.original.email
                }
              }}
            >
              {row.value}
            </Link>
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
      accessor: "email",
      sortable: false,
      Cell: row =>
        row.original.email !== this.props.loggedInUserEmail ? (
          <span
            className="centerText"
            data-toggle="modal"
            data-target="#deleteModal"
            onClick={() =>
              this.setUser(row.value, row.original.userDisplayName)
            }
          />
        ) : (
          ""
        ),
      width: 50
    }
  ];

  setUser = (email, userDisplayName) => {
    this.setState({ email, userDisplayName });
  };

  handleDelete = email => {
    this.props.deleteUser({ email });
  };

  render() {
    const {
      // userList: { data: userList } = {},
      activeButton,
      search
    } = this.state;
    let userList = this.state.userList.data;
    if (!userList) {
      return null;
    }
    //filter by searched text
    if (this.state.search) {
      userList = userList.filter(row => {
        return (
          (row.userDisplayName
            ? row.userDisplayName
                .toLowerCase()
                .includes(this.state.search.toLowerCase())
            : "") ||
          (row.team
            ? row.team.toLowerCase().includes(this.state.search.toLowerCase())
            : "")
        );
      });
    }
    //search by status
    if (this.state.activeButton.length === 1) {
      if (this.state.activeButton.indexOf("Active") > -1)
        userList = userList.filter(row => row.isActive === "true");
      if (this.state.activeButton.indexOf("Inactive") > -1)
        userList = userList.filter(row => row.isActive === "false");
    }
    return (
      <section className="dashboard-content p-0">
        <div className="d-flex align-content-center border-bottom py-3">
          <Search
            placeholder="Search by name or team"
            onChange={e => this.setState({ search: e.target.value })}
            value={search}
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
            onChange={this.onDropdownChange}
            items={actionList}
          />
          <div className="result-count">{userList.length} users found</div>
        </div>
        <div>
          <ReactTable
            pageSize={userList.length > 10 ? 10 : userList.length}
            minRows={3}
            showPageSizeOptions={false}
            noDataText="No users found"
            data={userList}
            columns={this.columns}
            className="-highlight"
            sortable={true}
            multiSort={true}
            defaultSorted={[
              {
                id: "user",
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
            // getTdProps={(state, rowInfo, column) => {
            //   return {
            //     onClick: e => {
            //       if (column.id !== "select" && column.id !== "delete") {
            //         this.changePage(rowInfo.original.id);
            //       } else if (column.id !== "select") {
            //         this.onSingleRowSelect(
            //           rowInfo.original.id,
            //           e.target.checked
            //         );
            //       } else if (column.id !== "delete") {
            //       }
            //     },
            //     style: {
            //       height: 50
            //     }
            //   };
            // }}
            // getTheadThProps={(state, rowInfo, column) => {
            //   return {
            //     onClick: e => {
            //       if (column.id === "select") {
            //         this.onColumnSelect(e.target.checked);
            //       }
            //     },
            //     style: {
            //       height: 50,
            //       verticalAlign: "middle",
            //       lineHeight: 3
            //     }
            //   };
            // }}
          />
        </div>
        <UploadUserModal />
        <PopupModal
          modalid="deleteModal"
          modaltitle="Alert!"
          modalcontent={`Are you sure you want to delete '${
            this.state.userDisplayName
          }' ?`}
          primarybuttontext="Delete User"
          secondarybuttontext="Cancel"
          handleDelete={() => this.handleDelete(this.state.email)}
        />
      </section>
    );
  }

  // onSingleRowSelect = (id, value) => {
  //   const { userList: { data: userList } = {} } = this.state;
  //   let newUserList = userList.slice();
  //   newUserList = newUserList.map(user => {
  //     if (user.id === id) {
  //       user.select = value;
  //     }
  //     return user;
  //   });
  //   this.setState({
  //     userList: newUserList
  //   });
  // };

  // onColumnSelect = value => {
  //   const { userList } = this.state;
  //   let newUserList = userList.slice();
  //   newUserList = newUserList.map(user => {
  //     user.select = value;
  //     return user;
  //   });
  //   this.setState({
  //     userList: newUserList
  //   });
  // };

  onChange = e => {
    this.setState({
      search: e.target.value
    });
  };

  changePage = orgId => {
    this.props.changePage(orgId);
  };

  onDropdownChange = (field, value) => {
    let { filteredList = [] } = this.state;
    this.setState({ [field]: value });
    if (field === "action" && value === "Edit User") {
      this.onEditUser();
    }
    if (field === "action" && value === "Make Active")
      filteredList = filteredList.map(x => {
        x.isActive = "true";
        return x;
      });
    if (field === "action" && value === "Make Inactive")
      filteredList = filteredList.map(x => {
        x.isActive = "false";
        return x;
      });
    this.props.onSaveUserInfo(filteredList, !isUserProfile);
    this.setState({
      selected: {},
      selectAll: 0,
      filteredList: []
    });
  };

  onCreateUserDownload = () => {
    let createUser = [
      {
        userDisplayName: "",
        lastname: "",
        email: "",
        role: "",
        location: "",
        status: ""
      }
    ];
    this.downloadCSVFile("Create-User.csv", createUser);
  };

  onEditUser = () => {
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
  };

  createCSVFile = selectedUsers => {
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
  };

  downloadCSVFile = (fileName, selectedUsers) => {
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
  };

  setActiveButton = field => {
    const { activeButton } = this.state;
    let newSectors = activeButton.slice();
    if (field === "All") {
      newSectors = ["All"];
    } else {
      if (newSectors.indexOf("All") > -1)
        newSectors.splice(newSectors.indexOf("All"), 1);

      newSectors.indexOf(field) > -1
        ? newSectors.splice(newSectors.indexOf(field), 1)
        : (newSectors[0] = field);
    }
    if (newSectors.length === 0) newSectors.push("All");
    //this.props.fetchFilteredUserList({type: field});

    this.setState({
      activeButton: newSectors
    });
  };
}

const mapStateToProps = state => ({
  userList: state.userManagement,
  loggedInUserEmail: state.session.user.email
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      changePage: id => push("/user-management/" + id),
      fetchUsersList,
      startLoaderAction,
      stopLoaderAction,
      deleteUser,
      onSaveUserInfo
    },
    dispatch
  );

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(UserList);
