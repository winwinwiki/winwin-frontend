import React from 'react';
import { connect } from 'react-redux';

class OrgDetailPage extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            orgDetail: {},
        }
    }

    render() {
        const { orgDetail } = this.state;
        return (
        <section className="dashboard-content p-0 py-3 org-details-container">
            <div className="col-md-18 m-auto card">
                <div className="col-md-18 m-auto d-flex flex-column py-3">
                    <h3>Organization Description</h3>
                    <p>{orgDetail.description}</p>

                    <div className="section-title border-bottom pb-3 mb-3">
                        Data Sets
                    </div>
                    <form>
                        <div className="form-group">
                            <label htmlFor="category">Category</label>
                            <input type="text" className="form-control" id="category" placeholder="Enter Category" value="Community Involvement Data"/>
                        </div>
                        <div className="form-group">
                            <label htmlFor="description">Description</label>
                            <textarea className="form-control" name="" id="description" rows="5">The Organization is dedicated to the community to provide a variety of challenging and newartistic programming through its school of the arts, dance studio, adult and children's performance programming, special events, and education</textarea>
                        </div>
                        <div className="form-group">
                            <div className="row">
                                <div className="col">
                                    <label htmlFor="description">Type</label><br/>
                                    <div className="btn-group btn-group-toggle mb-4" data-toggle="buttons">
                                        <label className="btn btn-outline-secondary">
                                            <input type="radio" name="options" id="normal" autoComplete="off"/> Open
                                        </label>
                                        <label className="btn btn-outline-secondary">
                                            <input type="radio" name="options" id="high" autoComplete="off"/> Closed
                                        </label>
                                    </div>
                                </div>
                                <div className="col">
                                    <div className="form-group">
                                        <label htmlFor="category">URL</label>
                                        <input type="text" className="form-control" id="category" placeholder="Website URL" value="www.xyzabc.com"/>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="card custom-list-container">
                            <div className="card-header">
                                Opportunity
                            </div>
                            <div className="card-body">
                                <h5 className="card-title">Special title treatment</h5>
                                <ul className="">
                                    <li>
                                        <span>Tolerence &amp; Inclusion</span>
                                        <ul>
                                            <li><span>Community Safety Net</span></li>
                                            <li><span>Religious Tolerence</span></li>
                                        </ul>
                                    </li>
                                    <li>
                                        <span>Access to Advance education</span>
                                        <ul>
                                            <li><span>Years of Tertiary Schooling</span></li>
                                        </ul>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </section>
        )
    }
}

const mapStateToProps = state => ({
    orgDetail: state.orgDetail.orgDetail,
})

export default connect(
    mapStateToProps,
    null
)(OrgDetailPage);