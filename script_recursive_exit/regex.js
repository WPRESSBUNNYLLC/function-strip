
/*
 determines when to end a regular expression... gets funky
*/

let update_function_and_update_data = require('../data');

let data_ = '';
let data_index_ = 0;
let in_function_ = false
let in_function_build_string_ = '';
let line_number_ = 0;

//this will be a part of the others

function regex(data_index, in_function, line_number, build_string) { 
 data_ = update_function_and_update_data.data;
 data_index_ = data_index;
 in_function_ = in_function;
 in_function_build_string_ = build_string;
 line_number_ = line_number;
 return recurse(data_index_);
}

function recurse() { 

}

//escapes on regular expression /
//when in [], escapes on ] for counting... and not counting /
let a = /[\removeMe]/]/
let a = /\(regex\/ \/ []]]]][(/)\]] )/

module.exports = regex;