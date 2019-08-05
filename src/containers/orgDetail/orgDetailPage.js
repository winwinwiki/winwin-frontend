import React from "react";
import { connect } from "react-redux";
import Dropdown from "../ui/dropdown";

import {
  sectorsList,
  entityList,
  addressFields,
  tagStatusList
} from "../../constants";
import { bindActionCreators } from "redux";
import { push } from "react-router-redux";
import { onSaveOrgBasicInfo } from "../../actions/orgDetail/orgDetailAction";
import { fetchOrganisationDetail } from "../../actions/orgDetail/orgDetailAction";
import {
  startLoaderAction,
  stopLoaderAction
} from "../../actions/common/loaderActions";
import { industryClassificationSelector } from "../../selectors/industryClassificationSelector";
import {
  fetchNAICSList,
  fetchNTEEList
} from "../../actions/orgDetail/industryClassificationAction";
import AutoSuggestComponent from "../common/autoCompleteComponent";
import { orgDetailsSelector } from "../../selectors/orgDetailsSelector";
class OrgDetailPage extends React.Component {
  state = {
    orgDetail: null,
    isEditable: false
  };

  componentDidMount() {
    const {
      organizationDetail,
      match: { params: { id: paramsOrgId } = {} } = {}
    } = this.props;
    const { data: { response: { id: orgId } = {} } = {} } = organizationDetail;
    if (paramsOrgId !== orgId) {
      this.props.fetchOrganisationDetail({ orgId: this.props.match.params.id });
      this.props.fetchNAICSList();
      this.props.fetchNTEEList();
    }
  }

  componentWillReceiveProps(nextProps) {
    const { organizationDetail } = this.props;
    if (
      nextProps &&
      nextProps.organizationDetail !== organizationDetail &&
      nextProps.organizationDetail.data
    ) {
      if (!nextProps.organizationDetail.error) {
        this.setState({
          orgDetail: nextProps.organizationDetail.data.response
        });
      }
    }
  }

  handleEnter(event) {
    if (event.keyCode === 13) {
      const form = event.target.form;
      const index = Array.prototype.indexOf.call(form, event.target);
      form.elements[index + 1].focus();
      event.preventDefault();
    }
  }

  render() {
    const { isEditable, orgDetail } = this.state;
    const { industryCodes } = this.props;
    if (!orgDetail) {
      return null;
    }
    let readOnly = isEditable ? "" : "readOnly";
    return (
      <section className="dashboard-content p-0 py-3 org-details-container">
        <div className="col-md-18 m-auto card">
          <div className="col-md-18 m-auto d-flex flex-column py-3">
            <form>
              <ul className="list-group list-group-flush">
                <li className="list-group-item px-0">
                  {isEditable ? (
                    ""
                  ) : (
                    <div className="row">
                      <ul className="action-icons active">
                        <li>
                          <a
                            href="javascript:;"
                            onClick={() => this.editBasicInfo()}
                          >
                            <i className="icon-edit" />
                          </a>
                        </li>
                      </ul>
                    </div>
                  )}
                  <div className="form-group">
                    <label htmlFor="category">Organization Name</label>
                    <input
                      onKeyDown={this.handleEnter}
                      type="text"
                      className="form-control"
                      name="name"
                      id="name"
                      readOnly={readOnly}
                      onChange={this.onChange}
                      placeholder="Enter Organization Name"
                      value={orgDetail.name || ""}
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="tagStatus">Tag Status</label>
                    <Dropdown
                      onKeyDown={this.handleEnter}
                      placeholder="Select Tag Status"
                      selectedItem={orgDetail.tagStatus}
                      name="tagStatus"
                      containerClass="dropdown dropdown-with-searchbox"
                      onChange={this.onDropdownChange}
                      items={tagStatusList}
                      disabled={readOnly}
                    />
                  </div>
                  <div className="section-title border-bottom pb-3 mb-3">
                    Sector Detail
                  </div>
                  <div className="form-group">
                    <label htmlFor="category">Sector</label>

                    <Dropdown
                      onKeyDown={this.handleEnter}
                      placeholder="Select Sector"
                      selectedItem={orgDetail.sector}
                      name="sector"
                      containerClass="dropdown dropdown-with-searchbox"
                      onChange={this.onDropdownChange}
                      items={sectorsList}
                      disabled={readOnly}
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="category">Sector Level</label>

                    <Dropdown
                      onKeyDown={this.handleEnter}
                      placeholder="Select Sector Level"
                      className="form-control"
                      selectedItem={
                        orgDetail.sector &&
                        orgDetail.sector.toLowerCase() !== "public"
                          ? ""
                          : orgDetail.sectorLevel
                      }
                      name="sectorLevel"
                      containerClass="dropdown dropdown-with-searchbox"
                      onChange={this.onDropdownChange}
                      items={entityList}
                      disabled={
                        readOnly ||
                        (orgDetail.sector &&
                          orgDetail.sector.toLowerCase() !== "public")
                      }
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="sectorLevelName">Sector Level Name</label>
                    <input
                      onKeyDown={this.handleEnter}
                      type="text"
                      className="form-control"
                      name="sectorLevelName"
                      id="category"
                      onChange={this.onChange}
                      readOnly={
                        readOnly ||
                        (orgDetail.sector &&
                          orgDetail.sector.toLowerCase() !== "public")
                      }
                      placeholder="Enter Sector Level Name"
                      value={
                        orgDetail.sector &&
                        orgDetail.sector.toLowerCase() !== "public"
                          ? ""
                          : orgDetail.sectorLevelName || ""
                      }
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="orgdescription">
                      Organization Description
                    </label>
                    <textarea
                      className="form-control"
                      name="description"
                      id="orgdescription"
                      onChange={this.onChange}
                      placeholder="Enter Description"
                      readOnly={readOnly}
                      rows="5"
                      value={orgDetail.description || ""}
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="naicsCode">NAICS Code</label>

                    {industryCodes.naicsList && (
                      <AutoSuggestComponent
                        suggestions={industryCodes.naicsList}
                        placeholder="Enter NAICS Code"
                        className="form-control position-relative mt-2"
                        onChange={(e, value) =>
                          this.onSuggestChange("naicsCode", value, e)
                        }
                        readOnly={readOnly}
                        value={orgDetail.naicsCode ? orgDetail.naicsCode : ""}
                      />
                    )}
                  </div>
                  <div className="form-group">
                    <label htmlFor="nteeCode">NTEE Code</label>
                    {industryCodes.nteeList && (
                      <AutoSuggestComponent
                        suggestions={industryCodes.nteeList}
                        placeholder="Enter NTEE Code"
                        className="form-control position-relative mt-2"
                        onChange={(e, value) =>
                          this.onSuggestChange("nteeCode", value, e)
                        }
                        readOnly={
                          readOnly ||
                          (orgDetail.sector &&
                            orgDetail.sector.toLowerCase() === "private")
                        }
                        value={
                          orgDetail.nteeCode
                            ? orgDetail.sector &&
                              orgDetail.sector.toLowerCase() === "private"
                              ? ""
                              : orgDetail.nteeCode
                            : ""
                        }
                      />
                    )}
                  </div>
                  <div className="section-title border-bottom pb-3 mb-3">
                    Financial
                  </div>

                  <div className="form-group">
                    <label htmlFor="category">Revenue ($)</label>
                    <input
                      onKeyDown={this.handleEnter}
                      type="text"
                      className="form-control"
                      id="category"
                      name="revenue"
                      onChange={this.onChange}
                      readOnly={readOnly}
                      placeholder="Enter Revenue Amount"
                      value={orgDetail.revenue || ""}
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="category">Assets</label>
                    <input
                      onKeyDown={this.handleEnter}
                      type="text"
                      className="form-control"
                      id="category"
                      name="assets"
                      onChange={this.onChange}
                      readOnly={readOnly}
                      placeholder="Enter Assets"
                      value={orgDetail.assets || ""}
                    />
                  </div>
                  <div className="section-title border-bottom pb-3 mb-3">
                    Headquarters
                  </div>
                  <div className="form-group">
                    <label htmlFor="category">Street Address</label>
                    <input
                      type="text"
                      onKeyDown={this.handleEnter}
                      className="form-control"
                      name="street"
                      id="street"
                      onChange={this.onChange}
                      readOnly={readOnly}
                      placeholder="Enter Street Address"
                      value={orgDetail.address.street || ""}
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="category">City</label>
                    <input
                      type="text"
                      onKeyDown={this.handleEnter}
                      className="form-control"
                      id="category"
                      name="city"
                      onChange={this.onChange}
                      readOnly={readOnly}
                      placeholder="Enter City"
                      value={orgDetail.address.city || ""}
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="description">County</label>
                    <input
                      type="text"
                      onKeyDown={this.handleEnter}
                      className="form-control"
                      id="category"
                      name="county"
                      onChange={this.onChange}
                      readOnly={readOnly}
                      placeholder="Enter County"
                      value={orgDetail.address.county || ""}
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="description">State</label>
                    <input
                      type="text"
                      onKeyDown={this.handleEnter}
                      className="form-control"
                      id="category"
                      name="state"
                      onChange={this.onChange}
                      readOnly={readOnly}
                      placeholder="Enter State"
                      value={orgDetail.address.state || ""}
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="description">Zip Code</label>
                    <input
                      type="text"
                      onKeyDown={this.handleEnter}
                      className="form-control"
                      id="category"
                      name="zip"
                      onChange={this.onChange}
                      readOnly={readOnly}
                      placeholder="Enter Zip/Postal Code"
                      value={orgDetail.address.zip || ""}
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="description">Country</label>
                    <input
                      type="text"
                      onKeyDown={this.handleEnter}
                      className="form-control"
                      id="category"
                      name="country"
                      readOnly={readOnly}
                      onChange={this.onChange}
                      placeholder="Enter Country"
                      value={orgDetail.address.country || ""}
                    />
                  </div>
                  <div className="section-title border-bottom pb-3 mb-3">
                    Web Links
                  </div>
                  <div className="form-group">
                    <label htmlFor="description">Website</label>
                    <input
                      type="text"
                      onKeyDown={this.handleEnter}
                      className="form-control"
                      id="category"
                      name="websiteUrl"
                      readOnly={readOnly}
                      onChange={this.onChange}
                      placeholder="Enter website url"
                      value={orgDetail.websiteUrl || ""}
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="facebook">Facebook</label>
                    <input
                      type="text"
                      onKeyDown={this.handleEnter}
                      className="form-control"
                      id="facebook"
                      name="facebookUrl"
                      onChange={this.onChange}
                      readOnly={readOnly}
                      placeholder="Enter Facebook url"
                      value={orgDetail.facebookUrl || ""}
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="linkedIn">LinkedIn</label>
                    <input
                      type="text"
                      onKeyDown={this.handleEnter}
                      className="form-control"
                      id="linkedIn"
                      name="linkedinUrl"
                      onChange={this.onChange}
                      readOnly={readOnly}
                      placeholder="Enter LinkedIn url"
                      value={orgDetail.linkedinUrl || ""}
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="twitter">Twitter</label>
                    <input
                      type="text"
                      onKeyDown={this.handleEnter}
                      className="form-control"
                      id="twitter"
                      name="twitterUrl"
                      onChange={this.onChange}
                      readOnly={readOnly}
                      placeholder="Enter Twitter url"
                      value={orgDetail.twitterUrl || ""}
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="instagram">Instagram</label>
                    <input
                      type="text"
                      onKeyDown={this.handleEnter}
                      className="form-control"
                      id="twitter"
                      name="instagramUrl"
                      onChange={this.onChange}
                      readOnly={readOnly}
                      placeholder="Enter Instagram url"
                      value={orgDetail.instagramUrl || ""}
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="description">Contact Info</label>
                    <input
                      type="text"
                      onKeyDown={this.handleEnter}
                      className="form-control"
                      id="category"
                      name="contactInfo"
                      onChange={this.onChange}
                      readOnly={readOnly}
                      placeholder="Enter contact info"
                      value={orgDetail.contactInfo || ""}
                    />
                  </div>
                  <div className="section-title border-bottom pb-3 mb-3">
                    Other
                  </div>
                  <div className="form-group">
                    <label htmlFor="category">Mission Statement</label>
                    <input
                      type="text"
                      onKeyDown={this.handleEnter}
                      className="form-control"
                      id="missionStatement"
                      name="missionStatement"
                      onChange={this.onChange}
                      readOnly={readOnly}
                      placeholder="Enter Mission Statement"
                      value={orgDetail.missionStatement || ""}
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="category">Values</label>
                    <input
                      type="text"
                      onKeyDown={this.handleEnter}
                      className="form-control"
                      name="values"
                      id="values"
                      onChange={this.onChange}
                      readOnly={readOnly}
                      placeholder="Enter Values"
                      value={orgDetail.values || ""}
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="category">Purpose</label>
                    <input
                      type="text"
                      onKeyDown={this.handleEnter}
                      className="form-control"
                      name="purpose"
                      id="purpose"
                      onChange={this.onChange}
                      readOnly={readOnly}
                      placeholder="Enter Purpose"
                      value={orgDetail.purpose || ""}
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="category">Self-Interest</label>
                    <input
                      type="text"
                      onKeyDown={this.handleEnter}
                      className="form-control"
                      name="selfInterest"
                      id="selfInterest"
                      onChange={this.onChange}
                      readOnly={readOnly}
                      placeholder="Enter Self-Interest"
                      value={orgDetail.selfInterest || ""}
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="category">Population Served</label>
                    <input
                      type="text"
                      onKeyDown={this.handleEnter}
                      className="form-control"
                      id="populationServed"
                      name="populationServed"
                      onChange={this.onChange}
                      readOnly={readOnly}
                      placeholder="Enter Population Served"
                      value={orgDetail.populationServed || ""}
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="category">Business Model</label>
                    <textarea
                      className="form-control"
                      id="businessModel"
                      name="businessModel"
                      onChange={this.onChange}
                      readOnly={readOnly}
                      placeholder="Enter Business Model"
                      value={orgDetail.businessModel || ""}
                    />
                  </div>

                  {isEditable ? (
                    <div className="row justify-content-center footer-actions active">
                      <button
                        className="btn"
                        onClick={() => this.onCancelBasicInfo()}
                      >
                        Cancel
                      </button>
                      <button
                        className="btn btn-primary"
                        onClick={this.saveBasicInfo}
                      >
                        Save
                      </button>
                    </div>
                  ) : (
                    ""
                  )}
                </li>
              </ul>
            </form>
          </div>
        </div>
      </section>
    );
  }

  onSuggestChange = (field, { newValue }, e) => {
    this.setState({
      orgDetail: {
        ...JSON.parse(JSON.stringify(this.state.orgDetail)),
        [field]: newValue ? JSON.parse(JSON.stringify(newValue)) : null
      }
    });
  };

  onSelectChange = (field, value) => {
    this.setState({
      orgDetail: { ...this.state.orgDetail, [field]: value.value }
    });
  };

  onChange = e => {
    let orgDetailCopy = JSON.parse(JSON.stringify(this.state.orgDetail));
    const { target: { name, value } = {} } = e;
    if (addressFields.includes(name.toLowerCase())) {
      orgDetailCopy.address[name] = value;
    } else orgDetailCopy[name] = value;
    this.setState({ orgDetail: orgDetailCopy });
  };

  onDropdownChange = (field, value) => {
    // const { orgDetail } = this.state;
    let orgDetail = JSON.parse(JSON.stringify(this.state.orgDetail));
    orgDetail[field] = value;
    this.setState({ orgDetail });
  };

  editBasicInfo = () => {
    this.setState({
      isEditable: true
    });
  };

  saveBasicInfo = e => {
    e.preventDefault();
    this.setState({
      isEditable: false
    });
    let apiObj = this.state.orgDetail;
    apiObj = {
      ...apiObj,
      naicsCode:
        this.state.orgDetail.naicsCode && this.state.orgDetail.naicsCode.id,
      nteeCode:
        this.state.orgDetail.nteeCode && this.state.orgDetail.nteeCode.id
    };
    if (apiObj.sector.toLowerCase() !== "public") {
      apiObj.sectorLevel = "";
      apiObj.sectorLevelName = "";
      if (apiObj.sector.toLowerCase() === "private") apiObj.nteeCode = null;
    }

    this.props.onSaveOrgBasicInfo([apiObj]);
  };

  validateOrgData = () => {};

  onCancelBasicInfo = () => {
    this.setState({
      isEditable: false,
      orgDetail: this.props.organizationDetail.data.response
    });
  };
}

const mapStateToProps = state => ({
  organizationDetail: orgDetailsSelector(state),
  industryCodes: industryClassificationSelector(state)
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      changePage: () => push("/organizations"),
      onSaveOrgBasicInfo,
      fetchOrganisationDetail,
      startLoaderAction,
      stopLoaderAction,
      fetchNAICSList,
      fetchNTEEList
    },

    dispatch
  );

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(OrgDetailPage);
