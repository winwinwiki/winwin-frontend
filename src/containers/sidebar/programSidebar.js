import React from 'react';
import './sidebar.css';
import { Link } from 'react-router-dom';


const subNavOptions = [
    {
        title: 'Basic Info',
        path: ''
    }, {
        title: 'Data Sets',
        path: 'data-sets'
    },{
        title: 'Resources',
        path: 'resources'
    },{
        title: 'Regions Served',
        path: 'regions-served'
    },{
        title: 'SPI Tag',
        path: 'spi-tags'
    },{
        title: 'SDG Tag',
        path: 'sdg-tags'
    }
];

class ProgramSidebar extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            activeSubNav: ''
        }
    }

    componentWillReceiveProps() {
        // console.log(this.props.history.location.pathname);
        
        if(this.props.history.location.pathname.indexOf('data-sets')>-1){
            this.setState({activeSubNav: "data-sets"});
        } else if(this.props.history.location.pathname.indexOf('resources')>-1){
            this.setState({activeSubNav: "resources"});
        } else if(this.props.history.location.pathname.indexOf('regions-served')>-1){
            this.setState({activeSubNav: "regions-served"});
        } else if(this.props.history.location.pathname.indexOf('spi-tags')>-1){
            this.setState({activeSubNav: "spi-tags"});
        } else if(this.props.history.location.pathname.indexOf('sdg-tags')>-1){
            this.setState({activeSubNav: "sdg-tags"});
        } else {
            this.setState({activeSubNav: ""});
        }

    }

    render(){
        return (
            <div id="mySidenav" className="sidenav d-flex flex-column">
            <div className="py-3 d-flex justify-content-between">
                <Link to={this.props.history.location.pathname.replace(/\/programs\/(.)*$/ig,'/programs')}><i className="icon-chevron-left mr-1"></i>
                <h4>{this.props.programDetail.name}</h4></Link>
            </div>
                <ul className="list-group list-group-flush pr-3">
                    <li className="list-group-item">
                        <div>
                            <ul className="subnav">
                                {this.renderSubNavOptions()}
                            </ul>
                        </div>

                    </li>
                </ul>
                <div className="social-footer mt-auto">
                    <ul className="d-flex flex-row justify-content-between pl-1 pr-3">
                        <li><a href="javascript:;"><i className="icon-globe"></i></a></li>
                        <li><a href="javascript:;"><i className="icon-facebook"></i></a></li>
                        <li><a href="javascript:;"><i className="icon-twitter"></i></a></li>
                        <li><a href="javascript:;"><i className="icon-linkedin"></i></a></li>
                        <li><a href="javascript:;"><i className="icon-pinterest"></i></a></li>
                    </ul>
                </div>
            </div>
        )
    }

    renderSubNavOptions(){
        return subNavOptions.map(option => <li onClick={()=>this.setState({activeSubNav:option.path})}><Link className={this.state.activeSubNav === option.path?'active':''} to={option.path ? `${this.props.url.url}/${option.path}`:`${this.props.url.url}`}><i></i>{option.title}</Link></li>)
    }
}


export default ProgramSidebar;

