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
var bl = require('bl')
var http = require('http')
var listUrls = process.argv.slice(2);
var temp = 0
container = []

for (var i = 0; i < listUrls.length; i++) {
    urlpath = listUrls[i]

    http.get(urlpath, function(response) {
        response.setEncoding('utf8')
        response.pipe(bl(function(err, data) {
            container[i] = data;
            temp++;
        }))
        console.log(container)
        // re_count = 0
        // for(var j = 0; j < 3; j++) {
        //     console.log(container)
        //     if(container[j] != null)
        //         re_count++;
        // }
        // console.log(re_count)
        // if(re_count == 3) {
        //     container.forEach(function(data){
        //         console.log(data.toString());
        //     })
        // }
    })
}