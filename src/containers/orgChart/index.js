import React from 'react';
import { push } from 'react-router-redux';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { OrgChartComponent } from './orgChartComponent';
import './orgChart.css';

class OrgChart extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            orgChartData: {
                "id": 2,
                "collapsed": false,
                "name": "Human Health Services",
                "location": "Washington, DC",
                "childrenType": "Division",
                "children": [
                    {
                        "id": 1,
                        "name": "Administration for Children & Families",
                        "location": "Washington, DC",
                        "childrenType": "Department",
                        "children": [{
                            "id": 9,
                            "name": "Administration for Children & Families",
                            "location": "Washington, DC",
                            "childrenType": "Department",
                            "children": [{
                                "id": 80,
                                "name": "Administration of Community Living",
                                "location": "Washington, DC",
                                "childrenType": "Department"
                            }]
                        },
                        {
                            "id": 10,
                            "name": "Administration of Community Living",
                            "location": "Washington, DC",
                            "childrenType": "Department"
                        }]
                    },
                    {
                        "id": 3,
                        "name": "Administration of Community Living",
                        "location": "Washington, DC",
                        "childrenType": "Department"
                    },
                    {
                        "id": 4,
                        "name": "Agency for Healthcare Research and Quality",
                        "location": "Washington, DC",
                        "childrenType": "Department"
                    },
                    {
                        "id": 5,
                        "name": "Agency for Toxic Substances & Disease Registry",
                        "location": "Washington, DC",
                        "childrenType": "Department"
                    },
                    {
                        "id": 6,
                        "name": "Administration of Aging",
                        "location": "Washington, DC",
                        "childrenType": "Department"
                    },
                    {
                        "id": 7,
                        "name": "Agency for Toxic Substances & Disease Registry",
                        "location": "Washington, DC",
                        "childrenType": "Department"
                    },
                    {
                        "id": 8,
                        "name": "Administration of Aging",
                        "location": "Washington, DC",
                        "childrenType": "Department"
                    }
                ]
            },
            visibleLevel: 2
        }
    }
    componentDidMount() {
        const { orgChartData, visibleLevel } = this.state;
        var chart = new OrgChartComponent(this.desiredOrgData(orgChartData), visibleLevel, this.orgDetail, this.addNewChild);
        chart.renderOrgChart();
    }

    render() {
        return (
            <section className="dashboard-content p-0 py-3 org-details-container">
                <div className="col-md-18 m-auto card orgChartContainer">
                    <div className="col-md-24 d-flex flex-column py-3">
                        <div id="orgChart"></div>
                    </div>
                </div>
                <div className="col-md-18 m-auto p-2">You can move, zoom in and zoom out the Chart</div>
            </section>
        );
    }

    desiredOrgData(orgChartData) {
        let _self = this, modifiedChildren;
        const orgChartModifiedData = JSON.parse(JSON.stringify(orgChartData));
        if (!orgChartModifiedData.children) {
            orgChartModifiedData["children"] = [{
                'id': orgChartModifiedData.id + '_add' + orgChartModifiedData.childrenType,
                'name': '+ Add New ' + orgChartModifiedData.childrenType
            }];
        } else {
            modifiedChildren = orgChartModifiedData.children.map(child => _self.desiredOrgData(child));
            modifiedChildren.push({
                'id': orgChartModifiedData.id + '_add' + orgChartModifiedData.childrenType,
                'name': '+ Add New ' + orgChartModifiedData.childrenType
            });
            orgChartModifiedData["children"] = modifiedChildren;
        }
        orgChartModifiedData["className"] = 'collapsedChildren';
        return orgChartModifiedData;
    }

    addNewChild = (parentId, childType) => {
        this.props.addChildOrganisation(parentId, childType);
    }
    orgDetail = (id) => {
        this.props.changePage(id);
    }

}

const mapDispatchToProps = dispatch => bindActionCreators({
    changePage: (id) => push('/organizations/'+ id),
    addChildOrganisation: (parentId, childType) => push('/organizations/'+parentId+'/new-child-organization?'+childType)
}, dispatch)

export default connect(
    null,
    mapDispatchToProps
)(OrgChart);