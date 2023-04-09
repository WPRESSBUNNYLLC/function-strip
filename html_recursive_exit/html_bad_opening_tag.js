
/*
 determines the exit of a bad closing tag in an html document... whether opening or closing... this is for strings which contain the function keyword.... might not need this tag... comes from html function
*/

var data_ = '';
var data_index_ = 0;
var line_number_ = 0;

function html_bad_opening_tag(data, data_index, line_number) { 
 data_ = data;
 data_index_ = data_index;
 line_number_ = line_number;
 return recurse(data_index_);
}

function recurse(data_index_) { 

}

module.exports = html_bad_opening_tag;