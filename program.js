/**
 * Created by y1275963 on 10/18/16.
 */
/*
Challenge 3: synchronize IO
var fs = require('fs')

var buffer = fs.readFileSync(process.argv[2])
var string_buffer = buffer.toString()
var str_container = string_buffer.split('\n')
console.log(str_container.length - 1) // has one more element because don't have \n at the last line
*/

/*
asynchronize IO

var fs = require('fs')

function call_back(error, content) {
    var str_container = content.toString().split('\n')
    console.log(str_container.length - 1)
}

fs.readFile(process.argv[2], call_back)
 */

/*
Filtered LS
 */
// var fs = require('fs')
// function call_back(error, list) {
//     if (err) return console.error(err)
//
//     list.forEach(function(fi) {
//         if(fi.endsWith(".".concat(process.argv[3])))
//             console.log(fi);
//     });
// }
//
// fs.readdir(process.argv[2], call_back)

/*/
 Modularized
 */
//
// var mymodule = require('./module.js')
//
// mymodule(process.argv[2], process.argv[3], function(error, data){
//    data.forEach(function(filtered_file) {
//        console.log(filtered_file)
//    });
// });

/*
    Http Request
 */
// var http = require('http')
// http.get(process.argv[2], function(response){
//     response.setEncoding("utf8")
//     response.on("data", function(data) {
//         console.log(data);
//     });
// });

/*
    Http collect
 */
// var bl = require('bl')
// var http = require('http')
//
// http.get(process.argv[2], function(response) {
//     response.pipe(bl(function(err, data){
//         console.log(data.length);
//         console.log(data.toString())
//     }))
// })
/*
ASYNC
 */
// var bl = require('bl')
// var http = require('http')
// var listUrls = process.argv.slice(2);
// var container = []
// var temp = 0
//
// for (var i = 0; i < listUrls.length; i++) {
//     (function(i) {
//         var urlpath = listUrls[i]
//
//         http.get(urlpath, (function (response) {
//             response.setEncoding('utf8')
//             response.pipe(bl(function (err, data) {
//                 container[i] = data
//                 temp++;
//                 printAll()
//             }))
//         }))
//
//     })(i);
// }
//
// function printAll(){
//     if( temp == listUrls.length){
//         container.forEach(function(data){
//             console.log(data.toString());
//         });
//     }
// };

/*
TCP Time server
 */
// var net = require('net')
// var strftime = require('strftime')
// var listener = function(socket) {
//     // socket.write(strftime("%F %H:%M", new Date()))
//     socket.end(strftime("%F %H:%M\n", new Date()))
// }
//
// var server = net.createServer(listener);
// console.log("starting server at port " + process.argv[2])
//
// server.listen(process.argv[2])
/*
Http file server
 */
// var http = require('http')
// var fs = require('fs')
// var callback = function(request, response) {
//     var file_stream = fs.createReadStream(process.argv[3])
//     response.writeHead(200, {'content-type': 'text/plain'})
//     file_stream.pipe(response)
// }
//
// var server = http.createServer(callback)
// server.listen(process.argv[2])
/*
Http uppercase server
 */
var http = require('http')
var map = require('through2-map')
var callback = function(request, response) {
    request.pipe(map(function (chunk) {
        return chunk.toString().toUpperCase()
    })).pipe(response)
}
var server = http.createServer(callback)
server.listen(process.argv[2])