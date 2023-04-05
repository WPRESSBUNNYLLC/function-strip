
/*
 determines when ending a single line comment
*/

var data_ = '';
var data_index_ = 0; 

function singleline(data, data_index) { 
 data_ = data;
 data_index_ = data_index;
 recurse(data_index_);
}

function recurse() { 

}

module.exports = singleline;