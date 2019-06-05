import React from "react";
import Dropzone from "react-dropzone";

const Upload = props => {
  const { type, accept, onDrop, text } = props;
  let dropzoneRef;
  return (
    <div className="file-dragger-box my-3">
      <Dropzone
        style={{}}
        ref={node => {
          dropzoneRef = node;
        }}
        accept={accept}
        onDrop={onDrop}
      >
        <div className="d-flex">
          {type === "file" && (
            <i className="icon-upload mr-3 f-36 font-weight-bold text-primary" />
          )}
          <div>
            {type === "file" && (
              <p className="mb-0 f-18 text-primary">
                {"Drag and drop file here"}
              </p>
            )}
            <small className="text-muted">{text}</small>
          </div>
        </div>
      </Dropzone>
      {type === "file" && <small className="text-muted px-2">or</small>}
      {type === "file" && (
        <button
          type="button"
          className="btn btn-outline-primary button-browse px-4 ml-3"
          onClick={() => {
            dropzoneRef.open();
          }}
        >
          Browse
        </button>
      )}
    </div>
  );
};

export default Upload;
