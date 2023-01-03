var express = require('express');
var router = express.Router();

const https = require("https");
const app = express();

//require('dotenv').config();
const bodyParser = require('body-parser');

const cors = require("cors");
app.use(cors());

router.get("/:location", function (req, res) {
  console.log("params: ", req.params)

  var yelp_url = "";
  response_Data = "";
  var location = req.params.location;

  googleGeocodeApi_base_url =
    "/maps/api/geocode/json?key=AIzaSyCTZrS1fhq6KRB9V3ueEScDxFDCEtheemk&address=" + location
  ;

  encoded_url = encodeURI(googleGeocodeApi_base_url);
  console.log("final query url...", googleGeocodeApi_base_url)

  var config = {
    host: "maps.googleapis.com",
    path: encoded_url,
  };

  https.get(config, function(response) {
    response.on("data", function(data) {
      response_Data += data;
    });
    response.on("end", function(){
      console.log(response_Data);
      response_Data = JSON.parse(response_Data);
      res.send(response_Data);
    });
  });
});

module.exports = router;
