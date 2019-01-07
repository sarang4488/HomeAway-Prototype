import React, { Component } from "react";
import { Route } from "react-router-dom";
import Register from "./register";
import Login from "./login";
import Navbar from "./navbar";
import Home from "./home";
import Navowner from "./navowner";
import Listyourproperty from "./listyourproperty";
import Navlogin from "./navlogin";
import Welcome from "./welcome";
import Results from "./results";
import UploadProperty from "./uploadproperty";
import Property from "./property";
import Profile from "./editprofile";
import Account from "./updateaccount";
import SignupOwner from "./signupowner";
import LoginOwner from "./loginowner";
import TraveltoOwner from "./traveltoowner";
import OwnerDashboard from "./ownerdashboard";
import MyTrips from "./trips";
import { createStore, applyMiddleware, compose } from "redux";
import { Provider } from "react-redux";
import Inbox from "./inbox";
import TravellerInbox from "./travellerInbox";

import RootReducer from "../reducers";

import promise from "redux-promise";

// //middleware settings
// // To resolve promise to store we use apply
const composePlugin = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const createStoreWithMiddleware = applyMiddleware(promise)(createStore);
export const store = createStore(
  RootReducer,
  composePlugin(applyMiddleware(promise))
);

class Main extends Component {
  render() {
    return (
      <Provider store={store}>
        <div>
          <Route exact path="/" component={Home} />
          <Route exact path="/navbar" component={Navbar} />
          <Route exact path="/login" component={Login} />
          <Route exact path="/register" component={Register} />
          <Route exact path="/navowner" component={Navowner} />
          <Route exact path="/listyourproperty" component={Listyourproperty} />
          <Route exact path="/navlogin" component={Navlogin} />
          <Route exact path="/welcome" component={Welcome} />
          <Route exact path="/uploadproperty" component={UploadProperty} />
          <Route exact path="/results" component={Results} />
          <Route exact path="/property" component={Property} />
          <Route exact path="/profile" component={Profile} />
          <Route exact path="/account" component={Account} />
          <Route exact path="/signupowner" component={SignupOwner} />
          <Route exact path="/ownerlogin" component={LoginOwner} />
          <Route exact path="/traveltoowner" component={TraveltoOwner} />
          <Route exact path="/ownerdashboard" component={OwnerDashboard} />
          <Route exact path="/trips" component={MyTrips} />
          <Route exact path="/inbox" component={Inbox} />
          <Route exact path="/travellerinbox" component={TravellerInbox} />
        </div>
      </Provider>
    );
  }
}

export default Main;
