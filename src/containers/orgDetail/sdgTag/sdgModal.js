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
        let localSDGList = this.desiredSDGList();
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
                                        {Object.keys(localSDGList).map(level1 =>
                                            <React.Fragment>
                                                <div className="col-sm-8">
                                                    <p className="border-bottom pb-3">{level1}</p>
                                                    <div className="item-list mb-4">
                                                        {localSDGList[level1].map(level2 =>
                                                            <div className="custom-control custom-checkbox">
                                                                <input id={level2.id} type="checkbox" className="custom-control-input" checked={this.isChecked(level2.value)} />
                                                                <label htmlFor={level2.id} className="custom-control-label"> {level2.value}</label>
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
    desiredSDGList(){
        const { SDGList } = this.props;
        let sdg = {};
        SDGList.map(data => {
            sdg[data.level1] ? '' : sdg[data.level1] = [];
            sdg[data.level1].push({id:data.id, value:data.level2});
        });
        return sdg;
    }
    isChecked(sdgTag) {
        const { SDGData } = this.props;
        let filterExist = SDGData.filter(tag => tag["level2"].toLowerCase() == sdgTag.toLowerCase());
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