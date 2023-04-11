
/*
 determines the exit of a template string... gets very funky
*/

var update_function_and_update_data = ('./data');

var data_ = '';
var data_index_ = 0;
var in_function_ = false, in_function_build_string = '';

function template_string(data_index, in_function) { 
 data_ = update_function_and_update_data.data;
 data_index_ = data_index;
 in_function_ = in_function;
 return recurse(data_index_);
}

function recurse(data_index_) { 

}

module.exports = template_string;