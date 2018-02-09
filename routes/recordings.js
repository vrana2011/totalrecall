const winston = require('winston');
var express = require('express');
var bodyParser = require('body-parser');
var router = express.Router();
var datetime = require('node-datetime');
var algoliasearch = require('algoliasearch');
var algoliaclient = algoliasearch(process.env.ALGOLIASEARCH_APPLICATION_ID, process.env.ALGOLIASEARCH_API_KEY);

var jsonParser = bodyParser.json();
var db = require('../models');

var index = algoliaclient.initIndex('recordingsIndex');
index.setSettings({
  'searchableAttributes': [
    'transcript'
  ],
  'attributesToHighlight': [
    'transcript'
  ]
}, function(err, content) {
  winston.log('info', 'error ' + err);
}); 

/* GET recordings. */
router.get('/', function(req, res, next) {

  var q = req.query.q;
  winston.log('info', 'query string: ' + q);
  
  // search
  var recordings = [];
  if(q === null || typeof q === "undefined") {
    winston.log('info', 'query string null or undefined: ' + q);
    res.render('recordings', {recordingsList: recordings});
  } else {
    
    index.search({ query: q }, function searchDone(err, content) {
      if (err) {
        console.error(err);
        return;
      }
    
      for (var h in content.hits) {
        console.log(
          `Hit(${content.hits[h].objectID}): ${content.hits[h].transcript}`
        );
        var titleResult = content.hits[h].title;
        var transcriptResult = content.hits[h]._highlightResult.value;
        console.log('title: ' + titleResult);
        recordings.push([{title: titleResult, transcript: transcriptResult}]);
      }
      //console.log('recordings before render: ' + recordings[0].title);
      res.render('recordings', {recordingsList: recordings});
    });
    

  }
  
  // find multiple entries

  /*db.Recordings.findAll({ include: [{ all: true }]}).then(recordings => {
    winston.log('info', "first transcript title: " + recordings[1].title);
    id = recordings[1].id;
  */

    
    /* db.Recordings.findById(id).then(oneRecording => {

      var recordingJSON = oneRecording.toJSON();
      console.log(recordingJSON);
      

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

      var recordingJSON = recordings.toJSON();
      console.log(recordingJSON);
      

      index.addObject(recordingJSON, function(err, content) {
        console.log('objectID=' + content.objectID);
      });
      
      res.send('respond with a resource from post');

    }).catch((err) => {
      winston.log('info', "caught an error: " + err);
      res.sendStatus(400);
    });


//   }); 
  

});

module.exports = router;
