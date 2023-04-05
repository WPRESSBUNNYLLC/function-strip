
/*
 determines when to end a regular expression
*/

var data_ = '';
var data_index_ = 0;
var in_function_ = false, in_function_build_string = '';

function regex(data, data_index, in_function) { 
 data_ = data;
 data_index_ = data_index;
 in_function_ = in_function;
 recurse(data_index_);
}

function recurse() { 

}

module.exports = regex;