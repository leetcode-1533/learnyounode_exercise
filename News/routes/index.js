var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});


var mongoose = require('mongoose');
require('../models/Comments');
require('../models/Posts');
require('../models/Quiz');

var Post = mongoose.model('Post');
var Comment = mongoose.model('Comment');
var Quiz = mongoose.model('Quiz')

var mysql = require('mysql');
// var connection = mysql.createConnection({
//   socketPath: '/Applications/MAMP/tmp/mysql/mysql.sock',
//   user     : 'root',
//   password : 'y1562348',
//   database : 'fof'
// });
var connection = mysql.createConnection({
  host     : 'olympicquiz.cziypygdpbbb.us-west-2.rds.amazonaws.com',
  user     : 'shahanimesh94',
  password : 'shahanimesh94',
  port     : '3306',
  database : 'olympic_quiz'
});

// function query_list(res) {
//   query = "SELECT DISTINCT(login) FROM Family";
//   connection.query(query, function(err, rows) {
//     if (err) console.log(err);
//     else {
//       res.render('family_index.jade',
//           { title: "All Family Login ",
//             results: rows }
//       )
//     }
//   });
// }

router.get('/test_http', function(req, res) {
  // var test_query;

  Quiz.findOne({"_id": "58263d70444584131d257309"}, function(err, obj) {
    console.log(obj['sql_query']);
    console.log(obj['question']);
    connection.query(obj['sql_query'], function (err, rows) {
          res.send({results: rows});
        }
    );
  });
  // console.log(test_query);
  // // console.log(quiz);
  // // query = "SELECT DISTINCT gender FROM olympic_quiz.Athlete";
  // connection.query(query, function(err, rows) {
  //   if (err) console.log(err);
  //   else {
  //     // results.
  //     res.send({results: rows});
  //     // console.log(rows);
  //     // res.render('family_index.jade',
  //     //     { title: "All Family Login ",
  //     //       results: rows }
  //     // )
  //   }
});

router.post('/posts', function(req, res, next) {
  var post = new Post(req.body);

  post.save(function(err, post){
    if(err){ return next(err); }

    res.json(post);
  });
});

router.get('/posts', function(req, res, next){
  Post.find(function(err, posts){
    if(err){return next(err); }

    res.json(posts);
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
