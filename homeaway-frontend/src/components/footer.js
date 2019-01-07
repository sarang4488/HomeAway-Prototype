import React, { Component } from "react";
import "../App.css";

class Footer extends Component {
  render() {
    return (
      <React.Fragment>
        <div class="footer">
          <div class="container-fluid">
            <h3 class="heading" style={{ textAlign: "center" }}>
              Meet the HomeAway family
            </h3>
            <div class="row" style={{ marginLeft: "30px" }}>
              <a href="https://www.homeaway.com/">
                <div class="links col-sm-2">HomeAway</div>
              </a>
              <a href="https://www.vrbo.com/">
                {" "}
                <div class="links col-sm-2">VRBO </div>
              </a>
              <a href="https://www.vacationrentals.com/">
                {" "}
                <div class="links col-sm-2">VacationRentals.com</div>
              </a>
              <a href="https://www.homelidays.com/">
                <div class="links col-sm-2">Homelidays</div>
              </a>
              <a href="https://www.abritel.fr/">
                <div class="links col-sm-2">Abritel HomeAway</div>
              </a>
              <a href="https://www.fewo-direkt.de/">
                <div class="links col-sm-2">FeWo-direkt</div>
              </a>
              <a href="http://www.toprural.com/">
                <div class="links col-sm-2">Toprural</div>
              </a>
              <a href="https://www.bookabach.co.nz/">
                <div class="links col-sm-2">bookabach</div>
              </a>
              <a href="https://www.stayz.com.au/">
                <div class="links col-sm-2">stayz</div>
              </a>
              <a href="https://www.aluguetemporada.com.br/">
                <div class="links col-sm-2">AlugueTemporada</div>
              </a>
            </div>
            <br />
            <br />
          </div>

          <div
            class="container"
            style={{
              borderTop: "1px solid #9da9b3",
              color: "#a0a9b2",
              textAlign: "center"
            }}
          >
            <p
              class="endfootertext"
              style={{
                marginTop: "40px",
                fontSize: "16px",
                lineHeight: "1.5em"
              }}
            >
              Use of this website constitutes acceptance of the HomeAway.com{" "}
              <a
                href="https://www.homeaway.com/info/about-us/legal/terms-conditions"
                style={{ color: "white" }}
              >
                Terms and Conditions
              </a>{" "}
              and{" "}
              <a
                href="https://www.homeaway.com/info/about-us/legal/privacy-policy"
                style={{ color: "white" }}
              >
                Privacy Policy
              </a>
              .
            </p>
            <p />
            <p
              class="endfootertext"
              style={{ fontSize: "16px", lineHeight: "50px" }}
            >
              ©2006-Present HomeAway.com, Inc. All rights reserved.
            </p>
            <p class="endfootertext" style={{ fontSize: "12px" }}>
              97c359f7-d389-43f8-afd7-d2efffd1cc0c
            </p>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default Footer;
