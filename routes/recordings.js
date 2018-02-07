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

  var test = req.body.test;
  winston.log('info', test);
  res.send('respond with a resource from post');
  /*
  var bear = new Bear();      // create a new instance of the Bear model
  bear.name = req.body.name;  // set the bears name (comes from the request)

  // save the bear and check for errors
  bear.save(function(err) {
      if (err)
          res.send(err);

      res.json({ message: 'Bear created!' });
  });
  */
});

module.exports = router;
