import React from 'react';
import Search from '../../ui/searchBar';

const SPIJson = {
    "Basic Human Needs": {
        "Nutrition and Basic Medical Care": [
            "Undernourishment",
            "Depth of food deficit",
            "Maternal mortality rate",
            "Child mortality rate",
            "Deaths from infectious diseases"
        ],
        "Water and Sanitation": [
            "Access to piped water",
            "Rural access to improved water source",
            "Access to improved sanitation facilities"
        ],
        "Shelter": [
            "Availability of affordable housing",
            "Access to electricity",
            "Quality of electricity supply",
            "Indoor air pollution attributable deaths"
        ],
        "Personal Safety": [
            "Homicide Rate",
            "Level of violent crime",
            "Perceived Criminality",
            "Political terror",
            "Traffic deaths"
        ]
    },
    "Foundations of Wellbeing": {
        "Access to Basic Knowledge": [
            "Adult literacy rate",
            "Primary school enrollment",
            "Lower secondary school enrollment",
            "Upper secondary school enrollment",
            "Gender parity in secondary enrollment"
        ],
        "Access to Information and Communication": [
            "Mobile telephone subscription",
            "Internet users",
            "Press freedom index"
        ],
        "Health and Wellness": [
            "Life expectancy",
            "Premature deaths from non-communicable diseases",
            "Obesity rate",
            "Outdoor air pollution attributable deaths",
            "Suicide rate"
        ],
        "Ecosystem Sustainability": [
            "Greenhouse gas emissions",
            "Water withdrawls as a percent of resources",
            "Biodiversity and habitat"
        ]
    },
    "Opportunity": {
        "Personal Rights": [
            "Political rights",
            "Freedom of speech",
            "Freedom of assembly/association",
            "Freedom of movement",
            "Private property rights"
        ],
        "Personal Freedom and Choice": [
            "Freedom over life choices",
            "Freedom of religion",
            "Early marriage",
            "Satisfied demand for contraception",
            "Corruption"
        ],
        "Tolerance and Inclusion": [
            "Tolerance for immigrants",
            "Tolorance for homosexuals",
            "Discrimination and violence against minorities",
            "Religious tolerance",
            "Community safety net"
        ],
        "Access to Advanced Education": [
            "Years of tertiary schooling",
            "Women's average years in school",
            "Inequality in the attainment of education",
            "Globally ranked universities"
        ]

    }
};

class SPIModal extends React.Component {
    constructor(props) {
        super(props);
        this.state={
            searchText: ''
        }
        this.onChange = this.onChange.bind(this);
        this.isChecked = this.isChecked.bind(this);
    }

    render() {
        const { searchText } = this.state;
        return (
            <div className="modal progress-index-modal fade bd-example-modal-lg" id="spiModal" tabIndex="-1"
                role="dialog" aria-labelledby="spiModalLabel" aria-hidden="true">
                <div className="modal-dialog modal-xl modal-dialog-centered" role="document">
                    <div className="modal-content">
                        <div className="dashboard-container">
                            <div className="dashboard-header">
                                <div className="modal-header flex-column">
                                    <div className="d-flex w-100 p-3">
                                        <h5 className="modal-title" id="spiModalLabel">Social Progress Index</h5>
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
                                        {Object.keys(SPIJson).map(level1 =>
                                            <React.Fragment>
                                                <div className="col-sm-24 mb-3">
                                                    <h3>{level1}</h3>
                                                </div>
                                                {Object.keys(SPIJson[level1]).map(level2 =>
                                                    <div className="col">
                                                        <p className="border-bottom pb-3">{level2}</p>
                                                        <div className="item-list mb-4">
                                                            {SPIJson[level1][level2].map(level3 =>
                                                                <div className="custom-control custom-checkbox">
                                                                    <input id="customCheckCustom-1" type="checkbox" className="custom-control-input" checked={this.isChecked(level3)}/>
                                                                    <label htmlFor="customCheckCustom-1" className="custom-control-label"> {level3}</label>
                                                                </div>
                                                            )}
                                                        </div>
                                                    </div>
                                                )}
                                                <div className="w-100"></div>
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
    isChecked(spiTag){
        const { SPIData } = this.props;
        let filterExist =  SPIData.filter(tag => tag["level3"].toLowerCase() == spiTag.toLowerCase());
        return filterExist? filterExist.length > 0: false;
    }
    onChange() {

    }
}

export default SPIModal;