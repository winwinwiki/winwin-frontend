import React from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import SPIModal from "./spiModal";
import { fetchSpiTags } from "../../../actions/orgDetail/spiTagsAction";
import { fetchSpiTagsList } from "../../../actions/orgLanding/orgLandingAction";
import {
  startLoaderAction,
  stopLoaderAction
} from "../../../actions/common/loaderActions";
import { updateSPIData } from "../../../actions/orgDetail/spiTagsAction";
class SpiTags extends React.Component {
  componentDidMount() {
    const { orgId, type } = this.props;
    this.props.startLoaderAction();
    this.props.fetchSpiTags(orgId, type);
    this.props.fetchSpiTagsList(orgId, type);
  }

  componentDidUpdate(prevProps) {
    if (prevProps.spiTags !== this.props.spiTags && this.props.spiTags.data) {
      this.props.stopLoaderAction();
    }
  }

  render() {
    const { spiTags, orgId, type } = this.props;
    if (!spiTags || !spiTags.data || spiTags.error) {
      return null;
    }
    return (
      <section className="dashboard-content p-0 py-3 org-details-container">
        <div className="col-md-18 m-auto card">
          <div className="col-md-18 m-auto d-flex flex-column py-3">
            <h3>{this.props.type} Description</h3>
            <p>{this.props.description}</p>

            <div className="section-title">Social Progress Index Tag</div>
            <form>
              <ul className="list-group list-group-flush">
                <li className="list-group-item px-0">
                  <div className="row">
                    <ul className="action-icons">
                      <li>
                        <a
                          href="javascript:;"
                          data-toggle="modal"
                          data-target="#spiModal"
                        >
                          <i className="icon-edit" />
                        </a>
                      </li>
                    </ul>
                  </div>
                </li>
                {this.createSpiBox()}
              </ul>
            </form>
          </div>
        </div>
        <SPIModal
          type={type}
          orgId={orgId}
          checkedSPITags={spiTags.data.response}
          updateSPIData={updateSPIData}
        />
      </section>
    );
  }

  createSpiBox() {
    const { spiTags } = this.props;
    let spiTagsList = spiTags.data.response;
    let desiredTagsList = {};
    spiTagsList.map(tags => {
      if (!desiredTagsList[tags["dimensionName"]])
        desiredTagsList[tags["dimensionName"]] = {};

      if (!desiredTagsList[tags["dimensionName"]][tags["componentName"]])
        desiredTagsList[tags["dimensionName"]][tags["componentName"]] = [];

      desiredTagsList[tags["dimensionName"]][tags["componentName"]].push(
        tags["indicatorName"]
      );
      return desiredTagsList;
    });
    return Object.keys(desiredTagsList).map((dimensionName, idx) => (
      <div key={idx} className="card custom-list-container mt-2">
        <div className="card-header">{dimensionName}</div>
        <div className="card-body">
          <ul className="">
            {Object.keys(desiredTagsList[dimensionName]).map(
              (componentName, idx2) => (
                <li key={idx2}>
                  <span>{componentName}</span>
                  <ul>
                    {desiredTagsList[dimensionName][componentName].map(
                      (indicatorName, idx3) => (
                        <li key={idx3}>
                          <span>{indicatorName}</span>
                        </li>
                      )
                    )}
                  </ul>
                </li>
              )
            )}
          </ul>
        </div>
      </div>
    ));
  }
}

const mapStateToProps = state => ({
  spiTags: state.spiTags
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      fetchSpiTags,
      fetchSpiTagsList,
      startLoaderAction,
      stopLoaderAction,
      updateSPIData
    },
    dispatch
  );

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SpiTags);
