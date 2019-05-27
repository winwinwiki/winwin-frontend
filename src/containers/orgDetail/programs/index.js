import React from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";

import { Link } from "react-router-dom";

import {
  fetchProgramsList,
  resetProgramList
} from "../../../actions/program/programListAction";
import Search from "../../ui/searchBar";
import {
  startLoaderAction,
  stopLoaderAction
} from "../../../actions/common/loaderActions";
class ProgramList extends React.Component {
  state = {
    programList: [],
    searchText: ""
  };

  componentDidMount() {
    // if (!(this.props.programList.length || this.props.programList.response)) {
    this.props.fetchProgramsList(this.props.orgId);
    // }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.programList !== this.props.programList) {
      this.setState({
        programList: nextProps.programList.response
      });
    }
  }

  // componentWillUnmount() {
  //   this.props.resetProgramList();
  // }

  render() {
    let { programList, searchText } = this.state;
    const { isFetchProgramSuccess } = this.props;
    if (!isFetchProgramSuccess || !programList) {
      return null;
    }
    if (searchText) {
      programList = programList.filter(x =>
        x.name.toLowerCase().includes(searchText.toLowerCase())
      );
    }
    return (
      <section className="dashboard-content p-0 py-3 org-details-container">
        <div className="col-md-18 m-auto card">
          <div className="col-md-18 m-auto d-flex flex-column py-3">
            <div className="row mb-4">
              <div className="col">
                <Search
                  placeholder="Search Program"
                  onChange={this.onChange}
                  value={searchText}
                />
              </div>
              <div
                className="col col-md-auto"
                data-toggle="modal"
                data-target="#addProgramModal"
              >
                <Link
                  to={`${this.props.match.url.replace(
                    "/programs",
                    "/new-program"
                  )}`}
                  className="btn btn-primary"
                >
                  Add Program
                </Link>
              </div>
            </div>
            <div className="row">
              <div className="col">
                <div className="list-group">
                  {this.renderProgramList(programList, searchText)}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }

  onChange = e => {
    this.setState({
      searchText: e.target.value
    });
  };

  renderProgramList = (programList, searchText) => {
    let filteredProgramList = this.getFilteredListOfPrograms(
      programList,
      searchText
    );
    return filteredProgramList.map(program => (
      <Link
        key={program.id}
        to={`${this.props.match.url}/${program.id}`}
        className="list-group-item list-group-item-action"
      >
        {program.name}
      </Link>
    ));
  };

  getFilteredListOfPrograms = (programList, searchText) => {
    var filteredProgramList = [];
    if (searchText) {
      filteredProgramList = programList.filter(
        program =>
          program.name.toLowerCase().indexOf(searchText.toLowerCase()) > -1
      );
    } else {
      filteredProgramList = programList.slice();
    }
    return filteredProgramList;
  };
}

const mapStateToProps = state => ({
  isFetchProgramPending: state.programList.isFetchProgramPending,
  isFetchProgramSuccess: state.programList.isFetchProgramSuccess,
  fetchProgramError: state.programList.fetchProgramError,
  programList: state.programList.programList
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      fetchProgramsList,
      startLoaderAction,
      stopLoaderAction,
      resetProgramList
    },
    dispatch
  );

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ProgramList);
