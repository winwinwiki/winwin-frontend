import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

class AppliedOrgFilters extends React.Component {
    constructor(props) {
        super(props);
    }


    render() {
        const { appliedFilterList } = this.props;
        console.log("filter list");
        console.log(appliedFilterList)
        return (
            <div className="applied-filters col align-items-center d-flex">
                {appliedFilterList.map(filter => <span className="badge badge-pill badge-secondary"> {filter} <a href="javascript:;" className=""><i className="icon-close"></i></a></span>)}
                <a href="javascript:;" className="text-primary">+ 2 More</a>
            </div>

        )
    }
}
const mapStateToProps = state => ({
    appliedFilterList: state.orgLanding.appliedFilterList
})

export default connect(
    mapStateToProps,
    null
)(AppliedOrgFilters);

