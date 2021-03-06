import React from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import SDGModal from "./sdgModal";
import { fetchSdgTags } from "../../../actions/orgDetail/sdgTagsAction";
import { fetchSdgTagsList } from "../../../actions/orgLanding/orgLandingAction";
import {
  startLoaderAction,
  stopLoaderAction
} from "../../../actions/common/loaderActions";
import { PROGRAM } from "../../../constants";
import Can from "../../Can";
class SdgTags extends React.Component {
  componentDidMount() {
    const { orgId, type, programId, session } = this.props;
    this.props.startLoaderAction();
    this.props.fetchSdgTags(type === PROGRAM ? programId : orgId, type);
    Can({
      role: session.user && session.user.role,
      perform: "organizationDetailsSDGTags:edit",
      yes: () =>
        this.props.fetchSdgTagsList(type === PROGRAM ? programId : orgId, type)
    });
  }

  componentDidUpdate(prevProps) {
    if (prevProps.sdgTags !== this.props.sdgTags && this.props.sdgTags.data) {
      this.props.stopLoaderAction();
    }
  }

  render() {
    const { sdgTags, orgId, type, session } = this.props;
    if (!sdgTags || !sdgTags.data || sdgTags.error) {
      return null;
    }
    return (
      <section className="dashboard-content p-0 py-3 org-details-container">
        <div className="col-md-18 m-auto card">
          <div className="col-md-18 m-auto d-flex flex-column py-3">
            <h3>{this.props.type} Description</h3>
            <p>{this.props.description}</p>

            <div className="section-title">
              Sustainable Development Goals Tag
            </div>
            <Can
              role={session.user && session.user.role}
              perform="organizationDetailsSPITags:edit"
              yes={() => (
                <form>
                  <ul className="list-group list-group-flush">
                    <li className="list-group-item px-0">
                      <div className="row">
                        <ul className="action-icons">
                          <li>
                            <a
                              href="javascript:;"
                              data-toggle="modal"
                              data-target="#sdgModal"
                            >
                              <i className="icon-edit" />
                            </a>
                          </li>
                        </ul>
                      </div>
                    </li>
                    {this.createSdgBox()}
                  </ul>
                </form>
              )}
            />
          </div>
        </div>
        {this.props.SDGList && (
          <SDGModal
            type={type}
            orgId={orgId}
            checkedSDGTags={sdgTags.data.response}
            SDGList={this.props.SDGList}
            programId={this.props.programId}
          />
        )}
      </section>
    );
  }

  createSdgBox() {
    const { sdgTags } = this.props;
    let sdgTagsList = sdgTags.data.response;
    let desiredTagsList = {};
    sdgTagsList.map(tags => {
      if (!desiredTagsList[tags["goalCode"] + ". " + tags["goalName"]])
        desiredTagsList[tags["goalCode"] + ". " + tags["goalName"]] = [];

      desiredTagsList[tags["goalCode"] + ". " + tags["goalName"]].push(
        tags["subGoalCode"] + " " + tags["subGoalName"]
      );
      return desiredTagsList;
    });
    return Object.keys(desiredTagsList).map((goalName, idx) => (
      <div key={idx} className="card custom-list-container mt-2">
        <div className="card-header">{goalName}</div>
        <div className="card-body">
          <ul className="">
            <li>
              <ul>
                {desiredTagsList[goalName].map((subGoalName, idx2) => (
                  <li key={idx2}>
                    <span>{subGoalName}</span>
                  </li>
                ))}
              </ul>
            </li>
          </ul>
        </div>
      </div>
    ));
  }
}

const mapStateToProps = state => ({
  sdgTags: state.sdgTags,
  SDGList: state.orgList.sdgList,
  session: state.session
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      fetchSdgTags,
      fetchSdgTagsList,
      startLoaderAction,
      stopLoaderAction
    },
    dispatch
  );

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SdgTags);
