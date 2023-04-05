
/*
 determines when ending a single quote string
*/

var data_ = '';
var data_index_ = 0;
var in_function_ = false;
var line_number_ = 0;

function double_quote_string(data, data_index, in_function, line_number) { 
 data_ = data;
 data_index_ = data_index;
 in_function_ = in_function;
 line_number_ = line_number;
 recurse(data_index_);
}

function recurse() { 

} 

module.exports = double_quote_string;