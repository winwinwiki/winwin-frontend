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