import React, { useEffect } from "react";
import { initializeLogger } from "common/logger";

const App = () => {
  useEffect(() => {
    initializeLogger();
    logger.info("Log from js logger");
  }, []);

  return <h1 className="bg-blue-900">This is app</h1>;
};

export default App;
