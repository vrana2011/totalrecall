const winston = require('winston');
var express = require('express');
var bodyParser = require('body-parser');
var router = express.Router();
var datetime = require('node-datetime');

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

  var transcriptPost = req.body.transcript;
  winston.log('info', transcriptPost);
  
  var titleTS = "conversation_" + datetime.create().format('m/d/y H:M:S');
  
  db.Recordings.create({
    title: titleTS,
    transcript: transcriptPost
  }).then(recordings => {
    
    res.send('respond with a resource from post');

  }).catch((err) => {
    winston.log('error', err);
    res.sendStatus(400);
  });


  

});

module.exports = router;
