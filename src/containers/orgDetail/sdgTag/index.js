import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import {fetchSdgTagsList} from '../../../actions/orgDetail/sdgTagsAction';

class SdgTags extends React.Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        this.props.fetchSdgTagsList();
    }

    render() {
        const {isSdgTagsSuccess, sdgTagsList} = this.props;
        if(!isSdgTagsSuccess) { return null; }
    return (
        <section className="dashboard-content p-0 py-3 org-details-container">
            <div className="col-md-18 m-auto card">
                <div className="col-md-18 m-auto d-flex flex-column py-3">
                    <h3>Organization Description</h3>
                    <p>Arts center conducts classes on any artistic or cultural topics ranging from ?crafts, dance, singing, painting. Camps for youth and adults and events ?open to the public. They also offer open space for private events.</p>

                    <div className="section-title">
                        Social Progress Index Tag
                    </div>
                    <form>
                        {this.createSpiBox(sdgTagsList)}
                    </form>
                </div>
            </div>
        </section>
        )
    }

    createSpiBox(sdgTagsList) {
        return sdgTagsList.map(tags => {
        return (<div className="card custom-list-container">
        <div className="card-header">
            {tags['level1']}
        </div>
            <div className="card-body">
                <ul className="">

                    {tags['level2'].map(tag3 => <li><span>{tag3}</span></li>)}

                </ul>
            </div>
        </div>)
    })
    }
}

const mapStateToProps = state => ({
    sdgTagsList: state.sdgTags.sdgTagsList,
    isSdgTagsPending: state.sdgTags.isSdgTagsPending,
    isSdgTagsSuccess: state.sdgTags.isSdgTagsSuccess,
    isSdgTagsError: state.sdgTags.isSdgTagsError
})

const mapDispatchToProps = dispatch => bindActionCreators({
    fetchSdgTagsList
}, dispatch)

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(SdgTags);