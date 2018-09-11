import React from 'react';
import Search from '../../ui/searchBar';
import { connect } from 'react-redux';

class SPIModal extends React.Component {
    constructor(props) {
        super(props);
        this.state={
            searchText: ''
        }
        this.onChange = this.onChange.bind(this);
        this.isChecked = this.isChecked.bind(this);
    }

    render() {
        const { searchText } = this.state;
        const { SPIList, SPIData } = this.props;
        let localSPIList = this.desiredSPIList();
        if(!SPIList || !SPIData) {return null;}
        return (
            <div className="modal progress-index-modal fade bd-example-modal-lg" id="spiModal" tabIndex="-1"
                role="dialog" aria-labelledby="spiModalLabel" aria-hidden="true">
                <div className="modal-dialog modal-xl modal-dialog-centered" role="document">
                    <div className="modal-content">
                        <div className="dashboard-container">
                            <div className="dashboard-header">
                                <div className="modal-header flex-column">
                                    <div className="d-flex w-100 p-3">
                                        <h5 className="modal-title" id="spiModalLabel">Social Progress Index</h5>
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
                                        {Object.keys(localSPIList).map(level1 =>
                                            <React.Fragment>
                                                <div className="col-sm-24 mb-3">
                                                    <h3>{level1}</h3>
                                                </div>
                                                {Object.keys(localSPIList[level1]).map(level2 =>
                                                    <div className="col">
                                                        <p className="border-bottom pb-3">{level2}</p>
                                                        <div className="item-list mb-4">
                                                            {localSPIList[level1][level2].map(level3 =>
                                                                <div className="custom-control custom-checkbox">
                                                                    <input id={level3.id} type="checkbox" className="custom-control-input" checked={this.isChecked(level3.value)}/>
                                                                    <label htmlFor={level3.id} className="custom-control-label"> {level3.value}</label>
                                                                </div>
                                                            )}
                                                        </div>
                                                    </div>
                                                )}
                                                <div className="w-100"></div>
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
    desiredSPIList(){
        const { SPIList } = this.props;
        let spi = {};
        SPIList.map(data => {
            spi[data.level1] ? '' : spi[data.level1] = {};
            spi[data.level1][data.level2] ? '' : spi[data.level1][data.level2] = [];
            spi[data.level1][data.level2].push({id:data.id, value:data.level3});
        });
        return spi;
    }
    isChecked(spiTag){
        const { SPIData } = this.props;
        let filterExist =  SPIData.filter(tag => tag["level3"].toLowerCase() == spiTag.toLowerCase());
        return filterExist? filterExist.length > 0: false;
    }
    onChange() {

    }
}

const mapStateToProps = state => ({
    SPIList: state.orgLanding.spiList
})

export default connect(
    mapStateToProps,
    null
)(SPIModal);