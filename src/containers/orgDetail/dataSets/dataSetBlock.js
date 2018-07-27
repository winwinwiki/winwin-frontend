import React from 'react';

const DataSetBlock = (props) => {
    return (
        <form>
            <div className="form-group">
                <label htmlFor="category">Category</label>
                <input type="text" className="form-control" id="category" placeholder="Enter Category" value="Community Involvement Data" />
            </div>
            <div className="form-group">
                <label htmlFor="description">Description</label>
                <textarea className="form-control" name="" id="description" rows="5">The Organization is dedicated to the community to provide a variety of challenging and newartistic programming through its school of the arts, dance studio, adult and children's performance programming, special events, and education</textarea>
            </div>
            <div className="form-group">
                <div className="row">
                    <div className="col">
                        <label htmlFor="description">Type</label><br />
                        <div className="btn-group btn-group-toggle mb-4" data-toggle="buttons">
                            <label className="btn btn-outline-secondary">
                                <input type="radio" name="options" id="normal" autoComplete="off" /> Open
                                      </label>
                            <label className="btn btn-outline-secondary">
                                <input type="radio" name="options" id="high" autoComplete="off" /> Closed
                                      </label>
                        </div>
                    </div>
                    <div className="col">
                        <div className="form-group">
                            <label htmlFor="category">URL</label>
                            <input type="text" className="form-control" id="category" placeholder="Website URL" value="www.xyzabc.com" />
                        </div>
                    </div>
                </div>
            </div>
        </form>
    )
}

export default DataSetBlock;