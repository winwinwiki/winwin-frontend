import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import SDGModal from './sdgModal';
import { fetchSdgTagsList } from '../../../actions/orgDetail/sdgTagsAction';

class SdgTags extends React.Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        this.props.fetchSdgTagsList();
    }

    render() {
        const { isSdgTagsSuccess, sdgTagsList } = this.props;
        if (!isSdgTagsSuccess || !sdgTagsList) { return null; }
        return (
            <section className="dashboard-content p-0 py-3 org-details-container">
                <div className="col-md-18 m-auto card">
                    <div className="col-md-18 m-auto d-flex flex-column py-3">
                        <h3>{this.props.type} Description</h3>
                        <p>Arts center conducts classes on any artistic or cultural topics ranging from ?crafts, dance, singing, painting. Camps for youth and adults and events ?open to the public. They also offer open space for private events.</p>

                        <div className="section-title">Sustainable Development Goals Tag</div>
                        <form>
                            <ul className="list-group list-group-flush">
                                <li className="list-group-item px-0">
                                    <div className="row">
                                        <ul className="action-icons">
                                            <li><a href="javascript:;" data-toggle="modal" data-target="#sdgModal"><i className="icon-edit"></i></a></li>
                                        </ul>
                                    </div>
                                </li>
                                {this.createSdgBox(sdgTagsList)}
                            </ul>
                        </form>
                    </div>
                </div>
                <SDGModal SDGData={sdgTagsList}/>
            </section>
        )
    }

    createSdgBox(sdgTagsList) {
        return sdgTagsList.map(tags =>
            <div className="card custom-list-container mt-2">
                <div className="card-header">
                    {tags['level1']}
                </div>
                <div className="card-body">
                    <ul className="">
                        <li>
                            <ul>
                                {tags['level2'].map(tag3 => <li><span>{tag3}</span></li>)}
                            </ul>
                        </li>
                    </ul>
                </div>
            </div>
        )
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