import React from 'react';
import { connect } from 'react-redux';

class OrgDetailPage extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            orgDetail: {},
            isEditable: false
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
        const { isEditable } = this.state;
        if(!this.props.orgDetail) { return null; }
        const { description, sectorLevel, sector, totalAssets, address, website, totalRevenue } = this.props.orgDetail;
        
        let readOnly = isEditable ? '' : "readOnly"
        return (
        <section className="dashboard-content p-0 py-3 org-details-container">
            <div className="col-md-18 m-auto card">
                <div className="col-md-18 m-auto d-flex flex-column py-3">

                    <div className="section-title border-bottom pb-3 mb-3">
                        Revenue
                    </div>
                    {isEditable ? <div className="row">
                        <ul className="action-icons">
                            <li><a href="javascript:;" onClick={() => this.saveBaiscInfo()}><i className="icon-delete"></i></a></li>
                        </ul>
                    </div> : <div className="row">
                        <ul className="action-icons">
                            <li><a href="javascript:;" onClick={() => this.editBasicInfo()}><i className="icon-edit"></i></a></li>
                        </ul>
                    </div>}
                    
                    <form>
                        { totalRevenue.map((revenue, index) =><React.Fragment key={index}> <div className="col">
                            <div className="form-group">
                                <label htmlFor="category">Amount</label>
                                <input type="text" className="form-control" id="category" readOnly={readOnly} placeholder="Enter Category" value={revenue.value}/>
                            </div>
                        </div>
                        <div className="col">
                            <div className="form-group">
                                <label htmlFor="category">Year</label>
                                <input type="text" className="form-control" id="category" readOnly={readOnly} placeholder="Enter Category" value={revenue.year}/>
                            </div>
                        </div></React.Fragment>)} 
                        <div className="form-group">
                            <label htmlFor="category">Assets</label>
                            <input type="text" className="form-control" id="category" readOnly={readOnly} placeholder="Enter Category" value={totalAssets}/>
                        </div>
                        <div className="form-group">
                            <label htmlFor="category">Sector</label>
                            <input type="text" className="form-control" id="category" readOnly={readOnly} placeholder="Enter Category" value={sector}/>
                        </div>
                    </form>
                    <div className="section-title border-bottom pb-3 mb-3">
                        Sector Detail
                    </div>
                    <form>
                        <div className="col">
                            <div className="form-group">
                                <label htmlFor="category">Sector Level</label>
                                <input type="text" className="form-control" id="category" readOnly={readOnly} placeholder="Enter Category" value={sectorLevel}/>
                            </div>
                        </div>
                        <div className="col">
                            <div className="form-group">
                                <label htmlFor="category">Level Name</label>
                                <input type="text" className="form-control" id="category" readOnly={readOnly} placeholder="Enter Category" value={sector}/>
                            </div>
                        </div>
                        <div className="form-group">
                            <label htmlFor="description">Description</label>
                            <textarea className="form-control" name="" id="description" readOnly={readOnly} rows="5">{description}</textarea>
                        </div>
                    </form>
                    <div className="section-title border-bottom pb-3 mb-3">
                        Head Quarters
                    </div>
                    <form>
                        <div className="col">
                            <div className="form-group">
                                <label htmlFor="category">Street Address</label>
                                <input type="text" className="form-control" id="category" readOnly={readOnly} placeholder="Enter Category" value={address.street}/>
                            </div>
                        </div>
                        <div className="col">
                            <div className="form-group">
                                <label htmlFor="category">City</label>
                                <input type="text" className="form-control" id="category" readOnly={readOnly} placeholder="Enter Category" value={address.city}/>
                            </div>
                        </div>
                        <div className="form-group">
                            <label htmlFor="description">County</label>
                            <input type="text" className="form-control" id="category" readOnly={readOnly} placeholder="Enter Category" value={address.county}/>                        </div>
                        <div className="form-group">
                            <label htmlFor="description">State</label>
                            <input type="text" className="form-control" id="category" readOnly={readOnly}  placeholder="Enter Category" value={address.state}/>                        </div>
                        <div className="form-group">
                            <label htmlFor="description">Zip</label>
                            <input type="text" className="form-control" id="category" readOnly={readOnly} placeholder="Enter Category" value={address.zip}/>                        </div>
                        <div className="form-group">
                            <label htmlFor="description">Country</label>
                            <input type="text" className="form-control" id="category" readOnly={readOnly} placeholder="Enter Category" value={address.country}/>                        </div>
                        <div className="form-group">
                            <label htmlFor="description">Website</label>
                            <input type="text" className="form-control" id="category" readOnly={readOnly} placeholder="Enter Category" value={website}/>                        </div>
                        <div className="form-group">
                            <label htmlFor="description">Social Network</label>
                            <input type="text" className="form-control" id="category" readOnly={readOnly} placeholder="Enter Category" value="Community Involvement Data"/>                        </div>
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

    saveBaiscInfo() {
        this.setState({
            isEditable: false
        })
    }
}

const mapStateToProps = state => ({
    orgDetail: state.orgDetail.orgDetail,
})

export default connect(
    mapStateToProps,
    null
)(OrgDetailPage);