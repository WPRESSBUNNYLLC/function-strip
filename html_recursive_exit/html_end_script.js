
/*
 determines the end of an opening script tag, opening up being able to access the function. called from iterate or script function in main
*/

var data_ = '';
var data_index_ = 0;
var line_number_ = 0;

function html_end_script(data, data_index, line_number) { 
 data_ = data;
 data_index_ = data_index;
 line_number_ = line_number;
 recurse(data_index_);
}

function recurse(data_index_) { 

}

module.exports = html_end_script;