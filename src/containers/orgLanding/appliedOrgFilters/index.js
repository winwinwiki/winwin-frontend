import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

class AppliedOrgFilters extends React.Component {
    constructor(props) {
        super(props);
    }


    render() {
        
        console.log("filter list");
        return (
            <div className="applied-filters col align-items-center d-flex">
                {this.createTag()}
                {/* {appliedFilterList.map(filter => <span className="badge badge-pill badge-secondary"> {filter} <a href="javascript:;" className=""><i className="icon-close"></i></a></span>)} */}
                <a href="javascript:;" className="text-primary">+ 2 More</a>
            </div>

        )
    }

    createTag() {
        const { appliedFilterList } = this.props;
        return Object.keys(appliedFilterList).map((filterKey) => {
            switch(filterKey) {
                case 'userMod':
                case 'priority':
                case 'subIndustryCls':
                case 'industryCls': 
                case 'frameworkTag':
                case 'level1':
                case 'level2':
                case 'level3':
                    return <span className="badge badge-pill badge-secondary"> {appliedFilterList[filterKey]}
                        <a href="javascript:;" className=""><i className="icon-close"></i></a></span>;
                case 'revenueRange':
                case 'assetsRange':
                    return <span className="badge badge-pill badge-secondary"> {appliedFilterList[filterKey]['min'] + '-' + appliedFilterList[filterKey]['max']}
                        <a href="javascript:;" className=""><i className="icon-close"></i></a></span>;
                case 'sector':
                case 'status' : 
                    return appliedFilterList[filterKey].map(key => <span className="badge badge-pill badge-secondary">{key}
                        <a href="javascript:;" className=""><i className="icon-close"></i></a></span>);
                default:
                    break;
    
            }
        });  
    }
}
const mapStateToProps = state => ({
    appliedFilterList: state.orgLanding.appliedFilterList
})

export default connect(
    mapStateToProps,
    null
)(AppliedOrgFilters);

