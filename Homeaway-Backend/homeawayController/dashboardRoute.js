const express = require("express");
var kafka = require("../kafka/client");
var app = express.Router();
app.post("/dashboard", function(req, res) {
  console.log("Inside Dashboard Display Post Request");
  console.log("Req Body : ", req.body);
  kafka.make_request(
    "dashboard_topic",
    {
      customername: req.body.name
    },
    function(err, result) {
      console.log("in result");
      // console.log(res, err);
      if (err) {
        res.sendStatus(400).end();
      } else {
        if (result.code == 200) {
          console.log(result);
          res.writeHead(200, {
            "Content-Type": "application/json"
          });
          console.log(JSON.stringify(result.value));
          res.end(JSON.stringify(result.value));

          // done(null, { results: results.value });
        } else {
          console.log("fail");
          //done(null, false, { message: results.value });
        }
      }
    }
  );
});

app.post("/ownerdashboard", function(req, res) {
  console.log("Inside Dashboard Display Post Request");
  console.log("Req Body : ", req.body);
  kafka.make_request(
    "ownerdashboard_topic",
    {
      ownername: req.body.name
    },
    function(err, result) {
      console.log("in result");
      // console.log(res, err);
      if (err) {
        res.sendStatus(400).end();
      } else {
        if (result.code == 200) {
          console.log(result);
          res.writeHead(200, {
            "Content-Type": "application/json"
          });
          res.end(JSON.stringify(result.value));

          // done(null, { results: results.value });
        } else {
          console.log("fail");
          //done(null, false, { message: results.value });
        }
      }
    }
  );
});

module.exports = app;
