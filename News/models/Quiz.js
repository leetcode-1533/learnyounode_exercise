/**
 * Created by y1275963 on 11/11/16.
 */
var mongoose = require('mongoose');

var QuizSchema = new mongoose.Schema({
    sql_query: String,
    question: String
    // upvotes: {type: Number, default: 0},
    // comments: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Comment' }]
});

mongoose.model('Quiz', QuizSchema, 'quiz');