import React from "react";

class DataSetBlock extends React.Component {
  render() {
    const { data } = this.props;
    return (
      <li className="list-group-item px-0">
        <div className="row">
          <ul className="action-icons">
            <li>
              <a
                href="javascript:;"
                data-toggle="modal"
                data-target="#dataSetModal"
                onClick={() => this.props.changeModalData(data.id)}
              >
                <i className="icon-edit" />
              </a>
            </li>
            <li>
              <a
                href="javascript:;"
                data-toggle="modal"
                data-target="#deleteModal"
                onClick={() => this.props.selectedDataSet(data)}
              >
                <i className="icon-delete" />
              </a>
            </li>
          </ul>
        </div>
        <div className="row">
          <div className="col">
            <div className="form-group">
              <label htmlFor="dataSetName">Data Set Name</label>
              <input
                type="text"
                className="form-control"
                id="dataSetName"
                readOnly="readOnly"
                placeholder="Enter Category"
                value={
                  data.organizationDataSetCategory &&
                  data.organizationDataSetCategory.categoryName
                }
              />
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col">
            <div className="form-group">
              <label htmlFor="description">Description</label>
              <textarea
                className="form-control"
                name=""
                id="description"
                readOnly="readOnly"
                rows="5"
                value={data.description}
              />
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col">
            <div className="form-group">
              <label htmlFor="type">Type</label>
              <br />
              <div
                className="btn-group btn-group-toggle mb-4"
                id="type"
                data-toggle="buttons"
              >
                <label
                  className={`btn btn-outline-secondary disabled ${
                    data.type == "open" ? "selected" : ""
                  }`}
                >
                  <input
                    type="radio"
                    name="options"
                    id="openType"
                    autoComplete="off"
                    disabled
                    checked={data.type == "open" ? true : false}
                  />{" "}
                  Open
                </label>
                <label
                  className={`btn btn-outline-secondary disabled ${
                    data.type == "closed" ? "selected" : ""
                  }`}
                >
                  <input
                    type="radio"
                    name="options"
                    id="closedType"
                    autoComplete="off"
                    disabled
                    checked={data.type == "closed" ? true : false}
                  />{" "}
                  Closed
                </label>
              </div>
            </div>
          </div>
          {data.type === "open" ? (
            <div className="col">
              <div className="form-group">
                <label htmlFor="url">URL</label>
                <input
                  type="text"
                  className="form-control"
                  id="url"
                  readOnly="readOnly"
                  placeholder="Website URL"
                  value={data.url}
                />
              </div>
            </div>
          ) : (
            ""
          )}
        </div>
      </li>
    );
  }
}

export default DataSetBlock;
