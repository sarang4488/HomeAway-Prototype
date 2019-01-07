import React, { Component } from "react";
import "../App.css";
import { Route, withRouter, Link } from "react-router-dom";
import cookie from "react-cookies";
import axios from "axios";
import { connect } from "react-redux";
import _ from "lodash";
import { tlogout } from "../actions";
import { Field, reduxForm } from "redux-form";
import { homesearch } from "../actions";
import { Redirect } from "react-router";
var moment = require("moment");

//create the Navbar Component
class Navsearch extends Component {
  constructor(props) {
    super(props);
    this.state = {
      location: "",
      startDate: "",
      endDate: "",
      guests: 0,
      authFlag: false,
      change: false
    };
    this.handleLogout = this.handleLogout.bind(this);
  }

  componentWillMount() {
    this.setState({
      authFlag: false
    });
  }
  // locationChangeHandler = e => {
  //   this.setState({
  //     location: e.target.value
  //   });
  //   console.log(this.state.location);
  // };

  // startDateChangeHandler = e => {
  //   this.setState({
  //     startDate: e.target.value
  //   });
  // };

  // endDateChangeHandler = e => {
  //   this.setState({
  //     endDate: e.target.value
  //   });
  // };

  // guestsChangeHandler = e => {
  //   this.setState({
  //     guests: e.target.value
  //   });
  // };
  renderField(field) {
    const {
      meta: { touched, error }
    } = field;
    const className = `form-group ${touched && error ? "has-danger" : ""}`;

    return (
      <div className={className}>
        <input
          className="form-control"
          type="text"
          {...field.input}
          placeholder="Location"
        />
        <div
          className="text-help"
          style={{
            backgroundColor: "#0067db",
            color: "white",
            textAlign: "center"
          }}
        >
          {touched ? error : ""}
        </div>
      </div>
    );
  }

  renderField1(field) {
    const {
      meta: { touched, error }
    } = field;
    const className = `form-group ${touched && error ? "has-danger" : ""}`;

    return (
      <div className={className}>
        <input
          className="form-control"
          type="date"
          {...field.input}
          placeholder="Check in"
        />
        <div
          className="text-help"
          style={{
            backgroundColor: "#0067db",
            color: "white",
            textAlign: "center"
          }}
        >
          {touched ? error : ""}
        </div>
      </div>
    );
  }

  renderField2(field) {
    const {
      meta: { touched, error }
    } = field;
    const className = `form-group ${touched && error ? "has-danger" : ""}`;

    return (
      <div className={className}>
        <input
          className="form-control"
          type="date"
          {...field.input}
          placeholder="Check out"
        />
        <div
          className="text-help"
          style={{
            backgroundColor: "#0067db",
            color: "white",
            textAlign: "center"
          }}
        >
          {touched ? error : ""}
        </div>
      </div>
    );
  }

  renderField3(field) {
    const {
      meta: { touched, error }
    } = field;
    const className = `form-group ${touched && error ? "has-danger" : ""}`;

    return (
      <div className={className}>
        <input
          className="form-control"
          type="text"
          {...field.input}
          placeholder="Guests"
        />
        <div
          className="text-help"
          style={{
            backgroundColor: "#0067db",
            color: "white",
            textAlign: "center"
          }}
        >
          {touched ? error : ""}
        </div>
      </div>
    );
  }

  // searchHandler = e => {
  //   e.preventDefault();
  //   const data = {
  //     location: this.state.location,
  //     startDate: this.state.startDate,
  //     endDate: this.state.endDate,
  //     guests: this.state.guests
  //   };
  //   console.log(data);
  //   axios.defaults.withCredentials = true;
  //   axios
  //     .post("http://localhost:3001/home", data)
  //     .then(response => {
  //       console.log("Status Code : ", response.status);
  //       console.log(response.data);
  //       if (response.status === 200) {
  //         this.setState({
  //           authFlag: true
  //           //propArray: response.data
  //         });
  //       } else {
  //         this.setState({
  //           authFlag: false
  //         });
  //       }
  //     })
  //     .catch(err => {
  //       this.setState({ error: true });
  //       console.log(err);
  //     });
  // };
  handleLogout = () => {
    this.props.tlogout();
    // cookie.remove("cookie", { path: "/" });
    // cookie.remove("cookie2", { path: "/" });
    // cookie.remove("cookie3", { path: "/" });
  };

  nextpage = e => {
    this.setState({
      change: true
    });
  };
  submitsearch(values) {
    console.log(values);

    this.props.homesearch(values, () => {
      window.location.reload(1);
      //this.props.history.push("/results");
    });
  }
  render() {
    const { handleSubmit } = this.props;
    let redirect = null;
    if (this.state.change) {
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
    }
    var logDrop = (
      <li class="dropdown">
        <a class=" searchlogin dropdown-toggle" data-toggle="dropdown" href="#">
          Login
          <span class="caret" />
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
    console.log(this.props.authFlag);

    if (
      localStorage.getItem("name") &&
      localStorage.getItem("type") == "owner"
    ) {
      logDrop = (
        <li class="dropdown">
          <a
            class=" searchlogin dropdown-toggle"
            data-toggle="dropdown"
            href="#"
            style={{ color: "#0067db" }}
          >
            <span> {localStorage.getItem("name")} </span> <span class="caret" />
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
              <Link to="/account" class="test">
                Account
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
          <a
            class="dropdown-toggle"
            data-toggle="dropdown"
            href="#"
            style={{ color: "#0067db" }}
          >
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
              <img src="images/homeblue.svg" />
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
                <img src="images/iconblue.svg" />
              </a>
            </li>
          </ul>
        </div>
        <form
          className=" navsearch form-inline"
          onSubmit={handleSubmit(this.submitsearch.bind(this))}
        >
          <div className="form-group form-group-lg">
            <Field name="location" component={this.renderField} />
            <Field name="checkin" component={this.renderField1} />
            <Field name="checkout" component={this.renderField2} />
            <Field name="guests" component={this.renderField3} />
            {/* <label className="sr-only" for="location">
              Location
            </label>
            <input
              type="text"
              className="form-control"
              id="location"
              name="location"
              placeholder="Where do you want to go?"
              onChange={this.locationChangeHandler}
            /> */}
          </div>
          {/* <div className="form-group form-group-lg">
            <label className="sr-only" for="startDate">
              Arrival
            </label>
            <input
              type="date"
              className="form-control"
              name="startDate"
              placeholder="Arrive"
              style={{ width: "190px", height: "80px;" }}
              onChange={this.startDateChangeHandler}
            />
          </div>
          <div className="form-group form-group-lg">
            <label className="sr-only" for="endDate">
              Departure
            </label>
            <input
              type="date"
              className="form-control"
              name="endDate"
              placeholder="Depart"
              style={{ width: "190px", height: "80px;" }}
              onChange={this.endDateChangeHandler}
            />
          </div>
          <div className="form-group form-group-lg">
            <label className="sr-only" for="guest">
              Number of Guests
            </label>
            <input
              type="text"
              className="form-control"
              name="guests"
              placeholder="Guests"
              style={{ width: "150px", height: "80px;" }}
              onChange={this.guestsChangeHandler}
            />
          </div> */}
          <button
            type="submit"
            className="btn btn-lg"
            onClick={this.searchHandler}
          >
            Search
          </button>
        </form>
      </nav>
    );
  }
}

function validate(values) {
  const errors = {};
  var date = moment().toDate();
  date = moment(date).format("YYYY-MM-DD");
  console.log(date);
  console.log(values.checkin);

  if (!values.location) {
    errors.location = "Enter Location ";
  }
  if (!values.checkin) {
    errors.checkin = "Enter Checkin Date";
  }
  if (!values.checkout) {
    errors.checkout = "Enter Checkout Date";
  }
  if (!values.guests) {
    errors.guests = "Enter Number of Guests";
  }
  if (values.checkin >= values.checkout) {
    errors.checkout = "Checkout date must be greater than checkin";
  }
  if (values.checkin < date) {
    errors.checkin = "Select a valid date";
  }
  if (values.checkout < date) {
    errors.checkout = "Select a valid date";
  }
  return errors;
}
function mapStateToProps(state) {
  return {
    email: state.login
  };
}
export default reduxForm({
  validate,
  form: "Resultsearch",
  destroyOnUnmount: false,
  forceUnregisterOnUnmount: true,
  keepDirtyOnReinitialize: true
})(
  connect(
    mapStateToProps,
    { tlogout, homesearch }
  )(Navsearch)
);
// export default connect(
//   mapStateToProps,
//   { tlogout }
// )(Navsearch);
//export default Navsearch;
