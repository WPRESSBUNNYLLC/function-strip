
/*
 determines the end of an opening script tag, opening up being able to access the function. called from iterate or script function in main
*/

var data_ = '';
var data_index_ = 0;
var in_function_ = false;

function html_end_script(data, data_index, in_function) { 
 data_ = data;
 data_index_ = data_index;
 in_function_ = in_function;
 recurse(data_index_);
}

function recurse(data_index_) { 

}

module.exports = html_end_script; //need an endscript additional param in object