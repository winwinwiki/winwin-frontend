import React from 'react';
import Dropzone from 'react-dropzone';

const Upload = (props) => {
    let dropzoneRef;
    return (
        <div className="file-dragger-box my-3">
            <Dropzone style={{}} ref={(node) => { dropzoneRef = node; }}
                accept=".csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel"
                onDrop={props.onDrop}>
                <div className="d-flex pr-4">
                    <i className="icon-upload mr-3 f-36 font-weight-bold text-primary" />
                    <div>
                        <p className="mb-0 f-18 text-primary">{'Drag and drop file here'}</p>
                        <small className="text-muted">.csv or .xls files only</small>
                    </div>
                </div>
            </Dropzone>
            <small className="text-muted px-2">or</small>
            <button type="button" className="btn btn-outline-primary button-browse px-4 ml-3" onClick={() => { dropzoneRef.open() }}>
                Browse
            </button>
        </div>
    )
}

export default Upload;