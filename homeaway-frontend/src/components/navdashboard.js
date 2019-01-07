import React, { Component } from "react";
import "../App.css";
import { Route, withRouter, Link } from "react-router-dom";
import cookie from "react-cookies";
import axios from "axios";
import { connect } from "react-redux";
import _ from "lodash";
import { tlogout } from "../actions";

//create the Navbar Component
class NavDashboard extends Component {
  constructor(props) {
    super(props);
  }

  handleLogout = () => {
    this.props.tlogout();
  };
  render() {
    // var logDrop = (
    //   <li class="dropdown">
    //     <a class=" searchlogin dropdown-toggle" data-toggle="dropdown" href="#">
    //       Login
    //       <span class="caret" />
    //     </a>
    //     <ul class="dropdown-menu">
    //       <li>
    //         <button class="btn navbar-btn">
    //           <Link to="/login" class="test" style={{ textDecoration: "none" }}>
    //             <span style={{}}>Traveler Login</span>
    //           </Link>
    //         </button>
    //       </li>
    //       <li>
    //         <button class="btn navbar-btn">
    //           <Link to="/register" class="test">
    //             Owner Login{" "}
    //           </Link>
    //         </button>
    //       </li>
    //     </ul>
    //   </li>
    // );
    // console.log(this.props.authFlag);

    //if (cookie.load("cookie")) {
    var logDrop = (
      <li class="dropdown">
        <a class=" searchlogin dropdown-toggle" data-toggle="dropdown" href="#">
          {localStorage.getItem("name")} <span class="caret" />
        </a>
        <ul class="dropdown-menu">
          <li>
            <Link to="/uploadproperty" class="test">
              Add New Property
              {/* {window.location.reload(1)} */}
            </Link>
          </li>
          <li>
            <Link to="/ownerdashboard" class="test">
              Owner Dashboard
            </Link>
          </li>
          <li>
            <Link to="/trips" class="test">
              My trips
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
            <Link to="/profile" class="test">
              My profile
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
    //}

    return (
      <nav
        class="navbar navbar-light"
        style={{ backgroundColor: "transparent" }}
      >
        <div class="container-fluid">
          <div class="navbar-header">
            <a class="navbar-brand" href="#">
              <img src="images/homeblue.svg" />
            </a>
          </div>
          <ul class="nav navbar-nav navbar-right">
            {logDrop}

            <li>
              <a class="logoimage" href="">
                <img src="images/iconblue.svg" />
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
)(NavDashboard);
