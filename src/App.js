import "./App.css";
import { useState, useEffect } from "react";
import axios from "axios";
import SignedInComponents from "./components/SignedInComponents.js";
import NotSignedInComponents from "./components/NotSignedInComponents.js";
import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import CheckUserIsAuthenticated from "./components/CheckUserIsAuthenticated.js";
import { Redirect } from "react-router";

const App = () => {
  const [user, setUser] = useState(String);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(String);
  const [redirect, setRedirect] = useState(false);

  axios.defaults.withCredentials = true;

  useEffect(() => {
    if (redirect) {
      CheckUserIsAuthenticated(setUser, setLoading, setError);
      setRedirect(false);
    }
  }, [redirect]);

  useEffect(() => {
    CheckUserIsAuthenticated(setUser, setLoading, setError);
  }, []);

  return (
    <div>
      {loading ? (
        <i className="fa fa-spinner fa-spin" />
      ) : error ? (
        error && (
          <span style={{ padding: "10px 15px", backgroundColor: "#ff6e6e" }}>
            {error}
          </span>
        )
      ) : (
        <Router>
          <Switch>
            <Route exact path="/">
              {user ? (
                <Redirect to="/user" />
              ) : (
                <Redirect to="/register-login" />
              )}
            </Route>
            <Route path="/register-login">
              {user ? (
                <Redirect to="/user" />
              ) : (
                <NotSignedInComponents redirect={setRedirect} />
              )}
            </Route>
            <Route path="/user">
              {user ? (
                <SignedInComponents user={user} redirect={setRedirect} />
              ) : (
                <Redirect to="/register-login" />
              )}
            </Route>
            <Route path="*">
              <div>
                <h1>No Match</h1>
              </div>
            </Route>
          </Switch>
        </Router>
      )}
    </div>
  );
};

export default App;
