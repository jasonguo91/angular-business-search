var express = require('express');
var router = express.Router();

const https = require("https");
const app = express();

//require('dotenv').config();
const bodyParser = require('body-parser');

const cors = require("cors");
app.use(cors());

//const api_key = process.env.YELP_API_KEY;
const api_key = '87HMETbGH1RdNiepFTLFgN1-7WSytnjQ4KyVI--vQaSz09vPpVyVSBhaIASTOR7HYX54UYqUNBI5Go4cyrtDDmXTe_j0KS8Ir6YdPn8VEFSd_nD4MJNKt94sTdUYY3Yx';

router.get("/:id/", function (req, res) {
  console.log("params: ", req.params)

  var yelp_url = "";
  response_Data = "";
  var id = req.params.id;

  yelp_url =
  "/v3/businesses/" + id + "/reviews";
  ;
  console.log("final query url...", yelp_url)

  var config = {
    host: "api.yelp.com",
    path: yelp_url,
    headers: {
      "Authorization": "Bearer 87HMETbGH1RdNiepFTLFgN1-7WSytnjQ4KyVI--vQaSz09vPpVyVSBhaIASTOR7HYX54UYqUNBI5Go4cyrtDDmXTe_j0KS8Ir6YdPn8VEFSd_nD4MJNKt94sTdUYY3Yx"
  }
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
