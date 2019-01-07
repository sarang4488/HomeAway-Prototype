import React, { Component } from "react";
import NavProfile from "./naveditprofile";
import cookie from "react-cookies";
import { Redirect } from "react-router";
import "../App.css";
import Footer from "./footer";
import axios from "axios";
import __ from "lodash";

class TravellerInbox extends Component {
  constructor(props) {
    super(props);
    this.state = {
      authFlag: false,
      messages: [],
      reply: "",
      messageFlag: false
    };
  }

  replyChangeHandler = e => {
    this.setState({
      reply: e.target.value
    });
  };

  componentWillMount() {
    this.setState({
      authFlag: false
    });
    const data = {
      customername: localStorage.getItem("name")
    };
    console.log(data);
    if (localStorage.getItem("name")) {
      axios.defaults.withCredentials = true;
      axios
        .post("http://localhost:3001/booking/travellerinbox", data)
        .then(response => {
          console.log("Status Code : ", response.status);
          console.log(response.data);
          if (response.data.code == 200) {
            this.setState({
              authflag: true,
              messages: response.data.value //propArray: response.data
            });
          } else {
            this.setState({
              authFlag: false
            });
          }
        })
        .catch(err => {
          this.setState({ authFlag: false });
          console.log(err);
        });
    } else {
      this.setState({
        authflag: false
      });
    }
  }

  // renderMessages() {
  //   let messages = this.state.messages;
  //   console.log(messages);

  //   return __.map(messages, message => {
  //     const customername = message.customername;
  //     const propertyname = message.propertyname;
  //     console.log(message.customername);
  //     return (
  //       <div class="askbutton " style={{ width: "30%", marginLeft: "500px" }}>
  //         <h5 style={{ marginTop: "40px" }}>
  //           Message from <strong>{message.customername}</strong> for your
  //           property <strong>{message.propertyname}</strong>
  //         </h5>
  //         <textarea
  //           type="text"
  //           className="messageText"
  //           name="message"
  //           id="message"
  //           value={message.messageCustomer}
  //           //onChange={this.replyChangeHandler}
  //           style={{
  //             width: "400px",
  //             height: "200px"
  //           }}
  //         />

  //         <button
  //           type="button"
  //           class="btn btn-primary btn-lg "
  //           data-toggle="modal"
  //           data-target="#inboxModal"
  //           style={{
  //             marginTop: "20px",
  //             marginBottom: "30px",
  //             marginLeft: "120px"
  //           }}
  //         >
  //           Reply to traveller
  //         </button>

  //         <div
  //           class="modal fade"
  //           id="inboxModal"
  //           role="dialog"
  //           position="relative"
  //           tabIndex="-1"
  //         >
  //           <div
  //             class="modal-dialog modal-dialog-centered"
  //             role="document"
  //             position="relative"
  //           >
  //             <div class="modal-content">
  //               <div class="modal-header">
  //                 <button type="button" class="close" data-dismiss="modal">
  //                   &times;
  //                 </button>
  //                 <h4 class="modal-title">Send your reply </h4>
  //               </div>
  //               <div class="modal-body">
  //                 <div class="travelerinbox-area">
  //                   <textarea
  //                     type="text"
  //                     className="messageText"
  //                     name="message"
  //                     id="message"
  //                     onChange={this.replyChangeHandler}
  //                     style={{ width: "500px", height: "200px" }}
  //                   />
  //                 </div>
  //               </div>
  //               <div class="modal-footer" style={{ textAlign: "center" }}>
  //                 <button
  //                   type="button"
  //                   class="askbtn1 btn-sm"
  //                   data-dismiss="modal"
  //                 >
  //                   Close
  //                 </button>
  //                 <button
  //                   type="submit"
  //                   class="askbtn1 btn-sm"
  //                   data-dismiss="modal"
  //                   onClick={() => this.sendMessage(customername, propertyname)}
  //                 >
  //                   Send
  //                 </button>
  //               </div>
  //             </div>
  //           </div>
  //         </div>
  //       </div>
  //     );
  //   });
  // }

  componentDidMount() {}

  render() {
    var redirect = null;
    if (!localStorage.getItem("type")) {
      redirect = <Redirect to="/login" />;
    }
    let message1 = Object.keys(this.state.messages).map(
      message => this.state.messages[message]
    );
    console.log(message1);
    let inbox = message1.map(message => {
      const customername = message.customername;
      const propertyname = message.propertyname;
      console.log(message.customername);
      console.log("test");
      console.log(message.propertyname);
      return (
        <div class="askbutton " style={{ width: "30%", marginLeft: "500px" }}>
          <h5 style={{ marginTop: "40px" }}>
            Message from <strong>{message.ownername}</strong> for your question
            on <strong>{message.propertyname}</strong>
          </h5>
          <textarea
            type="text"
            className="messageText"
            name="message"
            id="message"
            value={message.messageOwner}
            //onChange={this.replyChangeHandler}
            style={{
              width: "400px",
              height: "200px"
            }}
          />
        </div>
      );
    });
    //  renderMessages(){
    //   var messages = Object.keys(this.state.messages)
    //   return messages.map(message => {
    //     return
    //   })

    //  }

    return (
      <React.Fragment>
        {redirect}
        <div>
          <NavProfile navdata={this.props.navdata} />
        </div>
        <div style={{ backgroundColor: "silver" }}>
          <div style={{ textAlign: "center", fontSize: "30px" }}>
            Welcome, {localStorage.getItem("name")}
          </div>
          {inbox}

          <div style={{ marginTop: "100px" }}>
            <Footer footdata={this.props.footdata} />
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default TravellerInbox;
