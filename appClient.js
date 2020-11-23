/*jslint node: true */
"use strict";

// SOAP client example

var soap = require('soap');
var url = 'http://localhost:8000/wsdl?wsdl';
var args = {CityName: "moscow",CountryName: "Russia"};
var args2 = {CountryName: "United Kingdom"};
// var options = {endpoint: 'http://localhost:8000/wsdl'};


soap.createClient(url,function(err,client) {
  client.GetWeather(args,function(err, result) {
    console.log(result);
    console.log(client.describe());
  });
  client.GetCitiesByCountry(args2,function(err,result) {
    console.log(result);
    console.log(client.describe());
  });
});