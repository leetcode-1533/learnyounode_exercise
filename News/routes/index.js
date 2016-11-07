var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});


var mongoose = require('mongoose');
require('../models/Comments');
require('../models/Posts');
var Post = mongoose.model('Post');
var Comment = mongoose.model('Comment');

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

module.exports = router;
