/**
 * Created by y1275963 on 11/5/16.
 */
var express = require('express')
var app = express()
app.get('/', function(req, res) {
    res.send('Hello World')
})

app.get('/musician/:name', function(req, res) {

    // Get /musician/Matt
    console.log(req.params.name)
    // => Matt
    // res.writeHead(200, { 'Content-Type': 'application/json' })
    res.status(200).send('{"id": 1,"name":"Matt", "band":"BBQ Brawlers"}');
});

app.listen(8000)