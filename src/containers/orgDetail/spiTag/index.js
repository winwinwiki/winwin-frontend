import React from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import SPIModal from "./spiModal";
import { fetchSpiTags } from "../../../actions/orgDetail/spiTagsAction";
import { fetchSpiTagsList } from "../../../actions/orgLanding/orgLandingAction";

class SpiTags extends React.Component {
  componentDidMount() {
    this.props.fetchSpiTags();
    this.props.fetchSpiTagsList();
  }

  render() {
    const { spiTags } = this.props;
    if (!spiTags || !spiTags.data || spiTags.error) {
      return null;
    }
    return (
      <section className="dashboard-content p-0 py-3 org-details-container">
        <div className="col-md-18 m-auto card">
          <div className="col-md-18 m-auto d-flex flex-column py-3">
            <h3>{this.props.type} Description</h3>
            <p>
              Arts center conducts classes on any artistic or cultural topics
              ranging from ?crafts, dance, singing, painting. Camps for youth
              and adults and events ?open to the public. They also offer open
              space for private events.
            </p>

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
        <SPIModal SPIData={spiTags.data} />
      </section>
    );
  }

  createSpiBox() {
    const { spiTags } = this.props;
    let spiTagsList = spiTags.data;
    let desiredTagsList = {};
    spiTagsList.map(tags => {
      if (!desiredTagsList[tags["level1"]])
        desiredTagsList[tags["level1"]] = {};

      if (!desiredTagsList[tags["level1"]][tags["level2"]])
        desiredTagsList[tags["level1"]][tags["level2"]] = [];

      desiredTagsList[tags["level1"]][tags["level2"]].push(tags["level3"]);
      return desiredTagsList;
    });
    return Object.keys(desiredTagsList).map((level1, idx) => (
      <div key={idx} className="card custom-list-container mt-2">
        <div className="card-header">{level1}</div>
        <div className="card-body">
          <ul className="">
            {Object.keys(desiredTagsList[level1]).map((level2, idx2) => (
              <li key={idx2}>
                <span>{level2}</span>
                <ul>
                  {desiredTagsList[level1][level2].map((level3, idx3) => (
                    <li key={idx3}>
                      <span>{level3}</span>
                    </li>
                  ))}
                </ul>
              </li>
            ))}
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
      fetchSpiTagsList
    },
    dispatch
  );

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SpiTags);
