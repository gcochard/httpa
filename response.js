'use strict';
var http = require('http')
  , fs = require('fs')
  , cert = fs.readFileSync('certificate.pem')
  ;

var Response = http.ServerResponse;

// proxy and override the end behavior
if(!Response.prototype.hasOwnProperty('_end')){
    Response.prototype._end = Response.prototype.end;
}
Response.prototype.end = function httpaEnd(body,encoding){
    this.encoding = encoding || this.encoding;
    this.signer.update(body);
    this.set('Httpa-Integrity',this.signer.sign(cert,'base64'));
    this._write(this.buffer,encoding);
    this._end.apply(this,arguments);
};

// proxy and override the write behavior
if(!Response.prototype.hasOwnProperty('_write')){
    Response.prototype._write = Response.prototype.write;
}
Response.prototype.write = function httpaWrite(body,encoding){
    this.signer.update(body);
    this.buffer += body;
    this.encoding = encoding;
};
