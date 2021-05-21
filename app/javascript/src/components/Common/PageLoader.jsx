import React from "react";

import "../../../stylesheets/loader.scss";
const PageLoader = () => {
  return (
    <div className="flex h-screen justify-center items-center">
      <div className="spinner"></div>
    </div>
  );
};

export default PageLoader;
