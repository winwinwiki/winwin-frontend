import React from 'react';
import './sidebar.css';
import { Link } from 'react-router-dom';


const subNavOptions = [
    {
        title: 'Basic Info',
        path: ''
    },{
        title: 'Data Sets',
        path: '/data-sets'
    },{
        title: 'Regions Served',
        path: '/regions-served'
    },{
        title: 'Spi Tag',
        path: '/spi-tags'
    },{
        title: 'Sdg Tag',
        path: '/sdg-tags'
    }
];

class SideBar extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            activeNav: `${props.type} Details`,
            activeSubNav: 'Basic Info'
        }
    }

    render(){
        return (
            <div id="mySidenav" className="sidenav d-flex flex-column">
            {this.props.type === 'Programs' && <div className="py-3 d-flex justify-content-between" onClick={()=>this.props.history.goBack()}>
                <i className="icon-chevron-left mr-1"></i>
                <h4>{this.props.programDetail.name}</h4>
            </div>}
                <ul className="list-group list-group-flush pr-3">
                {this.props.type === 'Organisation' && <li className="list-group-item"><a href="javascript:;" className={this.state.activeNav === 'Basic Information'?'active':''} onClick={()=>this.changeActiveNav('Basic Information')}>Basic Information</a></li>}
                    <li className="list-group-item"><a href="javascript:;" className={this.state.activeNav === `${this.props.type} Details`?'active':''} onClick={()=>this.changeActiveNav(`${this.props.type} Details`)} data-toggle="collapse" href="#collapseExample" role="button" aria-expanded={this.props.type === 'Organisation'? false : true} aria-controls="collapseExample">{this.props.type} Details</a>
                        <div className={this.props.type === 'Organisation'? 'collapse' : 'collapse show' } id="collapseExample">
                            <ul className="subnav">
                                {this.renderSubNavOptions()}
                            </ul>
                        </div>
                    </li>
                    {this.props.type === 'Organisation' && <li className="list-group-item"><Link className={this.state.activeNav === 'Programs'?'active':''} to={`${this.props.url.url}/programs`} onClick={()=>this.changeActiveNav(`Programs`)}>Programs</Link></li>}
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
        return subNavOptions.map(option => <li onClick={()=>this.setState({activeSubNav:option.title})}><Link className={this.state.activeSubNav === option.title?'active':''} to={`${this.props.url.url}${option.path}`}><i></i>{option.title}</Link></li>)
    }

    changeActiveNav(activeNavTitle){
        this.setState({activeNav:activeNavTitle})
    }
}

export default SideBar;

