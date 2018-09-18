import React from 'react';

class Note extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isEditable: false
        }
        this.editNote = this.editNote.bind(this);
        this.saveNote = this.saveNote.bind(this);
        this.cancelNote = this.cancelNote.bind(this);
    }

    render() {
        const { isEditable } = this.state;
        const { data } = this.props;
        return (
            <li className="list-group-item border-0 px-0">
                { !isEditable && <div className="row">
                    <ul className="action-icons">
                        <li><a href="javascript:;" onClick={() => this.editNote(data.id)}><i className="icon-edit"></i></a></li>
                        <li><a href="javascript:;" data-toggle="modal" data-target="#deleteModal"><i className="icon-delete"></i></a></li>
                    </ul>
                </div>}
                <div className="row">
                    <div className="col">
                        <div className="form-group">
                            <label htmlFor="note">Added by {data.createdBy}</label>
                            { isEditable ? <textarea row="5" className="form-control" id="note" placeholder="Enter Note" value={data.note} />
                            : <p class="readOnlyTextarea">{data.note}</p>}
                        </div>
                    </div>
                </div>
                {isEditable && <div className="row mx-0 justify-content-end footer-actions active">
                    <button className="btn btn-sm" onClick={() => this.cancelNote()}>Cancel</button>
                    <button className="btn btn-sm btn-primary" onClick={() => this.saveNote()}>Save</button>
                </div>}
            </li>
        );
    }

    editNote(id) {
        this.setState({
            isEditable: true
        })
    }

    saveNote(){
        this.setState({
            isEditable: false
        })
    }

    cancelNote(){
        this.setState({
            isEditable: false
        })
    }
}

export default Note;