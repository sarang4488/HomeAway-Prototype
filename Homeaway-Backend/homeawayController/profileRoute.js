const express = require("express");
var kafka = require("../kafka/client");
var app = express.Router();

app.post("/converttravel", function(req, res) {
  console.log("Inside convert post request");
  console.log(req.body.email);
  kafka.make_request(
    "converttravel_topic",
    {
      email: req.body.email
    },
    function(err, result) {
      console.log("in result");
      // console.log(res, err);
      if (err) {
        res.sendStatus(400).end();
      } else {
        if (result.code == 200) {
          console.log(result);
          res.sendStatus(200).end();

          // done(null, { results: results.value });
        } else {
          console.log("fail");
          //done(null, false, { message: results.value });
        }
      }
    }
  );
});

app.post("/userdisplay", function(req, res) {
  console.log("Inside User Display Post Request");
  console.log("Req Body : ", req.body);
  kafka.make_request(
    "userdisplay_topic",
    {
      email: req.body.email
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

app.post("/userupdate", function(req, res) {
  console.log("Inside User Update Post Request");
  //console.log("Req Body : ", username + "password : ",password);
  console.log("Req Body : ", req.body);
  kafka.make_request(
    "userupdate_topic",
    {
      email: req.body.email,
      name: req.body.name,
      about: req.body.about,
      city: req.body.city,
      company: req.body.company,
      school: req.body.school,
      hometown: req.body.hometown,
      languages: req.body.languages,
      gender: req.body.gender
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

app.post("/updateEmail", function(req, res) {
  console.log("Inside User Update Post Request");
  console.log("Req Body : ", req.body);
  kafka.make_request(
    "updateEmail_topic",
    { email: req.body.email, currentEmail: req.body.currentEmail },
    function(err, result) {
      if (err) {
        res.sendStatus(400).end();
      } else {
        if (result.code == 200) {
          console.log("inside accountupdate branch", result.value);
          res
            .status(200)
            .json(result.value)
            .end("Account Updated");
        } else {
          res.value = "An Error occured";
          console.log(res.value);
          res.sendStatus(400).end();
        }
      }
    }
  );
});

app.post("/updatePassword", function(req, res) {
  console.log("Inside User Update Post Request");
  console.log("Req Body : ", req.body);
  kafka.make_request(
    "updatePassword_topic",
    {
      email: req.body.email,
      currentPassword: req.body.currentPassword,
      confirmPassword: req.body.confirmPassword
    },
    function(err, result) {
      console.log("in kafka passwordupdate result");
      console.log(result.code);
      if (err) {
        console.log("Function not executed!");
      } else {
        if (result.code == 200) {
          console.log("inside passwordupdate branch", result.value);
          res.json({
            success: true,
            code: result.code
          });
        } else if (result.code == 401) {
          res.value = "Password not matching";
          res.json({
            success: false,
            code: result.code
          });
        }
      }
    }
  );
});
module.exports = app;
