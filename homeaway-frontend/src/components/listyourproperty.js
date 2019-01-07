import React, { Component } from "react";
import Navowner from "./navowner";
import cookie from "react-cookies";
import { Redirect } from "react-router";
class Listyourproperty extends Component {
  constructor() {
    super();
    this.state = {
      bathrooms: 0,
      bedrooms: 0,
      authflag: false
    };
  }

  bathroomIncreasehandler = e => {
    if (this.state.bathrooms < 9) {
      this.setState({
        bathrooms: this.state.bathrooms + 0.5
      });
    }
  };

  bathroomDeccreasehandler = e => {
    if (this.state.bathrooms > 0) {
      this.setState({
        bathrooms: this.state.bathrooms - 0.5
      });
    }
  };

  bedroomIncreasehandler = e => {
    if (this.state.bedrooms < 9) {
      this.setState({
        bedrooms: this.state.bedrooms + 1
      });
    }
  };

  bedroomDecreasehandler = e => {
    if (this.state.bedrooms > 0) {
      this.setState({
        bedrooms: this.state.bedrooms - 1
      });
    }
  };

  getRoute = e => {
    this.setState({
      authflag: true
    });
  };
  render() {
    let redirect = null;
    if (this.state.authflag) {
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
    return (
      <React.Fragment>
        {redirect}
        <div className="listprop">
          <Navowner navdata={this.props.navdata} />
          <div className="quot">
            <h1 className="earn">
              <span className="span1">How much could</span>
              <br />
              <span className="span2">you earn?</span>
            </h1>
          </div>
        </div>
        <div
          className="property"
          style={{
            position: "absolute",
            top: "150px",
            left: "600px",
            backgroundColor: "white",
            textAlign: "center"
          }}
        >
          <div class="basics">Lets start with the basics</div>
          <div className="row">
            <div
              className="col-md-6"
              style={{ width: "250px", borderRight: "1px solid grey" }}
            >
              <div className="bedroom div">
                <img src="images/bedroom.png" />
                <div className="bathtext">Bedrooms</div>
              </div>
              <br />
              <div className="increase">
                <button
                  className="btn btn-primary"
                  onClick={this.bedroomIncreasehandler}
                >
                  <span
                    class="glyphicon glyphicon-chevron-up"
                    aria-hidden="true"
                  />
                </button>
              </div>
              <div className="text">
                <h1>{this.state.bedrooms}</h1>
              </div>
              <div className="decrease">
                <button
                  className="btn btn-primary"
                  onClick={this.bedroomDecreasehandler}
                >
                  <span
                    class="glyphicon glyphicon-chevron-down"
                    aria-hidden="true"
                  />
                </button>
              </div>
            </div>
            <div className="col-md-6">
              <div className="bathroom div">
                <img src="images/bathroom.png" />
                <div className="bathtext">Bathrooms</div>
              </div>
              <br />
              <div className="increase">
                <button
                  className="btn btn-primary"
                  onClick={this.bathroomIncreasehandler}
                >
                  <span
                    class="glyphicon glyphicon-chevron-up"
                    aria-hidden="true"
                  />
                </button>
              </div>
              <div className="text">
                <h1>{this.state.bathrooms}</h1>
              </div>
              <div className="decrease">
                <button
                  className="btn btn-primary"
                  onClick={this.bathroomDeccreasehandler}
                >
                  <span
                    class="glyphicon glyphicon-chevron-down"
                    aria-hidden="true"
                  />
                </button>
              </div>
            </div>
          </div>
          <div>
            <button className="btn btn-primary" id="bt" onClick={this.getRoute}>
              Next
            </button>
          </div>
        </div>
        <div
          className="ownerbenefits"
          style={{ height: "400px", textAlign: "center" }}
        >
          <h1 id="vacation">Simply the perfect vacation rental marketplace</h1>
          <div className="features">
            <div className="col-md-4">
              <img src="images/exposure.png" />

              <div>
                <br />
                <br />
                <strong>Maximum Exposure</strong>
              </div>
              <div>
                <span>Reach travellers in 190 countries</span>
                <br />
                <span>across 50+ dedicated sites</span>
              </div>
            </div>
            <div className="col-md-4">
              <img src="images/control.png" />
              <div>
                <br />
                <br />
                <strong>You're in control</strong>
              </div>
              <div>
                <span>You control prices, availability, and </span>
                <br />
                <span>who stays at your property</span>
              </div>
            </div>
            <div className="col-md-4">
              <img src="images/tools.png" />
              <div>
                <br />
                <br />
                <strong>Easy-to-use Tools</strong>
              </div>
              <div>
                <span>Access best-in-class reservation tools </span>
                <br />
                <span>for setting up your rates and managing </span>
                <br />
                <span>reservations </span>
              </div>
            </div>
          </div>
        </div>
        <div className="container-fluid" style={{ textAlign: "center" }}>
          <video poster="images/final.png" controls>
            <source src="images/homeaway.mp4" type="video/mp4" />{" "}
          </video>
        </div>
      </React.Fragment>
    );
  }
}

export default Listyourproperty;
