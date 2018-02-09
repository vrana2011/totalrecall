const winston = require('winston');
var express = require('express');
var bodyParser = require('body-parser');
var router = express.Router();
var datetime = require('node-datetime');
var algoliasearch = require('algoliasearch');
var algoliaclient = algoliasearch(process.env.ALGOLIASEARCH_APPLICATION_ID, process.env.ALGOLIASEARCH_API_KEY);

var jsonParser = bodyParser.json();
var db = require('../models');


/* GET recordings. */
router.get('/', function(req, res, next) {

  var q = req.query.q;
  winston.log('info', 'query string: ' + q);
  // find multiple entries

  /*db.Recordings.findAll({ include: [{ all: true }]}).then(recordings => {
    winston.log('info', "first transcript title: " + recordings[1].title);
    id = recordings[1].id;
  */
  var recordings = [];
  res.render('recordings', {recordingsList: recordings});
    
    /* db.Recordings.findById(id).then(oneRecording => {

      var recordingJSON = oneRecording.toJSON();
      console.log(recordingJSON);
      var index = algoliaclient.initIndex('recordingsIndex');

      index.addObject(recordingJSON, function(err, content) {
        console.log('objectID=' + content.objectID);
      });*/
    //})
    
    //res.send('respond with a resource');
  //});

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
  
  winston.log('info', titleTS);
  
  // TODO - remove sequelize sync
//  db.sequelize.sync().then(function() {
    db.Recordings.create({
      title: titleTS,
      transcript: transcriptPost
    }).then(recordings => {
      
      res.send('respond with a resource from post');

    }).catch((err) => {
      winston.log('info', "caught an error: " + err);
      res.sendStatus(400);
    });


//   }); 
  

});

module.exports = router;
