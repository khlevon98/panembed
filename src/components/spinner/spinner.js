import React from 'react';

const Spinner = () => {
  return (
    <div className="valign-wrapper min-h-100 mx-auto">
      <div className="preloader-wrapper m-auto big active">
        <div className="spinner-layer spinner-blue-only">
          <div className="circle-clipper left">
            <div className="circle" />
          </div>
          <div className="gap-patch">
            <div className="circle" />
          </div>
          <div className="circle-clipper right">
            <div className="circle" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Spinner;
