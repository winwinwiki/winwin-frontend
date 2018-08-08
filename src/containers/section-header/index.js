import React from 'react';
import { connect } from 'react-redux';
import './section-header.css';
import { Link } from 'react-router-dom';

class SectionHeader extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            appNavigation: []
        }
    }

    componentWillReceiveProps(nextProps) {
        if(JSON.stringify(nextProps.appNavigation) !== JSON.stringify(this.props.appNavigation) ) {
            this.setState({
                appNavigation: nextProps.appNavigation
            });
        }
    }

    render() {
        const { appNavigation } = this.state;
        if(!appNavigation) {
           return null;
        }
        return (
            <section className="dashboard-header">
                <div className="page-header border-bottom pb-2">
                    <nav aria-label="breadcrumb">
                        <ol class="breadcrumb">
                            {this.getAppNavigation(appNavigation)}
                        </ol>
                    </nav>
                </div>
            </section>
        )
    }

    getAppNavigation(appNavigation){
        return appNavigation.map((item, index, arr) => <li class={`breadcrumb-item ${index == (arr.length-1)? 'active': ''}`} key={index}><Link to={item.path}>{item.title}</Link></li>);
    }
}

const mapStateToProps = state => ({
    appNavigation: state.sectionHeader.appNavigation
});

export default connect(
    mapStateToProps,
    null
)(SectionHeader);
