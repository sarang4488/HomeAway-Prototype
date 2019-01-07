import React, { Component } from "react";
import NavProfile from "./naveditprofile";
import cookie from "react-cookies";
import { Redirect } from "react-router";
import "../App.css";
import Footer from "./footer";
import axios from "axios";

class Account extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      currentEmail: localStorage.getItem("email"),
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
      emailFlag: false,
      passwordFlag: false,
      check: false,
      check2: false
    };
  }

  emailChangeHandler = e => {
    this.setState({
      email: e.target.value
    });
  };

  currentpasswordChangeHandler = e => {
    this.setState({
      currentPassword: e.target.value
    });
  };

  newpasswordChangeHandler = e => {
    this.setState({
      newPassword: e.target.value
    });
  };

  confirmpasswordChangeHandler = e => {
    this.setState({
      confirmPassword: e.target.value
    });
  };

  changeEmail = e => {
    if (this.state.email == "") {
      window.alert("Please enter an email");
    }
    if (
      this.state.email !== this.state.currentEmail &&
      this.state.email !== ""
    ) {
      e.preventDefault();
      const data = {
        email: this.state.email,
        currentEmail: localStorage.getItem("email")
      };
      //set the with credentials to true
      axios.defaults.withCredentials = true;
      console.log(data);
      //make a post request with the user data
      axios
        .post("http://localhost:3001/profile/updateEmail", data)
        .then(response => {
          console.log("Status Code : ", response.data);
          if (response.status === 200) {
            this.setState({
              emailFlag: true
            });
          } else {
            this.setState({
              emailFlag: false
            });
          }
        });
    } else {
      alert("Enter a new email!");
    }
  };

  changePassword = e => {
    if (this.state.newPassword == this.state.confirmPassword) {
      e.preventDefault();
      const data = {
        email: localStorage.getItem("email"),
        currentPassword: this.state.currentPassword,
        confirmPassword: this.state.confirmPassword
      };
      //set the with credentials to true
      axios.defaults.withCredentials = true;
      console.log(data);
      //make a post request with the user data
      axios
        .post("http://localhost:3031/profile/updatePassword", data)
        .then(response => {
          console.log("Status Code : ", response.data);
          console.log(response.data.code);
          if (response.data.code == 200) {
            this.setState({
              passwordFlag: true
            });
          } else if (response.data.code == 401) {
            this.setState({
              check: true
            });
          } else {
            this.setState({
              passwordFlag: false
            });
          }
        });
    } else {
      this.setState({
        check2: true
      });
    }
  };

  render() {
    // if (!cookie.load("cookie")) {
    //   redirect = <Redirect to="/login" />;
    // }
    var redirect = null;
    let errormessage = null;
    let errormessage1 = null;
    let errormessage2 = null;
    if (this.state.email == this.state.oldemail) {
      errormessage = (
        <div
          style={{
            fontSize: "14px",
            backgroundColor: "#ed605a",
            lineHeight: "20px",
            color: "white",
            textAlign: "center",
            padding: "10px",
            width: "500px",
            marginLeft: "240px"
          }}
        >
          <p>Enter a new email!.</p>
        </div>
      );
    }
    if (this.state.check2) {
      errormessage1 = (
        <div
          style={{
            fontSize: "14px",
            backgroundColor: "#ed605a",
            lineHeight: "20px",
            color: "white",
            textAlign: "center",
            padding: "10px",
            width: "500px",
            marginLeft: "240px"
          }}
        >
          <p>Confirm your new password again!.</p>
        </div>
      );
    }
    if (this.state.check) {
      errormessage2 = (
        <div
          style={{
            fontSize: "14px",
            backgroundColor: "#ed605a",
            lineHeight: "20px",
            color: "white",
            textAlign: "center",
            padding: "10px",
            width: "500px",
            marginLeft: "240px"
          }}
        >
          <p>Retry with correct current password!.</p>
        </div>
      );
    }
    if (this.state.emailFlag) {
      localStorage.removeItem("email");
      localStorage.removeItem("name");
      localStorage.removeItem("type");
      localStorage.removeItem("token");
    }
    if (this.state.passwordFlag) {
      localStorage.removeItem("email");
      localStorage.removeItem("name");
      localStorage.removeItem("type");
      localStorage.removeItem("token");
    }
    if (!localStorage.getItem("email")) {
      redirect = <Redirect to="/login" />;
    }

    return (
      <React.Fragment>
        <NavProfile
          navdata={this.props.navdata}
          style={{ backgroundColor: "white" }}
        />
        {redirect}
        <div className="container profilemaindiv">
          <div id="profileheading">
            <h2>Account Settings</h2>
          </div>
          <div style={{ border: "1px solid #d3d8de", marginBottom: "30px" }}>
            <div>
              <h3> &nbsp; &nbsp;Change your email address</h3>
            </div>
            <hr />
            {errormessage}
            <form>
              <div class="row">
                <div
                  style={{
                    paddingTop: "22px",
                    textAlign: "right",
                    color: "rgb(94,109,119)"
                  }}
                  class="form-group form-group-lg col-md-2"
                >
                  <label for="email">Email Address</label>
                </div>
                <div className="col-md-6">
                  <input
                    type="text"
                    className="form-control "
                    id="email"
                    name="email"
                    placeholder="email"
                    onChange={this.emailChangeHandler}
                  />
                  <br />
                  <p style={{ color: "red" }}>
                    This will update your account email address for future
                    reservations. If you need to update your email address for
                    an existing reservation, please reach out to the owner or
                    property manager, and they can update their records.
                  </p>
                  <button
                    type="submit"
                    className="btn btn-lg"
                    onClick={this.changeEmail}
                    id="profilebutton"
                  >
                    Save
                  </button>
                </div>
              </div>
            </form>
          </div>
          <div style={{ border: "1px solid #d3d8de" }}>
            <div>
              <h3> &nbsp; &nbsp;Change your password</h3>
            </div>
            <hr />
            {errormessage1}
            {errormessage2}
            <div class="row">
              <div
                style={{
                  paddingTop: "22px",
                  textAlign: "right",
                  color: "rgb(94,109,119)"
                }}
                class="form-group form-group-lg col-md-2"
              >
                <label for="currentpassword">Current Password</label>
              </div>
              <div className="col-md-6">
                <input
                  type="text"
                  className="form-control "
                  id="currentpassword"
                  name="currentpassword"
                  onChange={this.currentpasswordChangeHandler}
                />
                <br />
              </div>
            </div>
            <div class="row">
              <div
                style={{
                  paddingTop: "22px",
                  textAlign: "right",
                  color: "rgb(94,109,119)"
                }}
                class="form-group form-group-lg col-md-2"
              >
                <label for="newpassword">New Password</label>
              </div>
              <div className="col-md-6">
                <input
                  type="text"
                  className="form-control "
                  id="newpassword"
                  name="newpassword"
                  onChange={this.newpasswordChangeHandler}
                />
                <br />
              </div>
            </div>
            <div class="row">
              <div
                style={{
                  paddingTop: "22px",
                  textAlign: "right",
                  color: "rgb(94,109,119)"
                }}
                class="form-group form-group-lg col-md-2"
              >
                <label for="confirmpassword">Confirm Password</label>
              </div>
              <div className="col-md-6">
                <input
                  type="text"
                  className="form-control "
                  id="confirmpassword"
                  name="confirmpassword"
                  onChange={this.confirmpasswordChangeHandler}
                />
                <br />
                <button
                  type="submit"
                  className="btn btn-lg"
                  onClick={this.changePassword}
                  id="profilebutton"
                >
                  Save
                </button>
              </div>
            </div>
          </div>
        </div>

        <div style={{ marginTop: "100px" }}>
          <Footer footdata={this.props.footdata} />
        </div>
      </React.Fragment>
    );
  }
}

export default Account;
