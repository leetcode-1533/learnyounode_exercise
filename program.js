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
var http = require('http')
http.get(process.argv[2], function(response){
    response.setEncoding("utf8")
    response.on("data", function(data) {
        console.log(data);
    });
});