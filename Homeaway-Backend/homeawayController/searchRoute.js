const express = require("express");
var kafka = require("../kafka/client");
var app = express.Router();
app.post("/homesearch", function(req, res) {
  console.log("Inside search post request");
  console.log("Search Criteria from user", req.body);
  console.log("check authenticastion", req.headers["authorization"]);

  kafka.make_request(
    "homesearch_topic",
    {
      location: req.body.location,
      checkin: req.body.checkin,
      checkout: req.body.checkout,
      guests: req.body.guests
    },
    function(err, result) {
      console.log("in result");
      // console.log(res, err);
      if (err) {
        res.sendStatus(400).end();
      } else {
        if (result.code == 200) {
          console.log("result is ", result);
          PropertyStore = [];

          for (var i = 0; i < result.value.length; i++) {
            PropertyStore[i] = result.value[i];
          }

          console.log("property store:", PropertyStore);
          res.redirect("/search/searchresult");
          console.log("redirect successful");
          // done(null, { results: results.value });
        } else {
          console.log("fail");
          //done(null, false, { message: results.value });
        }
      }
    }
  );
});

app.get("/searchresult", function(req, res) {
  console.log("Results found");
  res.writeHead(200, {
    "Content-Type": "application/json"
  });

  res.end(JSON.stringify(PropertyStore));
});

app.post("/displayproperty", function(req, res) {
  console.log("Inside Property Post Request");
  //console.log("Req Body : ", username + "password : ",password);
  console.log("Property to be displayed to  book is: ", req.body);
  kafka.make_request(
    "displayproperty_topic",
    {
      name: req.body.propertyname
    },
    function(err, result) {
      console.log("in result");
      // console.log(res, err);
      if (err) {
        res.sendStatus(400).end();
      } else {
        if (result.code == 200) {
          console.log(result);
          res.code = "200";
          res.value = result;
          res.end(JSON.stringify(result.value));
          console.log("successful display property done");
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
