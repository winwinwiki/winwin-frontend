import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import SPIModal from './spiModal';
import { fetchSpiTagsList } from '../../../actions/orgDetail/spiTagsAction';

class SpiTags extends React.Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        this.props.fetchSpiTagsList();
    }

    render() {
        const { isSpiTagsSuccess, spiTagsList } = this.props;
        if (!isSpiTagsSuccess || !spiTagsList) { return null; }
        return (
            <section className="dashboard-content p-0 py-3 org-details-container">
                <div className="col-md-18 m-auto card">
                    <div className="col-md-18 m-auto d-flex flex-column py-3">
                        <h3>{this.props.type} Description</h3>
                        <p>Arts center conducts classes on any artistic or cultural topics ranging from ?crafts, dance, singing, painting. Camps for youth and adults and events ?open to the public. They also offer open space for private events.</p>

                        <div className="section-title">Social Progress Index Tag</div>
                        <form>
                            <ul className="list-group list-group-flush">
                                <li className="list-group-item px-0">
                                    <div className="row">
                                        <ul className="action-icons">
                                            <li><a href="javascript:;" data-toggle="modal" data-target="#spiModal"><i className="icon-edit"></i></a></li>
                                        </ul>
                                    </div>
                                </li>
                                {this.createSpiBox(spiTagsList)}
                            </ul>
                        </form>
                    </div>
                </div>
                <SPIModal SPIData={spiTagsList}/>
            </section>
        )
    }

    createSpiBox(spiTagsList) {
        let desiredTagsList = {};
        spiTagsList.map(tags => {
            !desiredTagsList[tags["level1"]] ? desiredTagsList[tags["level1"]] = {} : '';
            !desiredTagsList[tags["level1"]][tags["level2"]] ? desiredTagsList[tags["level1"]][tags["level2"]] = [] : '';
            desiredTagsList[tags["level1"]][tags["level2"]].push(tags["level3"]);
        });
        return Object.keys(desiredTagsList).map((level1, idx) =>
            <div key={idx} className="card custom-list-container mt-2">
                <div className="card-header">
                    {level1}
                </div>
                <div className="card-body">
                    <ul className="">
                        {Object.keys(desiredTagsList[level1]).map((level2, idx2) =>
                            <li key={idx2}>
                                <span>{level2}</span>
                                <ul>
                                    {desiredTagsList[level1][level2].map((level3, idx3) => <li key={idx3}><span>{level3}</span></li>)}
                                </ul>
                            </li>
                        )}
                    </ul>
                </div>
            </div>
        );
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