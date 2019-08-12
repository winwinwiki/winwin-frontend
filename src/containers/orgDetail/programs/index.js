import React from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";

import { Link } from "react-router-dom";

import {
  fetchProgramsList,
  resetProgramList,
  filterProgramsList
} from "../../../actions/program/programListAction";
import Search from "../../ui/searchBar";
import {
  startLoaderAction,
  stopLoaderAction
} from "../../../actions/common/loaderActions";
import debounce from "lodash/debounce";
import { programListSelector } from "../../../selectors/programListSelector";
import Can from "../../Can";
class ProgramList extends React.Component {
  state = {
    searchText: ""
  };

  componentDidMount() {
    if (
      !(this.props.programList.length || this.props.programList.response) ||
      this.props.currentOrgId !== parseInt(this.props.orgId, 10)
    ) {
      this.props.fetchProgramsList(this.props.orgId);
    }
  }

  render() {
    let { searchText } = this.state;
    const { programList, session } = this.props;
    if (!programList) {
      return null;
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
              <Can
                role={session.user && session.user.role}
                perform="programs:create"
                yes={() => (
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
                )}
              />
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
    this.setState(
      {
        searchText: e.target.value
      },
      () => this.handleSearchProgram({ nameSearch: this.state.searchText })
    );
  };

  handleSearchProgram = debounce(apiObj => {
    this.props.filterProgramsList(this.props.orgId, apiObj);
  }, 500);

  renderProgramList = (programList, searchText) => {
    let filteredProgramList = [];
    if (programList.response) {
      const { response } = programList;
      filteredProgramList = response;
    }
    return filteredProgramList.length ? (
      filteredProgramList.map(program => (
        <Link
          key={program.id}
          to={`${this.props.match.url}/${program.id}`}
          className="list-group-item list-group-item-action"
        >
          {program.name}
        </Link>
      ))
    ) : (
      <div className="disabled-text list-group-item list-group-item-action">
        {" "}
        No programs were found
      </div>
    );
  };
}

const mapStateToProps = state => ({
  programList: state.programList.programList,
  currentOrgId: programListSelector(state),
  session: state.session
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      fetchProgramsList,
      startLoaderAction,
      stopLoaderAction,
      resetProgramList,
      filterProgramsList
    },
    dispatch
  );

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ProgramList);
