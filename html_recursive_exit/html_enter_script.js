
/*
 determines the end of an opening script tag, opening up being able to access the function.. called from html function in main
*/

var data_ = '';
var data_index_ = 0;
var in_function_ = false;

function html_enter_script(data, data_index, in_function) { 
 data_ = data;
 data_index_ = data_index;
 in_function_ = in_function;
 recurse(data_index_);
}

function recurse(data_index_) { 

}

module.exports = html_enter_script; //need an inscript additional param in object