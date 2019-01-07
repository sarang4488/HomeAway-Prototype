import React, { Component } from "react";
import NavProfile from "./naveditprofile";
import cookie from "react-cookies";
import { Redirect } from "react-router";
import "../App.css";
import Footer from "./footer";
import axios from "axios";

class TraveltoOwner extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: localStorage.getItem("email"),
      authFlag: false
    };
  }

  signmeup = async e => {
    e.preventDefault();
    const data = {
      email: this.state.email
    };

    axios
      .post("http://localhost:3001/profile/converttravel", data)
      .then(response => {
        if ((response.status = 200)) {
          this.setState({
            authFlag: true
          });
        } else {
          this.setState({
            authFlag: false
          });
        }
      })
      .catch(err => {
        console.log(err);
      });
  };

  render() {
    var redirect = null;
    console.log(this.state.email);
    // if (!cookie.load("cookie")) {
    //   redirect = <Redirect to="/login" />;
    // }
    if (this.state.authFlag) {
      localStorage.removeItem("type");
      localStorage.setItem("type", "owner");
      redirect = <Redirect to="/uploadproperty" />;
    }

    return (
      <React.Fragment>
        {redirect}
        <NavProfile
          navdata={this.props.navdata}
          style={{ backgroundColor: "white" }}
        />

        <div className="container profilemaindiv">
          <div id="profileheading">
            <h2>Confirm Owner Account</h2>
          </div>
          <div
            style={{
              border: "1px solid #d3d8de",
              marginBottom: "30px",
              textAlign: "center"
            }}
          >
            <div>
              <h4>Clicking this button will create a owner account </h4>
            </div>

            <button
              type="submit"
              className="btn btn-lg"
              onClick={this.signmeup}
              id="profilebutton"
            >
              Sign me up
            </button>
          </div>
        </div>

        <div style={{ marginTop: "100px" }}>
          <Footer footdata={this.props.footdata} />
        </div>
      </React.Fragment>
    );
  }
}

export default TraveltoOwner;
