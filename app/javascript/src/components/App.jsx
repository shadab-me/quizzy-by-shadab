import React, { useState, useEffect, useLayoutEffect, useMemo } from "react";
import { initializeLogger } from "common/logger";
import { requestIntercepts } from "apis/axios";
import { ToastContainer } from "react-toastify";
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
import UpdateQuestion from "components/Question/UpdateQuestion";
import NoMatch from "components/Common/NoMatch";

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
    getCurrentUser();
    logger.info("Log from js logger");
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
      <Route path="/public" component={() => <h1>This is public login</h1>} />
      <Route path="/public/*" component={() => <h1>This is public login</h1>} />
      <Route path="/*" component={Login} />
    </Switch>
  );
}

function AuthRoutes() {
  return (
    <Switch>
      <Route exact path="/">
        <Redirect to="/dashboard" />
      </Route>
      <Route path="/dashboard" exact component={Quizzes}></Route>
      <Route path="/quiz/new" exact component={CreateQuiz}></Route>
      <Route path="/edit/quiz/:id" exact component={UpdateQuiz}></Route>
      <Route path="/quiz/:id" exact component={SingleQuiz}></Route>
      <Route path="/:id/question/new" exact component={CreateQuestion}></Route>
      <Route path="/edit/question/:id" exact component={UpdateQuestion}></Route>
      <Route
        path="/public/:id/:slug"
        exact
        component={() => <h1>This single </h1>}
      ></Route>
      <Route path="/*" component={NoMatch} />
    </Switch>
  );
}
export default App;
