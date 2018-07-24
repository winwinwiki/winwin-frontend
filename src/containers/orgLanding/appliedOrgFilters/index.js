import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

class AppliedOrgFilters extends React.Component {
    constructor(props) {
        super(props);
    }


    render() {
        const {appliedFilterList} = this.props;
        if(!appliedFilterList) {return null; }
        let valueArr = this.filterTagList();
        let tagCount = this.calculateTagCount(valueArr);
        return (
            <div className="applied-filters col align-items-center d-flex">
                {this.createTag(valueArr)}
                {/* {appliedFilterList.map(filter => <span className="badge badge-pill badge-secondary"> {filter} <a href="javascript:;" className=""><i className="icon-close"></i></a></span>)} */}
                {!tagCount && <span> No filters applied</span>} 
                {tagCount > 3  && <a href="javascript:;" className="text-primary">+ {tagCount - 3} More</a> }
            </div>

        )
    }

    calculateTagCount(valueArr) {
        const { appliedFilterList } = this.props;
        return appliedFilterList['status'] && appliedFilterList['sector'] ?
        valueArr.length + appliedFilterList['status'].length + appliedFilterList['sector'].length : valueArr.length;   
    }

    createTag(valueArr) {
        const { appliedFilterList } = this.props;
        let count = 0; 
        let tagValues = appliedFilterList['status'] && appliedFilterList['sector'] ? [...valueArr, ...appliedFilterList['status'], ...appliedFilterList['sector']] : valueArr;
        return tagValues.map((val, idx) =>  {
            if(val && count <= 2) {
                count++;
             return (<span key={idx} className="badge badge-pill badge-secondary"> {val}
                <a href="javascript:;" className=""><i className="icon-close"></i></a></span>)
            }
        })
    }

    filterTagList() {
        const { appliedFilterList } = this.props;
        return Object.keys(appliedFilterList).map((filterKey, idx) => {
            switch(filterKey) {
                case 'userMod':
                case 'priority':
                case 'subIndustryCls':
                case 'industryCls': 
                case 'frameworkTag':
                case 'level1':
                case 'level2':
                case 'level3':
                    return appliedFilterList[filterKey].includes('Select') || !appliedFilterList[filterKey] ? null : appliedFilterList[filterKey];
                case 'revenueRange':
                case 'assetsRange':
                    return appliedFilterList[filterKey]['min'] + '- $' + appliedFilterList[filterKey]['max'];
                default:
                    break;
    
            }
        }).filter(key => key);
    }
}
const mapStateToProps = state => ({
    appliedFilterList: state.orgFilter.appliedFilterList
})

export default connect(
    mapStateToProps,
    null
)(AppliedOrgFilters);

