import React from 'react';
import { Breadcrumbs } from 'react-breadcrumbs';

class SectionHeader extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <section className="dashboard-header">
                <div className="page-header border-bottom pb-2">
                    <Breadcrumbs className="app-breadcrumb"/>
                </div>
            </section>
        )
    }

}


export default SectionHeader;
