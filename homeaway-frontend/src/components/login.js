import React, { Component } from "react";
import "../App.css";
import axios from "axios";
import cookie from "react-cookies";
import { Redirect } from "react-router";
import { Link } from "react-router-dom";
import Navbar2 from "./navlogin";
import { Field, reduxForm } from "redux-form";
import { connect } from "react-redux";
import { tlogin } from "../actions";
import __ from "lodash";

//Define a SignUp Component
class Login extends Component {
  //call the constructor method
  // constructor(props) {
  //   //Call the constrictor of Super class i.e The Component
  //   super(props);
  //   //maintain the state required for this component
  //   this.state = {
  //     email: "",
  //     password: "",
  //     authFlag: false,
  //     error: false
  //   };
  //   //Bind the handlers to this class
  //   this.emailChangeHandler = this.emailChangeHandler.bind(this);
  //   this.passwordChangeHandler = this.passwordChangeHandler.bind(this);
  //   this.submitLogin = this.submitLogin.bind(this);
  //   this.handleFocus = this.handleFocus.bind(this);
  // }

  renderField(field) {
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

  renderField1(field) {
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

  //Removes the error meeage when inputs are focussed
  // handleFocus = () => {
  //   this.setState({ error: false });
  // };
  //Call the Will Mount to set the auth Flag to false
  // componentWillMount() {
  //   this.setState({
  //     authFlag: false
  //   });
  // }
  // //email change handler to update state variable with the text entered by the user
  // emailChangeHandler = e => {
  //   this.setState({
  //     email: e.target.value
  //   });
  // };
  // //password change handler to update state variable with the text entered by the user
  // passwordChangeHandler = e => {
  //   this.setState({
  //     password: e.target.value
  //   });
  // };

  submitlogin(values) {
    console.log(values);
    this.props.tlogin(values);
  }
  //   this.props.tlogin(values, () => {
  //     // this.props.history.push("/");
  //     //window.location.reload(1);
  //   });
  // }
  //submit Login handler to send a request to the node backend
  // submitLogin = e => {
  //   //prevent page from refresh
  //   e.preventDefault();
  //   const data = {
  //     email: this.state.email,
  //     password: this.state.password
  //   };
  //   //set the with credentials to true
  //   axios.defaults.withCredentials = true;
  //   //make a post request with the user data
  //   axios
  //     .post("http://localhost:3001/login", data)
  //     .then(response => {
  //       console.log("Status Code : ", response.status);
  //       console.log(response.data);
  //       if (response.status === 200) {
  //         this.setState({
  //           authFlag: true,
  //           email: response.data
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
  render() {
    console.log(this.props.login);
    const { handleSubmit } = this.props;

    //redirect based on successful login
    let redirectVar = null;
    if (this.props.login.code == 200 && localStorage.getItem("email")) {
      redirectVar = (
        <Redirect
          to={{
            pathname: "/"
          }}
        />
      );
      
    }
    let errorMessage = null;
    if (this.props.login.code == 401) {
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
          <h5>The username or password you entered is incorrect.</h5>
        </div>
      );
    }
    if (this.props.login.code == 404) {
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
          <h5>User does not exist</h5>
        </div>
      );
    }
    return (
      <React.Fragment>
        <body id="login">
          <div>
            {redirectVar}

            <Navbar2 navdata={this.props.navdata} />
            <div class="container-fluid" style={{ backgroundColor: "#f4f4f4" }}>
              <div class="login-top">
                <h1 style={{ textAlign: "center" }}>Log in to HomeAway</h1>
                <h4
                  style={{
                    color: "#777777",
                    fontSize: "18px;",
                    textAlign: "center"
                  }}
                >
                  Need an account?
                  <Link to="/register">Sign Up</Link>
                </h4>
              </div>

              <div class="login-form">
                <div class="main-div">
                  <div>
                    <h4>Account Login</h4>
                    <hr />
                  </div>
                  {errorMessage}
                  <div class="sub-div">
                    <form onSubmit={handleSubmit(this.submitlogin.bind(this))}>
                      <Field
                        name="email"
                        placeholder="Email Address"
                        component={this.renderField}
                      />
                      <Field
                        name="password"
                        placeholder="Password"
                        component={this.renderField1}
                      />
                      {/* <div class="form-group">
                      <input
                        type="text"
                        class="form-control"
                        name="email"
                        placeholder="email"
                        onChange={this.emailChangeHandler}
                        onFocus={this.handleFocus}
                        required
                      />
                      <br />
                      <input
                        type="password"
                        class="form-control"
                        name="password"
                        placeholder="Password"
                        onFocus={this.handleFocus}
                        onChange={this.passwordChangeHandler}
                      />
                    </div> */}
                      <button
                        class="btn btn-warning btn-lg"
                        style={{
                          width: "100%",
                          height: "100px;",
                          marginTop: "30px;"
                        }}
                      >
                        Log In
                      </button>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </body>
      </React.Fragment>
    );
  }
}

function validate(values) {
  const errors = {};
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
    login: state.login
  };
}
export default reduxForm({
  validate,
  form: "Login",
  destroyOnUnmount: false,
  forceUnregisterOnUnmount: true,
  keepDirtyOnReinitialize: true
})(
  connect(
    mapStateToProps,
    { tlogin }
  )(Login)
);
//export Sign Up Component
//export default Login;
