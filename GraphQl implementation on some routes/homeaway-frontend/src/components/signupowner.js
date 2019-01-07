import React, { Component } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { Redirect } from "react-router";
import Navlogin from "./navlogin";
import { Field, reduxForm } from "redux-form";
import { connect } from "react-redux";
import { oregister } from "../actions";
import { graphql, compose } from "react-apollo";
import { getAuthorsQuery, getBooksQuery } from "../queries/queries";
import { addOwnerMutation } from "../mutation/mutations";

class SignupOwner extends Component {
  constructor(props) {
    super(props);
    // this.handleFirstName = this.handleFirstName.bind(this);
    // this.handleLastName = this.handleLastName.bind(this);
    // this.handlePassword = this.handlePassword.bind(this);
    // this.handleEmail = this.handleEmail.bind(this);

    this.state = {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      type: "",

      error: false
    };
  }

  handleFirstName = e => {
    this.setState({
      firstName: e.target.value
    });
  };

  handleLastName = e => {
    this.setState({
      lastName: e.target.value
    });
  };

  handleEmail = e => {
    this.setState({
      email: e.target.value
    });
  };

  handlePassword = e => {
    this.setState({
      password: e.target.value
    });
  };

  // handleSignmeup = async e => {
  //   e.preventDefault();
  //   var data = {
  //     fName: this.state.firstName,
  //     lName: this.state.lastName,
  //     email: this.state.email,
  //     password: this.state.password,
  //     type: "owner"
  //   };
  //   axios.post("http://localhost:3001/register", data).then(response => {
  //     if ((response.status = 200)) {
  //       this.setState({
  //         authFlag: true
  //       });
  //     } else {
  //       this.setState({
  //         authFlag: false
  //       });
  //     }
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

  submitregister(e) {
    e.preventDefault();
    console.log(this.state);

    let response = this.props.addOwnerMutation({
      variables: {
        name: this.state.firstName + " " + this.state.lastName,
        email: this.state.email,
        password: this.state.password,
        type: "owner"
      }
      // refetchQueries: [{ query: getBooksQuery }]
    });
    response.then(res => {
      console.log("Data is", res.data);
      if (res.data.addOwner == undefined) {
        this.props.history.push("/ownerlogin");
      } else {
        this.setState({
          error: true
        });
      }
    });
  }

  render() {
    const { handleSubmit } = this.props;
    let redi = null;

    // if (this.props.register.code == 200) {
    //   redi = (
    //     <Redirect
    //       to={{
    //         pathname: "/loginowner"
    //       }}
    //     />
    //   );
    // }
    let errorMessage = null;
    if (this.state.error) {
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
      <React.Fragment>
        {redi}
        <Navlogin navdata={this.props.navdata} />
        <div
          className="container-fluid"
          style={{
            marginTop: "10px",
            backgroundColor: "#f4f4f4"
          }}
        >
          <div>
            <h1 className="text-center">
              <br />
              <br />
              <br />
              Owner Sign up for HomeAway
            </h1>
            <h4
              className="text-center"
              style={{ color: "#777777", fontSize: "18px;" }}
            >
              Already have an account? <Link to="/login">Log in</Link>
            </h4>
            <br />
          </div>

          <div
            className="text-center"
            style={{
              width: "30%",
              marginLeft: "480px",

              height: "500px"
            }}
          >
            <form
              onSubmit={this.submitregister.bind(this)}
              className="login-form"
            >
              {errorMessage}
              <div className="sign-up-form">
                <div class="form-group">
                  <input
                    type="text"
                    class="form-control"
                    autoFocus
                    onChange={this.handleFirstName}
                    placeholder="First Name"
                  />
                </div>
                <div class="form-group">
                  <input
                    type="text"
                    onChange={this.handleLastName}
                    class="form-control"
                    placeholder="Last name"
                  />
                </div>
                <div class="form-group">
                  <input
                    type="text"
                    class="form-control"
                    onChange={this.handleEmail}
                    placeholder="Email Address"
                  />
                </div>
                <div class="form-group">
                  <input
                    type="password"
                    class="form-control"
                    onChange={this.handlePassword}
                    placeholder="Password"
                  />
                </div>
                <button type="submit" className="btn btn-warning btn-lg  ">
                  Sign Me Up
                </button>
              </div>
            </form>
            <br />
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default graphql(addOwnerMutation, { name: "addOwnerMutation" })(
  SignupOwner
);

// function validate(values) {
//   const errors = {};
//   if (!values.fName) {
//     errors.fName = "Enter first name ";
//   }
//   if (!values.lName) {
//     errors.lName = "Enter last name";
//   }
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
//     register: state.ownerregister
//   };
// }
// export default reduxForm({
//   validate,
//   form: "RegisterForm"
// })(
//   connect(
//     mapStateToProps,
//     { oregister }
//   )(SignupOwner)
// );
