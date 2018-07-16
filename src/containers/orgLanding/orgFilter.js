import React from 'react';
import { push } from 'react-router-redux';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import ButtonGroup from '../ui/buttonGroup';
import Search from '../ui/searchBar';
import AppliedOrgFiltersList from './appliedOrgFilters/appliedOrgFiltersList';

class OrgFilters extends React.Component {
    constructor(props) {
        super(props);
        this.changePage = this.changePage.bind(this);
    }
    render() {
        return (
        <div className="d-flex align-content-center border-bottom py-3">
            <Search/>
            <ButtonGroup/>
            <div className="btn-group dropdown dropdown-with-checkbox" role="group" aria-label="group">
                <button id="filterDropdown" type="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" className="btn btn-outline-secondary m-0"><i className="icon-filter"></i></button>
                <AppliedOrgFiltersList />
            </div>
            <div className="ml-auto">
                <a onClick={this.changePage} className="btn btn-link"><i className="icon-add mr-1"></i> Create</a>
                <a href="javascript:;" className="btn btn-link pr-0"><i className="icon-upload mr-1"></i> Upload</a>
            </div>
        </div>
        )
    }

    changePage() {
        this.props.changePage();
    }
}

const mapStateToProps = state => ({
})

const mapDispatchToProps = dispatch => bindActionCreators({
    changePage: () => push('/organizations/new'),
}, dispatch)

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(OrgFilters);

