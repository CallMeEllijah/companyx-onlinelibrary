import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import jwt_decode from "jwt-decode";
import setAuthToken from "./utils/setAuthToken";

import { setCurrentUser, logoutUser } from "./actions/authActions";
import { Provider } from "react-redux";
import store from "./store";

import Navbar from "./components/layout/Navbar";
import Landing from "./components/layout/Landing";
import Register from "./components/auth/Register";
import Login from "./components/auth/Login";
import PrivateRoute from "./components/private-route/PrivateRoute";
import Dashboard from "./components/dashboard/Dashboard";
import Profile from "./components/layout/Profile";
import bookList from "./components/layout/bookList";
import createBook from "./components/books/createBook";
import bookDetails from "./components/books/bookDetails";
import instanceDetails from "./components/books/instanceDetails";

import error404 from "./components/errorpages/error404";
import error429 from "./components/errorpages/error429";
import errorGen from "./components/errorpages/errorGen";
import errorBookInstanceExisting from "./components/errorpages/errorBookInstanceExisting";

import successPass from "./components/successpages/successPass";
import successBookCreate from "./components/successpages/successBookCreate";
import successBookEdit from "./components/successpages/successBookEdit";
import successAddInstance from "./components/successpages/successAddInstance";
import successBookDelete from "./components/successpages/successBookDelete";
import successDeleteInstance from "./components/successpages/successDeleteInstance";
import successAddReview from "./components/successpages/successAddReview";

import "./App.css";

// Check for token to keep user logged in
if (localStorage.jwtToken) {
  // Set auth token header auth
  const token = localStorage.jwtToken;
  setAuthToken(token);
  // Decode token and get user info and exp
  const decoded = jwt_decode(token);
  // Set user and isAuthenticated
  store.dispatch(setCurrentUser(decoded));
  // Check for expired token
  const currentTime = Date.now() / 1000; // to get in milliseconds
  if (decoded.exp < currentTime) {
    // Logout user
    store.dispatch(logoutUser());

    // Redirect to login
    window.location.href = "./landing";
  }
}
class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Router>
          <div className="App">
            <Navbar />
            <Route exact path="/register" component={Register} />
            <Route exact path="/login" component={Login} />

            <Route exact path="/createBook" component={createBook} />
            <Route exact path="/bookList" component={bookList} />
            <Route path="/bookList/book/" component={bookDetails} />
            <Route path="/bookList/instance/" component={instanceDetails} />

            <Route exact path="/errorGen" component={errorGen} />
            <Route exact path="/404" component={error404} />
            <Route exact path="/429" component={error429} />
            <Route exact path="/errorBookDelete" component={errorBookInstanceExisting} />

            <Route exact path="/successPass" component={successPass} />
            <Route exact path="/successBookCreate" component={successBookCreate} />
            <Route exact path="/successBookEdit" component={successBookEdit} />
            <Route exact path="/successBookDelete" component={successBookDelete} />
            <Route exact path="/successAddInstance" component={successAddInstance} />
            <Route exact path="/successDeleteInstance" component={successDeleteInstance} />
            <Route exact path="/successAddReview" component={successAddReview} />

            <Switch>
              <PrivateRoute exact path="/dashboard" component={Dashboard} />
            </Switch>
            <Switch>
              <PrivateRoute exact path="/profile" component={Profile} />
            </Switch>

            <Route exact path="/" component={Landing} />
          </div>
        </Router>
      </Provider>
    );
  }
}
export default App;
