
/*
 determines the exit of a template string... gets very funky
*/

var data_ = '';
var data_index_ = 0;
var in_function_ = false, in_function_build_string = '';

function template_string(data, data_index, in_function) { 
 data_ = data;
 data_index_ = data_index;
 in_function_ = in_function;
 recurse(data_index_);
}

function recurse(data_index_) { 

}

module.exports = template_string;