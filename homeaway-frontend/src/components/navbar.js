import React, { Component } from "react";
import "../App.css";
import { Route, withRouter, Link } from "react-router-dom";
import cookie from "react-cookies";
import { Redirect } from "react-router";
import { connect } from "react-redux";
import _ from "lodash";
import { tlogout } from "../actions";

//create the Navbar Component
class Navbar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      authflag: false
    };
    this.handleLogout = this.handleLogout.bind(this);
  }
  handleLogout = e => {
    this.props.tlogout();

    // cookie.remove("cookie", { path: "/" });
    // cookie.remove("cookie2", { path: "/" });
    // cookie.remove("cookie3", { path: "/" });
  };

  nextpage = e => {
    this.setState({
      authflag: true
    });
  };
  render() {
    let redirect = null;

    if (this.state.authflag) {
      if (localStorage.getItem("type") === "traveller") {
        redirect = (
          <Redirect
            to={{
              pathname: "/traveltoowner"
            }}
          />
        );
      } else if (localStorage.getItem("type") === "owner") {
        redirect = <Redirect to="/uploadproperty" />;
      } else {
        redirect = <Redirect to="/ownerlogin" />;
      }
      // redirect = (
      //   <Redirect
      //     to={{
      //       pathname: "/listyourproperty"
      //     }}
      //   />
      // );
    }

    var logDrop = (
      <li class="dropdown">
        <a class="dropdown-toggle" data-toggle="dropdown" href="#">
          Login <span class="caret" />
        </a>
        <ul class="dropdown-menu">
          <li>
            <button class="btn navbar-btn">
              <Link to="/login" class="test" style={{ textDecoration: "none" }}>
                <span style={{}}>Traveler Login</span>
              </Link>
            </button>
          </li>
          <li>
            <button class="btn navbar-btn">
              <Link to="/ownerlogin" class="test">
                Owner Login{" "}
              </Link>
            </button>
          </li>
        </ul>
      </li>
    );

    if (
      localStorage.getItem("name") &&
      localStorage.getItem("type") == "owner"
    ) {
      //console.log(this.props.email);
      logDrop = (
        <li class="dropdown">
          <a class="dropdown-toggle" data-toggle="dropdown" href="#">
            {localStorage.getItem("name")}
            <span class="caret" />
          </a>
          <ul class="dropdown-menu">
            <li>
              <Link to="/trips" class="test">
                My trips
              </Link>
            </li>
            <li>
              <Link to="/profile" class="test">
                My profile
              </Link>
            </li>
            <li>
              <Link to="/account" class="test">
                Account
              </Link>
            </li>
            <li>
              <Link to="/inbox" class="test">
                Owner Inbox
              </Link>
            </li>
            <li>
              <Link to="/travellerinbox" class="test">
                Inbox
              </Link>
            </li>
            <li>
              <Link to="/ownerdashboard" class="test">
                Dashboard
              </Link>
            </li>
            <li>
              <Link to="/" class="test" onClick={this.handleLogout}>
                Logout
              </Link>
            </li>
          </ul>
        </li>
      );
    }

    if (
      localStorage.getItem("name") &&
      localStorage.getItem("type") == "traveller"
    ) {
      //console.log(this.props.email);
      logDrop = (
        <li class="dropdown">
          <a class="dropdown-toggle" data-toggle="dropdown" href="#">
            {localStorage.getItem("name")}
            <span class="caret" />
          </a>
          <ul class="dropdown-menu">
            <li>
              <Link to="/trips" class="test">
                My trips
              </Link>
            </li>
            <li>
              <Link to="/profile" class="test">
                My profile
              </Link>
            </li>
            <li>
              <Link to="/travellerinbox" class="test">
                Inbox
              </Link>
            </li>
            <li>
              <Link to="/account" class="test">
                Account
              </Link>
            </li>

            <li>
              <Link to="/" class="test" onClick={this.handleLogout}>
                Logout
              </Link>
            </li>
          </ul>
        </li>
      );
    }

    return (
      <nav
        class="navbar navbar-light"
        style={{ backgroundColor: "transparent" }}
      >
        {redirect}
        <div class="container-fluid">
          <div class="navbar-header">
            <a class="navbar-brand" href="#">
              <img src="images/homeaway.svg" />
            </a>
          </div>
          <ul class="nav navbar-nav navbar-right">
            {logDrop}
            <li>
              <button class="btn navbar-btn1" onClick={this.nextpage}>
                List your property
              </button>
            </li>
            <li>
              <a class="logoimage" href="">
                <img src="images/iconmain.svg" />
              </a>
            </li>
          </ul>
        </div>
      </nav>
    );
  }
}
function mapStateToProps(state) {
  return {
    email: state.login
  };
}

export default connect(
  mapStateToProps,
  { tlogout }
)(Navbar);
//export default Navbar;
