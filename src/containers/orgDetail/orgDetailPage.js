import React from 'react';
import { connect } from 'react-redux';

class OrgDetailPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            orgDetail: null,
            isEditable: false
        }
    }

    componentDidMount() {
        const { organizationDetail } = this.props;
        if (organizationDetail && organizationDetail.data) {
            this.setState({
                orgDetail: organizationDetail.data
            });
        }
    }

    componentWillReceiveProps(nextProps) {
        const { orgDetail } = this.props;
        if (nextProps && nextProps.organizationDetail !== orgDetail && nextProps.organizationDetail.data) {
            if (!nextProps.organizationDetail.error) {
                this.setState({
                    orgDetail: nextProps.organizationDetail.data
                });
            }
        }
    }

    render() {
        const { isEditable, orgDetail } = this.state;
        if (!orgDetail) { return null; }

        let readOnly = isEditable ? '' : "readOnly"
        return (
            <section className="dashboard-content p-0 py-3 org-details-container">
                <div className="col-md-18 m-auto card">
                    <div className="col-md-18 m-auto d-flex flex-column py-3">
                        <form>
                            <ul className="list-group list-group-flush">
                                <li className="list-group-item px-0">
                                    {isEditable ? '' : <div className="row">
                                        <ul className="action-icons active">
                                            <li><a href="javascript:;" onClick={() => this.editBasicInfo()}><i className="icon-edit"></i></a></li>
                                        </ul>
                                    </div>}

                                    <div className="section-title border-bottom pb-3 mb-3">Sector Detail</div>
                                    <div className="form-group">
                                        <label htmlFor="category">Sector</label>
                                        <input type="text" className="form-control" id="category" readOnly={readOnly} placeholder="Enter Category" value={orgDetail.sector} />
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="category">Sector Level</label>
                                        <input type="text" className="form-control" id="category" readOnly={readOnly} placeholder="Enter Category" value={orgDetail.sectorLevel} />
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="category">Level Name</label>
                                        <input type="text" className="form-control" id="category" readOnly={readOnly} placeholder="Enter Category" value={orgDetail.sector} />
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="orgdescription">Organization Description</label>
                                        <textarea className="form-control" name="" id="orgdescription" readOnly={readOnly} rows="5" value={orgDetail.description}></textarea>
                                    </div>
                                    <div className="section-title border-bottom pb-3 mb-3">Revenue</div>
                                    {orgDetail.totalRevenue.map((revenue, index) => <React.Fragment key={index}>
                                        <div className="form-group">
                                            <label htmlFor="category">Amount</label>
                                            <input type="text" className="form-control" id="category" readOnly={readOnly} placeholder="Enter Category" value={revenue.value} />
                                        </div>
                                        <div className="form-group">
                                            <label htmlFor="category">Year</label>
                                            <input type="text" className="form-control" id="category" readOnly={readOnly} placeholder="Enter Category" value={revenue.year} />
                                        </div>
                                    </React.Fragment>)}
                                    <div className="form-group">
                                        <label htmlFor="category">Assets</label>
                                        <input type="text" className="form-control" id="category" readOnly={readOnly} placeholder="Enter Category" value={orgDetail.totalAssets} />
                                    </div>
                                    <div className="section-title border-bottom pb-3 mb-3">Head Quarters</div>
                                    <div className="form-group">
                                        <label htmlFor="category">Street Address</label>
                                        <input type="text" className="form-control" id="category" readOnly={readOnly} placeholder="Enter Category" value={orgDetail.address.street} />
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="category">City</label>
                                        <input type="text" className="form-control" id="category" readOnly={readOnly} placeholder="Enter Category" value={orgDetail.address.city} />
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="description">County</label>
                                        <input type="text" className="form-control" id="category" readOnly={readOnly} placeholder="Enter Category" value={orgDetail.address.county} />
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="description">State</label>
                                        <input type="text" className="form-control" id="category" readOnly={readOnly} placeholder="Enter Category" value={orgDetail.address.state} />
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="description">Zip</label>
                                        <input type="text" className="form-control" id="category" readOnly={readOnly} placeholder="Enter Category" value={orgDetail.address.zip} />
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="description">Country</label>
                                        <input type="text" className="form-control" id="category" readOnly={readOnly} placeholder="Enter Category" value={orgDetail.address.country} />
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="description">Website</label>
                                        <input type="text" className="form-control" id="category" readOnly={readOnly} placeholder="Enter Category" value={orgDetail.website} />
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="description">Social Network</label>
                                        <input type="text" className="form-control" id="category" readOnly={readOnly} placeholder="Enter Category" value="Community Involvement Data" />
                                    </div>
                                    {isEditable ? <div className="row justify-content-center footer-actions active">
                                        <button className="btn" onClick={() => this.onCancelBasicInfo()}>Cancel</button>
                                        <button className="btn btn-primary" onClick={() => this.saveBasicInfo()}>Save</button>
                                    </div> : ''}
                                </li>
                            </ul>
                        </form>
                    </div>
                </div>
            </section>
        )
    }

    editBasicInfo() {
        this.setState({
            isEditable: true
        });
    }

    saveBasicInfo() {
        this.setState({
            isEditable: false
        })
    }

    onCancelBasicInfo() {
        this.setState({
            isEditable: false
        })
    }
}

const mapStateToProps = state => ({
    organizationDetail: state.orgDetail,
})

export default connect(
    mapStateToProps,
    null
)(OrgDetailPage);