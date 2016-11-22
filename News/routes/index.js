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
var url = 'mongodb://localhost:27017/news';

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

  Quiz.findOne({"_id": "58263d70444584131d257309"}, function(err, obj) {
    var temp = obj['sql_query'];
    flowController.emit('dowork', temp);
  })

  flowController.on('finished', function () {
    console.log('finished');
  });

  // Quiz.findOne({"_id": "58263d70444584131d257309"}, function(err, obj) {
  //   console.log(obj['sql_query']);
  //   console.log(obj['question']);
  //   connection.query(obj['sql_query'], function (err, rows) {
  //         res.send({results: rows});
  //       }
  //   );
  // });
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

var getRandomDocument = function(db, callback) {
  var questions = db.collection('sqlympics');
  var query = {};
  var cursor = questions.find(query);
  var total, random;
  var num_questions = 10;

  questions.count(function(err, count) {
    random = Math.floor(Math.random()*count);
    cursor.sort({_id : -1});
    cursor.skip(random);
    cursor.limit(num_questions);

    cursor.each(function(err, doc) {
      if(err) throw err;

      if(doc == null) {
        return db.close();
      }

      console.log(doc);
    });

    callback();
  });
};

router.get('/quiz_list', function(req, res, next) {
  MongoClinet.connect(url, function(err, db) {
    if (err) throw err;
    console.log('test');
    res.send('res test');
    res.end();
    db.close();
    // getRandomDocument(db, function() {
    //   db.close();
    // });
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
