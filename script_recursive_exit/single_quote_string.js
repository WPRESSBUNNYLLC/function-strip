
/*
 determines when ending a single quote string
*/

var data_ = '';
var data_index_ = 0;
var in_function_ = false;

function single_quote_string(data, data_index, in_function) { 
 data_ = data;
 data_index_ = data_index;
 in_function_ = in_function;
 recurse(data_index_);
}

function recurse() { 

} 

module.exports = single_quote_string;