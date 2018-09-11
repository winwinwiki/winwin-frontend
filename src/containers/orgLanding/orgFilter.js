import React from 'react';
import { push } from 'react-router-redux';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import ButtonGroup from '../ui/buttonGroup';
import Search from '../ui/searchBar';
import AppliedOrgFiltersList from './appliedOrgFilters/appliedOrgFiltersList';
import { showAppliedFilterModal } from '../../actions/orgLanding/orgFilterAction';

class OrgFilters extends React.Component {
    constructor(props) {
        super(props);
        this.changePage = this.changePage.bind(this);
        this.showAppliedFilterModal = this.showAppliedFilterModal.bind(this);
        this.setActiveButton = this.setActiveButton.bind(this);
    }
    render() {
        const { activeButton, buttonList, searchText, getFilteredListOfOrg } = this.props;
        return (
            <div className="d-flex align-content-center border-bottom py-2">
                <div className="col">
                    <label htmlFor="search" className="d-block p-0 mb-0 col-form-label-sm">Search</label>
                    <Search placeholder="Search State/County/City/District" onChange={getFilteredListOfOrg} value={searchText} />
                </div>

                <div className="col">
                    <label htmlFor="sector" className="d-block p-0 mb-0 col-form-label-sm">Sector</label>
                    <ButtonGroup activeButton={activeButton} buttonList={buttonList} onChange={this.setActiveButton} />
                </div>

                <div className="col">
                    <label htmlFor="filter" className="d-block p-0 mb-0 col-form-label-sm">Filter</label>
                    <div className="btn-group dropdown dropdown-with-checkbox" role="group" aria-label="group">
                        <button id="filterDropdown" type="button"
                            aria-haspopup="true" aria-expanded="false"
                            className="btn btn-outline-secondary m-0"
                            onClick={this.showAppliedFilterModal}>
                            <i className="icon-filter"></i>
                        </button>
                        <AppliedOrgFiltersList activeOrg={activeButton} />
                    </div>
                </div>
                <div className="ml-auto">
                    <a href="javascript:;" onClick={() => this.changePage('new')} className="btn btn-link"><i className="icon-add mr-1"></i> Create</a>
                    <a href="javascript:;" onClick={() => this.changePage('uploadDataFeed')} className="btn btn-link pr-0"><i className="icon-upload mr-1"></i> Upload</a>
                </div>
            </div>
        )
    }

    changePage(page) {
        this.props.changePage(page);
    }

    showAppliedFilterModal() {
        const { isAppliedFilterVisible } = this.props;
        this.props.showAppliedFilterModal(!isAppliedFilterVisible);
    }

    setActiveButton(field) {
        this.props.filterOrgList({ sector: field });
    }

}

const mapStateToProps = state => ({
    isAppliedFilterVisible: state.orgFilter.isAppliedFilterVisible
})

const mapDispatchToProps = dispatch => bindActionCreators({
    changePage: (page) => push('/organizations/' + page),
    showAppliedFilterModal
}, dispatch)

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(OrgFilters);

