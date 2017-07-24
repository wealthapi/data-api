var express = require('express');
var router = express.Router();
var https = require("https");

var username =  process.env.intrinio_username;
var password = process.env.intrinio_password;
var auth = "Basic " + new Buffer(username + ':' + password).toString('base64');


/* GET home page. */
router.get('/pricing', function(req, res, next) {
  var request = https.request({
    method: "GET",
    host: "api.intrinio.com",
    path: "/prices?ticker=SPY",
    headers: {
        "Authorization": auth
    }
}, function(response) {
    var json = "";
    response.on('data', function (chunk) {
        json += chunk;
    });
    response.on('end', function() {
        var company = JSON.parse(json);
        res.set('Content-Type', 'application/json');
        res.send(company);
        console.log(company);
    });
});

request.end();
  
});

module.exports = router;