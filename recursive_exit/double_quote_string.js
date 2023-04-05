
/*
 determines when ending a single quote string
*/

var data_ = '';
var data_index_ = 0;

function double_quote_string(data, data_index) { 
 data_ = data;
 data_index_ = data_index;
 recurse(data_index_);
}

function recurse() { 

} 

module.exports = double_quote_string;