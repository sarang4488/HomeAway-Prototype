import React, { Component } from "react";
import NavDashboard from "./navdashboard";
import cookie from "react-cookies";
import { Redirect } from "react-router";
import "../App.css";
import Footer from "./footer";
import axios from "axios";
import { connect } from "react-redux";
import { fetchOwnerDashboard } from "../actions";
import _ from "lodash";
import Pagination from "./pagination";
import { graphql, withApollo } from "react-apollo";
import { getOwnerProps } from "../queries/queries";

class OwnerDashboard extends Component {
  constructor(props) {
    super(props);
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
  }
  componentDidMount() {
    this.props.client
      .query({
        query: getOwnerProps,
        variables: {
          ownername: this.state.name
        }
      })
      .then(res => {
        console.log("Owner Dashboard result query: ", res.data.ownerproperties);

        this.setState({
          Properties: res.data.ownerproperties
        });
      });
  }

  render() {
    const { page, total, renderedProperty } = this.state;
    var redirect = null;

    // if (!cookie.load("cookie")) {
    //   redirect = <Redirect to="/login" />;
    // }
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
                    {property.name}
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
          </div>
        </div>
      );
    });
    //console.log(this.props.propertystate);
    //let details = this.props.propertystate.map(property => {
    // const imgurl = require(`./uploads/${property.description}`);
    // return (
    //   <div>
    //     <div class="col-sm-4">
    //       <figure>
    //         <img src={imgurl} height="300px" width="300px" />
    //       </figure>
    //       <td
    //         onClick={this.propertyChangeHandler}
    //         name="displayprop"
    //         data-attr={property.name}
    //         style={{ fontSize: "25px", textAlign: "center" }}
    //       >
    //         {property.name}
    //       </td>
    //     </div>
    //   </div>
    // );
    //});

    return (
      <React.Fragment>
        {redirect}
        <NavDashboard navdata={this.props.navdata} />
        <div
          class="main-div-listproperty"
          style={{
            marginTop: "20px",
            marginLeft: "100px"
          }}
        >
          <h2 style={{ textAlign: "center" }}>
            {" "}
            {localStorage.getItem("name")}, Here are your Properties
          </h2>
          <br />
          <table class="table">
            <thead />
            <tbody>
              {details}
              {/*Display the Tbale row based on data recieved*/}
            </tbody>
          </table>
        </div>
        <div style={{ marginTop: "100px" }}>
          <Footer footdata={this.props.footdata} />
        </div>
      </React.Fragment>
    );
  }
}

export default withApollo(OwnerDashboard);
