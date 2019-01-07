import React, { Component } from "react";
import "../App.css";
import axios from "axios";
import cookie from "react-cookies";
import { Redirect } from "react-router";
import { Link } from "react-router-dom";
import Navbar from "./navbar";
import Footer from "./footer";
import { connect } from "react-redux";
import { fetchTravelDashboard } from "../actions";
import _ from "lodash";
import Pagination from "./pagination";
import { graphql, withApollo } from "react-apollo";
import { getmyPropsQuery } from "../queries/queries";
// import { SplitButton,DropdownButton, MenuItem, Button, Image } from 'react-bootstrap';

//create the Navbar Component
class MyTrips extends Component {
  constructor(props) {
    super(props);
    //maintain the state required for this component
    this.state = {
      name: localStorage.getItem("name"),
      Properties: [],
      imageView: [],
      displayprop: "", //to transfer props when clicked
      authFlag: false,
      message: "",
      page: 1,
      renderedProperty: [],
      total: ""
    };

    //Bind the handlers to this class
  }
  //get the books data from backend

  componentDidMount() {
    this.props.client
      .query({
        query: getmyPropsQuery,
        variables: {
          customername: this.state.name
        }
      })
      .then(res => {
        console.log("Traveler Dashboard result query: ", res.data.myproperties);
        if (res.data.myproperties !== undefined) {
          this.setState({
            Properties: res.data.myproperties
          });
        }
      });
  }

  render() {
    var redirect = null;
    if (!localStorage.getItem("name")) {
      redirect = <Redirect to="/login" />;
    }
    let details = this.state.Properties.map(property => {
      const imgurl = require("../homeaway.png");
      return (
        <div
          class="displaypropinfo container-fluid"
          style={{ marginBottom: "20px" }}
        >
          <div class="col-sm-4">
            <img src={imgurl} height="200px" width="430px" />
          </div>
          <div class="col-sm-8">
            <div class="headline">
              <h3 class="hit-headline">
                <a>
                  <div
                    onClick={this.propertyChangeHandler}
                    name="displayprop"
                    data-value={property.name}
                  >
                    {property.propertyname}
                  </div>
                </a>
              </h3>
            </div>
            <div class="propdetails">
              Sleeps <strong>{property.guests}</strong>
            </div>
            <div class="price-hit">
              <div class="subprice-hit">
                ${property.price}{" "}
                <span style={{ fontSize: "12px" }}>per night</span>
              </div>
            </div>
            <div class="propdetails">
              Checkin: <strong>{property.checkin}</strong>
            </div>
            <div class="propdetails">
              Checkout: <strong>{property.checkout}</strong>
            </div>
          </div>
        </div>
      );
    });
    // let details = this.state.Properties.map(property => {
    //   const imgurl = require("../homeaway.png");
    //   return (
    //     <div>
    //       <div class="col-sm-4">
    //         <figure>
    //           <img src={imgurl} height="300px" width="300px" />
    //         </figure>
    //         <td
    //           onClick={this.propertyChangeHandler}
    //           name="displayprop"
    //           data-attr={property.propertyname}
    //           style={{ fontSize: "25px", textAlign: "center" }}
    //         >
    //           {property.propertyname}
    //         </td>
    //       </div>
    //     </div>
    //   );
    // });

    return (
      <div>
        <div style={{ backgroundColor: "grey" }}>
          <Navbar navdata={this.props.navdata} />;
        </div>
        <div
          class="main-div-listproperty"
          style={{ marginTop: "20px", marginLeft: "100px" }}
        >
          <h2 style={{ textAlign: "center" }}>Recent Activity</h2>
          <table class="table">
            <thead />
            <tbody>
              {/*Display the Tbale row based on data recieved*/}
              {details}
            </tbody>
          </table>
        </div>
        <div style={{ marginTop: "20px" }}>
          <Footer footdata={this.props.footdata} />
        </div>
      </div>
    );
  }
}
export default withApollo(MyTrips);
