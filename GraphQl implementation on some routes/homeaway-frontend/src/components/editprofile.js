import React, { Component } from "react";
import NavProfile from "./naveditprofile";
import cookie from "react-cookies";
import { Redirect } from "react-router";
import "../App.css";
import Footer from "./footer";
import axios from "axios";
import { userdetails } from "../queries/queries";
import { withApollo } from "react-apollo";
import { graphql, compose } from "react-apollo";
import { userUpdateMutation } from "../mutation/mutations";
class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      Traveller: [],
      email: "",
      name: "",
      firstname: "",
      lastname: "",
      about: "",
      city: "",
      company: "",
      school: "",
      hometown: "",
      languages: "",
      gender: "",
      // description: "",
      //selectedFile: "",
      authFlag: false
    };
    this.setState = this.setState.bind(this);
    this.fname = React.createRef();
    this.lname = React.createRef();
  }

  componentWillMount() {
    this.setState({
      authFlag: false,
      Traveller: []
    });
  }

  componentDidMount() {
    this.props.client
      .query({
        query: userdetails,
        variables: {
          name: localStorage.getItem("name")
        }
      })
      .then(res => {
        console.log("User result query: ", res.data);
        this.setState({
          Traveller: [res.data.userdetails]
        });
        this.setState({
          name: this.state.Traveller[0].name,
          email: this.state.Traveller[0].email,
          about: this.state.Traveller[0].about,
          city: this.state.Traveller[0].city,
          company: this.state.Traveller[0].company,
          school: this.state.Traveller[0].school,
          hometown: this.state.Traveller[0].hometown,
          languages: this.state.Traveller[0].languages,
          gender: this.state.Traveller[0].gender
        });
      });

    // if (localStorage.getItem("name")) {
    //   const data = {
    //     email: localStorage.getItem("email")
    //   };
    //   axios
    //     .post("http://localhost:3001/profile/userdisplay", data)
    //     .then(response => {
    //       console.log("Status Code : ", response.status);
    //       console.log("Status", response.data);
    //       if (response.status === 200) {
    //         console.log(response.data);
    //         this.setState({
    //           Traveller: [response.data]
    //         });
    //         //let name = this.state.Traveller[0].name.split(" ");
    //         // fname = name[0];
    //         // lname = name[1];
    //         this.setState({
    //           name: this.state.Traveller[0].name,
    //           email: this.state.Traveller[0].email,
    //           about: this.state.Traveller[0].about,
    //           city: this.state.Traveller[0].city,
    //           company: this.state.Traveller[0].company,
    //           school: this.state.Traveller[0].school,
    //           hometown: this.state.Traveller[0].hometown,
    //           languages: this.state.Traveller[0].languages,
    //           gender: this.state.Traveller[0].gender
    //         });
    //       }
    //       console.log("User Data", this.state.Traveller);
    //       console.log("User1 Data", response.data);
    //     });
    // }
  }

  emailChangeHandler = e => {
    this.setState({
      email: e.target.value
    });
  };
  nameChangeHandler = e => {
    this.setState({
      name: e.target.value
    });
  };

  firstnameChangeHandler = e => {
    this.setState({
      firstname: e.target.value
    });
  };
  lastnameChangeHandler = e => {
    this.setState({
      lastname: e.target.value
    });
  };

  aboutChangeHandler = e => {
    this.setState({
      about: e.target.value
    });
  };
  cityChangeHandler = e => {
    this.setState({
      city: e.target.value
    });
  };

  companyChangeHandler = e => {
    this.setState({
      company: e.target.value
    });
  };

  schoolChangeHandler = e => {
    this.setState({
      school: e.target.value
    });
  };

  hometownChangeHandler = e => {
    this.setState({
      hometown: e.target.value
    });
  };
  languagesChangeHandler = e => {
    this.setState({
      languages: e.target.value
    });
  };
  genderChangeHandler = e => {
    this.setState({
      gender: e.target.value
    });
  };

  //   onChange = (e) => {
  //     if(e.target.name === 'selectedFile'){
  //       this.setState({
  //         selectedFile: e.target.files[0]
  //       })
  //     }else{
  //       this.setState({ [e.target.name]: e.target.value });
  //     }
  // }

  submit = e => {
    e.preventDefault();
    console.log(this.state);

    let response = this.props.userUpdateMutation({
      variables: {
        email: localStorage.getItem("email"),
        name: this.state.name,
        about: this.state.about,
        city: this.state.city,
        company: this.state.company,
        school: this.state.school,
        hometown: this.state.hometown,
        languages: this.state.languages,
        gender: this.state.gender
      }
      // refetchQueries: [{ query: getBooksQuery }]
    });
    response.then(res => {
      console.log("Data is", res.data);
      window.location.reload(1);
    });
  };

  render() {
    var redirect = null;

    let details = this.state.Traveller.map(travel => {
      // let fname = "";
      // let lname = "";
      // if (travel.name != undefined) {
      //   let name = travel.name.split(" ");
      //   fname = name[0];
      //   lname = name[1];
      // }
      return (
        <div
          className="container profilemaindiv"
          style={{ border: "1px solid #d3d8de" }}
        >
          <div>
            <h3>{this.state.name}</h3>
          </div>
          <div style={{ padding: "20px" }}>
            <div id="profileheading">
              <h2>Profile Information</h2>
            </div>
            <form>
              <div className="inputdiv">
                <div class="row">
                  <div class="form-group form-group-lg col-md-6">
                    <label className="sr-only" for="firstname">
                      First Name
                    </label>
                    <input
                      type="text"
                      className="form-control "
                      id="name"
                      name="name"
                      placeholder="Name"
                      onChange={this.nameChangeHandler}
                      value={this.state.name}
                      style={{ backgroundColor: "white" }}
                    />
                  </div>
                </div>
                {/* <div class="row">
                  <div className="form-group form-group-lg col-md-6">
                    <label className="sr-only" for="lastname">
                      Last Name
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      name="lastname"
                      placeholder={lname}
                      onChange={this.lastnameChangeHandler}
                      value={this.state.lastname}
                      ref={this.lname}
                      style={{ backgroundColor: "white" }}
                    />
                  </div>
                </div> */}
                <div class="row">
                  <div className="form-group form-group-lg col-md-12">
                    <label className="sr-only" for="about">
                      About
                    </label>
                    <textarea
                      type="text"
                      className="form-control"
                      name="about"
                      placeholder="About"
                      value={this.state.about}
                      onChange={this.aboutChangeHandler}
                      style={{ backgroundColor: "white" }}
                    />
                  </div>
                </div>
                <div className="row">
                  <div className="form-group form-group-lg col-md-6">
                    <label className="sr-only" for="city">
                      City
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      name="city"
                      placeholder="City"
                      value={this.state.city}
                      onChange={this.cityChangeHandler}
                      style={{ backgroundColor: "white" }}
                    />
                  </div>
                </div>
                <div className="row">
                  <div className="form-group form-group-lg col-md-6">
                    <label className="sr-only" for="company">
                      Company
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      name="company"
                      placeholder="Company"
                      value={this.state.company}
                      onChange={this.companyChangeHandler}
                      style={{ backgroundColor: "white" }}
                    />
                  </div>
                </div>
                <div className="row">
                  <div className="form-group form-group-lg col-md-6">
                    <label className="sr-only" for="school">
                      School
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      name="school"
                      placeholder="School"
                      value={this.state.school}
                      onChange={this.schoolChangeHandler}
                      style={{ backgroundColor: "white" }}
                    />
                  </div>
                </div>
                <div className="row">
                  <div className="form-group form-group-lg col-md-6">
                    <label className="sr-only" for="hometown">
                      Hometown
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      name="hometown"
                      placeholder="Hometown"
                      value={this.state.hometown}
                      onChange={this.hometownChangeHandler}
                      style={{ backgroundColor: "white" }}
                    />
                  </div>
                </div>
                <div className="row">
                  <div className="form-group form-group-lg col-md-6">
                    <label className="sr-only" for="languages">
                      Languages
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      name="languages"
                      placeholder="Languages"
                      value={this.state.languages}
                      onChange={this.languagesChangeHandler}
                      style={{ backgroundColor: "white" }}
                    />
                  </div>
                </div>
                <div className="row">
                  <div className="form-group form-group-lg col-md-6">
                    <label className="sr-only" for="gender">
                      Gender
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      name="gender"
                      placeholder="Gender"
                      value={this.state.gender}
                      onChange={this.genderChangeHandler}
                      style={{ backgroundColor: "white" }}
                    />
                  </div>
                </div>
              </div>
              <button
                type="submit"
                className="btn btn-lg"
                onClick={this.submit}
                id="profilebutton"
              >
                Save Changes
              </button>
            </form>
          </div>
        </div>
      );
    });
    if (this.state.Traveller != "") {
      return (
        <React.Fragment>
          {redirect}
          <NavProfile
            navdata={this.props.navdata}
            style={{ backgroundColor: "white" }}
          />
          <div className="profilephoto" style={{ textAlign: "center" }}>
            {details}
          </div>

          <div style={{ marginTop: "100px" }}>
            <Footer footdata={this.props.footdata} />
          </div>
        </React.Fragment>
      );
    } else {
      return (
        <div>
          <NavProfile
            navdata={this.props.navdata}
            style={{ backgroundColor: "white" }}
          />
          {redirect}
          <div class="main-div">
            <h2>No results for this query</h2>
          </div>
          <div style={{ marginTop: "100px" }}>
            <Footer footdata={this.props.footdata} />
          </div>
        </div>
      );
    }
  }
}

export default compose(
  graphql(userUpdateMutation, { name: "userUpdateMutation" })
)(withApollo(Profile));
