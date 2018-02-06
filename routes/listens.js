var SpeechToText = require('speech-to-text');

var express = require('express');
var router = express.Router();

/* GET listens. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

module.exports = router;
