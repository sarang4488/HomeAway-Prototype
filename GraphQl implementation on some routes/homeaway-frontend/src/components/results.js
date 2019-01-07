import React, { Component } from "react";
import "../App.css";
import axios from "axios";
import cookie from "react-cookies";
import { Redirect } from "react-router";
import { Link } from "react-router-dom";
import Footer from "./footer";
import Navproperty from "./navproperty";
import { connect } from "react-redux";
import { fetchProperty } from "../actions";
import __ from "lodash";
import Pagination from "./pagination";
import Slider from "react-rangeslider";
import "react-rangeslider/lib/index.css";
import { graphql, compose } from "react-apollo";
import { getAuthorsQuery, getPropertiesQuery } from "../queries/queries";
import { addBookMutation } from "../mutation/mutations";

class Results extends Component {
  constructor(props) {
    super(props);
    this.state = {
      properties: [],
      authFlag: false,
      imageView: [],
      displayprop: ""
    };
    this.propertyChangeHandler = this.propertyChangeHandler.bind(this);
  }

  componentWillMount() {
    this.setState({
      authFlag: false
    });
  }

  propertyChangeHandler = e => {
    this.setState({
      displayprop: e.target.dataset.value
    });
    console.log("Successful test - ", this.state.displayprop);
  };

  componentDidMount() {}

  displayProperties() {
    var data = this.props.data;
    console.log(data);
    if (data.loading) {
      return <div>Loading properties...</div>;
    } else {
      return data.properties.map(property => {
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
                {property.type} | <strong>{property.bedrooms}</strong> BA |
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
    }
  }

  render() {
    let foot = <Footer data={this.props.data} />;

    // let details = this.state.properties.map(property => {
    //   const imgurl1 = require(`../uploads/${property.img}`);

    //   return (
    //     <div class="displaypropinfo container-fluid">
    //       <div class="col-sm-4">
    //         <img src={imgurl1} height="200px" width="430px" />
    //       </div>
    //       <div class="col-sm-8">
    //         <div class="headline">
    //           <h3 class="hit-headline">
    //             <a>
    //               <div
    //                 onClick={this.propertyChangeHandler}
    //                 name="displayprop"
    //                 data-value={property.Name}
    //               >
    //                 {property.Name}
    //               </div>
    //             </a>
    //           </h3>
    //         </div>
    //         <div class="propdetails">
    //           {property.Type} | <strong>{property.bednumber}</strong> BA |
    //           Sleeps <strong>{property.guests}</strong>
    //         </div>
    //         <div class="price-hit">
    //           <div class="subprice-hit">
    //             ${property.Price}{" "}
    //             <span style={{ fontSize: "12px" }}>per night</span>
    //           </div>
    //         </div>
    //       </div>
    //     </div>
    //   );
    // });
    // let redirectVar = null;
    if (this.state.displayprop != "") {
      this.props.history.push({
        pathname: "/property",
        state: {
          displayprop: this.state.displayprop
        }
      });
    }

    return (
      <div>
        <div class="main-div1" style={{ backgroundColor: "#F7F7F8" }}>
          <Navproperty
            navdata={this.props.navdata}
            style={{ backgroundColor: "white" }}
          />

          {/*Display the Tbale row based on data recieved*/}
          {this.displayProperties()}
        </div>
        {foot}
      </div>
    );
  }
}
export default graphql(getPropertiesQuery)(Results);
// class Results extends Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       PropertyStore: [],
//       authFlag: false,
//       propertydata: "",
//       page: 1,
//       renderedProperty: [],
//       total: "",
//       pricevalue: 0,
//       bedroomvalue: 0,
//       priceFlag: false,
//       bedroomnumberFlag: false
//     };
//     this.handlePageChange = this.handlePageChange.bind(this);
//     this.propertyChangeHandler = this.propertyChangeHandler.bind(this);

//     this.handleChangeComplete = this.handleChangeComplete.bind(this);
//     this.handleBedroomChangeComplete = this.handleBedroomChangeComplete.bind(
//       this
//     );
//   }

//   componentWillMount() {
//     this.setState({
//       authFlag: false
//     });
//   }

//   handlepriceChange = e => {
//     this.setState({
//       priceValue: e.target.value
//     });
//   };

//   handlebedroomChange = e => {
//     this.setState({
//       bedroomValue: e.target.value
//     });
//   };
//   propertyChangeHandler = e => {
//     this.setState({
//       propertydata: e.target.dataset.value
//     });
//   };

//   handleChange = value => {
//     this.setState({
//       pricevalue: value
//     });
//     // console.log(this.value);
//   };
//   handleChangeComplete() {
//     this.setState({
//       priceFlag: true
//     });
//   }
//   handleBedroomChange = value => {
//     this.setState({
//       bedroomvalue: value
//     });
//     // console.log(this.value);
//   };
//   handleBedroomChangeComplete() {
//     this.setState({
//       bedroomnumberFlag: true
//     });
//   }
//   compare = (a, b) => {
//     if (a.price < b.price) return -1;
//     if (a.price > b.price) return 1;
//     return 0;
//   };
//   comparebed = (a, b) => {
//     if (a.bedrooms < b.bedrooms) return -1;
//     if (a.bedrooms > b.bedrooms) return 1;
//     return 0;
//   };

//   filterSearchResults = e => {
//     e.preventDefault();
//     const data = {
//       location: this.state.location,
//       startDate: this.state.startDate,
//       endDate: this.state.endDate,
//       guests: this.state.guests
//     };
//     console.log(data);
//     axios.defaults.withCredentials = true;
//     axios
//       .post("http://localhost:3001/home", data)
//       .then(response => {
//         console.log("Status Code : ", response.status);
//         console.log(response.data);
//         if (response.status === 200) {
//           this.setState({
//             authFlag: true
//             //propArray: response.data
//           });
//         } else {
//           this.setState({
//             authFlag: false
//           });
//         }
//       })
//       .catch(err => {
//         this.setState({ error: true });
//         console.log(err);
//       });
//   };
//   handlePageChange(page) {
//     // console.log(`active page is ${pageNumber}`);
//     // this.setState({activePage: pageNumber});
//     const properties = Object.keys(this.props.propertyState).map(
//       property => this.props.propertyState[property]
//     );

//     const renderedProperty = properties.slice(
//       (page - 1) * 5,
//       (page - 1) * 5 + 5
//     );
//     console.log(renderedProperty);

//     this.setState({ page, renderedProperty });
//   }
//   componentDidMount() {
//     // axios.get("http://localhost:3001/searchresult").then(response => {
//     //   this.setState({
//     //     authFlag: true,
//     //     PropertyStore: response.data
//     //   });
//     //   console.log("Search :", this.state.PropertyStore);
//     // });

//     this.props.fetchProperty();
//   }

//   renderProperty() {
//     let properties = null;
//     let propertiesAll = null;
//     properties = Object.keys(this.props.propertyState)
//       .map(property => this.props.propertyState[property])
//       .slice(0, 5);
//     propertiesAll = Object.keys(this.props.propertyState).map(
//       property => this.props.propertyState[property]
//     );

//     if (this.state.priceFlag) {
//       properties = Object.keys(this.props.propertyState)
//         .map(property => this.props.propertyState[property])
//         .filter(property => property.price <= this.state.pricevalue)
//         .sort(this.compare)
//         .slice(0, 5);
//       propertiesAll = Object.keys(this.props.propertyState)
//         .map(property => this.props.propertyState[property])
//         .filter(property => property.price <= this.state.pricevalue)
//         .sort(this.compare);
//     }

//     if (this.state.bedroomnumberFlag) {
//       properties = Object.keys(this.props.propertyState)
//         .map(property => this.props.propertyState[property])
//         .filter(property => property.bedrooms <= this.state.bedroomvalue)
//         .sort(this.comparebed)
//         .slice(0, 5);
//       propertiesAll = Object.keys(this.props.propertyState)
//         .map(property => this.props.propertyState[property])
//         .filter(property => property.bedrooms <= this.state.bedroomvalue)
//         .sort(this.comparebed);
//     }
//     this.state.total = propertiesAll.length;
//     let finalProperty =
//       this.state.renderedProperty.length !== 0
//         ? this.state.renderedProperty
//         : properties;
//     return __.map(finalProperty, property => {
//       const imgurl1 = require(`./uploads/${property.description}`);
//       return (
//         <div
//           className="container-fluid"
//           style={{
//             width: "95%",
//             boxShadow: "0px 1px 3px rgba(0,0,0,.1)",
//             borderRadius: "5px",
//             marginBottom: "20px",
//             backgroundColor: "white"
//           }}
//         >
//           <div className="col-sm-2">
//             <img src={imgurl1} height="200px" width="210px" />
//           </div>
//           <div className="col-sm-10">
//             <a>
//               <div
//                 style={{
//                   fontWeight: "800",
//                   fontSize: "20px",
//                   lineHeight: "4px;",
//                   cursor: "pointer",
//                   color: "#0067db",
//                   marginTop: "20px",
//                   overflow: "hidden"
//                 }}
//                 onClick={this.propertyChangeHandler}
//                 name="propertydata"
//                 data-value={property.name}
//               >
//                 {property.name}
//               </div>
//             </a>
//             <div className="row2" style={{ fontSize: "16px" }}>
//               <div style={{ display: "inline" }}>{property.type} | </div>
//               <div style={{ display: "inline" }}>
//                 <strong> {property.bedrooms}</strong>
//                 &nbsp;BA |
//               </div>
//               <div style={{ display: "inline" }}>
//                 &nbsp;Sleeps &nbsp;
//                 <strong>{property.guests}</strong>
//               </div>
//             </div>
//             <div
//               style={{
//                 backgroundColor: "#f6f7f8",
//                 minHeight: "48px",
//                 padding: "25px 0px 0px 0px",
//                 marginTop: "80px"
//               }}
//             >
//               $<span style={{ fontSize: "16px" }}>{property.price}</span> per
//               night
//             </div>
//           </div>
//         </div>
//       );
//     });
//   }

//   submitregister(values) {
//     console.log(values);

//     this.props.tlogin(values, () => {
//       this.props.history.push("/");
//     });
//   }

//   render() {
//     const { page, total, renderedProperty } = this.state;
//     // let details = this.props.propertyState.map(property => {
//     //   const imgurl1 = require(`./uploads/${property.img}`);

//     //   return (
//     //     <div
//     //       className="container-fluid"
//     //       style={{
//     //         width: "95%",
//     //         boxShadow: "0px 1px 3px rgba(0,0,0,.1)",
//     //         borderRadius: "5px",
//     //         marginBottom: "20px",
//     //         backgroundColor: "white"
//     //       }}
//     //     >
//     //       <div className="col-sm-2">
//     //         <img src={imgurl1} height="200px" width="210px" />
//     //       </div>
//     //       <div className="col-sm-10">
//     //         <a>
//     //           <div
//     //             style={{
//     //               fontWeight: "800",
//     //               fontSize: "20px",
//     //               lineHeight: "4px;",
//     //               cursor: "pointer",
//     //               color: "#0067db",
//     //               marginTop: "20px",
//     //               overflow: "hidden"
//     //             }}
//     //             onClick={this.propertyChangeHandler}
//     //             name="propertydata"
//     //             data-value={property.name}
//     //           >
//     //             {property.name}
//     //           </div>
//     //         </a>
//     //         <div className="row2" style={{ fontSize: "16px" }}>
//     //           <div style={{ display: "inline" }}>{property.type} | </div>
//     //           <div style={{ display: "inline" }}>
//     //             <strong> {property.numberofbeds}</strong>
//     //             &nbsp;BA |
//     //           </div>
//     //           <div style={{ display: "inline" }}>
//     //             &nbsp;Sleeps &nbsp;
//     //             <strong>{property.guests}</strong>
//     //           </div>
//     //         </div>
//     //         <div
//     //           style={{
//     //             backgroundColor: "#f6f7f8",
//     //             minHeight: "48px",
//     //             padding: "25px 0px 0px 0px",
//     //             marginTop: "80px"
//     //           }}
//     //         >
//     //           $<span style={{ fontSize: "16px" }}>{property.price}</span> per
//     //           night
//     //         </div>
//     //       </div>
//     //     </div>
//     //   );
//     // });
//     let redirectVar = null;

//     if (this.state.propertydata != "") {
//       this.props.history.push({
//         pathname: "/property",
//         state: {
//           propertydata: this.state.propertydata
//         }
//       });
//     }
//     console.log(Object.keys(this.props.propertyState).length);
//     if (Object.keys(this.props.propertyState).length > 0) {
//       return (
//         <div>
//           {redirectVar}

//           <div class="main-div2" style={{ backgroundColor: "#f7f7f8" }}>
//             <Navsearch
//               navdata={this.props.navdata}
//               style={{ backgroundColor: "white" }}
//             />
//             <div class="filter container">
//               <div class="col-sm-2 price-filter">
//                 {/* <input type="range" min="0" max="1000" value={this.state.value} onChange={this.handleChange} onChangeComplete={this.handleChangeComplete}/> */}
//                 <div className="slider">
//                   Filter by Price :{" "}
//                   <Slider
//                     min={0}
//                     max={3000}
//                     value={this.state.pricevalue}
//                     onChange={this.handleChange}
//                     onChangeComplete={this.handleChangeComplete}
//                   />
//                 </div>
//                 <div class="pricevalue">{this.state.pricevalue}</div>
//               </div>

//               <div class="col-sm-2 bedroom-filter">
//                 {/* <input type="range" min="1" max="9" step="1" value={this.state.bedroomvalue} onChange={this.handlebedroomChange}/> */}
//                 <div className="slider">
//                   Filter by Bedrooms :{" "}
//                   <Slider
//                     min={0}
//                     max={10}
//                     value={this.state.bedroomvalue}
//                     onChange={this.handleBedroomChange}
//                     onChangeComplete={this.handleBedroomChangeComplete}
//                   />
//                 </div>
//                 <div class="bedroomvalue">{this.state.bedroomvalue}</div>
//               </div>
//             </div>
//             {/* <input
//               type="range"
//               min="0"
//               max="3000"
//               value={this.state.priceValue}
//               onChange={this.handlepriceChange}
//             />
//             <div>{this.state.priceValue}</div>
//             <input
//               type="range"
//               min="1"
//               max="9"
//               value={this.state.bedroomValue}
//               onChange={this.handlebedroomChange}
//             />
//             <div>{this.state.bedroomValue}</div>
//             <button
//               type="submit"
//               className="btn btn-lg"
//               onClick={this.filterSearchResults}
//             >
//               Apply Filters
//             </button> */}
//             {/*Display the Tbale row based on data recieved*/}
//             <div>{this.renderProperty()}</div>
//             <div>
//               <Pagination
//                 margin={2}
//                 page={page}
//                 count={Math.ceil(this.state.total / 5)}
//                 onPageChange={this.handlePageChange}
//               />
//             </div>
//           </div>
//           <div>
//             <Footer footdata={this.props.footdata} />
//           </div>
//         </div>
//       );
//     } else {
//       return (
//         <div>
//           <Navsearch
//             navdata={this.props.navdata}
//             style={{ backgroundColor: "white" }}
//           />
//           <div class="main-div1">
//             <h2 style={{ textAlign: "center" }}>
//               No properties available for this search.{" "}
//             </h2>
//             <h2 style={{ textAlign: "center" }}>
//               Please search again with different search criteria.{" "}
//             </h2>
//           </div>
//           <br />
//           <br />
//           <br />
//           <br />
//           <br />
//           <br />
//           <br />
//           <br />
//           <br />
//           <br />
//           <br />
//           <br />
//           <Footer footdata={this.props.footdata} />
//         </div>
//       );
//     }
//   }
// }

// function mapStateToProps(state) {
//   return {
//     propertyState: state.property
//   };
// }

// //export Home Component
// export default connect(
//   mapStateToProps,
//   { fetchProperty }
// )(Results);
