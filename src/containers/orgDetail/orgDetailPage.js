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
                  <div className="section-title border-bottom pb-3 mb-3">
                    Sector Detail
                  </div>
                  <div className="form-group">
                    <label htmlFor="category">Sector</label>
                    {/* <input
                      type="text"
                      className="form-control"
                      id="category"
                      readOnly={readOnly}
                      placeholder="Enter Sector"
                      value={orgDetail.sector}
                    /> */}
                    <Dropdown
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
                    {/* <input
                      type="text"
                      className="form-control"
                      id="category"
                      readOnly={readOnly}
                      placeholder="Enter Sector Level"
                      value={orgDetail.sectorLevel}
                    /> */}
                    <Dropdown
                      selectedItem={orgDetail.sectorLevel}
                      name="sectorLevel"
                      containerClass="dropdown dropdown-with-searchbox"
                      onChange={this.onDropdownChange.bind(this)}
                      items={entityList}
                      disabled={readOnly}
                    />
                  </div>
                  {/* <div className="form-group">
                    <label htmlFor="category">Level Name</label>
                    <input
                      type="text"
                      className="form-control"
                      id="category"
                      readOnly={readOnly}
                      placeholder="Enter Level Name"
                      value={orgDetail.sector}
                    />
                  </div> */}
                  <div className="form-group">
                    <label htmlFor="orgdescription">
                      Organization Description
                    </label>
                    <textarea
                      className="form-control"
                      name="description"
                      id="orgdescription"
                      onChange={this.onChange.bind(this)}
                      readOnly={readOnly}
                      rows="5"
                      value={orgDetail.description}
                    />
                  </div>
                  <div className="section-title border-bottom pb-3 mb-3">
                    Revenue ($)
                  </div>
                  {/* {orgDetail.totalRevenue.map((revenue, index) => (
                    <React.Fragment key={index}> */}
                  <div className="form-group">
                    <label htmlFor="category">Amount</label>
                    <input
                      type="text"
                      className="form-control"
                      id="category"
                      name="revenue"
                      onChange={this.onChange.bind(this)}
                      readOnly={readOnly}
                      placeholder="Enter Revenue Amount"
                      value={orgDetail.revenue}
                    />
                  </div>
                  {/* <div className="form-group">
                        <label htmlFor="category">Year</label>
                        <input
                          type="text"
                          className="form-control"
                          id="category"
                          readOnly={readOnly}
                          placeholder="Enter Category"
                          value={revenue.year}
                        />
                      </div> 
                 </React.Fragment>
                  ))} */}
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
                      value={orgDetail.assets}
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
                      value={orgDetail.address.street}
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
                      value={orgDetail.address.city}
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
                      value={orgDetail.address.county}
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
                      value={orgDetail.address.state}
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="description">Zip</label>
                    <input
                      type="text"
                      className="form-control"
                      id="category"
                      name="zip"
                      onChange={this.onChange.bind(this)}
                      readOnly={readOnly}
                      placeholder="Enter Zip/Postal Code"
                      value={orgDetail.address.zip}
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
                      value={orgDetail.address.country}
                    />
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
                      value={orgDetail.websiteUrl}
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="description">Social Network</label>
                    <input
                      type="text"
                      className="form-control"
                      id="category"
                      name="socialUrl"
                      onChange={this.onChange.bind(this)}
                      readOnly={readOnly}
                      placeholder="Enter social network url"
                      value={orgDetail.socialUrl}
                    />
                  </div>
                  <div className="section-title border-bottom pb-3 mb-3">
                    Self Interest
                  </div>
                  <div className="form-group">
                    <label htmlFor="category">Key Activities</label>
                    <input
                      type="text"
                      className="form-control"
                      name="keyActivities"
                      id="keyActivities"
                      onChange={this.onChange.bind(this)}
                      readOnly={readOnly}
                      placeholder="Enter Key Activities"
                      value={orgDetail.keyActivities}
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="category">Organization Driver</label>
                    <input
                      type="text"
                      className="form-control"
                      name="orgDriver"
                      id="orgDriver"
                      onChange={this.onChange.bind(this)}
                      readOnly={readOnly}
                      placeholder="Enter Organizational Drivers"
                      value={orgDetail.orgDriver}
                    />
                  </div>
                  <div className="section-title border-bottom pb-3 mb-3">
                    Other
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
                      value={orgDetail.businessModel}
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
                      value={orgDetail.populationServed}
                    />
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
                      value={orgDetail.missionStatement}
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
    this.props.onSaveOrgBasicInfo(this.state.orgDetail);
  }

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
