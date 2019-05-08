import React from "react";
import Search from "../../ui/searchBar";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { updateSDGData } from "../../../actions/orgDetail/sdgTagsAction";
import { getSDGDataBySubGoals, deepFilter } from "../../../util/util";
import { debounce, cloneDeep } from "lodash";
import {
  startLoaderAction,
  stopLoaderAction
} from "../../../actions/common/loaderActions";
class SDGModal extends React.Component {
  state = {
    searchText: "",
    checkedSDGTags: this.props.checkedSDGTags,
    flag: false
  };

  handleSearch = debounce(val => {
    let r = [];
    let list = this.props.SDGList.response;
    if (val) {
      r = deepFilter(cloneDeep(list), val); //deep clone list to avoid props from changing when state changes
      this.props.startLoaderAction();
      this.setState({ flag: true, SDGList: { response: r } }, () =>
        this.props.stopLoaderAction()
      );
    }
    if (!r.length && this.state.flag) {
      this.props.startLoaderAction();
      //SDG List in props persist coz we deepcloned the list
      this.setState({ SDGList: this.props.SDGList }, () =>
        this.props.stopLoaderAction()
      );
    }
  }, 2000);

  componentDidMount() {
    let SDGList = this.props.SDGList;
    this.setState({
      SDGList
    });
  }

  onSearch = e => {
    e.preventDefault();
    let val = e.target.value;
    this.setState({ searchText: val });
    this.handleSearch(val);
  };

  render() {
    const { searchText, checkedSDGTags, SDGList } = this.state;
    // const { SDGList } = this.props;
    if (!SDGList || !checkedSDGTags) {
      return null;
    }
    let localSDGList = SDGList.response;
    return (
      <div
        className="modal progress-index-modal fade bd-example-modal-lg"
        id="sdgModal"
        tabIndex="-1"
        role="dialog"
        aria-labelledby="sdgModalLabel"
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
                    <h5 className="modal-title" id="sdgModalLabel">
                      Sustainable Development Goals
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
                          className="btn btn-primary"
                          data-dismiss="modal"
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
                    {localSDGList.map((goalObj, idx1) => (
                      <React.Fragment key={idx1}>
                        <div className="col-sm-8">
                          <p className="border-bottom pb-3">
                            {goalObj.goalCode + " " + goalObj.goalName}
                          </p>
                          <div className="item-list mb-4">
                            {goalObj.subGoals.map((subGoalObj, idx2) => (
                              <div
                                className="custom-control custom-checkbox"
                                key={idx2}
                              >
                                <input
                                  id={subGoalObj.subGoalCode}
                                  type="checkbox"
                                  className="custom-control-input"
                                  checked={this.isChecked(subGoalObj)}
                                  onChange={e => this.onChange(e, subGoalObj)}
                                />

                                <label
                                  htmlFor={subGoalObj.subGoalCode}
                                  className="custom-control-label"
                                >
                                  {subGoalObj.subGoalCode}{" "}
                                  {subGoalObj.subGoalName}
                                </label>
                              </div>
                            ))}
                          </div>
                        </div>
                      </React.Fragment>
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
    const { checkedSDGTags } = this.state;
    const filteredTags = checkedSDGTags.filter(x => x.isChecked === true);
    const { orgId, type } = this.props;
    this.props.updateSDGData(checkedSDGTags, orgId, filteredTags, type);
  };

  desiredSDGList(id) {
    const { response: SDGList } = this.props.SDGList;
    const { checkedSDGTags } = this.state;

    //1. checks sdg master list if the selected id is valid and returns full path of the nested object
    let sdg = getSDGDataBySubGoals(SDGList, id);
    let found = checkedSDGTags.find(
      ({ subGoalCode }) => subGoalCode === sdg.subGoalCode
    );
    //when found toggle isChecked
    if (found) {
      const newChecked = checkedSDGTags.map(tag => {
        if (tag.isChecked && tag.subGoalCode === id) tag.isChecked = false;
        else if (!tag.isChecked && tag.subGoalCode === id) tag.isChecked = true;
        return tag;
      });
      this.setState({
        checkedSDGTags: newChecked
      });
    }
    //else add newly checked SDG tag
    else this.setState({ checkedSDGTags: [...this.state.checkedSDGTags, sdg] });
    return sdg;
  }

  isChecked(sdgTag) {
    const { checkedSDGTags } = this.state;
    let filterExist = checkedSDGTags.filter(
      tag =>
        tag["subGoalName"].toLowerCase() === sdgTag.subGoalName.toLowerCase()
    );
    return filterExist
      ? filterExist.length > 0 && filterExist[0].isChecked
      : false;
  }
  onChange(e, currentSubGoal) {
    this.desiredSDGList(currentSubGoal.subGoalCode);
  }
}
const mapStateToProps = state => ({
  // SDGList: state.orgList.sdgList
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    { updateSDGData, startLoaderAction, stopLoaderAction },
    dispatch
  );

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SDGModal);
