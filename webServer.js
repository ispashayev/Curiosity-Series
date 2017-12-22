'use strict';

var express = require('express');
var portno = 3000;
var app = express();

/* TODO: Get rid of this monstrosity */
var primes = [2, 3, 5, 7, 11, 13, 17, 19, 23, 29, 31, 37, 41, 43, 47, 53, 59,
              61, 67, 71, 73, 79, 83, 89, 97, 101, 103, 107, 109, 113, 127, 131,
              137, 139, 149, 151, 157, 163, 167, 173, 179, 181, 191, 193, 197,
              199];

/* We have the express static module do all the work for us. */
app.use(express.static(__dirname));

app.get('/curiosities', function (request, response) {
  /* TODO: Implement this with a NoSQL database (i.e. MongoDB) */
  var curiosities = [];
  var goldbach = {
    link: 'goldbach',
    name: 'Goldbach Conjecture'
  };
  curiosities.push(goldbach);

  response.status(200).send(curiosities);
});

function getPrimeStructure(n) {
  var result = {
    success: false,
    message: 'Unable to find prime structure'
  };

  /* Simple brute force search. */
  for (var i = 0; i < primes.length; i++) {
    for (var j = i; j < primes.length; j++) {
      if (primes[i] + primes[j] === n) {
        result.primeOne = primes[i];
        result.primeTwo = primes[j];
        result.message = 'Successfully found the Goldbach Factors';
        result.success = true;
        break;
      }
    }
  }

  return result;

};

app.get('/curiosities/goldbach/:n', function(request, response) {
  var n = request.params.n ? parseInt(request.params.n) : undefined;
  if (n === undefined || n < 4 || n % 2 !== 0) {
    response.status(400).send();
    return;
  }
  /* Compute primes. */
  /* TODO: This is a super baby version just to make sure things are working on
           the front end. Implement this later on with a concurrently running
           Python server that executes a Fortran script. */
  var result = getPrimeStructure(n);
  response.status(200).send(result);
});

var server = app.listen(portno, function () {
  var port = server.address().port;
  console.log('Listening at http://localhost:' + port + ' exporting the directory ' + __dirname);
});
