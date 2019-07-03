import React from "react";
import { Link } from "react-router-dom";

const subNavOptions = [
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
  // {
  //     title: 'New Page',
  //     path: 'new-page'
  // }
];

class SideBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      activeNav:
        props.history.location.pathname.indexOf("programs") > -1 ||
        props.history.location.pathname.indexOf("new-program") > -1
          ? "programs"
          : props.history.location.pathname.indexOf("organization-chart") > -1
          ? "organization-chart"
          : "",
      activeSubNav: ""
    };
  }

  componentWillReceiveProps() {
    const { history } = this.props;
    let pathname = history.location.pathname;

    if (
      pathname.indexOf("programs") > -1 ||
      pathname.indexOf("new-program") > -1
    ) {
      this.setState({ activeNav: "programs", activeSubNav: "" });
    } else if (pathname.indexOf("notes") > -1) {
      this.setState({ activeNav: "notes", activeSubNav: "" });
    } else if (pathname.indexOf("organization-chart") > -1) {
      this.setState({ activeNav: "organization-chart", activeSubNav: "" });
    } else if (pathname.indexOf("data-sets") > -1) {
      this.setState({ activeNav: `${this.props.type}-details` });
    } else {
      this.setState({ activeNav: "", activeSubNav: "" });
    }

    if (pathname.indexOf("data-sets") > -1) {
      this.setState({
        activeNav: `${this.props.type}-details`,
        activeSubNav: "data-sets"
      });
    } else if (pathname.indexOf("resources") > -1) {
      this.setState({
        activeNav: `${this.props.type}-details`,
        activeSubNav: "resources"
      });
    } else if (pathname.indexOf("regions-served") > -1) {
      this.setState({
        activeNav: `${this.props.type}-details`,
        activeSubNav: "regions-served"
      });
    } else if (pathname.indexOf("spi-tags") > -1) {
      this.setState({
        activeNav: `${this.props.type}-details`,
        activeSubNav: "spi-tags"
      });
    } else if (pathname.indexOf("sdg-tags") > -1) {
      this.setState({
        activeNav: `${this.props.type}-details`,
        activeSubNav: "sdg-tags"
      });
    } else if (pathname.indexOf("new-page") > -1) {
      this.setState({
        activeNav: `${this.props.type}-details`,
        activeSubNav: "new-page"
      });
    }
  }

  render() {
    const { activeNav } = this.state;
    const { type, match } = this.props;
    return (
      <div id="mySidenav" className="sidenav d-flex flex-column">
        <ul className="list-group list-group-flush pr-3">
          <li className="list-group-item">
            <Link
              className={activeNav === "" ? "active" : ""}
              onClick={() => {
                this.changeActiveNav("");
                this.setState({ activeSubNav: "" });
              }}
              to={`${match.url}`}
            >
              Basic Information
            </Link>
          </li>
          <li className="list-group-item">
            <Link
              className={activeNav === "organization-chart" ? "active" : ""}
              onClick={() => {
                this.changeActiveNav("organization-chart");
                this.setState({ activeSubNav: "" });
              }}
              to={`${match.url}/organization-chart`}
            >
              Organization Chart
            </Link>
          </li>
          <li className="list-group-item">
            <a
              href="javascript:;"
              className={activeNav === `${type}-details` ? "active" : ""}
              onClick={() => {
                this.changeActiveNav(`${this.props.type}-details`);
                this.setState({ activeSubNav: "" });
              }}
              data-target="#collapseExample"
              data-toggle="collapse"
              aria-expanded="false"
              aria-controls="collapseExample"
            >
              Organization Details
            </a>

            <div className="collapse" id="collapseExample">
              <ul className="subnav">{this.renderSubNavOptions()}</ul>
            </div>
          </li>
          <li className="list-group-item">
            <Link
              className={activeNav === "programs" ? "active" : ""}
              to={`${match.url}/programs`}
              onClick={() => {
                this.changeActiveNav(`programs`);
                this.setState({ activeSubNav: "" });
              }}
            >
              Programs
            </Link>
          </li>
          <li className="list-group-item">
            <Link
              className={activeNav === "notes" ? "active" : ""}
              to={`${match.url}/notes`}
              onClick={() => {
                this.changeActiveNav(`notes`);
                this.setState({ activeSubNav: "" });
              }}
            >
              Notes
            </Link>
          </li>
        </ul>
      </div>
    );
  }

  renderSubNavOptions() {
    const { activeSubNav } = this.state;
    const { match } = this.props;
    return subNavOptions.map(option => (
      <li
        onClick={() => this.setState({ activeSubNav: option.path })}
        key={option.path}
      >
        <Link
          className={activeSubNav === option.path ? "active" : ""}
          to={`${match.url}/${option.path}`}
        >
          <i />
          {option.title}
        </Link>
      </li>
    ));
  }

  changeActiveNav(activeNavTitle) {
    this.setState({ activeNav: activeNavTitle });
  }
}

export default SideBar;
