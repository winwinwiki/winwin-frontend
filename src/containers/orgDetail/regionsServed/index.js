import React from 'react';
import Geosuggest from 'react-geosuggest';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import { setOrgRegionsServed, fetchOrgRegionsServed } from '../../../actions/orgDetail/regionsServedAction';

class RegionsServed extends React.Component {
    constructor(props) {
        super(props);
        this._geoSuggest = null;
        this.state = {
            location: null,
            isEdited: false
        }
        this.onSuggestSelect = this.onSuggestSelect.bind(this);
        this.deleteRegion = this.deleteRegion.bind(this);
        this.onEdit = this.onEdit.bind(this);
    }

    componentDidMount() {
        this.props.fetchOrgRegionsServed();
    }

    render() {
        const { isEdited } = this.state;
        const { regionsServedList, isRegionsServedSuccess } = this.props;
        if (!isRegionsServedSuccess) { return null; }
        return (
            <section className="dashboard-content p-0 py-3 org-details-container">
                <div className="col-md-18 m-auto card">
                    <div className="col-md-18 m-auto d-flex flex-column py-3">
                        <h3>{this.props.type} Description</h3>
                        <p>Arts center conducts classes on any artistic or cultural topics ranging from ?crafts, dance, singing, painting. Camps for youth and adults and events ?open to the public. They also offer open space for private events.</p>

                        <div className="section-title">
                            Regions Served
                        </div>
                        <form>
                            <ul className="list-group list-group-flush">
                                {!isEdited && <li className="list-group-item px-0">
                                    <div className="row">
                                        <ul className="action-icons">
                                            <li><a href="javascript:;" onClick={this.onEdit}><i className="icon-edit"></i></a></li>
                                        </ul>
                                    </div>
                                </li>}
                                {isEdited &&
                                    <Geosuggest
                                        ref={el => this._geoSuggest = el}
                                        placeholder="Search regions"
                                        initialValue=""
                                        className="form-control position-relative mt-2"
                                        fixtures={[]}
                                        onSuggestSelect={this.onSuggestSelect} />
                                }
                                {isEdited && regionsServedList.map(region =>
                                    <div className="row mt-2">
                                        <div className="col-sm-22">
                                            {region.city}, {region.state}, {region.country}
                                        </div>
                                        <div className="col-sm-2">
                                            <a href="javascript:;" className="icon-close" onClick={() => this.deleteRegion(region.id)}> </a>
                                        </div>
                                    </div>)
                                }
                                {!isEdited && regionsServedList.map(region => <li className="mt-2"> {region.city}, {region.state}, {region.country} </li>)}
                            </ul>
                        </form>



                    </div>
                </div>
            </section>
        )
    }

    onEdit(){
        this.setState({
            isEdited: true
        });
    }

    deleteRegion(id) {

    }

    onSuggestSelect(suggest) {
        this.props.setOrgRegionsServed(suggest);
        console.log(suggest)
        this.setState({
            location: suggest
        });
    }
}

const mapStateToProps = state => ({
    regionsServedList: state.regionsServed.regionsServedList,
    isRegionsServedSuccess: state.regionsServed.isRegionsServedSuccess
})

const mapDispatchToProps = dispatch => bindActionCreators({
    setOrgRegionsServed,
    fetchOrgRegionsServed
}, dispatch)

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(RegionsServed);