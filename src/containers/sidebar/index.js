import React from 'react';
import './sidebar.css';
import { Link } from 'react-router-dom';


const subNavOptions = [
    {
        title: 'Data Sets',
        path: 'data-sets'
    },{
        title: 'Resources',
        path: 'resources'
    },{
        title: 'Regions Served',
        path: 'regions-served'
    },{
        title: 'Spi Tag',
        path: 'spi-tags'
    },{
        title: 'Sdg Tag',
        path: 'sdg-tags'
    }
];

class SideBar extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            activeNav: props.type === 'Organisation' ?(props.history.action === "PUSH"?'':'programs'): `${props.type}-details`,
            activeSubNav: props.type === 'Organisation'? 'data-sets': ''
        }
    }

    componentWillReceiveProps() {
        // console.log(this.props.history.location.pathname);

        if(this.props.type == "Organisation"){
            if(this.props.history.location.pathname.indexOf('programs')>-1){
                this.setState({activeNav: "programs", activeSubNav: ""});
            } else if(this.props.history.location.pathname.indexOf('data-sets')>-1){
                this.setState({activeNav: `${this.props.type}-details`});
            } else {
                this.setState({activeNav: "", activeSubNav: ""});
            }
        }
        if(this.props.type == "Programs"){
            this.setState({activeNav: `${this.props.type}-detials`});
        }

        if(this.props.history.location.pathname.indexOf('data-sets')>-1){
            this.setState({activeNav: `${this.props.type}-details`, activeSubNav: "data-sets"});
        } else if(this.props.history.location.pathname.indexOf('resources')>-1){
            this.setState({activeNav: `${this.props.type}-details`, activeSubNav: "resources"});
        } else if(this.props.history.location.pathname.indexOf('regions-served')>-1){
            this.setState({activeNav: `${this.props.type}-details`, activeSubNav: "regions-served"});
        } else if(this.props.history.location.pathname.indexOf('spi-tags')>-1){
            this.setState({activeNav: `${this.props.type}-details`, activeSubNav: "spi-tags"});
        } else if(this.props.history.location.pathname.indexOf('sdg-tags')>-1){
            this.setState({activeNav: `${this.props.type}-details`, activeSubNav: "sdg-tags"});
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

                    {this.props.type === 'Organisation' && <li className="list-group-item"><Link className={this.state.activeNav === ''?'active':''} onClick={()=>{this.changeActiveNav(''); this.setState({activeSubNav:''})}} to={`${this.props.url.url}`}>Basic Information</Link></li>}
                    
                    <li className="list-group-item">
                        {this.props.type === 'Organisation' && <a href="javascript:;" className={this.state.activeNav === `${this.props.type}-details`?'active':''} onClick={()=>{this.changeActiveNav(`${this.props.type}-details`); this.setState({activeSubNav:''})}} data-target="#collapseExample" data-toggle="collapse" aria-expanded="false" aria-controls="collapseExample">Organisation Details</a>}
                        {this.props.type === 'Programs' && <Link to={`${this.props.url.url}`} className={this.state.activeNav === `${this.props.type}-details`?'active':''} onClick={()=>this.changeActiveNav(`${this.props.type}-details`)} data-target="#collapseExample" data-toggle="collapse" aria-expanded="true" aria-controls="collapseExample">Programs Details</Link>}
                        
                        <div className={this.props.type === 'Organisation'? 'collapse' : 'collapse show' } id="collapseExample">
                            <ul className="subnav">
                                {this.renderSubNavOptions()}
                            </ul>
                        </div>

                    </li>
                    {this.props.type === 'Organisation' && <li className="list-group-item"><Link className={this.state.activeNav === 'programs'?'active':''} to={`${this.props.url.url}/programs`} onClick={()=>{this.changeActiveNav(`Programs`); this.setState({activeSubNav:''})}}>Programs</Link></li>}
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
        return subNavOptions.map(option => <li onClick={()=>this.setState({activeSubNav:option.path})}><Link className={this.state.activeSubNav === option.path?'active':''} to={`${this.props.url.url}/${option.path}`}><i></i>{option.title}</Link></li>)
    }

    changeActiveNav(activeNavTitle){
        this.setState({activeNav:activeNavTitle})
    }
}

export default SideBar;

