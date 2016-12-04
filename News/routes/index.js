var express = require('express');
var router = express.Router();
var events = require('events');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});


var mongoose = require('mongoose');
require('../models/Comments');
require('../models/Posts');
require('../models/Quiz');

var MongoClinet = require('mongodb').MongoClient;
var ObjectId = require('mongodb').ObjectID;
var url = 'mongodb://kirasev:Kirasev101@ds159237.mlab.com:59237/sqlympics';

var Post = mongoose.model('Post');
var Comment = mongoose.model('Comment');
var Quiz = mongoose.model('Quiz');

var mysql = require('mysql');

var connection = mysql.createConnection({
  host     : 'olympicquiz.cziypygdpbbb.us-west-2.rds.amazonaws.com',
  user     : 'shahanimesh94',
  password : 'shahanimesh94',
  port     : '3306',
  database : 'olympic_quiz'
});

router.get('/test_http', function(req, res, next) {
  var EventEmitter = events.EventEmitter;
  var flowController = new EventEmitter();
  console.log(req.query.question_id);

  flowController.on('dowork', function(obj) {
    connection.query(obj["questionquery"], function (err, row) {
      connection.query(obj['options'], function (err, options) {
        if (err) console.log(err);
        console.log(obj['question']);
        res.json({"question":obj['question'],
          "answer":[row[0], options[0],options[1],options[2]]});
      });
    });
  });

  MongoClinet.connect(url, function(err, db) {
    var questions = db.collection('questions');
    questions.findOne({_id: ObjectId(req.query.question_id)}, function(err, obj) {
      flowController.emit('dowork', obj);
    })
  })

  flowController.on('finished', function () {
    console.log('finished');
  });
});

router.post('/posts', function(req, res, next) {
  var post = new Post(req.body);

  post.save(function(err, post){
    if(err){ return next(err); }

    res.json(post);
  });
});

var insertDocument = function(db, jsondata, callback) {
  db.collection('quizs').insertOne(jsondata, function(err, result) {
    console.log("Insertion Success");
    callback();
  });
};

router.post('/addquiz', function(req, res, next) {
  MongoClinet.connect(url, function(err, db) {
    insertDocument(db, req.body, function() {
      db.close();
    });
  });
});


router.get('/posts', function(req, res, next){
  Post.find(function(err, posts){
    if(err){return next(err); }

    res.json(posts);
  });
});

var getRandomDocument = function(db, res, num_questions, callback) {
  var questions = db.collection('questions');
  var query = {};
  var cursor = questions.find(query);

  // var total, random;
    questions.count(function(err, count) {
      var container = [];

      var random = Math.floor(Math.random()*count);
      cursor.sort({_id : -1});
      cursor.skip(random);
      cursor.limit(num_questions);

      cursor.each(function(err, item) {
        if(err) throw err;

        if(item == null) {
          res.send(container);
          return db.close();
        }

        container.push(item["_id"]);

        callback();
      });
  });
};

router.get('/quiz_list', function(req, res, next) {
  MongoClinet.connect(url, function(err, db) {
    if (err) throw err;

    getRandomDocument(db, res, 10, function() {
      // This is the callback function
    });
  });
});

router.param('post', function(req, res, next, id){
  var query = Post.findById(id);

  query.exec(function(err, post){
    if(err) {return next(err);}
    if(!post) {return next(new Error('Can\'t find post for id'))}

    req.post = post;
    return next();
  });
});

router.get('/posts/:post', function(req, res){
  res.send(req.params);
})

router.get('/newquestion/validateRightSql', function(req, res){
  connection.query(req.query['RightSql'], function(err, row) {
    if(err) {
      res.status(500).send(err);
      return;
    }
    if(row.length != req.query['Requiredlength']) {
      res.status(500).send("There Should be ".concat(req.query['Requiredlength']) + " Correct Answer whereas \n I got: ".concat(row.length.toString()).concat(" answers"));
      return;
    }
    res.status(201).send(row);
  })
});

router.post('/newquestion/addquiz', function(req, res, next) {
  MongoClinet.connect(url, function(err, db) {
    db.collection("questions").insertOne(req.body, function(err, result) {
      console.log(err);
      db.close();
    });
    // insertDocument(db, req.body, function() {
    //   db.close();
    // });
  });
});

module.exports = router;
