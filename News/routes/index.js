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

router.get('/test_http', function(req, res) {
  var EventEmitter = events.EventEmitter;
  var flowController = new EventEmitter();


  flowController.on('dowork', function(sqlquery) {
    connection.query(sqlquery, function (err, rows) {
      res.send({results: rows});
    });
  });

  Quiz.findOne({"_id": req.body}, function(err, obj) {
    var temp = obj['sql_query'];
    flowController.emit('dowork', temp);
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

    getRandomDocument(db, res, 3, function() {
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
  // res.json(req.post);
})

module.exports = router;
