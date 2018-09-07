import React from 'react';
import Search from '../../ui/searchBar';
import { connect } from 'react-redux';
class SDGModal extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            searchText: ''
        }
        this.onChange = this.onChange.bind(this);
        this.isChecked = this.isChecked.bind(this);
    }

    render() {
        const { searchText } = this.state;
        const { SDGList, SDGData } = this.props;
        if(!SDGList || !SDGData) { return null}
        return (
            <div className="modal progress-index-modal fade bd-example-modal-lg" id="sdgModal" tabIndex="-1"
                role="dialog" aria-labelledby="sdgModalLabel" aria-hidden="true">
                <div className="modal-dialog modal-xl modal-dialog-centered" role="document">
                    <div className="modal-content">
                        <div className="dashboard-container">
                            <div className="dashboard-header">
                                <div className="modal-header flex-column">
                                    <div className="d-flex w-100 p-3">
                                        <h5 className="modal-title" id="sdgModalLabel">Sustainable Development Goals</h5>
                                        <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                            <span aria-hidden="true">&times;</span>
                                        </button>
                                    </div>
                                    <div className="w-100 border-top">
                                        <div className="w-100 col d-flex align-content-center py-3">
                                            <Search placeholder="Search" onChange={this.onChange} value={searchText} />
                                            <div className="ml-auto">
                                                <button type="button" className="btn btn-link"
                                                    data-dismiss="modal">Cancel
                                                </button>
                                                <button type="button" className="btn btn-primary">Save</button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="modal-body dashboard-content progress-index-options">
                                <div className="d-flex flex-column h-100 pt-4">
                                    <div className="row d-flex">
                                        {Object.keys(SDGList).map(level1 =>
                                            <React.Fragment>
                                                <div className="col-sm-8">
                                                    <p className="border-bottom pb-3">{level1}</p>
                                                    <div className="item-list mb-4">
                                                        {SDGList[level1].map(level2 =>
                                                            <div className="custom-control custom-checkbox">
                                                                <input id="customCheckCustom-1" type="checkbox" className="custom-control-input" checked={this.isChecked(level2)} />
                                                                <label htmlFor="customCheckCustom-1" className="custom-control-label"> {level2}</label>
                                                            </div>
                                                        )}
                                                    </div>
                                                </div>
                                            </React.Fragment>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
    isChecked(sdgTag) {
        const { SDGData } = this.props;
        let filterExist = SDGData.filter(tag => tag["level2"].filter(l2 => l2.toLowerCase() == sdgTag.toLowerCase())[0]);
        return filterExist ? filterExist.length > 0 : false;
    }
    onChange() {

    }
}
const mapStateToProps = state => ({
    SDGList: state.orgLanding.sdgList
});

export default connect(
    mapStateToProps,
    null
)(SDGModal);