'use strict';

var fs = require('fs');


var CSV = function() {
  this.hasHeader = false;
  this.header = [];
  this.body = [];
};

CSV.prototype.getHeader = function() {
    return this.header;
};

CSV.prototype.getBody = function() {
  return this.body;
};

CSV.prototype.setHeader = function(header) {
  this.header = header;
};

CSV.prototype.setBody = function(body) {
  this.body = body;
};

CSV.prototype.loadFile = function(dir) {
  var body = [],
      aux = [],
      data;

  data = fs.readFileSync(dir, 'utf8');

  body = data.replace(/,\s/g, ',').split('\n');
  if(body[body.length - 1] === '') {
    body.pop();
  }

  aux = body;

  for(var i = 0; i < body.length; i++) {
    var bodyTemporal = aux[i].split(',');
    for(var j = 0; j < bodyTemporal.length; j++) {
      body[i] = bodyTemporal;
    }
  }

  this.setBody(body);
  this.hasHeader = false;
}

CSV.prototype.loadFileWithHeader = function(dir) {
  var headers = [],
      body = [],
      data;

  data = fs.readFileSync(dir, 'utf8');

  var temporal = data.replace(/,\s/g, ',').split('\n');
  if(temporal[temporal.length - 1] === '') {
    temporal.pop();
  }

  headers = temporal[0].split(',');
  for(var i = 1; i < temporal.length; i++){
    var aux = temporal[i],
        elem = aux.split(','),
        line = {};

    for(var j = 0; j < headers.length; j++) {
      line[headers[j]] = elem[j];
    }
    body.push(line);
  }

  this.setCSV(headers, body);
  this.hasHeader = true;
};
/**
 *
 */
CSV.prototype.getRow = function(row) {
  if(row < 0 || row >= this.body.length) {
    throw 'Index out of bounds';
  }

  return this.body[row];
};

/**
 *
 */

CSV.prototype.getColumn = function(column) {
  var columnArray = [];
  if(this.header.length === 0) {
    throw 'There is no header defined';
  }

  if(this.getHeader().indexOf(column) === -1) {
    throw 'There is no header called '+ column;
  }

  if(this.body.length === 1) {
    return this.body[0][column];
  }

  for(var i = 0; i < this.body.length; i++) {
    columnArray.push(this.body[i][column]);
  }

  return columnArray;
};

var csv = new CSV();
try{
  csv.loadFile('file1.csv');
  console.log(csv.getBody());
  console.log(csv.getRow(0));
  // console.log(csv.getColumn('id'));
} catch(e) {
  console.log(e);
}
// csv.getLine(0).id;
