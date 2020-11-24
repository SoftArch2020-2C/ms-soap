/*jslint node: true */
"use strict";

// SOAP client example

var soap = require('soap');
var url = 'http://localhost:3000/asignatures?wsdl';
var args = {id_usuario: 31};
var args2 = {CountryName: "United Kingdom"};
// var options = {endpoint: 'http://localhost:8000/wsdl'};


soap.createClient(url,function(err,client) {
    
    client.questions(args, function(err, result) {
       console.log(JSON.stringify(result));
        
    });


});