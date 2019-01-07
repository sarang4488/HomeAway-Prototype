import React, { Component } from "react";
import Navbar from "./navbar";
import axios from "axios";
import Footer from "./footer";
import cookie from "react-cookies";
import { Redirect } from "react-router";
import { Field, reduxForm } from "redux-form";
import { connect } from "react-redux";
import { homesearch } from "../actions";
import { store } from "./main";
import DateTime from "react-datetime";
var moment = require("moment");
class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      location: "",
      startDate: "",
      endDate: "",
      guests: "",
      authlag: "false",
      error: "false"
      // propArray:[]
    };

    //Bind the handlers to this class
    // this.locationChangeHandler = this.locationChangeHandler.bind(this);
    // this.startDateChangeHandler = this.startDateChangeHandler.bind(this);
    // this.endDateChangeHandler = this.endDateChangeHandler.bind(this);
    // this.guestsChangeHandler = this.guestsChangeHandler.bind(this);
    // this.searchHandler = this.searchHandler.bind(this);
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
  //     .post("http://localhost:3001/homesearch", data)
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
          type="number"
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

  submitsearch(values) {
    console.log(values);
    values.test = "abc";

    this.props.homesearch(values, () => {
      this.props.history.push("/results");
    });
  }

  render() {
    const { handleSubmit } = this.props;
    let redirectVar = null;
    // if (this.state.authFlag) {
    //   this.props.history.push({
    //     pathname: "/results"
    //   });
    // }

    let navbar = <Navbar navdata={this.props.navdata} />;

    return (
      <React.Fragment>
        <header id="big" className="home">
          {navbar}
          <div className="quotes">
            <h1 className="heading">
              Book beach houses,cabins,
              <br />
              condos and more,worldwide
            </h1>
          </div>
          <form
            onSubmit={handleSubmit(this.submitsearch.bind(this))}
            className="form-inline"
          >
            {/* <div className="form-group form-group-lg">
              <Field name="location" component={this.renderField} />
              <Field name="checkin" component={this.renderField1} />
              <Field name="checkout" component={this.renderField2} />
              <Field name="guests" component={this.renderField3} />
            </div> */}

            {/* <button type="submit" className="btn btn-lg">
              Search
            </button> */}
          </form>

          <div class=" homerow row">
            <div class="col-md-4">
              <strong class="sitem">Your whole vacation starts here</strong>
              <br />
              <span class="listspan">
                Choose a rental from the world's best selection
              </span>
            </div>
            <div class="col-md-4">
              <strong class="sitem">Book and stay with confidence</strong>
              <br />
              <span class="listspan">Secure payments, peace of mind</span>
            </div>
            <div class="col-md-4">
              <strong class="sitem">Your vacation your way</strong>
              <br />
              <span class="listspan">
                More space, more privacy, no compromises
              </span>
            </div>
          </div>
        </header>
        <div>
          <Footer footdata={this.props.footdata} />
        </div>
      </React.Fragment>
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
export default reduxForm({
  validate,
  form: "Homesearch",
  destroyOnUnmount: false,
  forceUnregisterOnUnmount: true,
  keepDirtyOnReinitialize: true
})(
  connect(
    null,
    { homesearch }
  )(Home)
);
