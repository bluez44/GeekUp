import React from "react";

function Loading() {
  return (
    <div className="position-absolute top-0 start-0 end-0 bottom-0 bg-black bg-opacity-25 d-flex flex-column justify-content-center align-items-center">
      <div
        className="spinner-border"
        style={{width: '3rem', height: '3rem'}}
        role="status"
      >
      </div>
      <div className="mt-3">
        <span style={{letterSpacing: '6px'}} className="fs-3">Loading...</span>
      </div>
    </div>
  );
}

export default Loading;
