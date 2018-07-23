import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Dropdown from '../../ui/dropdown';
import Checkbox from '../../ui/checkbox';
import {setAppliedFilters, showAppliedFilterModal} from '../../../actions/orgLanding/orgFilterAction';
import InputRange from 'react-input-range';
import 'react-input-range/lib/css/index.css';

var classNames = require('classnames');

const Priority = ['normal', 'high'];
const userList = ['Select User', 'abc abc', 'sumit chaudhari', 'Suuny tambi'];
const industryClassification = ['Select Industry', 'option 1', 'option 2', 'option 3'];
const SubIndustryClassification = ['Select Sub Industry','select 1', 'select 2', 'select 3'];
class AppliedOrgFiltersList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            userMod: userList[0],
            industryCls: industryClassification[0],
            subIndustryCls: SubIndustryClassification[0],
            frameworkTag: userList[0],
            level1: userList[0],
            level2: userList[0],
            level3: userList[0],
            sector: [],
            status: [],
            priority: '',
            revenueRange: {min: 0, max: 100},
            assetsRange: {min: 0, max: 100}
        }
        this.onDropdownChange = this.onDropdownChange.bind(this);
        this.onSectorCheckboxChange = this.onSectorCheckboxChange.bind(this);
        this.onStatusCheckboxChange = this.onStatusCheckboxChange.bind(this);
        this.addFiltersTag = this.addFiltersTag.bind(this);
    }


    render() {
        const {userMod, sector, status, revenueRange, assetsRange, priority,
            industryCls, subIndustryCls, frameworkTag, level1, level2, level3} = this.state;
        const {isAppliedFilterVisible} = this.props;
        let showFilterCls = classNames({ show: isAppliedFilterVisible }, { 'dropdown-menu': true }, {'px-3' : true});
        return (
        <form aria-labelledby="filterDropdown" className={showFilterCls} style={{left: -500}}>
        <div className="row">
            <div className="col">
                <h5>Sector Level</h5>
                <Checkbox name="federal" label="Federal"
                    checked={sector.indexOf('federal') > -1} onChange={this.onSectorCheckboxChange}/>
                <Checkbox name="state" label="State"
                    checked={sector.indexOf('state') > -1} onChange={this.onSectorCheckboxChange}/>
                <Checkbox name="country" label="County"
                    checked={sector.indexOf('country') > -1} onChange={this.onSectorCheckboxChange}/>
                <Checkbox name="city" label="City"
                    checked={sector.indexOf('city') > -1} onChange={this.onSectorCheckboxChange}/>

                <h5 className="mt-4">Status</h5>
                <Checkbox name="autoTag" label="Auto Tag"
                    checked={status.indexOf('autoTag') > -1} onChange={this.onStatusCheckboxChange}/>
                <Checkbox name="completeTag" label="Complete Tag"
                    checked={status.indexOf('completeTag') > -1} onChange={this.onStatusCheckboxChange}/>
                <Checkbox name="orgTag" label="Organization Tag"
                    checked={status.indexOf('orgTag') > -1} onChange={this.onStatusCheckboxChange}/>
                <Checkbox name="unTaggged" label="Untagged"
                    checked={status.indexOf('unTaggged') > -1} onChange={this.onStatusCheckboxChange}/>
            </div>
            <div className="col">
                <h5>Priority</h5>
                <div className="btn-group btn-group-toggle mb-4">
                    <label className={`btn btn-outline-secondary ${ priority === Priority[0] ? 'active' : ''}`} 
                        onClick={this.setPriority.bind(this, Priority[0])}>
                        <input type="radio" name="options" id="normal" autoComplete="off" /> Normal
                    </label>
                    <label className={`btn btn-outline-secondary ${ priority === Priority[1] ? 'active' : ''}`}  
                         onClick={this.setPriority.bind(this, Priority[1])}>
                        <input type="radio" name="options" id="high" autoComplete="off"/> High
                    </label>
                </div>

                <h5>Edited by User</h5>
                <Dropdown
                    selectedItem={userMod}
                    name="userMod"
                    containerClass="dropdown dropdown-with-searchbox mb-4"
                    onChange={this.onDropdownChange.bind(this)}
                    items={userList} />

                <h5>Industry Classification</h5>
                <Dropdown
                    selectedItem={industryCls}
                    name="industryCls"
                    containerClass="dropdown dropdown-with-searchbox mb-3"
                    onChange={this.onDropdownChange.bind(this)}
                    items={industryClassification} />

                <Dropdown
                    selectedItem={subIndustryCls}
                    name="subIndustryCls"
                    containerClass="dropdown dropdown-with-searchbox mb-4"
                    onChange={this.onDropdownChange.bind(this)}
                    items={SubIndustryClassification} />
            </div>
            <div className="col">
                <h5>Revenue</h5>
                <div className="mb-4">
                <InputRange
                    draggableTrack
                    maxValue={100}
                    minValue={0}
                    formatLabel={value => `$ ${value}`}
                    value={revenueRange}
                    onChange={value => this.setState({ revenueRange: value })}
                    onChangeComplete={value => console.log(value)}/>
                </div>
                <h5>Assets</h5>
                <InputRange
                    draggableTrack
                    maxValue={100}
                    minValue={0}
                    formatLabel={value => `$ ${value}`}
                    value={assetsRange}
                    onChange={value => this.setState({ assetsRange: value })}
                    onChangeComplete={value => console.log(value)}/>
            </div>
            <div className="col">
                <h5>Framework Tag</h5>
                <Dropdown
                    selectedItem={frameworkTag}
                    name="frameworkTag"
                    containerClass="dropdown dropdown-with-searchbox mb-4"
                    onChange={this.onDropdownChange.bind(this)}
                    items={userList} />

                <h5>Level 1</h5>
                <Dropdown
                    selectedItem={level1}
                    name="level1"
                    containerClass="dropdown dropdown-with-searchbox mb-4"
                    onChange={this.onDropdownChange.bind(this)}
                    items={userList} />

                <h5>Level 2</h5>
                <Dropdown
                    selectedItem={level2}
                    name="level2"
                    containerClass="dropdown dropdown-with-searchbox mb-4"
                    onChange={this.onDropdownChange.bind(this)}
                    items={userList} />

                <h5>Level 3</h5>
                <Dropdown
                    selectedItem={level3}
                    name="level3"
                    containerClass="dropdown dropdown-with-searchbox mb-4"
                    onChange={this.onDropdownChange.bind(this)}
                    items={userList} />
            </div>
        </div>
        <div className="row mt-5">
            <div className="col justify-content-end d-flex">
                <button type="button" className="btn btn-link">Reset Filters</button>
                <button type="button" className="btn btn-primary" onClick={this.addFiltersTag}>Done</button>
            </div>
        </div>
        </form>
    )
}
    onDropdownChange(field, value) {
        this.setState({[field]: value});
    }

    onSectorCheckboxChange(name) {
        let sectorList = JSON.parse(JSON.stringify(this.state.sector));
        let index = sectorList.indexOf(name);
        index > -1 ? sectorList.splice(index, 1) : sectorList.push(name);
        this.setState({
            sector : sectorList
        })
    }

    onStatusCheckboxChange(name) {
        let statusList = JSON.parse(JSON.stringify(this.state.status));
        let index = statusList.indexOf(name);
        index > -1 ? statusList.splice(index, 1) : statusList.push(name);
        this.setState({
            status : statusList
        })
    }

    addFiltersTag() {
        const {isAppliedFilterVisible} = this.props;
       // const {userMod, industryCls, subIndustryCls, revenueRange, assetsRange} = this.state;
        //let filters = [...this.state.sector, ...this.state.status];
        let filters = JSON.parse(JSON.stringify(this.state));
        this.props.setAppliedFilters(this.state);
        this.props.showAppliedFilterModal(!isAppliedFilterVisible);
        this.props.onAppliedFilters(filters)
    }

    percentFormatter(v) {
        return `${v} %`;
    }

    setPriority(priority) {
        this.setState({
            priority
        });
    }
}

const mapStateToProps = state => ({
    appliedFilterList: state.orgFilter.appliedFilterList,
    isAppliedFilterVisible: state.orgFilter.isAppliedFilterVisible
})

const mapDispatchToProps = dispatch => bindActionCreators({
    setAppliedFilters,
    showAppliedFilterModal
}, dispatch)

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(AppliedOrgFiltersList);