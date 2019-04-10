import React from "react";
import { connect } from "react-redux";
import Dropdown from "../ui/dropdown";
import { sectorsList, entityList, addressFields } from "../../constants";
import { bindActionCreators } from "redux";
import { push } from "react-router-redux";
import { onSaveOrgBasicInfo } from "../../actions/orgDetail/orgDetailAction";
import { fetchOrganisationDetail } from "../../actions/orgDetail/orgDetailAction";
import {
  startLoaderAction,
  stopLoaderAction
} from "../../actions/common/loaderActions";
class OrgDetailPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      orgDetail: null,
      isEditable: false
    };
  }

  componentDidMount() {
    const {
      organizationDetail,
      match: { params: { id: paramsOrgId } = {} } = {}
    } = this.props;
    const { data: { response: { id: orgId } = {} } = {} } = organizationDetail;
    if (paramsOrgId !== orgId) {
      this.props.startLoaderAction();
      this.props.fetchOrganisationDetail({ orgId: this.props.match.params.id });
    }
    if (
      organizationDetail &&
      organizationDetail.data &&
      paramsOrgId === orgId
    ) {
      this.setState({
        orgDetail: organizationDetail.data.response
      });
    }
  }

  componentWillReceiveProps(nextProps) {
    const { orgDetail } = this.props;
    if (
      nextProps &&
      nextProps.organizationDetail !== orgDetail &&
      nextProps.organizationDetail.data
    ) {
      if (!nextProps.organizationDetail.error) {
        this.setState({
          orgDetail: nextProps.organizationDetail.data.response
        });
      }
    }
  }

  componentDidUpdate(prevProps) {
    if (
      prevProps.organizationDetail !== this.props.organizationDetail &&
      this.props.organizationDetail.data
    ) {
      this.props.stopLoaderAction();
    }
  }

  render() {
    const { isEditable, orgDetail } = this.state;
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
                      type="text"
                      className="form-control"
                      name="name"
                      id="name"
                      readOnly={readOnly}
                      onChange={this.onChange.bind(this)}
                      placeholder="Enter Organization Name"
                      value={orgDetail.name || ""}
                    />
                  </div>
                  <div className="section-title border-bottom pb-3 mb-3">
                    Sector Detail
                  </div>
                  <div className="form-group">
                    <label htmlFor="category">Sector</label>

                    <Dropdown
                      placeholder="Select Sector"
                      selectedItem={orgDetail.sector}
                      name="sector"
                      containerClass="dropdown dropdown-with-searchbox"
                      onChange={this.onDropdownChange.bind(this)}
                      items={sectorsList}
                      disabled={readOnly}
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="category">Sector Level</label>

                    <Dropdown
                      placeholder="Select Sector Level"
                      selectedItem={orgDetail.sectorLevel}
                      name="sectorLevel"
                      containerClass="dropdown dropdown-with-searchbox"
                      onChange={this.onDropdownChange.bind(this)}
                      items={entityList}
                      disabled={
                        readOnly || orgDetail.sector.toLowerCase() !== "public"
                      }
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="category">Sector Level Name</label>
                    <input
                      type="text"
                      className="form-control"
                      name="sectorLevelName"
                      id="category"
                      readOnly={
                        readOnly || orgDetail.sector.toLowerCase() !== "public"
                      }
                      placeholder="Enter Sector Level Name"
                      value={orgDetail.sectorLevelName || ""}
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
                      onChange={this.onChange.bind(this)}
                      placeholder="Enter Description"
                      readOnly={readOnly}
                      rows="5"
                      value={orgDetail.description || ""}
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="naicsCode">NAICS Code</label>
                    <input
                      type="text"
                      className="form-control"
                      name="naicsCode"
                      id="naicsCode"
                      readOnly={readOnly}
                      onChange={this.onChange.bind(this)}
                      placeholder="Enter NAICS Code"
                      value={orgDetail.naicsCode || ""}
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="nteeCode">NTEE Code</label>
                    <input
                      type="text"
                      className="form-control"
                      name="nteeCode"
                      id="nteeCode"
                      readOnly={readOnly}
                      onChange={this.onChange.bind(this)}
                      placeholder="Enter NTEE Code"
                      value={orgDetail.nteeCode || ""}
                    />
                  </div>
                  <div className="section-title border-bottom pb-3 mb-3">
                    Financial
                  </div>

                  <div className="form-group">
                    <label htmlFor="category">Revenue ($)</label>
                    <input
                      type="text"
                      className="form-control"
                      id="category"
                      name="revenue"
                      onChange={this.onChange.bind(this)}
                      readOnly={readOnly}
                      placeholder="Enter Revenue Amount"
                      value={orgDetail.revenue || ""}
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="category">Assets</label>
                    <input
                      type="text"
                      className="form-control"
                      id="category"
                      name="assets"
                      onChange={this.onChange.bind(this)}
                      readOnly={readOnly}
                      placeholder="Enter Assets"
                      value={orgDetail.assets || ""}
                    />
                  </div>
                  <div className="section-title border-bottom pb-3 mb-3">
                    Head Quarters
                  </div>
                  <div className="form-group">
                    <label htmlFor="category">Street Address</label>
                    <input
                      type="text"
                      className="form-control"
                      name="street"
                      id="street"
                      onChange={this.onChange.bind(this)}
                      readOnly={readOnly}
                      placeholder="Enter Street Address"
                      value={orgDetail.address.street || ""}
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="category">City</label>
                    <input
                      type="text"
                      className="form-control"
                      id="category"
                      name="city"
                      onChange={this.onChange.bind(this)}
                      readOnly={readOnly}
                      placeholder="Enter City"
                      value={orgDetail.address.city || ""}
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="description">County</label>
                    <input
                      type="text"
                      className="form-control"
                      id="category"
                      name="county"
                      onChange={this.onChange.bind(this)}
                      readOnly={readOnly}
                      placeholder="Enter County"
                      value={orgDetail.address.county || ""}
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="description">State</label>
                    <input
                      type="text"
                      className="form-control"
                      id="category"
                      name="state"
                      onChange={this.onChange.bind(this)}
                      readOnly={readOnly}
                      placeholder="Enter State"
                      value={orgDetail.address.state || ""}
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="description">Zip Code</label>
                    <input
                      type="text"
                      className="form-control"
                      id="category"
                      name="zip"
                      onChange={this.onChange.bind(this)}
                      readOnly={readOnly}
                      placeholder="Enter Zip/Postal Code"
                      value={orgDetail.address.zip || ""}
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="description">Country</label>
                    <input
                      type="text"
                      className="form-control"
                      id="category"
                      name="country"
                      readOnly={readOnly}
                      onChange={this.onChange.bind(this)}
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
                      className="form-control"
                      id="category"
                      name="websiteUrl"
                      readOnly={readOnly}
                      onChange={this.onChange.bind(this)}
                      placeholder="Enter website url"
                      value={orgDetail.websiteUrl || ""}
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="facebook">Facebook</label>
                    <input
                      type="text"
                      className="form-control"
                      id="facebook"
                      name="facebookUrl"
                      onChange={this.onChange.bind(this)}
                      readOnly={readOnly}
                      placeholder="Enter Facebook url"
                      value={orgDetail.facebookUrl || ""}
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="linkedIn">LinkedIn</label>
                    <input
                      type="text"
                      className="form-control"
                      id="linkedIn"
                      name="linkedinUrl"
                      onChange={this.onChange.bind(this)}
                      readOnly={readOnly}
                      placeholder="Enter LinkedIn url"
                      value={orgDetail.linkedinUrl || ""}
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="twitter">Twitter</label>
                    <input
                      type="text"
                      className="form-control"
                      id="twitter"
                      name="twitterUrl"
                      onChange={this.onChange.bind(this)}
                      readOnly={readOnly}
                      placeholder="Enter Twitter url"
                      value={orgDetail.twitterUrl || ""}
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="description">Contact Info</label>
                    <input
                      type="text"
                      className="form-control"
                      id="category"
                      name="contactInfo"
                      onChange={this.onChange.bind(this)}
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
                      className="form-control"
                      id="missionStatement"
                      name="missionStatement"
                      onChange={this.onChange.bind(this)}
                      readOnly={readOnly}
                      placeholder="Enter Mission Statement"
                      value={orgDetail.missionStatement || ""}
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="category">Values</label>
                    <input
                      type="text"
                      className="form-control"
                      name="values"
                      id="values"
                      onChange={this.onChange.bind(this)}
                      readOnly={readOnly}
                      placeholder="Enter Values"
                      value={orgDetail.values || ""}
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="category">Purpose</label>
                    <input
                      type="text"
                      className="form-control"
                      name="purpose"
                      id="purpose"
                      onChange={this.onChange.bind(this)}
                      readOnly={readOnly}
                      placeholder="Enter Purpose"
                      value={orgDetail.purpose || ""}
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="category">Self-Interest</label>
                    <input
                      type="text"
                      className="form-control"
                      name="selfInterest"
                      id="selfInterest"
                      onChange={this.onChange.bind(this)}
                      readOnly={readOnly}
                      placeholder="Enter Self-Interest"
                      value={orgDetail.selfInterest || ""}
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="category">Population Served</label>
                    <input
                      type="text"
                      className="form-control"
                      id="populationServed"
                      name="populationServed"
                      onChange={this.onChange.bind(this)}
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
                      onChange={this.onChange.bind(this)}
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
                        onClick={() => this.saveBasicInfo()}
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

  onChange(e) {
    const { orgDetail } = this.state;
    const { target: { name, value } = {} } = e;
    if (addressFields.includes(name.toLowerCase())) {
      orgDetail.address[name] = value;
    } else orgDetail[name] = value;
    this.setState({ orgDetail });
  }

  onDropdownChange(field, value) {
    const { orgDetail } = this.state;
    orgDetail[field] = value;
    this.setState({ orgDetail });
  }

  editBasicInfo() {
    this.setState({
      isEditable: true
    });
  }

  saveBasicInfo() {
    this.setState({
      isEditable: false
    });
    const { orgDetail = {} } = this.state;
    this.props.onSaveOrgBasicInfo([orgDetail]);
  }

  validateOrgData = () => {};

  onCancelBasicInfo() {
    this.setState({
      isEditable: false
    });
  }
}

const mapStateToProps = state => ({
  organizationDetail: state.orgDetail
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      changePage: () => push("/organizations"),
      onSaveOrgBasicInfo,
      fetchOrganisationDetail,
      startLoaderAction,
      stopLoaderAction
    },

    dispatch
  );

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(OrgDetailPage);
