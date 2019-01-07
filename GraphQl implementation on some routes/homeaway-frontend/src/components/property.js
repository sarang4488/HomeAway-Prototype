import React, { Component } from "react";
import "../App.css";
import axios from "axios";
import cookie from "react-cookies";
import { Redirect } from "react-router";
import { Link } from "react-router-dom";
import Navsearch from "./navsearch";
import Navproperty from "./navproperty";
import { Field, reduxForm, formValueSelector } from "redux-form";
import { connect } from "react-redux";
import { booking } from "../actions";
import { store } from "./main";
import DateTime from "react-datetime";
import { graphql, compose } from "react-apollo";
import { property } from "../queries/queries";
import { bookPropertyMutation } from "../mutation/mutations";
import { withApollo } from "react-apollo";
import { throwServerError } from "apollo-link-http-common";

var moment = require("moment");

class Property extends Component {
  constructor(props) {
    super(props);

    this.state = {
      PropertyStore: [],
      authFlag: false,
      imageView: [],
      propertyname: "",
      startDate: "",
      endDate: "",
      guests: "",
      bookflag: false,
      total: "",
      check: false,
      message: "",
      messageFlag: false
    };
  }

  startDateChangeHandler = e => {
    this.setState({
      startDate: e.target.value
    });
  };

  endDateChangeHandler = e => {
    this.setState({
      endDate: e.target.value
    });
  };

  guestsChangeHandler = e => {
    this.setState({
      guests: e.target.value
    });
  };

  askQuestionChangeHandler = e => {
    this.setState({
      message: e.target.value
    });
  };

  componentWillMount() {
    this.props.client
      .query({
        query: property,
        variables: {
          name: this.props.location.state.displayprop
        }
      })
      .then(res => {
        console.log("Traveler result query: ", res.data);
        this.setState({
          PropertyStore: [res.data.property]
        });
      });
  }

  submitsearch(e) {
    e.preventDefault();
    console.log(this.state);

    let response = this.props.bookPropertyMutation({
      variables: {
        checkin: this.state.startDate,
        checkout: this.state.endDate,
        guests: this.state.guests,
        price: this.state.total,
        customername: localStorage.getItem("name"),
        propertyname: this.state.PropertyStore[0].name,
        description: this.state.PropertyStore[0].propertydescription
      }
      // refetchQueries: [{ query: getBooksQuery }]
    });
    response.then(res => {
      console.log("Data is", res.data);
    });
    this.props.history.push("/trips");
  }

  // submitsearch(values) {
  //   console.log(values);
  //   if (localStorage.getItem("name")) {
  //     values.customername = localStorage.getItem("name");
  //     values.propertyname = this.props.location.state.propertydata;
  //     values.total = this.state.total;
  //     values.description = this.state.PropertyStore[0].description;
  //     this.props.booking(values, () => {
  //       this.props.history.push("/trips");
  //     });
  //   } else {
  //     this.setState({
  //       check: true
  //     });
  //   }
  // }

  render() {
    const { handleSubmit } = this.props;

    console.log(this.props);
    let redir = null;
    if (this.state.check) {
      redir = <Redirect to="/login" />;
    }
    console.log(this.state.messageFlag);
    if (this.state.messageFlag) {
      window.alert("Message sent successfully");
    }
    var tempout = new Date(this.state.endDate);
    var outdate = tempout.getDate();
    var tempin = new Date(this.state.startDate);
    var indate = tempin.getDate();
    if (indate && outdate) {
      var days = outdate - indate;
    } else {
      days = 0;
    }

    let price = this.state.PropertyStore.map(property => property.price)[0];
    this.state.total = price * days;

    let pricediv = (
      <div
        class="pricetotal col-md-12"
        style={{ marginTop: "10px", marginBottom: "10px" }}
      >
        <div class="total_text col-md-6">
          <h4>Total</h4>
        </div>
        <div class="total_price col-md-6">
          <h4>
            {" "}
            <span>$ {this.state.total}</span>
          </h4>
        </div>
      </div>
    );
    console.log("state transfer", this.props.location.state);
    let details = this.state.PropertyStore.map(property => {
      // const imgurl1 = require(`./uploads/${property.description}`);
      const imgurl = require("../homeaway.png");
      return (
        <div class="bookpropinfo container-fluid">
          <br />
          <div class="leftside col-md-7">
            <div class="imagecontainer">
              <img src={imgurl} height="512px" width="800px" />
            </div>
            <br />
            <div class="leftsidepropinfo">
              <div class="headlinebook">
                <h4>{property.name}</h4>
              </div>
              <br />
              <div class="location_text">
                {" "}
                <a href="#">
                  <span class="glyphicon glyphicon-map-marker" />
                </a>
                {property.location}
              </div>
              <div>{/* <img src="images/apartment.svg" /> */}</div>
              {/* <div>{property.guests}</div> */}
            </div>
          </div>
          <div class="rightside col-md-5" style={{ border: "1px solid #eee" }}>
            <div class="rental-price" style={{ marginLeft: "30px" }}>
              <div style={{ fontSize: "20px" }}>
                ${property.price}
                <span style={{ fontSize: "14px", color: "#5e6d77" }}>
                  &nbsp;per night
                </span>
              </div>
            </div>
            <br />
            <div class="bookform col-md-12">
              <form onSubmit={this.submitsearch.bind(this)}>
                <div className="form-group form-group-lg">
                  {/* <Field name="checkin" component={this.renderField1} />
                <Field name="checkout" component={this.renderField2} />
                <Field name="guests" component={this.renderField3} /> */}

                  <div class="bookcheckin col-md-6">
                    <span style={{ fontSize: "14px", color: "#5e6d77" }}>
                      Check In:
                    </span>

                    <input
                      type="date"
                      class="form-control"
                      id="arr"
                      placeholder="Check In"
                      name="startdate"
                      onChange={this.startDateChangeHandler}
                    />
                  </div>
                  <div class="bookcheckout col-md-6">
                    <span style={{ fontSize: "14px", color: "#5e6d77" }}>
                      Check Out:
                    </span>

                    <input
                      type="date"
                      class="form-control"
                      id="dep"
                      placeholder="Check Out"
                      name="enddate"
                      onChange={this.endDateChangeHandler}
                    />
                  </div>
                  <div class="bookguests col-md-12">
                    <input
                      type="text"
                      class="form-control"
                      id="loc"
                      placeholder="Guests:"
                      name="guests"
                      onChange={this.guestsChangeHandler}
                    />
                  </div>
                </div>
                {pricediv}
                <div
                  class="bookbutton col-md-12"
                  style={{ marginLeft: "19px" }}
                >
                  <button
                    type="submit"
                    class="btn btn-primary btn-lg col-md-11"
                  >
                    Book Now
                  </button>
                  <br />
                </div>
              </form>
            </div>
            <div
              class="assist col-md-12"
              style={{ marginLeft: "50px", marginTop: "20px" }}
            >
              <span style={{ fontSize: "14px", color: "#5e6d77" }}>
                For booking assistance, call{" "}
              </span>{" "}
              <strong style={{ fontSize: "16px" }}>888-829-7076</strong>
            </div>
          </div>
        </div>
      );
    });
    let redirectVar = null;
    return (
      <div>
        {redir}

        <div class="main-div2">
          <Navproperty
            navdata={this.props.navdata}
            style={{ backgroundColor: "white" }}
          />

          <div> {details}</div>
        </div>
      </div>
    );
  }
}

export default compose(
  graphql(bookPropertyMutation, { name: "bookPropertyMutation" })
)(withApollo(Property));
