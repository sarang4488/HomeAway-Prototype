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
      startDate: this.renderField1.value
    });
  };

  endDateChangeHandler = e => {
    this.setState({
      endDate: this.renderField2.value
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
    this.setState({
      authFlag: false
    });

    const data = {
      propertyname: this.props.location.state.propertydata
    };

    axios.defaults.withCredentials = true;
    console.log("propertyname :", data);

    axios
      .post("http://localhost:3001/search/displayproperty", data)
      .then(response => {
        if (response.status === 200) {
          this.setState({
            authFlag: true,
            PropertyStore: response.data
          });
        } else {
          this.setState({
            authFlag: false,
            message: "User Already Exist "
          });
        }
      });
  }

  renderField1(field) {
    const {
      meta: { touched, error }
    } = field;
    const className = `form-group ${touched && error ? "has-danger" : ""}`;

    return (
      <div className={className}>
        <input
          className="form-control"
          type="date"
          {...field.input}
          placeholder="Check in"
        />
        <div
          className="text-help"
          style={{
            backgroundColor: "#0067db",
            color: "white",
            textAlign: "center"
          }}
        >
          {touched ? error : ""}
        </div>
      </div>
    );
  }

  renderField2(field) {
    const {
      meta: { touched, error }
    } = field;
    const className = `form-group ${touched && error ? "has-danger" : ""}`;

    return (
      <div className={className}>
        <input
          className="form-control"
          type="date"
          {...field.input}
          placeholder="Check out"
        />
        <div
          className="text-help"
          style={{
            backgroundColor: "#0067db",
            color: "white",
            textAlign: "center"
          }}
        >
          {touched ? error : ""}
        </div>
      </div>
    );
  }

  renderField3(field) {
    const {
      meta: { touched, error }
    } = field;
    const className = `form-group ${touched && error ? "has-danger" : ""}`;

    return (
      <div className={className}>
        <input
          className="form-control"
          type="number"
          {...field.input}
          placeholder="Guests"
        />
        <div
          className="text-help"
          style={{
            backgroundColor: "#0067db",
            color: "white",
            textAlign: "center"
          }}
        >
          {touched ? error : ""}
        </div>
      </div>
    );
  }

  submitsearch(values) {
    console.log(values);
    if (localStorage.getItem("name")) {
      values.customername = localStorage.getItem("name");
      values.propertyname = this.props.location.state.propertydata;
      values.total = this.state.total;
      values.description = this.state.PropertyStore[0].description;
      this.props.booking(values, () => {
        this.props.history.push("/trips");
      });
    } else {
      this.setState({
        check: true
      });
    }
  }
  // onFormChange = e => {
  //   const { fieldValue1, fieldValue2, fieldValue3 } = this.props.fields;
  //   console.log(fieldValue1.value, fieldValue2.value, fieldValue3.value);
  // };

  sendMessage = e => {
    e.preventDefault();

    const data = {
      customername: localStorage.getItem("name"),
      propertyname: this.props.location.state.propertydata,
      message: this.state.message,
      ownername: this.state.PropertyStore[0].ownername
    };
    console.log(data);
    if (localStorage.getItem("name")) {
      axios.defaults.withCredentials = true;
      axios
        .post("http://localhost:3001/booking/questionfromtraveller", data)
        .then(response => {
          console.log("Status Code : ", response.status);
          console.log(response.data);
          if (response.data.code == 200) {
            this.setState({
              messageFlag: true
              //propArray: response.data
            });
          } else {
            this.setState({
              messageFlag: false
            });
          }
        })
        .catch(err => {
          this.setState({ messageFlag: false });
          console.log(err);
        });
    } else {
      this.setState({
        check: true
      });
    }
  };

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
    var tempout = new Date(this.props.enddate);
    var outdate = tempout.getDate();
    var tempin = new Date(this.props.startdate);
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
      const imgurl1 = require(`./uploads/${property.description}`);

      return (
        <div class="bookpropinfo container-fluid">
          <br />
          <div class="leftside col-md-7">
            <div class="imagecontainer">
              <img src={imgurl1} height="512px" width="800px" />
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
              <form onSubmit={handleSubmit(this.submitsearch.bind(this))}>
                <div className="form-group form-group-lg">
                  {/* <Field name="checkin" component={this.renderField1} />
                <Field name="checkout" component={this.renderField2} />
                <Field name="guests" component={this.renderField3} /> */}

                  <div class="bookcheckin col-md-6">
                    <span style={{ fontSize: "14px", color: "#5e6d77" }}>
                      Check In:
                    </span>
                    <Field
                      name="checkin"
                      onChange={this.startDateChangeHandler}
                      component={this.renderField1}
                    />
                    {/* <input
                    type="date"
                    class="form-control"
                    id="arr"
                    placeholder="Check In"
                    name="startdate"
                    onChange={this.startDateChangeHandler}
                  /> */}
                  </div>
                  <div class="bookcheckout col-md-6">
                    <span style={{ fontSize: "14px", color: "#5e6d77" }}>
                      Check Out:
                    </span>
                    <Field
                      name="checkout"
                      onChange={this.endDateChangeHandler}
                      component={this.renderField2}
                    />
                    {/* <input
                    type="date"
                    class="form-control"
                    id="dep"
                    placeholder="Check Out"
                    name="enddate"
                    onChange={this.endDateChangeHandler}
                  /> */}
                  </div>
                  <div class="bookguests col-md-12">
                    <Field
                      name="guests"
                      onChange={this.guestsChangeHandler}
                      component={this.renderField3}
                    />
                    {/* <input
                    type="text"
                    class="form-control"
                    id="loc"
                    placeholder="Guests:"
                    name="guests"
                    onChange={this.guestsChangeHandler}
                  /> */}
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
              <div class="askbutton col-md-12">
                <button
                  type="button"
                  class="btn btn-primary btn-lg col-md-12"
                  data-toggle="modal"
                  data-target="#inboxModal"
                  style={{ marginTop: "20px" }}
                >
                  Ask Owner a Question
                </button>
              </div>

              <div
                class="modal fade"
                id="inboxModal"
                role="dialog"
                position="relative"
                tabIndex="-1"
              >
                <div
                  class="modal-dialog modal-dialog-centered"
                  role="document"
                  position="relative"
                >
                  <div class="modal-content">
                    <div class="modal-header">
                      <button type="button" class="close" data-dismiss="modal">
                        &times;
                      </button>
                      <h4 class="modal-title">Ask your question</h4>
                    </div>
                    <div class="modal-body">
                      <div class="travelerinbox-area">
                        <textarea
                          type="text"
                          className="messageText"
                          name="message"
                          id="message"
                          onChange={this.askQuestionChangeHandler}
                          style={{ width: "500px", height: "200px" }}
                        />
                      </div>
                    </div>
                    <div class="modal-footer" style={{ textAlign: "center" }}>
                      <button
                        type="button"
                        class="askbtn1 btn-sm"
                        data-dismiss="modal"
                      >
                        Close
                      </button>
                      <button
                        type="submit"
                        class="askbtn1 btn-sm"
                        data-dismiss="modal"
                        onClick={this.sendMessage}
                      >
                        Send
                      </button>
                    </div>
                  </div>
                </div>
              </div>
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

function validate(values) {
  const errors = {};
  var date = moment().toDate();
  date = moment(date).format("YYYY-MM-DD");
  console.log(date);
  console.log(values.checkin);

  if (!values.checkin) {
    errors.checkin = "Enter Checkin Date";
  }
  if (!values.checkout) {
    errors.checkout = "Enter Checkout Date";
  }
  if (!values.guests) {
    errors.guests = "Enter Number of Guests";
  }
  if (values.checkin >= values.checkout) {
    errors.checkout = "Checkout date must be greater than checkin";
  }
  if (values.checkin < date) {
    errors.checkin = "Select a valid date";
  }
  if (values.checkout < date) {
    errors.checkout = "Select a valid date";
  }
  return errors;
}

Property = reduxForm({
  validate,
  form: "bookingForm",
  destroyOnUnmount: false,
  forceUnregisterOnUnmount: true,
  keepDirtyOnReinitialize: true
  // a unique identifier for this form
})(Property);
const selector = formValueSelector("bookingForm");
Property = connect(
  state => {
    // can select values individually
    let startdate = selector(state, "checkin");
    let enddate = selector(state, "checkout");

    return {
      startdate,
      enddate
    };
  },
  { booking }
)(Property);
// export default reduxForm({
//   validate,
//   form: "Booking",
//   destroyOnUnmount: false,
//   forceUnregisterOnUnmount: true,
//   keepDirtyOnReinitialize: true
// })(
//   connect(
//     null,
//     { homesearch }
//   )(Property)
// );
//export Home Component
export default Property;
