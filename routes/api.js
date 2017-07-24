var express = require('express');
var router = express.Router();
var https = require("https");

var username =  process.env.intrinio_username;
var password = process.env.intrinio_password;
var mongo_url = process.env.MONGODB_URI;

var auth = "Basic " + new Buffer(username + ':' + password).toString('base64');
var assert = require("assert");

var MongoClient = require('mongodb').MongoClient;
// Connection URL
var url = 'mongodb://localhost:27017/myproject';



/* GET home page. */
router.get('/pricing/:securityId', function(req, res, next) {
  var request = https.request({
    method: "GET",
    host: "api.intrinio.com",
    path: "/prices?ticker="+req.params.securityId,
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
        var companyPrice = {};
        companyPrice.prices = company.data;
        companyPrice._id = req.params.securityId;
        // Use connect method to connect to the server
        MongoClient.connect(mongo_url, function(err, db) {
          assert.equal(null, err);
          var collection = db.collection('prices');
          collection.save(companyPrice, function (err, result){
            assert.equal(null, err);
            console.log("Security with id:"+req.params.securityId+"priced correctly");
            db.close();
          });        
        });

        res.set('Content-Type', 'application/json');
        res.send(company);
        console.log(company);
    });
});

request.end();
  
});

module.exports = router;