import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { setAppliedFilters } from '../../../actions/orgLanding/orgFilterAction';

class AppliedOrgFilters extends React.Component {
    constructor(props) {
        super(props);
        this.removeFilter = this.removeFilter.bind(this);
    }


    render() {
        const { appliedFilterList } = this.props;
        if (!appliedFilterList) { return null; }
        let valueArr = this.filterTagList();
        let tagCount = this.calculateTagCount(valueArr);
        return (
            <div className="applied-filters col align-items-center d-flex">
                {this.createTag(valueArr)}
                {/* {appliedFilterList.map(filter => <span className="badge badge-pill badge-secondary"> {filter} <a href="javascript:;" className=""><i className="icon-close"></i></a></span>)} */}
                {!tagCount && <span> No filters applied</span>}
                {tagCount > 3 && <a href="javascript:;" className="dropdown-toggle plain text-primary" href="#" role="button" id="dropdownMenuLink1" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">+ {tagCount - 3} More</a>}
                {tagCount > 3 && <div className="dropdown-menu dropdown-menu-left" aria-labelledby="dropdownMenuLink1">
                    {this.createMoreTag(valueArr)}
                </div>}
            </div>

        )
    }

    calculateTagCount(valueArr) {
        const { appliedFilterList } = this.props;
        return valueArr.length + appliedFilterList['status'].length + appliedFilterList['sector'].length + appliedFilterList['userMod'].length;
    }

    createTag(valueArr) {
        const { appliedFilterList } = this.props;
        let count = 0;
        let flatUserModArray = appliedFilterList['userMod'].map(user => { return { type: 'userMod', value: user.label }; });
        let flatStatusArray = appliedFilterList['status'].map(status => { return { type: 'status', value: status }; });
        let flatSectorArray = appliedFilterList['sector'].map(sector => { return { type: 'sector', value: sector }; });
        let tagValues = flatUserModArray && flatStatusArray && flatSectorArray ? [...valueArr, ...flatUserModArray, ...flatStatusArray, ...flatSectorArray] : valueArr;
        return tagValues.map((val, idx) => {
            if (val && count <= 2) {
                count++;
                return (<span key={idx} className="badge badge-pill badge-secondary"> {val.value}
                    <a href="javascript:;" className="" onClick={() => this.removeFilter(val.type, val.value)}><i className="icon-close"></i></a></span>)
            }
        })
    }
    createMoreTag(valueArr) {
        const { appliedFilterList } = this.props;
        let count = 0;
        let flatUserModArray = appliedFilterList['userMod'].map(user => { return { type: 'userMod', value: user.label }; });
        let flatStatusArray = appliedFilterList['status'].map(status => { return { type: 'status', value: status }; });
        let flatSectorArray = appliedFilterList['sector'].map(sector => { return { type: 'sector', value: sector }; });
        let tagValues = flatUserModArray && flatStatusArray && flatSectorArray ? [...valueArr, ...flatUserModArray, ...flatStatusArray, ...flatSectorArray] : valueArr;
        return tagValues.map((val, idx) => {
            if (val) {
                if (count > 2) {
                    return (<span key={idx} className="badge badge-pill badge-secondary"> {val.value}
                        <a href="javascript:;" className="" onClick={() => this.removeFilter(val.type, val.value)}><i className="icon-close"></i></a></span>)
                }
                count++;
            }
        })
    }

    filterTagList() {
        const { appliedFilterList } = this.props;
        return Object.keys(appliedFilterList).map((filterKey, idx) => {
            switch (filterKey) {
                case 'priority':
                    return !appliedFilterList[filterKey] ? null : { type: filterKey, value: appliedFilterList[filterKey] };
                case 'subIndustryCls':
                case 'industryCls':
                case 'frameworkTag':
                case 'level1':
                case 'level2':
                case 'level3':
                    return !appliedFilterList[filterKey] ? null : { type: filterKey, value: appliedFilterList[filterKey].label };
                case 'revenueRange':
                case 'assetsRange':
                    return !appliedFilterList[filterKey]['max'] ? null : { type: filterKey, value: `$ ${appliedFilterList[filterKey]['min']} - $ ${appliedFilterList[filterKey]['max']}` };
                default:
                    break;

            }
        }).filter(key => key);
    }

    removeFilter(type, value) {
        const { appliedFilterList } = this.props;
        let filterList = Object.assign({}, appliedFilterList);
        Object.keys(filterList).map((filterKey, idx) => {
            if (type == filterKey) {
                switch (type) {
                    case 'frameworkTag':
                        filterList[type] = '';
                        filterList['level1'] = '';
                        filterList['level2'] = '';
                        filterList['level3'] = '';
                        break;
                    case 'level1':
                        filterList[type] = '';
                        filterList['level2'] = '';
                        filterList['level3'] = '';
                    case 'level2':
                        filterList[type] = '';
                        filterList['level3'] = '';
                    case 'level3':
                    case 'priority':
                    case 'subIndustryCls':
                    case 'industryCls':
                        filterList[type] = '';
                        break;
                    case 'revenueRange':
                    case 'assetsRange':
                        filterList[type]['max'] = 0;
                        break;
                    case 'userMod':
                        filterList[type] = filterList[type].filter(item => item.label !== value);
                        break;
                    case 'status':
                    case 'sector':
                        filterList[type].splice(filterList[type].indexOf(value), 1);
                        break;
                    default:
                        break;

                }
            }
        });
        this.props.setAppliedFilters(filterList);
    }
}
const mapStateToProps = state => ({
    appliedFilterList: state.orgFilter.appliedFilterList
})

const mapDispatchToProps = dispatch => bindActionCreators({
    setAppliedFilters
}, dispatch)

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(AppliedOrgFilters);

