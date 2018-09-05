import React from 'react';

const ResourceBlock = (props) => {
    const {data} = props;
    return (
        <li className="list-group-item px-0">
            <div className="row">
                <ul className="action-icons">
                    <li><a href="javascript:;" data-toggle="modal" data-target="#resourceModal" onClick={()=>props.changeModalData(data.id)}><i className="icon-edit"></i></a></li>
                    <li><a href="javascript:;" data-toggle="modal" data-target="#deleteModal"><i className="icon-delete"></i></a></li>
                </ul>
            </div>
            <div className="row">
                <div className="col">
                    <div className="form-group">
                        <label htmlFor="category">Category</label>
                        <input type="text" className="form-control" id="category" readOnly="readOnly" placeholder="Enter Category" value={data.category} />
                    </div>
                </div>
                <div className="col">
                    <div className="form-group">
                        <label htmlFor="count">Count</label>
                        <input type="text" className="form-control" id="count" readOnly="readOnly" placeholder="Count" value={data.count} />
                    </div>
                </div>
            </div>
            <div className="row">
                <div className="col">
                    <div className="form-group">
                        <label htmlFor="description">Description</label>
                        <textarea className="form-control" name="" id="description" readOnly="readOnly" rows="5" value={data.description}></textarea>
                    </div>
                </div>
            </div>
        </li>
    )
}

export default ResourceBlock;