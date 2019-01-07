import React, { Component } from "react";

import { Link } from "react-router-dom";
import axios from "axios";
import { Redirect } from "react-router-dom";
import cookie from "react-cookies";
import Navlogin from "./navlogin";
import { Field, reduxForm } from "redux-form";
import { connect } from "react-redux";
import { ologin } from "../queries/queries";
import { withApollo } from "react-apollo";

class LoginOwner extends Component {
  constructor(props) {
    super(props);

    this.state = {
      name: "",
      email: "",
      password: "",
      uname: "",
      authFlag: false
    };
  }

  emailHandler = e => {
    this.setState({
      email: e.target.value
    });
  };

  passwordHandler = e => {
    this.setState({
      password: e.target.value
    });
  };

  // handleLogin = e => {
  //   e.preventDefault();
  //   var data = {
  //     email: this.state.email,
  //     password: this.state.password
  //   };
  //   axios.defaults.withCredentials = true;
  //   axios.post("http://localhost:3001/login", data).then(response => {
  //     console.log("inside loginowner Post Request");
  //     if ((response.status = 200)) {
  //       this.setState({
  //         authFlag: true
  //       });
  //       console.log(response.data);
  //     } else {
  //       this.setState({
  //         authFlag: false
  //       });
  //     }
  //   });
  // };
  // renderField(field) {
  //   const {
  //     meta: { touched, error }
  //   } = field;
  //   const className = `form-group ${touched && error ? "has-danger" : ""}`;

  //   return (
  //     <div className={className}>
  //       <input
  //         className="form-control"
  //         type="email"
  //         {...field.input}
  //         placeholder="Email address"
  //       />
  //       <div className="text-help">{touched ? error : ""}</div>
  //     </div>
  //   );
  // }

  // renderField1(field) {
  //   const {
  //     meta: { touched, error }
  //   } = field;
  //   const className = `form-group ${touched && error ? "has-danger" : ""}`;

  //   return (
  //     <div className={className}>
  //       <input
  //         className="form-control"
  //         type="password"
  //         {...field.input}
  //         placeholder="Password"
  //       />
  //       <div className="text-help">{touched ? error : ""}</div>
  //     </div>
  //   );
  // }e.preventDefault();

  submitlogin(e) {
    e.preventDefault();
    this.props.client
      .query({
        query: ologin,
        variables: {
          email: this.state.email,
          password: this.state.password
        }
      })
      .then(res => {
        console.log("Traveler result query: ", res.data.tlogin);
        if (res.data.ologin.status == "200") {
          // console.log("Traveler result query: ",res.data.tlogin.firstName);
          localStorage.setItem("travelerJWT", res.data.ologin.token);
          localStorage.setItem("email", res.data.ologin.email);
          localStorage.setItem("name", res.data.ologin.name);
          this.setState({
            redirectVar: <Redirect to="/ownerdashboard" />
          });
          // console.log("decoded firstname :", jwt_decode(localStorage.getItem("travelerJWT")).firstName)
        } else if (res.data.ologin.status == "201") {
          this.setState({
            message: res.data.ologin.message
          });
        } else if (res.data.ologin.status == "401") {
          console.log("Inside else :", res.data.ologin.message);
          this.setState({
            message: res.data.ologin.message
          });
        }
      });
  }

  render() {
    //console.log("cookie" + cook);
    // let redirectVar = null;
    // if (this.props.loginowner.code == 200) {
    //   redirectVar = (
    //     <Redirect
    //       to={{
    //         pathname: "/uploadproperty"
    //       }}
    //     />
    //   );
    // }
    // let errorMessage = null;
    // if (this.props.loginowner.code == 401) {
    //   errorMessage = (
    //     <div
    //       style={{
    //         backgroundColor: "orange",
    //         fontSize: "12px",
    //         color: "white",
    //         textAlign: "center",
    //         padding: "6px"
    //       }}
    //     >
    //       <h5>The username or password you entered is incorrect.</h5>
    //     </div>
    //   );
    // }
    // if (this.props.loginowner.code == 404) {
    //   errorMessage = (
    //     <div
    //       style={{
    //         backgroundColor: "orange",
    //         fontSize: "12px",
    //         color: "white",
    //         textAlign: "center",
    //         padding: "6px"
    //       }}
    //     >
    //       <h5>User does not exist</h5>
    //     </div>
    //   );
    // }
    return (
      <React.Fragment>
        {this.state.redirectVar}
        <Navlogin navdata={this.props.navdata} />
        <div className="container-fluid" style={{ backgroundColor: "#f4f4f4" }}>
          <div className="login-top">
            <h2 style={{ textAlign: "center" }}>Log in to HomeAway as Owner</h2>
            <h4
              className="text-center"
              style={{
                color: "#777777",
                fontSize: "18px;",
                textAlign: "center"
              }}
            >
              Need an account? <Link to="/signupowner">Sign Up</Link>
            </h4>
          </div>

          <div className="main-div">
            <h3
              class="myh3"
              style={{
                textAlign: "center",
                color: "rgb(102,102,102)",

                fontWeight: "400",
                color: "black"
              }}
            >
              Owner Login
            </h3>
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
            {/* {errorMessage} */}
            <form onSubmit={this.submitlogin.bind(this)} class="login-form">
              <div class="form-group">
                {/* <Field
                  name="email"
                  placeholder="Email Address"
                  component={this.renderField}
                />
                <Field
                  name="password"
                  placeholder="Password"
                  component={this.renderField1}
                /> */}
                <input
                  type="email"
                  class="form-control"
                  autoFocus
                  onChange={this.emailHandler}
                  placeholder="Email Address"
                />
              </div>
              <div class="form-group">
                <input
                  type="password"
                  class="form-control"
                  required
                  onChange={this.passwordHandler}
                  placeholder="Password"
                />
              </div>

              <button
                type="submit"
                class="btn btn-warning  btn-lg"
                style={{
                  width: "100%",
                  height: "100px;",
                  marginTop: "30px;"
                }}
              >
                Log In
              </button>
            </form>
            <br />

            <hr />
            <div class="copy-text" style={{ textAlign: "center" }}>
              Want to list your property? <a href="#">Learn more</a>
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default withApollo(LoginOwner);
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
//     loginowner: state.loginowner
//   };
// }

// export default reduxForm({
//   validate,
//   form: "LoginOwnerForm"
// })(
//   connect(
//     mapStateToProps,
//     { ologin }
//   )(LoginOwner)
// );
