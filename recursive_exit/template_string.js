
/*
 returns the end of a template string
*/

var data_ = '';
var data_index_ = 0;

function template_string(data, data_index) { 
 data_ = data;
 data_index_ = data_index;
 recurse(data_index_);
}

function recurse(data_index_) { 

}

module.exports = template_string;