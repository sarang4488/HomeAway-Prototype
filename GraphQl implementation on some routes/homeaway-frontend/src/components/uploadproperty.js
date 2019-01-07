import React, { Component } from "react";
import "../App.css";
import axios from "axios";
import cookie from "react-cookies";
import { Redirect } from "react-router";
import NavDashboard from "./navdashboard";
import Footer from "./footer";
import traveldash from "../reducers/traveldash";

class UploadProperty extends Component {
  //call the constructor method
  constructor(props) {
    //Call the constrictor of Super class i.e The Component
    super(props);
    //maintain the state required for this component
    this.state = {
      name: "",
      propertydescription: "",
      location: "",
      checkin: "",
      checkout: "",
      type: "",
      guests: 0,
      bedroom: "",
      bathroom: "",
      message: "",
      description: "",
      selectedFile: "",
      price: "",
      amenities: "",
      authFlag: false,
      errorMessage: ""
    };
    //Bind the handlers to this class
    this.nameChangeHandler = this.nameChangeHandler.bind(this);
    this.locationChangeHandler = this.locationChangeHandler.bind(this);
    this.checkinChangeHandler = this.checkinChangeHandler.bind(this);
    this.checkoutChangeHandler = this.checkoutChangeHandler.bind(this);
    this.guestsChangeHandler = this.guestsChangeHandler.bind(this);
    this.submitProperty = this.submitProperty.bind(this);
  }
  //Call the Will Mount to set the auth Flag to false
  componentWillMount() {
    this.setState({
      authFlag: false,
      message: ""
    });
  }

  //username change handler to update state variable with the text entered by the user
  nameChangeHandler = e => {
    this.setState({
      name: e.target.value
    });
  };

  propertydescriptionChangeHandler = e => {
    this.setState({
      propertydescription: e.target.value
    });
  };
  //password change handler to update state variable with the text entered by the user
  locationChangeHandler = e => {
    this.setState({
      location: e.target.value
    });
  };
  //password change handler to update state variable with the text entered by the user
  checkinChangeHandler = e => {
    this.setState({
      checkin: e.target.value
    });
  };
  //password change handler to update state variable with the text entered by the user
  checkoutChangeHandler = e => {
    this.setState({
      checkout: e.target.value
    });
  };

  typeChangeHandler = e => {
    this.setState({
      type: e.target.value
    });
  };

  guestsChangeHandler = e => {
    this.setState({
      guests: e.target.value
    });
  };

  bedroomChangeHandler = e => {
    this.setState({
      bedroom: e.target.value
    });
  };
  bathroomChangeHandler = e => {
    this.setState({
      bathroom: e.target.value
    });
  };

  priceChangeHandler = e => {
    this.setState({
      price: e.target.value
    });
  };

  amenitiesChangeHandler = e => {
    this.setState({
      amenities: e.target.value
    });
  };

  //for setting image description
  onChange = e => {
    if (e.target.name === "selectedFile") {
      this.setState({
        selectedFile: e.target.files[0]
      });
    } else {
      this.setState({ [e.target.name]: e.target.value });
    }
  };

  //submit Property handler to send a request to the node backend
  submitProperty = e => {
    var headers = new Headers();
    //const { description, selectedFile } = this.state;
    let formData = new FormData();
    if (
      this.state.name == "" ||
      this.state.propertydescription == "" ||
      this.state.location == "" ||
      this.state.checkin == "" ||
      this.state.checkout == "" ||
      this.state.type == "" ||
      this.state.guests == "" ||
      this.state.bedroom == "" ||
      this.state.bathroom == "" ||
      this.state.price == "" ||
      this.state.amenities == "" ||
      this.state.description == "" ||
      this.state.selectedFile == ""
    ) {
      this.setState({
        errorMessage: "Please fill all the fields "
      });
    } else {
      //prevent page from refresh
      e.preventDefault();
      const data = {
        ownername: localStorage.getItem("name"),
        name: this.state.name,
        propertydescription: this.state.propertydescription,
        location: this.state.location,
        checkin: this.state.checkin,
        checkout: this.state.checkout,
        type: this.state.type,
        guests: this.state.guests,
        bedrooms: this.state.bedroom,
        bathrooms: this.state.bathroom,
        description: this.state.description,
        selectedFile: this.state.selectedFile,
        price: this.state.price,
        amenities: this.state.amenities
      };
      formData.append("description", data.description);
      formData.append("selectedFile", data.selectedFile);
      formData.append("selectedFile", data.name);

      //set the with credentials to true
      axios.defaults.withCredentials = true;
      //make a post request with the user data
      axios
        .post("http://localhost:3001/property/listproperty", data)
        .then(response => {
          console.log("Status Code : ", response.data);
          if (response.status === 200) {
            this.setState({
              authFlag: true
              // message:
              //   "Congratulations! Your property has been listed. Go to dashboard to view it"
            });
            axios
              .post("http://localhost:3001/property/image", formData)
              .then(result => {
                // access results...
              });
          } else {
            this.setState({
              authFlag: false,
              message: "Properry Already Exist "
            });
          }
        });
    }
  };

  render() {
    const { description, selectedFile } = this.state;
    //redirect based on successful login
    let redirectVar = null;
    // if (this.state.authFlag) {
    //   redirectVar = <Redirect to="/ownerdashboard" />;
    // }
    // var redirect = null;
    // if (
    //   !localStorage.getItem("type") ||
    //   localStorage.getItem("type") == "traveller"
    // ) {
    //   redirect = <Redirect to="/login" />;
    // }
    return (
      <div>
        <NavDashboard
          navdata={this.props.navdata}
          style={{ backgroundColor: "white" }}
        />
        <div class="container">
          <div class="login-form">
            <div class="main-div-login">
              <div>
                <h1 style={{ textAlign: "center" }}>List Your Property</h1>
                <h4 style={{ textAlign: "center" }}>
                  Please enter respective property details
                </h4>

                <p
                  style={{
                    fontSize: "24px",
                    color: "red",
                    // textAlign: "center",
                    padding: "6px"
                  }}
                >
                  {this.state.errorMessage}
                </p>
              </div>
              <div>
                <div class="form-group">
                  <input
                    onChange={this.nameChangeHandler}
                    type="text"
                    class="form-control"
                    name="name"
                    placeholder="Property Name"
                  />
                </div>

                <div class="form-group">
                  <input
                    onChange={this.propertydescriptionChangeHandler}
                    type="text"
                    class="form-control"
                    name="propertydescription"
                    placeholder="Property Description"
                  />
                </div>

                <div class="form-group">
                  <input
                    onChange={this.locationChangeHandler}
                    type="text"
                    class="form-control"
                    name="location"
                    placeholder="Location"
                  />
                </div>

                <div class="form-group">
                  <input
                    onChange={this.checkinChangeHandler}
                    type="Date"
                    class="form-control"
                    name="checkin"
                    placeholder="Available from"
                  />
                </div>
                <div class="form-group">
                  <input
                    onChange={this.checkoutChangeHandler}
                    type="Date"
                    class="form-control"
                    name="checkout"
                    placeholder="Available till"
                  />
                </div>
                <div class="form-group">
                  <input
                    onChange={this.typeChangeHandler}
                    type="text"
                    class="form-control"
                    name="type"
                    placeholder="Type"
                  />
                </div>

                <div class="form-group">
                  <input
                    onChange={this.guestsChangeHandler}
                    type="number"
                    class="form-control"
                    name="guests"
                    placeholder="Guests"
                  />
                </div>
                <div class="form-group">
                  <input
                    onChange={this.bedroomChangeHandler}
                    type="number"
                    class="form-control"
                    name="bedroom"
                    placeholder="Bedroom"
                  />
                </div>
                <div class="form-group">
                  <input
                    onChange={this.bathroomChangeHandler}
                    type="number"
                    class="form-control"
                    name="bathroom"
                    placeholder="Bathroom"
                  />
                </div>
                <div class="form-group">
                  <input
                    onChange={this.amenitiesChangeHandler}
                    type="text"
                    class="form-control"
                    name="amenities"
                    placeholder="Amenities"
                  />
                </div>

                <div class="form-group">
                  <input
                    class="form-control"
                    type="text"
                    name="description"
                    placeholder="Image name"
                    value={description}
                    onChange={this.onChange}
                    multiple
                  />
                </div>
                <div class="form-group">
                  <input
                    class="form-control"
                    type="file"
                    name="selectedFile"
                    placeholder="Images"
                    onChange={this.onChange}
                    multiple
                  />
                </div>
                <div class="form-group">
                  <input
                    onChange={this.priceChangeHandler}
                    type="number"
                    class="form-control"
                    name="price"
                    placeholder="Price"
                  />
                </div>
                <button onClick={this.submitProperty} class="btn btn-primary">
                  Submit
                </button>
              </div>
            </div>
          </div>
        </div>
        <div style={{ marginTop: "100px" }}>
          <Footer footdata={this.props.footdata} />
        </div>
      </div>
    );
  }
}
//export Login Component
export default UploadProperty;
