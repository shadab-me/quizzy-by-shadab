import React, { useState, useEffect, useLayoutEffect, useMemo } from "react";
import { initializeLogger } from "common/logger";
import { requestIntercepts } from "apis/axios";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import auth from "apis/auth";
import Login from "components/auth/Login";
import Home from "components/home/Home";
import CreateQuiz from "components/quiz/CreateQuiz";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from "react-router-dom";
import Header from "components/common/Header";
import { func } from "prop-types";
import Quizzes from "components/quiz/Quizzes";

const App = () => {
  let [isLoggedIn, setLogged] = useState(false);
  let [currentUser, setCurrentUser] = useState({});

  const getCurrentUser = async () => {
    let user = await auth.logged();
    setLogged(user.data.logged);
    setCurrentUser(user.data.user);
  };

  useEffect(() => {
    initializeLogger();
    requestIntercepts();
    logger.info("Log from js logger");
    getCurrentUser();
  }, []);

  return (
    <Router>
      <Header isLoggedIn={isLoggedIn} currentUser={currentUser} />
      <ToastContainer />
      {isLoggedIn ? <AuthRoutes /> : <UnAuthRoutes />}
    </Router>
  );
};

function UnAuthRoutes() {
  return (
    <Switch>
      <Route path="/" exact component={Home}></Route>
      <Route path="/login" component={Login} />
    </Switch>
  );
}

function AuthRoutes() {
  return (
    <Switch>
      <Route path="/" exact component={Quizzes}></Route>
      <Route path="/create" exact component={CreateQuiz}></Route>
    </Switch>
  );
}
export default App;
