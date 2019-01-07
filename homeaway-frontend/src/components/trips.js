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
    this.handlePageChange = this.handlePageChange.bind(this);
    //Bind the handlers to this class
  }
  //get the books data from backend

  componentDidMount() {
    const data = {
      name: this.state.name
    };
    //set the with credentials to true
    console.log("Inside Dashboard");
    this.props.fetchTravelDashboard(data, () => {
      console.log("Successful");
      console.log(this.props.propertystate);
    });

    //make a post request with the user data
    // axios.post("http://localhost:3001/dashboard", data).then(response => {
    //   console.log("Status Code : ", response.data);
    //   if (response.status === 200) {
    //     //if response data from search is not 400 i.e. empty query
    //     this.setState({
    //       authFlag: true,
    //       Properties: response.data
    //     });
    //   } else {
    //     this.setState({
    //       authFlag: false,
    //       message: "Sorry! No properties avaliable for these" //message for empty query
    //     });
    //   }
    //   console.log("dasboard", this.state.Properties);
    // });
  }

  // propertyChangeHandler = e => {
  //   this.setState({
  //     displayprop: e.target.dataset.attr
  //   });
  //   console.log("Successful test - ", e.target.dataset.attr);
  //   console.log("Successful test 1- ", e.target.dataset);
  // };

  handlePageChange(page) {
    // console.log(`active page is ${pageNumber}`);
    // this.setState({activePage: pageNumber});
    console.log(this.props.propertystate);
    const properties = Object.keys(this.props.propertystate).map(
      property => this.props.propertystate[property]
    );

    const renderedProperty = properties.slice(
      (page - 1) * 5,
      (page - 1) * 5 + 5
    );
    console.log(renderedProperty);

    this.setState({ page, renderedProperty });
  }

  renderProperties() {
    console.log(this.props.propertystate);
    const properties = Object.keys(this.props.propertystate)
      .map(property => this.props.propertystate[property])
      .slice(0, 5);
    const propertiesall = Object.keys(this.props.propertystate).map(
      property => this.props.propertystate[property]
    );
    this.state.total = propertiesall.length;
    let finalProperty =
      this.state.renderedProperty.length !== 0
        ? this.state.renderedProperty
        : properties;
    return _.map(finalProperty, property => {
      const imgurl1 = require(`./uploads/${property.description}`);
      return (
        <div
          className="container-fluid"
          style={{
            width: "95%",
            boxShadow: "0px 1px 3px rgba(0,0,0,.1)",
            borderRadius: "5px",
            marginBottom: "20px",
            backgroundColor: "white"
          }}
        >
          <div className="col-sm-4">
            <img src={imgurl1} height="200px" width="380px" />
          </div>
          <div className="col-sm-8">
            <div
              style={{
                fontWeight: "800",
                fontSize: "20px",
                lineHeight: "4px;",
                // cursor: "pointer",
                color: "#0067db",
                marginTop: "20px",
                overflow: "hidden"
              }}
              //onClick={this.propertyChangeHandler}
              name="propertydata"
              data-value={property.propertyname}
            >
              {property.propertyname}
            </div>

            <div className="row2" style={{ fontSize: "16px" }}>
              <div style={{ display: "inline" }}>
                <strong> {property.guests + 1}</strong>
                &nbsp;BA |
              </div>
              <div style={{ display: "inline" }}>
                &nbsp;Sleeps &nbsp;
                <strong>{property.guests}</strong>
              </div>
            </div>
            <div
              style={{
                backgroundColor: "#f6f7f8",
                minHeight: "48px",
                padding: "25px 0px 0px 0px",
                marginTop: "80px"
              }}
            >
              $<span style={{ fontSize: "16px" }}>{property.price}</span>
            </div>
          </div>
        </div>
      );
    });
    // console.log(this.props.propertystate);
    // return _.map(this.props.propertystate, property => {
    //   const imgurl = require(`./uploads/${property.description}`);
    //   return (
    //     <div>
    //       <div class="col-sm-4">
    //         <figure>
    //           <img src={imgurl} height="300px" width="300px" />
    //         </figure>
    //         <td
    //           onClick={this.propertyChangeHandler}
    //           name="displayprop"
    //           data-attr={property.name}
    //           style={{ fontSize: "25px", textAlign: "center" }}
    //         >
    //           {property.propertyname}
    //         </td>
    //       </div>
    //     </div>
    //   );
    // });
  }
  render() {
    var redirect = null;
    if (!localStorage.getItem("name")) {
      redirect = <Redirect to="/login" />;
    }
    let redirectVar = null;
    const { page, total, renderedProperty } = this.state;
    if (this.state.displayprop !== "") {
      redirectVar = (
        <Redirect
          to={{
            pathname: "/property",
            state: {
              displayprops: this.state.displayprop
            }
          }}
        />
      );
    }

    // let details = this.state.Properties.map(property => {
    //   const imgurl = require(`./uploads/${property.description}`);
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
        {redirectVar}
        {redirect}
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
              {this.renderProperties()}
            </tbody>
          </table>
          <div>
            <Pagination
              margin={2}
              page={page}
              count={Math.ceil(this.state.total / 5)}
              onPageChange={this.handlePageChange}
            />
          </div>
        </div>
        <div style={{ marginTop: "20px" }}>
          <Footer footdata={this.props.footdata} />
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    propertystate: state.traveldash
  };
}
export default connect(
  mapStateToProps,
  { fetchTravelDashboard }
)(MyTrips);
