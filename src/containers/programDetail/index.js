import React from 'react';
import SideBar from '../sidebar';

class ProgramDetail extends React.Component { 
    constructor(props){
        super(props);
        this.state = {
            programDetail: {
                name: "Classes, camps, events and location rentals"
            },
        }
    }

    componentDidMount() {
        // console.log("orgID: "+this.props.url.params.id);
        // this.props.fetchOrganisationDetail(this.props.url.params.id);
    }

    render() {
        const { programDetail } = this.state;
        return (
            <React.Fragment>
                <div className="d-flex h-100">
                    <SideBar url={this.props.url} history={this.props.history} type={'Programs'} programDetail={programDetail}/>
                    {React.cloneElement(this.props.children, {programDetail: programDetail})}
                </div>
            </React.Fragment>
        )
    }
}

export default ProgramDetail;