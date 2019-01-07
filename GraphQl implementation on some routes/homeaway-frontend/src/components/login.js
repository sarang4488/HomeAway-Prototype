import React, { Component } from "react";
import "../App.css";
import axios from "axios";
import cookie from "react-cookies";
import { Redirect } from "react-router";
import { Link } from "react-router-dom";
import Navbar2 from "./navlogin";
import { Field, reduxForm } from "redux-form";
import { connect } from "react-redux";

import __ from "lodash";
import { tlogin } from "../queries/queries";
import { withApollo } from "react-apollo";

//Define a SignUp Component
class Login extends Component {
  constructor(props) {
    //Call the constrictor of Super class i.e The Component
    super(props);
    //maintain the state required for this component
    this.state = {
      email: "",
      password: "",
      authFlag: false,
      error: false
    };
    //Bind the handlers to this class
    this.emailChangeHandler = this.emailChangeHandler.bind(this);
    this.passwordChangeHandler = this.passwordChangeHandler.bind(this);
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
  //email change handler to update state variable with the text entered by the user
  emailChangeHandler = e => {
    this.setState({
      email: e.target.value
    });
  };
  //password change handler to update state variable with the text entered by the user
  passwordChangeHandler = e => {
    this.setState({
      password: e.target.value
    });
  };

  submitlogin(e) {
    e.preventDefault();
    this.props.client
      .query({
        query: tlogin,
        variables: {
          email: this.state.email,
          password: this.state.password
        }
      })
      .then(res => {
        console.log("Traveler result query: ", res.data.tlogin);
        if (res.data.tlogin.status == "200") {
          // console.log("Traveler result query: ",res.data.tlogin.firstName);
          localStorage.setItem("travelerJWT", res.data.tlogin.token);
          localStorage.setItem("email", res.data.tlogin.email);
          localStorage.setItem("name", res.data.tlogin.name);
          localStorage.setItem("type", res.data.tlogin.type);
          this.setState({
            redirectVar: <Redirect to="/results" />
          });
          // console.log("decoded firstname :", jwt_decode(localStorage.getItem("travelerJWT")).firstName)
        } else if (res.data.tlogin.status == "201") {
          this.setState({
            message: res.data.tlogin.message
          });
        } else if (res.data.tlogin.status == "401") {
          console.log("Inside else :", res.data.tlogin.message);
          this.setState({
            message: res.data.tlogin.message
          });
        }
      });
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

    let errorMessage = null;

    return (
      <React.Fragment>
        <body id="login">
          <div>
            {this.state.redirectVar}

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
                  <div
                    style={{
                      fontSize: "12px",
                      color: "red",
                      textAlign: "center",
                      padding: "6px"
                    }}
                  >
                    {this.state.message}
                  </div>
                  <div class="sub-div">
                    <form onSubmit={this.submitlogin.bind(this)}>
                      <div class="form-group">
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
                      </div>
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
export default withApollo(Login);
// function validate(values) {
//   const errors = {};
//   if (!values.email) {
//     errors.email = "Enter an email";
//   }
//   if (!values.password) {
//     errors.password = "Enter password";
//   }
//   return errors;
// }

// function mapStateToProps(state) {
//   return {
//     login: state.login
//   };
// }
// export default reduxForm({
//   validate,
//   form: "Login",
//   destroyOnUnmount: false,
//   forceUnregisterOnUnmount: true,
//   keepDirtyOnReinitialize: true
// })(
//   connect(
//     mapStateToProps,
//     { tlogin }
//   )(Login)
// );
//export Sign Up Component
//export default Login;
