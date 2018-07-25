import React from 'react';
import Geosuggest from 'react-geosuggest';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import {setOrgRegionsServed} from '../../../actions/orgDetail/regionsServedAction';

class RegionsServed extends React.Component {
    constructor(props) {
        super(props);
        this._geoSuggest =  null;
        this.state = {
            location: null
        }
    }

    componentDidMount() {
        this.props.setOrgRegionsServed();
    }

    render() {
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
                        ref={el=>this._geoSuggest=el}
                        placeholder="Start typing!"
                        initialValue=""
                        fixtures={[]}
                        onSuggestSelect={this.onSuggestSelect} />
                    </form>
                </div>
            </div>
        </section>
            )
        }

        onSuggestSelect(suggest) {
            this.setState({
                location: suggest
            });
        }
}

const mapStateToProps = state => ({
    regionsServedList: state.regionsServed.regionsServedList,
    isregionsServedSuccess: state.regionsServed.isregionsServedSuccess
})

const mapDispatchToProps = dispatch => bindActionCreators({
    setOrgRegionsServed
}, dispatch)

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(RegionsServed);