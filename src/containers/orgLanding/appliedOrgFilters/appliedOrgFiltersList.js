import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Dropdown from '../../ui/dropdown';
import Checkbox from '../../ui/checkbox';
import {setAppliedFilters} from '../../../actions/orgLanding/orgLandingAction';
import InputRange from 'react-input-range';
import 'react-input-range/lib/css/index.css';

const userList = ['abc abc', 'sumit chaudhari', 'Suuny tambi'];
class AppliedOrgFiltersList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            userMod: userList[0],
            sector: [],
            status: []
        }
        this.onDropdownChange = this.onDropdownChange.bind(this);
        this.onSectorCheckboxChange = this.onSectorCheckboxChange.bind(this);
        this.onStatusCheckboxChange = this.onStatusCheckboxChange.bind(this);
        this.addFiltersTag = this.addFiltersTag.bind(this);
    }


    render() {
        const {userMod, sector, status} = this.state;
        return (
        <form aria-labelledby="filterDropdown" className="dropdown-menu px-3">
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
                <div className="btn-group btn-group-toggle mb-4" data-toggle="buttons">
                    <label className="btn btn-outline-secondary">
                        <input type="radio" name="options" id="normal" autoComplete="off" /> Normal
                    </label>
                    <label className="btn btn-outline-secondary">
                        <input type="radio" name="options" id="high" autoComplete="off"/> High
                    </label>
                </div>

                <h5>Edited by User</h5>
                <Dropdown
                    selectedItem={userMod}
                    name="userMod"
                    onChange={this.onDropdownChange.bind(this)}
                    items={userList} />

                {/* <div className="dropdown dropdown-with-searchbox mb-4">
                    <button id="dropdownMenuButton2" type="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" className="btn btn-dropdown btn-block btn-sm">Allison Zimmer..</button>
                    <div aria-labelledby="dropdownMenuButton2" className="dropdown-menu">
                        <div className="menu-conteiner">
                            <div className="menu-section">
                                <a href="#" className="dropdown-item">Allison Zimmer..</a>
                                <a href="#" className="dropdown-item">User 1</a>
                                <a href="#" className="dropdown-item">User 2</a>
                            </div>
                        </div>
                    </div>
                </div> */}

                <h5>Industry Classification</h5>
                <form className="dropdown dropdown-with-searchbox mb-3">
                    <button id="dropdownMenuButton3" type="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" className="btn btn-dropdown btn-block btn-sm">NTEE</button>
                    <div aria-labelledby="dropdownMenuButton3" className="dropdown-menu">
                        <div className="menu-conteiner">
                            <div className="menu-section">
                                <a href="#" className="dropdown-item">NTEE</a>
                                <a href="#" className="dropdown-item">Option 1</a>
                                <a href="#" className="dropdown-item">Option 2</a>
                            </div>
                        </div>
                    </div>
                </form>
                <div className="dropdown dropdown-with-searchbox mb-4">
                    <button id="dropdownMenuButton4" type="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" className="btn btn-dropdown btn-block btn-sm">Arts & Culture (A20)</button>
                    <div aria-labelledby="dropdownMenuButton4" className="dropdown-menu">
                        <div className="menu-conteiner">
                            <div className="menu-section">
                                <a href="#" className="dropdown-item">Arts & Culture (A20)</a>
                                <a href="#" className="dropdown-item">Option 1</a>
                                <a href="#" className="dropdown-item">Option 2</a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="col">
                <h5>Revenue</h5>
                <InputRange
                    maxValue={100}
                    minValue={0}
                    value={0}
                    onChange={value => this.setState({ value })} />
            </div>
            <div className="col">
                <h5>Framework Tag</h5>
                <div className="dropdown dropdown-with-searchbox mb-4">
                    <button id="dropdownMenuButton5" type="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" className="btn btn-dropdown btn-block btn-sm">Social Progress Index</button>
                    <div aria-labelledby="dropdownMenuButton5" className="dropdown-menu">
                        <div className="menu-conteiner">
                            <div className="menu-section">
                                <a href="#" className="dropdown-item">Social Progress Index</a>
                                <a href="#" className="dropdown-item">Option 1</a>
                                <a href="#" className="dropdown-item">Option 2</a>
                            </div>
                        </div>
                    </div>
                </div>

                <h5>Level 1</h5>
                <div className="dropdown dropdown-with-searchbox mb-4">
                    <button id="dropdownMenuButton6" type="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" className="btn btn-dropdown btn-block btn-sm">Basic Human N..</button>
                    <div aria-labelledby="dropdownMenuButton6" className="dropdown-menu">
                        <div className="menu-conteiner">
                            <div className="menu-section">
                                <a href="#" className="dropdown-item">Basic Human N</a>
                                <a href="#" className="dropdown-item">Option 1</a>
                                <a href="#" className="dropdown-item">Option 2</a>
                            </div>
                        </div>
                    </div>
                </div>

                <h5>Level 2</h5>
                <div className="dropdown dropdown-with-searchbox mb-4">
                    <button id="dropdownMenuButton5" type="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" className="btn btn-dropdown btn-block btn-sm">Shelter</button>
                    <div aria-labelledby="dropdownMenuButton5" className="dropdown-menu">
                        <div className="menu-conteiner">
                            <div className="menu-section">
                                <a href="#" className="dropdown-item">Shelter</a>
                                <a href="#" className="dropdown-item">Another name</a>
                            </div>
                        </div>
                    </div>
                </div>

                <h5>Level 3</h5>
                <div className="dropdown dropdown-with-searchbox">
                    <button id="dropdownMenuButton5" type="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" className="btn btn-dropdown btn-block btn-sm">All</button>
                    <div aria-labelledby="dropdownMenuButton5" className="dropdown-menu">
                        <div className="menu-conteiner">
                            <div className="menu-section">
                                <a href="#" className="dropdown-item">All</a>
                                <a href="#" className="dropdown-item">Option 1</a>
                                <a href="#" className="dropdown-item">Option 2</a>
                            </div>
                        </div>
                    </div>
                </div>
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
    onDropdownChange() {

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
        let filters = [...this.state.sector, ...this.state.status];
        this.props.setAppliedFilters(filters);
    }

    percentFormatter(v) {
        return `${v} %`;
    }
}

const mapStateToProps = state => ({
    appliedFilterList: state.orgLanding.appliedFilterList
})

const mapDispatchToProps = dispatch => bindActionCreators({
    setAppliedFilters
}, dispatch)

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(AppliedOrgFiltersList);