import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import {fetchSpiTagsList} from '../../../actions/orgDetail/spiTagsAction';

class SpiTags extends React.Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        this.props.fetchSpiTagsList();
    }

    render() {
        const {isSpiTagsSuccess, spiTagsList} = this.props;
        if(!isSpiTagsSuccess) { return null; }
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
                        {this.createSpiBox(spiTagsList)}
                    </form>
                </div>
            </div>
        </section>
        )
    }

    createSpiBox(spiTagsList) {
        return spiTagsList.map((tags, idx) => {
        return (<div key={idx} className="card custom-list-container">
        <div className="card-header">
            {tags['level1']}
        </div>
            <div className="card-body">
                <ul className="">
                    <li>
                        <span>{tags['level2']}</span>
                        <ul>
                            {tags['level3'].map(tag3 => <li><span>{tag3}</span></li>)}
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
        </div>)
    })
    }
}

const mapStateToProps = state => ({
    spiTagsList: state.spiTags.spiTagsList,
    isSpiTagsPending: state.spiTags.isSpiTagsPending,
    isSpiTagsSuccess: state.spiTags.isSpiTagsSuccess,
    isSpiTagsError: state.spiTags.isSpiTagsError
})

const mapDispatchToProps = dispatch => bindActionCreators({
    fetchSpiTagsList
}, dispatch)

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(SpiTags);