/**
 * Created by y1275963 on 10/30/16.
 */
var fs = require('fs')
var path = require('path')
module.exports = function(dir_name, file_ext, call_function){
    file_ext = '.' + file_ext;

    fs.readdir(dir_name, function(err, list) {
       if(err) {
           return call_function(err);
       }

        var filtered_data = []
        list.forEach(function(fi) {
            if(fi.endsWith(file_ext)){
                filtered_data.push(fi)
            }
        })

        call_function(null, filtered_data);
    });

};