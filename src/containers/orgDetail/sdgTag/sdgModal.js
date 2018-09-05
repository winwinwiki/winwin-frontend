import React from 'react';
import Search from '../../ui/searchBar';

const SDGJson = {
    "End Poverty": [
        "End Extreme Poverty",
        "Reduce Poverty",
        "Social Protection",
        "Equal Access to Goods and Services",
        "Build Resilience",
        "Secure Resources for Programs",
        "Scalable Policy Frameworks"
    ],
    "End Hunger": [
        "End Hunger",
        "End Malnutrition",
        "Increase Agriculture Activity and Income",
        "Sustainable Food Systems",
        "Seed Genetic Diversity",
        "Investment in Agriculture",
        "Reduce Trade Restrictions",
        "Food Market Systems"
    ],
    "Good Health": [
        "Reduce Maternal Mortality",
        "End Child Mortality",
        "End Disease Epidemics",
        "Reduce Mortality from Treatable Disease",
        "Treat and Prevent Drug Abuse",
        "Traffic Safety",
        "Reproduction Healthcare & Education",
        "Universal Healthcare",
        "Reduce Illness from Contamination",
        "Reduce Tobacco Supply & Demand",
        "Research Disease Prevention & Treatment",
        "Health Financing",
        "Risk Management"
    ],
    "Quality Education":[
        "Complete Childhood Education",
        "Early Childhood Development",
        "Equal Access to Higher Education",
        "Employable Skills Development",
        "Enducational Gender Equity",
        "100% Literacy and Numeracy",
        "Sustainable Education",
        "Quality Education Facilities",
        "Scholarship Availability",
        "Qualified Teacher Training"
    ],
    "Gender Equality":[
        "End Female Discrimination",
        "End Female-Targeted Violence",
        "End Harmful Female Practices",
        "Services for Unpaid Females",
        "Gender Equity in Leadership",
        "Reproductive Rights and Health Care",
        "Female Access to Economic Resources",
        "Female Empowerment Through Technology",
        "Gender Equity Policies"
    ],
    "Clean Water and Sanitation":[
        "Access to Drinking Water",
        "Access to Sanitation and Hygiene",
        "Water Quality",
        "Efficient Use of Water",
        "Water Resource Management",
        "Protect & Restore Water Resources",
        "International Supprot",
        "Local Support"
    ],
    "Renewable Energy": [
        
    ]
};

class SDGModal extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            searchText: ''
        }
        this.onChange = this.onChange.bind(this);
        this.isChecked = this.isChecked.bind(this);
    }

    render() {
        const { searchText } = this.state;
        return (
            <div className="modal progress-index-modal fade bd-example-modal-lg" id="sdgModal" tabIndex="-1"
                role="dialog" aria-labelledby="sdgModalLabel" aria-hidden="true">
                <div className="modal-dialog modal-xl modal-dialog-centered" role="document">
                    <div className="modal-content">
                        <div className="dashboard-container">
                            <div className="dashboard-header">
                                <div className="modal-header flex-column">
                                    <div className="d-flex w-100 p-3">
                                        <h5 className="modal-title" id="sdgModalLabel">Sustainable Development Goals</h5>
                                        <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                            <span aria-hidden="true">&times;</span>
                                        </button>
                                    </div>
                                    <div className="w-100 border-top">
                                        <div className="w-100 col d-flex align-content-center py-3">
                                            <Search placeholder="Search" onChange={this.onChange} value={searchText} />
                                            <div className="ml-auto">
                                                <button type="button" className="btn btn-link"
                                                    data-dismiss="modal">Cancel
                                                </button>
                                                <button type="button" className="btn btn-primary">Save</button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="modal-body dashboard-content progress-index-options">
                                <div className="d-flex flex-column h-100 pt-4">
                                    <div className="row d-flex">
                                        {Object.keys(SDGJson).map(level1 =>
                                            <React.Fragment>
                                                <div className="col-sm-8">
                                                    <p className="border-bottom pb-3">{level1}</p>
                                                    <div className="item-list mb-4">
                                                        {SDGJson[level1].map(level2 =>
                                                            <div className="custom-control custom-checkbox">
                                                                <input id="customCheckCustom-1" type="checkbox" className="custom-control-input" checked={this.isChecked(level2)} />
                                                                <label htmlFor="customCheckCustom-1" className="custom-control-label"> {level2}</label>
                                                            </div>
                                                        )}
                                                    </div>
                                                </div>
                                            </React.Fragment>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
    isChecked(sdgTag) {
        const { SDGData } = this.props;
        let filterExist = SDGData.filter(tag => tag["level2"].filter(l2 => l2.toLowerCase() == sdgTag.toLowerCase())[0]);
        return filterExist ? filterExist.length > 0 : false;
    }
    onChange() {

    }
}

export default SDGModal;