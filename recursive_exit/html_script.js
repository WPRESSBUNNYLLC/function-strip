
/*
 determines the end of an opening script tag, opening up being able to access the function
*/

var data_ = '';
var data_index_ = 0;

function html_script(data, data_index) { 
 data_ = data;
 data_index_ = data_index;
 recurse(data_index_);
}

function recurse(data_index_) { 

}

module.exports = html_script;