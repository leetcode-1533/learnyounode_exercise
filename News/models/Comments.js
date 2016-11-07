/**
 * Created by y1275963 on 11/6/16.
 */
var mongo = require('mongoose')

var CommentSchema = new mongo.Schema({
    body: String,
    author: String,
    upvotes: {type: Number, default: 0},
    post: { type: mongo.Schema.Types.ObjectId, ref: 'Post' }
});

mongo.model('Comment', CommentSchema);