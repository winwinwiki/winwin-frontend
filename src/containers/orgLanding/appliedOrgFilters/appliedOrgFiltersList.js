import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Dropdown from '../../ui/dropdown';
import Checkbox from '../../ui/checkbox';
import { setAppliedFilters, showAppliedFilterModal } from '../../../actions/orgLanding/orgFilterAction';
import InputRange from 'react-input-range';
import ReactSelect from 'react-select';
import 'react-input-range/lib/css/index.css';

var classNames = require('classnames');

const Priority = ['normal', 'high'];
const userList = [{ value: 'abc', label: 'abc abc' }, { value: 'sumit', label: 'sumit chaudhari' }, { value: 'Sunny', label: 'Sunny tambi' }];
const frameworkTagList = [{ value: 'Social Progress Index', label: 'Social Progress Index' }, { value: 'Sustainable Developement Goals', label: 'Sustainable Developement Goals' }]
const industryClassification = [{ value: '1', label: 'option 1' }, { value: '2', label: 'option 2' }, { value: '3', label: 'option 3' }];
const SubIndustryClassification = [{ value: '1', label: 'select 1' }, { value: '2', label: 'select 2' }, { value: '3', label: 'select 3' }];
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
        this.onUserChange = this.onUserChange.bind(this);
        this.onIndustryClsChange = this.onIndustryClsChange.bind(this);
        this.onLevel3Change = this.onLevel3Change.bind(this);
        this.onLevel2Change = this.onLevel2Change.bind(this);
        this.onLevel1Change = this.onLevel1Change.bind(this);
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
                        <ReactSelect
                            name="userMod"
                            className="mb-3"
                            isMulti="true"
                            placeholder="Select User"
                            value={userMod}
                            onChange={this.onUserChange}
                            options={userList}
                            closeMenuOnSelect={false}
                        />

                        <h5>Industry Classification</h5>
                        <ReactSelect
                            name="industryCls"
                            className="mb-3"
                            isMulti={false}
                            placeholder="Select Industry Classification"
                            value={industryCls}
                            onChange={this.onIndustryClsChange}
                            options={industryClassification}
                        />

                        <ReactSelect
                            name="subIndustryCls"
                            className="mb-3"
                            isMulti={false}
                            placeholder="Select Sub Industry Classification"
                            value={subIndustryCls}
                            onChange={this.onIndustryClsChange}
                            options={SubIndustryClassification}
                        />
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
                        <ReactSelect
                            name="frameworkTag"
                            className="mb-3"
                            isMulti={false}
                            placeholder="Select Framework Tag"
                            value={frameworkTag}
                            onChange={this.onFrameworkTagChange}
                            options={frameworkTagList}
                        />

                        {frameworkTag == frameworkTagList[0] && <h5>Level 3</h5>}
                        {frameworkTag == frameworkTagList[0] && <ReactSelect
                            name="level3"
                            className="mb-3"
                            isMulti={false}
                            placeholder="Select Level3"
                            value={level3}
                            onChange={this.onLevel3Change}
                            options={level3List}
                        />
                        }

                        {frameworkTag && <h5>Level 2</h5>}
                        {frameworkTag && <ReactSelect
                            name="level2"
                            className="mb-3"
                            isMulti={false}
                            placeholder="Select Level2"
                            value={level2}
                            onChange={this.onLevel2Change}
                            options={level2List}
                        />}

                        {frameworkTag && <h5>Level 1</h5>}
                        {frameworkTag && <ReactSelect
                            name="level1"
                            className="mb-3"
                            isMulti={false}
                            placeholder="Select Level1"
                            value={level1}
                            onChange={this.onLevel1Change}
                            options={level1List}
                        />}
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
    onLevel1Change() { }
    onLevel2Change(level2) {
        if (!Array.isArray(level2)) {
            const { SDGList } = this.props;
            let frameworkList = JSON.parse(JSON.stringify(SDGList));
            let selectedFramework;
            selectedFramework = frameworkList.find(l2 => l2.level2 == level2.label);
            this.setState({
                level1: { value: selectedFramework.level1Id, label: selectedFramework.level1 },
                level2: { value: selectedFramework.id, label: selectedFramework.level2 }
            });
        } else {
            this.setState({
                level1: '',
                level2: '',
                level3: ''
            });
        }
    }
    onLevel3Change(level3) {
        if (!Array.isArray(level3)) {
            const { SPIList } = this.props;
            let frameworkList = JSON.parse(JSON.stringify(SPIList));
            let selectedFramework;
            selectedFramework = frameworkList.find(l3 => l3.level3 == level3.label);
            this.setState({
                level3: { value: selectedFramework.id, label: selectedFramework.level3 },
                level1: { value: selectedFramework.level1Id, label: selectedFramework.level1 },
                level2: { value: selectedFramework.level2Id, label: selectedFramework.level2 }
            });
        } else {
            this.setState({
                level1: '',
                level2: '',
                level3: ''
            });
        }
    }
    onDropdownChange(field, value) {
        this.setState({ [field]: value });
    }

    onUserChange(userMod) {
        this.setState({ userMod });
    }

    onIndustryClsChange(industryCls) {
        this.setState({ industryCls });
    }

    onFrameworkTagChange(value) {
        const { SPIList, SDGList } = this.props;
        let frameworkList = (value === frameworkTagList[0]) ? JSON.parse(JSON.stringify(SPIList)) : JSON.parse(JSON.stringify(SDGList))
        let level1 = [], level2 = [], level3 = [];
        if (value === frameworkTagList[0]) {
            level3 = frameworkList.map(l3 => {
                level1[(level1.length - 1)] && (level1[(level1.length - 1)].label == l3.level1) ? '' : level1.push({ value: l3.level1Id, label: l3.level1 });
                level2[(level2.length - 1)] && (level2[(level2.length - 1)].label == l3.level2) ? '' : level2.push({ value: l3.level2Id, label: l3.level2 });
                return { "value": l3.id, "label": l3.level3 };
            });
        } else if (!Array.isArray(value)) {
            level2 = frameworkList.map(l2 => {
                level1[(level1.length - 1)] && (level1[(level1.length - 1)].label == l2.level1) ? '' : level1.push({ value: l2.level1Id, label: l2.level1 });
                return { "value": l2.id, "label": l2.level2 };
            });
        }
        this.setState({
            "frameworkTag": value,
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