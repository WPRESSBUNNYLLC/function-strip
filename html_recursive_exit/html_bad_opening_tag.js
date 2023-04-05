
/*
 determines the exit of a bad opening tag in an html document... whether opening or closing... this is for strings which contain the function keyword.. comes from html functioin
*/

var data_ = '';
var data_index_ = 0;
var in_function_ = false;
var line_number_ = 0;

function html_bad_opening_tag(data, data_index, in_function, line_number) { 
 data_ = data;
 data_index_ = data_index;
 in_function_ = in_function;
 line_number_ = line_number;
 recurse(data_index_);
}

function recurse(data_index_) { 

}

module.exports = html_bad_opening_tag;