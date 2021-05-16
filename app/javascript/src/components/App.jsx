import React, { useState, useEffect, useLayoutEffect, useMemo } from "react";
import { initializeLogger } from "common/logger";
import { requestIntercepts } from "apis/axios";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import auth from "apis/auth";
import Login from "components/Auth/Login";
import Home from "components/Home/Home";
import CreateQuiz from "components/Quiz/CreateQuiz";
import UpdateQuiz from "components/Quiz/UpdateQuiz";
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
      <Route path="/quizzes/:id/edit" exact component={UpdateQuiz}></Route>
    </Switch>
  );
}
export default App;
