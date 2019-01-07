const express = require("express");
var kafka = require("../kafka/client");
var app = express.Router();
const multer = require("multer");
const path = require("path");
const fs = require("fs");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, `../homeaway-frontend/src/components/uploads`);
  },
  filename: (req, file, cb) => {
    //const newFilename = `${req.body.description}${path.extname(file.originalname)}`;
    const newFilename = `${req.body.description}`;
    cb(null, newFilename);
  }
});

const upload = multer({ storage });
app.post("/listproperty", function(req, res) {
  console.log("Inside List your property");

  console.log("Req Body : ", req.body);

  kafka.make_request(
    "listproperty_topic",
    {
      ownername: req.body.ownername,
      name: req.body.name,
      propertydescription: req.body.propertydescription,
      location: req.body.location,
      checkin: req.body.checkin,
      checkout: req.body.checkout,
      guests: req.body.guests,
      price: req.body.price,
      type: req.body.type,
      bedrooms: req.body.bedrooms,
      bathrooms: req.body.bathrooms,
      description: req.body.description,
      amenities: req.body.amenities,
      img: req.body.description
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
          console.log("successful property added");
          // done(null, { results: results.value });
        } else {
          console.log("fail");
          //done(null, false, { message: results.value });
        }
      }
    }
  );
});

app.post("/image", upload.array("selectedFile", 4), (req, res) => {
  //console.log("Req : ",req);
  console.log("Res : ", res.file);
  res.send();
});

app.post("/download/:file(*)", (req, res) => {
  console.log("Inside download file");
  console.log(req.params);
  var file = req.params.file;
  var fileLocation = path.join(__dirname + "/uploads", file);
  var img = fs.readFileSync(fileLocation);
  var base64img = new Buffer(img).toString("base64");
  res.writeHead(200, { "Content-Type": "image/jpg" });
  res.end(base64img);
});
module.exports = app;
