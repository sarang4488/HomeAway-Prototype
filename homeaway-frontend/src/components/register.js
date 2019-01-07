import React, { Component } from "react";
import { Route, withRouter, Link } from "react-router-dom";
import axios from "axios";
import cookie from "react-cookies";
import { Redirect } from "react-router";
import Navlogin from "./navlogin";
import { Field, reduxForm } from "redux-form";
import { connect } from "react-redux";
import { tregister } from "../actions";

class Register extends Component {
  constructor() {
    super();
    this.state = {
      fName: "",
      lName: "",
      email: "",
      password: "",
      authFlag: false,
      userFlag: false
    };
  }
  componentWillMount() {
    this.setState({
      authFlag: false
    });
  }

  // fNameChangeHandler = e => {
  //   this.setState({
  //     fName: e.target.value
  //   });
  // };

  // lNameChangeHandler = e => {
  //   this.setState({
  //     lName: e.target.value
  //   });
  // };

  // emailChangeHandler = e => {
  //   this.setState({
  //     email: e.target.value
  //   });
  // };

  // passwordChangeHandler = e => {
  //   this.setState({
  //     password: e.target.value
  //   });
  // };

  // submitRegister = e => {
  //   e.preventDefault();
  //   const userData = {
  //     fName: this.state.fName,
  //     lName: this.state.lName,
  //     email: this.state.email,
  //     password: this.state.password,
  //     type: "traveller"
  //   };

  // axios.defaults.withCredentials = true;
  // axios
  //   .post("http://localhost:3001/register", userData)
  //   .then(response => {
  //     console.log("Status Code : ", response.status);
  //     if (response.status === 200) {
  //       this.setState({
  //         authFlag: true
  //       });
  //     } else {
  //       this.setState({
  //         authFlag: false
  //       });
  //     }
  //   })
  //   .catch(err => {
  //     this.setState({ userflag: true });
  //     console.log(err);
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
          placeholder="First name"
        />
        <div className="text-help">{touched ? error : ""}</div>
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
          type="text"
          {...field.input}
          placeholder="Last name"
        />
        <div className="text-help">{touched ? error : ""}</div>
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
          type="email"
          {...field.input}
          placeholder="Email address"
        />
        <div className="text-help">{touched ? error : ""}</div>
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
          type="password"
          {...field.input}
          placeholder="Password"
        />
        <div className="text-help">{touched ? error : ""}</div>
      </div>
    );
  }

  submitregister(values) {
    console.log(values);

    this.props.tregister(values);
  }

  render() {
    const { handleSubmit } = this.props;
    let redirect = null;

    if (this.props.register.code == 200) {
      redirect = (
        <Redirect
          to={{
            pathname: "/login"
          }}
        />
      );
    }
    let errorMessage = null;
    if (this.props.register.code == 404) {
      errorMessage = (
        <div
          style={{
            backgroundColor: "orange",
            fontSize: "12px",
            color: "white",
            textAlign: "center",
            padding: "6px"
          }}
        >
          <h5>User Already exists.</h5>
        </div>
      );
    }

    return (
      <body id="signup">
        <div>
          {redirect}
          <Navlogin navdata={this.props.navdata} />
          <div
            className="container-fluid"
            style={{
              marginTop: "10px",
              backgroundColor: "#f4f4f4"
            }}
          >
            <div className="row justify-content-md-center">
              <div className="col">
                <h1 className="text-center">
                  <br />
                  <br />
                  <br />
                  Sign up for HomeAway
                </h1>
                <h4
                  className="text-center"
                  style={{ color: "#777777", fontSize: "18px;" }}
                >
                  Already have an account? <Link to="/login">Log in</Link>
                </h4>
                <br />
                <div
                  className="text-center"
                  style={{
                    width: "30%",
                    marginLeft: "480px",

                    height: "500px"
                  }}
                >
                  <div>{errorMessage}</div>

                  <form
                    onSubmit={handleSubmit(this.submitregister.bind(this))}
                    className="form-group"
                  >
                    <Field name="fName" component={this.renderField} />
                    <Field name="lName" component={this.renderField1} />
                    <Field
                      name="email"
                      placeholder="Email Address"
                      component={this.renderField2}
                    />
                    <Field
                      name="password"
                      placeholder="Password"
                      component={this.renderField3}
                    />
                    {/* <input
                      type="text"
                      className="form-control"
                      placeholder="First name"
                      name="fName"
                      onChange={this.fNameChangeHandler}
                    />
                    <br />

                    <input
                      type="text"
                      className="form-control"
                      placeholder="Surname"
                      name="lName"
                      onChange={this.lNameChangeHandler}
                    />

                    <br />
                    <input
                      type="email"
                      className="form-control"
                      placeholder="Email"
                      name="email"
                      onChange={this.emailChangeHandler}
                    />
                    <br />
                    <input
                      type="password"
                      className="form-control"
                      placeholder="Password"
                      name="password"
                      onChange={this.passwordChangeHandler}
                    /> */}

                    <br />
                    <button type="submit" className="btn btn-warning btn-lg">
                      Sign me Up
                    </button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </body>
    );
  }
}

function validate(values) {
  const errors = {};
  if (!values.fName) {
    errors.fName = "Enter first name ";
  }
  if (!values.lName) {
    errors.lName = "Enter last name";
  }
  if (!values.email) {
    errors.email = "Enter an email";
  }
  if (!values.password) {
    errors.password = "Enter password";
  }
  return errors;
}
function mapStateToProps(state) {
  return {
    register: state.travelregister
  };
}
export default reduxForm({
  validate,
  form: "RegisterForm"
})(
  connect(
    mapStateToProps,
    { tregister }
  )(Register)
);
