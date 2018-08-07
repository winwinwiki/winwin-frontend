import React from 'react';
import { connect } from 'react-redux';

class OrgDetailPage extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            orgDetail: {}
        }
    }

    componentWillReceiveProps(nextProps) {
        if(JSON.stringify(nextProps.orgDetail) !== JSON.stringify(this.props.orgDetail) ) {
            this.setState({
                orgDetail: nextProps.orgDetail
            });
        }
    }

    render() {
        const { orgDetail } = this.state;
        console.log("descript off org detail", orgDetail)
        if(!orgDetail) { return null; }
        return (
        <section className="dashboard-content p-0 py-3 org-details-container">
            <div className="col-md-18 m-auto card">
                <div className="col-md-18 m-auto d-flex flex-column py-3">
                    <h3>Organization Description</h3>
                    <p> abc{orgDetail.description}</p>

                    <div className="section-title border-bottom pb-3 mb-3">
                        Revenue
                    </div>
                    <form>
                        <div className="col">
                            <div className="form-group">
                                <label htmlFor="category">Amount</label>
                                <input type="text" className="form-control" id="category" readOnly="readOnly" placeholder="Enter Category" value="Community Involvement Data"/>
                            </div>
                        </div>
                        <div className="col">
                            <div className="form-group">
                                <label htmlFor="category">Year</label>
                                <input type="text" className="form-control" id="category" placeholder="Enter Category" value={this.state.year}/>
                            </div>
                        </div>
                        <div className="form-group">
                            <label htmlFor="category">Assets</label>
                            <input type="text" className="form-control" id="category" placeholder="Enter Category" value="Community Involvement Data"/>
                        </div>
                        <div className="form-group">
                            <label htmlFor="category">Sector</label>
                            <input type="text" className="form-control" id="category" placeholder="Enter Category" value="Community Involvement Data"/>
                        </div>
                    </form>
                    <div className="section-title border-bottom pb-3 mb-3">
                        Sector Detail
                    </div>
                    <form>
                        <div className="col">
                            <div className="form-group">
                                <label htmlFor="category">Sector Level</label>
                                <input type="text" className="form-control" id="category" placeholder="Enter Category" value="Community Involvement Data"/>
                            </div>
                        </div>
                        <div className="col">
                            <div className="form-group">
                                <label htmlFor="category">Level Name</label>
                                <input type="text" className="form-control" id="category" placeholder="Enter Category" value="Community Involvement Data"/>
                            </div>
                        </div>
                        <div className="form-group">
                            <label htmlFor="description">Description</label>
                            <textarea className="form-control" name="" id="description" rows="5">The Organization is dedicated to the community to provide a variety of challenging and newartistic programming through its school of the arts, dance studio, adult and children's performance programming, special events, and education</textarea>
                        </div>
                    </form>
                    <div className="section-title border-bottom pb-3 mb-3">
                        Head Quarters
                    </div>
                    <form>
                        <div className="col">
                            <div className="form-group">
                                <label htmlFor="category">Street Address</label>
                                <input type="text" className="form-control" id="category" placeholder="Enter Category" value="Community Involvement Data"/>
                            </div>
                        </div>
                        <div className="col">
                            <div className="form-group">
                                <label htmlFor="category">City</label>
                                <input type="text" className="form-control" id="category" placeholder="Enter Category" value="Community Involvement Data"/>
                            </div>
                        </div>
                        <div className="form-group">
                            <label htmlFor="description">County</label>
                            <input type="text" className="form-control" id="category" placeholder="Enter Category" value="Community Involvement Data"/>                        </div>
                        <div className="form-group">
                            <label htmlFor="description">State</label>
                            <input type="text" className="form-control" id="category" placeholder="Enter Category" value="Community Involvement Data"/>                        </div>
                        <div className="form-group">
                            <label htmlFor="description">Zip</label>
                            <input type="text" className="form-control" id="category" placeholder="Enter Category" value="Community Involvement Data"/>                        </div>
                        <div className="form-group">
                            <label htmlFor="description">Country</label>
                            <input type="text" className="form-control" id="category" placeholder="Enter Category" value="Community Involvement Data"/>                        </div>
                        <div className="form-group">
                            <label htmlFor="description">Website</label>
                            <input type="text" className="form-control" id="category" placeholder="Enter Category" value="Community Involvement Data"/>                        </div>
                        <div className="form-group">
                            <label htmlFor="description">Social Network</label>
                            <input type="text" className="form-control" id="category" placeholder="Enter Category" value="Community Involvement Data"/>                        </div>
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