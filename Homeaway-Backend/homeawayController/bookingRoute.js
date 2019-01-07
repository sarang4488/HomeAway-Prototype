const express = require("express");
var kafka = require("../kafka/client");
var app = express.Router();
app.post("/bookproperty", function(req, res) {
  console.log("Inside List your property");
  //console.log("Req Body : ", username + "password : ",password);
  console.log("Req Body : ", req.body);
  kafka.make_request(
    "bookproperty_topic",
    {
      customername: req.body.customername,
      propertyname: req.body.propertyname,
      checkin: req.body.startDate,
      checkout: req.body.endDate,
      guests: req.body.guests,
      price: req.body.total,
      description: req.body.description
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
          res.end();
          console.log("successful booking done");
          // done(null, { results: results.value });
        } else {
          console.log("fail");
          //done(null, false, { message: results.value });
        }
      }
    }
  );
});

app.post("/questionfromtraveller", function(req, res) {
  console.log("Inside List your property");
  //console.log("Req Body : ", username + "password : ",password);
  console.log("Req Body : ", req.body);
  kafka.make_request(
    "questionfromtraveller_topic",
    {
      customername: req.body.customername,
      propertyname: req.body.propertyname,
      message: req.body.message,
      ownername: req.body.ownername
    },
    function(err, result) {
      console.log("in result");
      // console.log(res, err);
      if (err) {
        res.sendStatus(400).end();
      } else {
        if (result.code == 200) {
          console.log(result);
          res.json({
            success: true,
            code: result.code,
            value: result.value
          });
          console.log("successful message registered");
          // done(null, { results: results.value });
        } else {
          console.log("fail");
          //done(null, false, { message: results.value });
        }
      }
    }
  );
});

app.post("/ownerinbox", function(req, res) {
  console.log("Inside Owner inbox");
  //console.log("Req Body : ", username + "password : ",password);
  console.log("Req Body : ", req.body);
  kafka.make_request(
    "ownerinbox_topic",
    {
      ownername: req.body.ownername
    },
    function(err, result) {
      console.log("in result");
      // console.log(res, err);
      if (err) {
        res.sendStatus(400).end();
      } else {
        if (result.code == 200) {
          console.log("Result is", result);
          res.json({
            success: true,
            code: result.code,
            value: result.value
          });
          console.log("successful message registered");
          // done(null, { results: results.value });
        } else {
          console.log("fail");
          //done(null, false, { message: results.value });
        }
      }
    }
  );
});

app.post("/travellerinbox", function(req, res) {
  console.log("Inside Owner inbox");
  //console.log("Req Body : ", username + "password : ",password);
  console.log("Req Body : ", req.body);
  kafka.make_request(
    "travellerinbox_topic",
    {
      customername: req.body.customername
    },
    function(err, result) {
      console.log("in result");
      // console.log(res, err);
      if (err) {
        res.sendStatus(400).end();
      } else {
        if (result.code == 200) {
          console.log("Result is", result);
          res.json({
            success: true,
            code: result.code,
            value: result.value
          });
          console.log("successful message registered");
          // done(null, { results: results.value });
        } else {
          console.log("fail");
          //done(null, false, { message: results.value });
        }
      }
    }
  );
});

app.post("/replyfromowner", function(req, res) {
  console.log("Inside Owner inbox");
  //console.log("Req Body : ", username + "password : ",password);
  console.log("Req Body : ", req.body);
  kafka.make_request(
    "replyfromowner_topic",
    {
      customername: req.body.customername,
      propertyname: req.body.propertyname,
      reply: req.body.reply,
      ownername: req.body.ownername
    },
    function(err, result) {
      console.log("in result");
      // console.log(res, err);
      if (err) {
        res.sendStatus(400).end();
      } else {
        if (result.code == 200) {
          console.log("Result is", result);
          res.json({
            success: true,
            code: result.code,
            value: result.value
          });
          console.log("successful reply registered");
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
