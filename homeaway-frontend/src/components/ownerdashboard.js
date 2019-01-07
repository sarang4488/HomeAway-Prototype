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
    this.handlePageChange = this.handlePageChange.bind(this);
  }
  componentDidMount() {
    const data = {
      name: this.state.name
    };
    //set the with credentials to true
    console.log("Inside Dashboard");
    this.props.fetchOwnerDashboard(data, () => {
      console.log("Successful");

      console.log(this.props.propertystate);
    });
    // axios.defaults.withCredentials = true;
    // //make a post request with the user data
    // axios.post("http://localhost:3001/ownerdashboard", data).then(response => {
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

  handlePageChange(page) {
    // console.log(`active page is ${pageNumber}`);
    // this.setState({activePage: pageNumber});
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
              // onClick={this.propertyChangeHandler}
              name="propertydata"
              data-value={property.name}
            >
              {property.name}
            </div>

            <div className="row2" style={{ fontSize: "16px" }}>
              <div style={{ display: "inline" }}>{property.type} | </div>
              <div style={{ display: "inline" }}>
                <strong> {property.bedrooms}</strong>
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
              $<span style={{ fontSize: "16px" }}>{property.price}</span> per
              night
            </div>
          </div>
        </div>
      );
    });

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
    //           {property.name}
    //         </td>
    //       </div>
    //     </div>
    //   );
    // });
  }
  render() {
    const { page, total, renderedProperty } = this.state;
    var redirect = null;
    if (
      !localStorage.getItem("type") ||
      localStorage.getItem("type") == "traveller"
    ) {
      redirect = <Redirect to="/login" />;
    }
    // if (!cookie.load("cookie")) {
    //   redirect = <Redirect to="/login" />;
    // }

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
              {/*Display the Tbale row based on data recieved*/}
              {this.renderProperties()}
            </tbody>
          </table>
          <Pagination
            margin={2}
            page={page}
            count={Math.ceil(this.state.total / 5)}
            onPageChange={this.handlePageChange}
          />
        </div>
        <div style={{ marginTop: "100px" }}>
          <Footer footdata={this.props.footdata} />
        </div>
      </React.Fragment>
    );
  }
}

function mapStateToProps(state) {
  return {
    propertystate: state.ownerdash
  };
}
export default connect(
  mapStateToProps,
  { fetchOwnerDashboard }
)(OwnerDashboard);
//export default OwnerDashboard;
