import React from "react";
import { push } from "react-router-redux";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";

import ButtonGroup from "../ui/buttonGroup";
import Search from "../ui/searchBar";
import AppliedOrgFiltersList from "./appliedOrgFilters/appliedOrgFiltersList";

class OrgFilters extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isFilterModalVisible: false
    };
    this.changePage = this.changePage.bind(this);
    this.toggleAppliedFilterModal = this.toggleAppliedFilterModal.bind(this);
    this.setActiveButton = this.setActiveButton.bind(this);
    this.setWrapperRef = this.setWrapperRef.bind(this);
    this.handleClickOutside = this.handleClickOutside.bind(this);
  }

  componentDidMount() {
    document.addEventListener("mousedown", this.handleClickOutside);
  }

  componentWillUnmount() {
    document.removeEventListener("mousedown", this.handleClickOutside);
  }

  /**
   * Set the wrapper ref
   */
  setWrapperRef(node) {
    this.wrapperRef = node;
  }

  /**
   * Alert if clicked on outside of element
   */
  handleClickOutside(event) {
    if (this.wrapperRef && !this.wrapperRef.contains(event.target)) {
      // alert("You clicked outside of me!");
      this.setState({ isFilterModalVisible: false });
    }
  }

  render() {
    const {
      activeButton,
      buttonList,
      searchText,
      getFilteredListOfOrg,
      ...props
    } = this.props;
    const { isFilterModalVisible } = this.state;
    return (
      <div className="d-flex align-content-center border-bottom py-2">
        <div>
          <label
            htmlFor="search"
            className="d-block p-0 mb-0 col-form-label-sm"
          >
            Search
          </label>
          <Search
            placeholder="Search City/County/State/Country"
            onChange={event => props.getSearchedText(event.target.value)}
            onKeyPress={event => {
              if (event.keyCode === 13 || event.which === 13) {
                getFilteredListOfOrg(event.target.value);
              }
            }}
            value={searchText}
          />
        </div>

        <div>
          <label
            htmlFor="sector"
            className="d-block p-0 mb-0 col-form-label-sm"
          >
            Sector
          </label>
          <ButtonGroup
            activeButton={activeButton}
            buttonList={buttonList}
            onChange={this.setActiveButton}
          />
        </div>

        <div ref={this.setWrapperRef}>
          <label
            htmlFor="filter"
            className="d-block p-0 mb-0 col-form-label-sm"
          >
            Filter
          </label>
          <div
            className="btn-group dropdown dropdown-with-checkbox"
            role="group"
            aria-label="group"
          >
            <button
              id="filterDropdown"
              type="button"
              aria-haspopup="true"
              aria-expanded="false"
              className="btn btn-outline-secondary m-0"
              onClick={this.toggleAppliedFilterModal}
            >
              <i className="icon-filter" />
            </button>
            <AppliedOrgFiltersList
              activeOrg={activeButton}
              toggleAppliedFilterModal={this.toggleAppliedFilterModal}
              isFilterModalVisible={isFilterModalVisible}
              resetFilters={this.props.resetFilters}
              resetPagination={this.props.resetPagination}
            />
          </div>
        </div>
        <div className="ml-auto">
          <a
            href="javascript:;"
            onClick={() => this.changePage("new")}
            className="btn btn-link"
          >
            <i className="icon-add mr-1" /> Create
          </a>
          <a
            href="javascript:;"
            onClick={() => this.changePage("uploadDataFeed")}
            className="btn btn-link pr-0"
          >
            <i className="icon-upload mr-1" /> Upload
          </a>
        </div>
      </div>
    );
  }

  changePage(page) {
    this.props.changePage(page);
  }

  toggleAppliedFilterModal() {
    const { isFilterModalVisible } = this.state;
    this.setState({ isFilterModalVisible: !isFilterModalVisible });
  }

  setActiveButton(field) {
    this.props.filterOrgList({ sector: field });
  }
}

const mapStateToProps = state => ({});

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      changePage: page => push("/organizations/" + page)
    },
    dispatch
  );

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(OrgFilters);
