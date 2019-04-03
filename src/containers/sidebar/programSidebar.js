import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";

const subNavOptions = [
  {
    title: "Basic Info",
    path: ""
  },
  {
    title: "Data Sets",
    path: "data-sets"
  },
  {
    title: "Resources",
    path: "resources"
  },
  {
    title: "Regions Served",
    path: "regions-served"
  },
  {
    title: "SPI Tag",
    path: "spi-tags"
  },
  {
    title: "SDG Tag",
    path: "sdg-tags"
  }
];

class ProgramSidebar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      activeSubNav: ""
    };
  }

  componentWillReceiveProps() {
    const { history } = this.props;
    let pathname = history.location.pathname;
    if (pathname.indexOf("data-sets") > -1) {
      this.setState({ activeSubNav: "data-sets" });
    } else if (pathname.indexOf("resources") > -1) {
      this.setState({ activeSubNav: "resources" });
    } else if (pathname.indexOf("regions-served") > -1) {
      this.setState({ activeSubNav: "regions-served" });
    } else if (pathname.indexOf("spi-tags") > -1) {
      this.setState({ activeSubNav: "spi-tags" });
    } else if (pathname.indexOf("sdg-tags") > -1) {
      this.setState({ activeSubNav: "sdg-tags" });
    } else {
      this.setState({ activeSubNav: "" });
    }
  }

  render() {
    const { programDetail, history } = this.props;
    if (!programDetail || !programDetail.data) {
      return null;
    }
    return (
      <div id="mySidenav" className="sidenav d-flex flex-column">
        <div className="py-3 d-flex justify-content-between">
          <Link
            className="d-flex"
            to={history.location.pathname.replace(
              /\/programs\/(.)*$/gi,
              "/programs"
            )}
          >
            <i className="icon-chevron-left mr-1" />
            <h4>{programDetail.data.response.name}</h4>
          </Link>
        </div>
        <ul className="list-group list-group-flush pr-3">
          <li className="list-group-item">
            <div>
              <ul className="subnav">{this.renderSubNavOptions()}</ul>
            </div>
          </li>
        </ul>
        <div className="social-footer mt-auto">
          <ul className="d-flex flex-row justify-content-between pl-1 pr-3">
            <li>
              <a href="javascript:;">
                <i className="icon-globe" />
              </a>
            </li>
            <li>
              <a href="javascript:;">
                <i className="icon-facebook" />
              </a>
            </li>
            <li>
              <a href="javascript:;">
                <i className="icon-twitter" />
              </a>
            </li>
            <li>
              <a href="javascript:;">
                <i className="icon-linkedin" />
              </a>
            </li>
            <li>
              <a href="javascript:;">
                <i className="icon-pinterest" />
              </a>
            </li>
          </ul>
        </div>
      </div>
    );
  }

  renderSubNavOptions() {
    return subNavOptions.map(option => (
      <li
        onClick={() => this.setState({ activeSubNav: option.path })}
        key={option.path}
      >
        <Link
          className={this.state.activeSubNav === option.path ? "active" : ""}
          to={
            option.path
              ? `${this.props.match.url}/${option.path}`
              : `${this.props.match.url}`
          }
        >
          <i />
          {option.title}
        </Link>
      </li>
    ));
  }
}

const mapStateToProps = state => ({
  programDetail: state.programDetail
});

export default connect(
  mapStateToProps,
  null
)(ProgramSidebar);
