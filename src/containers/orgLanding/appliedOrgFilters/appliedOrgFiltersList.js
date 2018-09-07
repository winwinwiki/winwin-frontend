import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Dropdown from '../../ui/dropdown';
import Checkbox from '../../ui/checkbox';
import { setAppliedFilters, showAppliedFilterModal } from '../../../actions/orgLanding/orgFilterAction';
import InputRange from 'react-input-range';
import 'react-input-range/lib/css/index.css';

var classNames = require('classnames');

const Priority = ['normal', 'high'];
const userList = ['abc abc', 'sumit chaudhari', 'Suuny tambi'];
const frameworkTagList = ['Social Progress Index', 'Sustainable Developement Goals']
const industryClassification = ['option 1', 'option 2', 'option 3'];
const SubIndustryClassification = ['select 1', 'select 2', 'select 3'];
class AppliedOrgFiltersList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            userMod: '',
            industryCls: '',
            subIndustryCls: '',
            frameworkTag: '',
            level1: '',
            level2: '',
            level3: '',
            sector: [],
            status: [],
            priority: '',
            revenueRange: { min: 0, max: 100 },
            assetsRange: { min: 0, max: 100 },
            level1List: [],
            level2List: [],
            level3List: []
        }
        this.onDropdownChange = this.onDropdownChange.bind(this);
        this.onFrameworkTagChange = this.onFrameworkTagChange.bind(this);
        this.onSectorCheckboxChange = this.onSectorCheckboxChange.bind(this);
        this.onStatusCheckboxChange = this.onStatusCheckboxChange.bind(this);
        this.addFiltersTag = this.addFiltersTag.bind(this);
        this.clearAppliedFilters = this.clearAppliedFilters.bind(this);
    }


    render() {
        const { userMod, sector, status, revenueRange, assetsRange, priority,
            industryCls, subIndustryCls, frameworkTag, level1, level2, level3, level1List, level2List, level3List } = this.state;
        const { isAppliedFilterVisible } = this.props;
        let showFilterCls = classNames({ show: isAppliedFilterVisible }, { 'dropdown-menu': true }, { 'px-3': true });
        return (
            <form aria-labelledby="filterDropdown" className={showFilterCls} style={{ left: -500 }}>
                <div className="row">
                    <div className="col">
                        <h5>Sector Level</h5>
                        <Checkbox name="federal" label="Federal"
                            checked={sector.indexOf('federal') > -1} onChange={this.onSectorCheckboxChange} />
                        <Checkbox name="state" label="State"
                            checked={sector.indexOf('state') > -1} onChange={this.onSectorCheckboxChange} />
                        <Checkbox name="country" label="County"
                            checked={sector.indexOf('country') > -1} onChange={this.onSectorCheckboxChange} />
                        <Checkbox name="city" label="City"
                            checked={sector.indexOf('city') > -1} onChange={this.onSectorCheckboxChange} />
                        <Checkbox name="district" label="District"
                            checked={sector.indexOf('district') > -1} onChange={this.onSectorCheckboxChange} />

                        <h5 className="mt-4">Status</h5>
                        <Checkbox name="autoTag" label="Auto Tag"
                            checked={status.indexOf('autoTag') > -1} onChange={this.onStatusCheckboxChange} />
                        <Checkbox name="completeTag" label="Complete Tag"
                            checked={status.indexOf('completeTag') > -1} onChange={this.onStatusCheckboxChange} />
                        <Checkbox name="orgTag" label="Organization Tag"
                            checked={status.indexOf('orgTag') > -1} onChange={this.onStatusCheckboxChange} />
                        <Checkbox name="unTaggged" label="Untagged"
                            checked={status.indexOf('unTaggged') > -1} onChange={this.onStatusCheckboxChange} />
                    </div>
                    <div className="col">
                        <h5>Priority</h5>
                        <div className="btn-group btn-group-toggle mb-4">
                            <label className={`btn btn-outline-secondary ${priority === Priority[0] ? 'active' : ''}`}
                                onClick={this.setPriority.bind(this, Priority[0])}>
                                <input type="radio" name="options" id="normal" autoComplete="off" /> Normal
                    </label>
                            <label className={`btn btn-outline-secondary ${priority === Priority[1] ? 'active' : ''}`}
                                onClick={this.setPriority.bind(this, Priority[1])}>
                                <input type="radio" name="options" id="high" autoComplete="off" /> High
                    </label>
                        </div>

                        <h5>Edited by User</h5>
                        <Dropdown
                            placeholder="Select User"
                            selectedItem={userMod}
                            name="userMod"
                            containerClass="dropdown dropdown-with-searchbox mb-4"
                            onChange={this.onDropdownChange}
                            items={userList} />

                        <h5>Industry Classification</h5>
                        <Dropdown
                            placeholder="Select Industry Classification"
                            selectedItem={industryCls}
                            name="industryCls"
                            containerClass="dropdown dropdown-with-searchbox mb-3"
                            onChange={this.onDropdownChange}
                            items={industryClassification} />

                        <Dropdown
                            placeholder="Select Sub Industry Classification"
                            selectedItem={subIndustryCls}
                            name="subIndustryCls"
                            containerClass="dropdown dropdown-with-searchbox mb-4"
                            onChange={this.onDropdownChange}
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
                                onChangeComplete={value => console.log(value)} />
                        </div>
                        <h5>Assets</h5>
                        <InputRange
                            draggableTrack
                            maxValue={100}
                            minValue={0}
                            formatLabel={value => `$ ${value}`}
                            value={assetsRange}
                            onChange={value => this.setState({ assetsRange: value })}
                            onChangeComplete={value => console.log(value)} />
                    </div>
                    <div className="col">
                        <h5>Framework Tag</h5>
                        <Dropdown
                            placeholder="Select Framework Tag"
                            selectedItem={frameworkTag}
                            name="frameworkTag"
                            containerClass="dropdown dropdown-with-searchbox mb-4"
                            onChange={this.onFrameworkTagChange}
                            items={frameworkTagList} />

                        {frameworkTag == frameworkTagList[0] && <h5>Level 3</h5>}
                        {frameworkTag == frameworkTagList[0] && <Dropdown
                            placeholder="Select Level3"
                            selectedItem={level3}
                            name="level3"
                            containerClass="dropdown dropdown-with-searchbox mb-4"
                            onChange={this.onDropdownChange}
                            items={level3List} />
                        }

                        {frameworkTag && <h5>Level 2</h5>}
                        {frameworkTag && <Dropdown
                            placeholder="Select Level2"
                            selectedItem={level2}
                            name="level2"
                            containerClass="dropdown dropdown-with-searchbox mb-4"
                            onChange={this.onDropdownChange}
                            items={level2List} />}

                        {frameworkTag && <h5>Level 1</h5>}
                        {frameworkTag && <Dropdown
                            placeholder="Select Level1"
                            selectedItem={level1}
                            name="level1"
                            containerClass="dropdown dropdown-with-searchbox mb-4"
                            onChange={this.onDropdownChange}
                            items={level1List} />}
                    </div>
                </div>
                <div className="row mt-5">
                    <div className="col justify-content-end d-flex">
                        <button type="button" className="btn btn-link" onClick={this.clearAppliedFilters}>Reset Filters</button>
                        <button type="button" className="btn btn-primary" onClick={this.addFiltersTag}>Done</button>
                    </div>
                </div>
            </form>
        )
    }
    onDropdownChange(field, value) {
        if (field == "level3") {
            const { SPIList } = this.props;
            let frameworkList = JSON.parse(JSON.stringify(SPIList));
            let level2 = '', level1 = '';
            level1 = Object.keys(frameworkList).find(l1 => { 
                level2 = Object.keys(frameworkList[l1]).find(l2 => frameworkList[l1][l2].indexOf(value) > -1); 
                if(level2){
                    return true;
                }
            });
            this.setState({
                [field]: value,
                level1: level1,
                level2: level2
            });
        } else if (field == "level2") {
            const { SDGList } = this.props;
            let frameworkList = JSON.parse(JSON.stringify(SDGList));
            let level1 = '';
            level1 = Object.keys(frameworkList).find(l1 => frameworkList[l1].indexOf(value) > -1);
            this.setState({
                [field]: value,
                level1: level1
            });
        } else {
            this.setState({ [field]: value });
        }
    }

    onFrameworkTagChange(field, value) {
        const { SPIList, SDGList } = this.props;
        let frameworkList = (value === frameworkTagList[0]) ? JSON.parse(JSON.stringify(SPIList)) : JSON.parse(JSON.stringify(SDGList))
        let level1 = Object.keys(frameworkList);
        let level2 = [], level3 = [];
        if (value === frameworkTagList[0]) {
            Object.keys(frameworkList).map(l1 => Object.keys(frameworkList[l1]).map(l2 => level2.push(l2)));
            Object.keys(frameworkList).map(l1 => Object.keys(frameworkList[l1]).map(l2 => frameworkList[l1][l2].map(l3 => level3.push(l3))));
        } else {
            Object.keys(frameworkList).map(l1 => frameworkList[l1].map(l2 => level2.push(l2)));
        }
        this.setState({
            [field]: value,
            level1List: level1,
            level2List: level2,
            level3List: level3,
            level1: '',
            level2: '',
            level3: ''
        });
    }

    onSectorCheckboxChange(name) {
        let sectorList = JSON.parse(JSON.stringify(this.state.sector));
        let index = sectorList.indexOf(name);
        index > -1 ? sectorList.splice(index, 1) : sectorList.push(name);
        this.setState({
            sector: sectorList
        })
    }

    onStatusCheckboxChange(name) {
        let statusList = JSON.parse(JSON.stringify(this.state.status));
        let index = statusList.indexOf(name);
        index > -1 ? statusList.splice(index, 1) : statusList.push(name);
        this.setState({
            status: statusList
        })
    }

    addFiltersTag() {
        const { isAppliedFilterVisible } = this.props;
        let filters = JSON.parse(JSON.stringify(this.state));
        this.props.setAppliedFilters(this.state);
        this.props.showAppliedFilterModal(!isAppliedFilterVisible);
    }

    clearAppliedFilters() {
        this.props.setAppliedFilters([]);
        this.setState({
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
            revenueRange: { min: 0, max: 100 },
            assetsRange: { min: 0, max: 100 }
        });
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
    isAppliedFilterVisible: state.orgFilter.isAppliedFilterVisible,
    SDGList: state.orgLanding.sdgList,
    SPIList: state.orgLanding.spiList
})

const mapDispatchToProps = dispatch => bindActionCreators({
    setAppliedFilters,
    showAppliedFilterModal
}, dispatch)

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(AppliedOrgFiltersList);