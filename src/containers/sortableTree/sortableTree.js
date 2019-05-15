import React, { Component } from "react";
import SortableTree from "react-sortable-tree";
import { push } from "react-router-redux";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { fetchOrgHierarchy } from "../../actions/orgDetail/orgChartAction";
import { resetOrgHierarchyData } from "../../actions/orgDetail/orgChartAction";
import {
  startLoaderAction,
  stopLoaderAction
} from "../../actions/common/loaderActions";
import { OrgHierarchySelector } from "../../selectors/OrgHierarchySelector";
import "./sortableTree.css";

class Tree extends Component {
  state = {
    isEdited: false,
    treeData: [{ title: "Chicken", children: [{ title: "Egg" }] }], //sample tree data
    orgTreeData: []
  };

  componentDidMount() {
    this.props.fetchOrgHierarchy(this.props.match.params.id);
  }

  componentWillReceiveProps(nextProps) {
    if (
      nextProps.orgHierarchy &&
      nextProps.orgHierarchy !== this.props.orgHierarchy
    ) {
      this.setState({
        orgTreeData: nextProps.orgHierarchy
      });
    }
  }

  onEdit = () => {
    this.setState({
      isEdited: true
    });
  };

  //add new node
  addNode = rowInfo => {
    this.props.addChildOrganisation(this.props.orgId, rowInfo.node.id);
  };

  onCancel = () => {
    this.setState({
      isEdited: false
    });
  };

  onSave = () => {
    return null;
  };

  render() {
    const { isEdited } = this.state;
    return (
      <section className="dashboard-content p-0 py-3 org-details-container">
        <div className="col-md-18 m-auto card">
          <div className="col-md-18 m-auto d-flex flex-column py-3">
            <ul className="list-group list-group-flush">
              <li className="list-group-item px-0">
                {!isEdited && (
                  <div className="row">
                    <ul className="action-icons">
                      <li>
                        <a href="javascript:;" onClick={this.onEdit}>
                          <i className="icon-edit" />
                        </a>
                      </li>
                    </ul>
                  </div>
                )}

                <SortableTree
                  className="mt-2"
                  canDrag={isEdited}
                  isVirtualized={false}
                  treeData={this.state.orgTreeData}
                  onChange={orgTreeData => this.setState({ orgTreeData })}
                  rowHeight={80}
                  generateNodeProps={rowInfo => ({
                    onClick: event => {
                      if (
                        (event.target.parentElement.className.includes(
                          "rst__rowContents"
                        ) ||
                          event.target.parentElement.className.includes(
                            "rst__rowLabel"
                          )) &&
                        rowInfo.node.id !== parseInt(this.props.orgId, 10)
                      ) {
                        this.props.changePage(rowInfo.node.id);
                      }
                    },
                    buttons: [
                      isEdited && (
                        <button
                          className="btn f-36"
                          onClick={() => this.addNode(rowInfo)}
                          onMouseOver={this.onHover}
                        >
                          +
                        </button>
                      )
                    ]
                  })}
                  onMoveNode={e => console.log(e, "node")}
                />
                {isEdited ? (
                  <div className="row justify-content-center footer-actions active">
                    <button className="btn" onClick={this.onCancel}>
                      Cancel
                    </button>
                    <button className="btn btn-primary" onClick={this.onSave}>
                      Save
                    </button>
                  </div>
                ) : (
                  ""
                )}
              </li>
            </ul>
          </div>
        </div>
      </section>
    );
  }
}

const mapStateToProps = state => ({
  orgHierarchy: OrgHierarchySelector(state)
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      changePage: id => push("/organizations/" + id),
      addChildOrganisation: (orgId, parentId) =>
        push("/organizations/" + orgId + "/new-child-organization?", {
          parentId
        }),
      fetchOrgHierarchy,
      resetOrgHierarchyData,
      startLoaderAction,
      stopLoaderAction
    },
    dispatch
  );

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Tree);
