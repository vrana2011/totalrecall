const winston = require('winston');
var express = require('express');
var bodyParser = require('body-parser');
var router = express.Router();

var jsonParser = bodyParser.json();



/* GET recordings. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});


router.post('/', jsonParser, function(req, res, next) {
  
  winston.log('info', 'Hello log files from /recordings post!');

  if(!req.body || req.body.length === 0) {
    console.log('request body not found');
    return res.sendStatus(400);
  }

  var transcript = req.body.transcript;
  winston.log('info', transcript);
  res.send('respond with a resource from post');

});

module.exports = router;
