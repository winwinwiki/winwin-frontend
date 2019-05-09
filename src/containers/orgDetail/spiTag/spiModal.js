import React, { Component, Fragment } from "react";
import Search from "../../ui/searchBar";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { updateSPIData } from "../../../actions/orgDetail/spiTagsAction";
import { getSPIDataByIndicators, deepFilter } from "../../../util/util";
import { debounce, cloneDeep } from "lodash";
import {
  startLoaderAction,
  stopLoaderAction
} from "../../../actions/common/loaderActions";
class SPIModal extends Component {
  state = {
    searchText: "",
    checkedSPITags: this.props.checkedSPITags
  };

  handleSearch = val => {
    let r = [];
    let list = this.props.SPIList.response;
    if (val) {
      r = deepFilter(cloneDeep(list), val); //deep clone list to avoid props from changing when state changes
      this.setState({ SPIList: { response: r } });
    }
    if (this.state.searchText === "") {
      //SPI List in props persist coz we deepcloned the list
      this.setState({ SPIList: this.props.SPIList });
    }
  };

  componentDidMount() {
    let SPIList = this.props.SPIList;
    this.setState({
      SPIList
    });
  }

  onSearch = e => {
    e.preventDefault();
    let val = e.target.value;
    this.setState({ searchText: val });
    this.handleSearch(val);
  };

  render() {
    const { searchText, checkedSPITags, SPIList } = this.state;
    // const { SPIList } = this.props;
    if (!SPIList || !checkedSPITags) {
      return null;
    }
    let localSPIList = SPIList.response;
    return (
      <div
        className="modal progress-index-modal fade bd-example-modal-lg"
        id="spiModal"
        tabIndex="-1"
        role="dialog"
        aria-labelledby="spiModalLabel"
        aria-hidden="true"
      >
        <div
          className="modal-dialog modal-xl modal-dialog-centered"
          role="document"
        >
          <div className="modal-content">
            <div className="dashboard-container">
              <div className="dashboard-header">
                <div className="modal-header flex-column">
                  <div className="d-flex w-100 p-3">
                    <h5 className="modal-title" id="spiModalLabel">
                      Social Progress Index
                    </h5>
                    <button
                      type="button"
                      className="close"
                      data-dismiss="modal"
                      aria-label="Close"
                    >
                      <span aria-hidden="true">&times;</span>
                    </button>
                  </div>
                  <div className="w-100 border-top">
                    <div className="w-100 col d-flex align-content-center py-3">
                      <Search
                        placeholder="Search"
                        onChange={this.onSearch}
                        value={searchText}
                      />
                      <div className="ml-auto">
                        <button
                          type="button"
                          className="btn btn-link"
                          data-dismiss="modal"
                        >
                          Cancel
                        </button>
                        <button
                          type="button"
                          data-dismiss="modal"
                          className="btn btn-primary"
                          onClick={this.onSave}
                        >
                          Save
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="modal-body dashboard-content progress-index-options">
                <div className="d-flex flex-column h-100 pt-4">
                  <div className="row d-flex">
                    {localSPIList.map((spiObj, idx1) => (
                      <Fragment key={idx1}>
                        <div className="col-sm-24 mb-3">
                          <h3>{spiObj.dimensionName}</h3>
                        </div>
                        {spiObj.components.map((componentObj, idx2) => (
                          <div className="col" key={idx2}>
                            <p className="border-bottom pb-3">
                              {componentObj.componentName}
                            </p>
                            <div className="item-list mb-4">
                              {componentObj.indicators.map(
                                (indicatorObj, idx3) => (
                                  <div
                                    className="custom-control custom-checkbox"
                                    key={idx3}
                                  >
                                    <input
                                      id={indicatorObj.indicatorId}
                                      type="checkbox"
                                      className="custom-control-input"
                                      checked={this.isChecked(indicatorObj)}
                                      onChange={e =>
                                        this.onChange(e, indicatorObj)
                                      }
                                    />
                                    <label
                                      htmlFor={indicatorObj.indicatorId}
                                      className="custom-control-label"
                                    >
                                      {" "}
                                      {indicatorObj.indicatorName}
                                    </label>
                                  </div>
                                )
                              )}
                            </div>
                          </div>
                        ))}
                        <div className="w-100" />
                      </Fragment>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  onSave = () => {
    const { checkedSPITags } = this.state;
    const filteredTags = checkedSPITags.filter(x => x.isChecked === true);
    const { orgId, type } = this.props;
    this.props.updateSPIData(checkedSPITags, orgId, filteredTags, type);
  };

  desiredSPIList = id => {
    const { response: SPIList } = this.props.SPIList;

    //1. checks spi master list if the selected id is valid and returns full path of the nested object
    let spi = getSPIDataByIndicators(SPIList, id);

    //2. check if id selected is already present in checkedspitags list
    const { checkedSPITags } = this.state;
    let found = checkedSPITags.find(
      ({ indicatorId }) => indicatorId === spi.indicatorId
    );
    //when found toggle isChecked
    if (found) {
      const newChecked = checkedSPITags.map(tag => {
        if (tag.isChecked && tag.indicatorId === id) tag.isChecked = false;
        else if (!tag.isChecked && tag.indicatorId === id) tag.isChecked = true;
        return tag;
      });
      this.setState({
        checkedSPITags: newChecked
      });
    }
    //else add newly checked spi tag
    else this.setState({ checkedSPITags: [...this.state.checkedSPITags, spi] });
    return spi;
  };

  isChecked(spiTag) {
    const { checkedSPITags } = this.state;
    let filterExist = checkedSPITags.filter(
      tag =>
        tag["indicatorName"].toLowerCase() ===
        spiTag.indicatorName.toLowerCase()
    );
    return filterExist
      ? filterExist.length > 0 && filterExist[0].isChecked
      : false;
  }
  onChange = (event, currentIndicator) => {
    this.desiredSPIList(currentIndicator.indicatorId);
  };
}

const mapStateToProps = state => ({
  // SPIList: state.orgList.spiList
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    { updateSPIData, startLoaderAction, stopLoaderAction },
    dispatch
  );

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SPIModal);
