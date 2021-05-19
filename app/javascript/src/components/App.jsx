import React, { useState, useEffect, useLayoutEffect, useMemo } from "react";
import { initializeLogger } from "common/logger";
import { requestIntercepts } from "apis/axios";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import auth from "apis/auth";
import Login from "components/Auth/Login";
import CreateQuiz from "components/Quiz/CreateQuiz";
import UpdateQuiz from "components/Quiz/UpdateQuiz";
import SingleQuiz from "components/Quiz/SingleQuiz";
import CreateQuestion from "components/Question/CreateQuestion";

import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from "react-router-dom";
import Header from "components/Common/Header";
import Quizzes from "components/Quiz/Quizzes";
import PageLoader from "components/Common/PageLoader";

const App = () => {
  let [loading, setLoading] = useState(true);
  let [isLoggedIn, setLogged] = useState(false);
  let [currentUser, setCurrentUser] = useState({});

  const getCurrentUser = async () => {
    let user = await auth.logged();
    setLogged(user.data.logged);
    setCurrentUser(user.data.user);
    setLoading(false);
  };

  useEffect(() => {
    initializeLogger();
    requestIntercepts();
    logger.info("Log from js logger");
    getCurrentUser();
  }, []);

  if (loading) return <PageLoader />;

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
      <Route path="/" exact component={Login}></Route>
      <Route path="/login" component={Login} />
    </Switch>
  );
}

function AuthRoutes() {
  return (
    <Switch>
      <Route path="/" exact component={Quizzes}></Route>
      <Route path="/create" exact component={CreateQuiz}></Route>
      <Route path="/quizzes/:id/edit" exact component={UpdateQuiz}></Route>
      <Route path="/quizzes/:id" exact component={SingleQuiz}></Route>
      <Route path="/:id/question/new" exact component={CreateQuestion}></Route>
    </Switch>
  );
}
export default App;
