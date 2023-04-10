
/*
 determines the end of an opening script tag, all i have to do is iterate until i find > 
*/

var data_ = '';
var data_index_ = 0;
var line_number_ = 0;

function html_enter_script(data, data_index, line_number) { 
 data_ = data;
 data_index_ = data_index;
 line_number_ = line_number;
 recurse(data_index_);
}

function recurse(data_index_) { 

}

module.exports = html_enter_script;