import React, { useEffect } from "react";
import { initializeLogger } from "common/logger";
import Login from "components/auth/Login";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from "react-router-dom";
import Header from "./Header";

const App = () => {
  useEffect(() => {
    initializeLogger();
    logger.info("Log from js logger");
  }, []);

  return (
    <Router>
      <Header />
      <UnAuthRoutes />
    </Router>
  );
};

function UnAuthRoutes() {
  return (
    <Switch>
      <Route path="/login" component={Login} />
    </Switch>
  );
}

export default App;
