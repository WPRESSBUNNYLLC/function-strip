
/*
 determines when ending a single quote string
 new RegExp(`["'\`].*(${_reImport}).*["'\`]`, "g");
*/

var update_function_and_update_data = require('../data');

var data_ = '';
var data_index_ = 0;
var in_function_ = false
var in_function_build_string_ = '';
var original_line_number = 0;
var line_number_ = 0;
var in_tag_ = false;
var in_tag_string = '';

function double_quote_string(data_index, in_function, line_number, in_tag) { 
 data_ = update_function_and_update_data.data;
 data_index_ = data_index;
 in_function_ = in_function;
 line_number_ = line_number;
 original_line_number = line_number;
 in_function_build_string_ = '';
 in_tag_ = in_tag;
 in_tag_string = '';
 return recurse(data_index_);
}

function recurse(data_index_) { 

 if(data_index_ > data_.length) {
  return {
   data_index: data_index_, 
   line_number: line_number_, 
   build_string: in_function_build_string_,
   tag_string: in_tag_string, 
   error: 'double quote string has not ended on line ' + original_line_number
  }
 }

 if(data_.charAt(data_index_) === '\n') { 
  line_number_ = line_number_ + 1;
 }

 if(in_function_ === true) { 
  in_function_build_string_ += data_.charAt(data_index_);
 }

 if(in_tag_ === true) { 
  in_tag_string += data_.charAt(data_index_);
 }

 if(
  data_.charAt(data_index_) === '"' && 
  ((data_.charAt(data_index_ - 1) !== '\\' && in_tag_ === false) || in_tag_ === true)
 ) { 
  data_index_ = data_index_ + 1; 
  return {
   data_index: data_index_, 
   line_number: line_number_,
   build_string: in_function_build_string_,
   tag_string: in_tag_string
  }
 }

 data_index_ = data_index_ + 1; 
 return recurse(data_index_);

} 

module.exports = double_quote_string;