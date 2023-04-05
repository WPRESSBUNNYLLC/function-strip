
/*
 determines the exit of a bad closing tag in an html document... whether opening or closing... this is for strings which contain the function keyword.... might not need this tag
*/

var data_ = '';
var data_index_ = 0;

function html_bad_closing_tag(data, data_index) { 
 data_ = data;
 data_index_ = data_index;
 recurse(data_index_);
}

function recurse(data_index_) { 

}

module.exports = html_bad_closing_tag;