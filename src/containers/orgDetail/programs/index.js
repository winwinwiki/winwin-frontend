import React from 'react';
import { push } from 'react-router-redux';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import {fetchProgramsList} from '../../actions/program/programListAction';

class ProgramList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            programList: []
        }
        this.changePage = this.changePage.bind(this);
    }

    componentDidMount() {
        this.props.fetchProgramsList(this.props.url.params.id);
    }

    componentWillReceiveProps(nextProps) {
        if(JSON.stringify(nextProps.programList) !== JSON.stringify(this.props.programList) ) {
            this.setState({
                programList: nextProps.programList
            });
        }
    }

    render() {
        const { programList } = this.state;
        const {isFetchProgramSuccess} = this.props;
        if(!isFetchProgramSuccess || !programList) {
          //  return null;
        }
        return (
        <section className="dashboard-content p-0">
            {this.props.children}
        </section>
        )
    }

    changePage(programId) {
        this.props.changePage(programId);
    }

}

const mapStateToProps = state => ({
    isFetchProgramPending: state.programList.isFetchProgramPending,
    isFetchProgramSuccess: state.programList.isFetchProgramSuccess,
    fetchProgramError: state.programList.fetchProgramError,
    programList: state.programList.programList
})

const mapDispatchToProps = dispatch => bindActionCreators({
    changePage: (id) => push('/programs/'+ id),
    fetchProgramsList
}, dispatch)

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ProgramList);