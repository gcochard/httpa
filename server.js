'use strict';
var http = require('http')
  , https = require('https')
  , fs = require('fs')
  , cert = fs.readFileSync('certificate.pem')
  ;

// monkeypatch http.ServerResponse
require('./response');

function handler(req,res){
    
}
