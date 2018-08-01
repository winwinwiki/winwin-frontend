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
            location: null
        }
        this.onSuggestSelect = this.onSuggestSelect.bind(this);
    }

    componentDidMount() {
        this.props.fetchOrgRegionsServed();
    }

    render() {
        const {regionsServedList, isRegionsServedSuccess} = this.props;
        if(!isRegionsServedSuccess) { return null; }
        return (
            <section className="dashboard-content p-0 py-3 org-details-container">
                <div className="col-md-18 m-auto card">
                    <div className="col-md-18 m-auto d-flex flex-column py-3">
                        <h3>Organization Description</h3>
                        <p>Arts center conducts classes on any artistic or cultural topics ranging from ?crafts, dance, singing, painting. Camps for youth and adults and events ?open to the public. They also offer open space for private events.</p>

                        <div className="section-title">
                            Regions Served
                        </div>
                        <form>
                            <Geosuggest
                                ref={el => this._geoSuggest = el}
                                placeholder="Start typing!"
                                initialValue=""
                                className="form-control position-relative"
                                fixtures={[]}
                                onSuggestSelect={this.onSuggestSelect} />
                        </form>
                        <div>
                            <ul>
                            {regionsServedList.map(region =><li> {region.city}, {region.state}, {region.country} </li> ) }
                            </ul>
                        </div>
                    </div>
                </div>
            </section>
        )
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