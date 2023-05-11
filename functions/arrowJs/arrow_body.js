
/*
 builds the function body
*/

let update_function_and_update_data = require('../data');
let double_quote_string = require('generate/functions/arrowJs/script_recursive_exit/double_quote_string');
let single_quote_string = require('generate/functions/arrowJs/script_recursive_exit/single_quote_string');
let multiline_comment = require('generate/functions/arrowJs/script_recursive_exit/multiline_comment');
let singleline_comment = require('generate/functions/arrowJs/script_recursive_exit/singleline_comment');
let template_string = require('generate/functions/arrowJs/script_recursive_exit/template_string');
let regex = require('generate/functions/arrowJs/script_recursive_exit/regex');

let data_index_ = 0;
let line_number_ = 0;
let original_line_number = '';
let in_function_build_string_ = ''; 
let beginning_bracket_count = 0;
let ending_bracket_count = 0;
let data_index_and_line_number_update = {};
let single_statement_ = [];
let single_statement_index = 0;

function build_body_of_function(data_index, line_number) {
 data_index_ = data_index;
 line_number_ = line_number;
 original_line_number = line_number;
 in_function_build_string_ = '';
 single_statement_ = [''];
 single_statement_index = 0;
 check_if_single_statement_or_bracket_function(data_index_);
 return end();
}

function check_if_single_statement_or_bracket_function(data_index_) { 

 if(data_index_ > data_.length) {
  throw new Error(
   "Error: The function in the document has not ended. End of file error \n" + 
   "line number: " + original_line_number
  )
 }

 in_function_build_string_ += update_function_and_update_data.data.charAt(data_index_); 

 if(update_function_and_update_data.data.charAt(data_index_) === '\n') { 
  line_number_ += 1;
 }

 if(
  update_function_and_update_data.data.charAt(data_index_) !== '\n' && 
  update_function_and_update_data.data.charAt(data_index_) !== ' ' && 
  update_function_and_update_data.data.charAt(data_index_) !== '{'
 ) { 
  single_statement_[single_statement_index] = update_function_and_update_data.data.charAt(data_index_);
  data_index_ += 1;
  single_statement(data_index_);
  return;
 }

 if(update_function_and_update_data.data.charAt(data_index_) === '{') { 
  beginning_bracket_count += 1;
  data_index_ += 1;
  recurse(data_index_);
  return;
 } 

 data_index_ += 1; 
 return check_if_single_statement_or_bracket_function(data_index_);

}

function recurse(data_index_) { 

 if(data_index_ > data_.length) {
  throw new Error(
   "Error: The function in the document has not ended. End of file error \n" + 
   "line number: " + original_line_number
  )
 }

 in_function_build_string_ += update_function_and_update_data.data.charAt(data_index_); 

 if(update_function_and_update_data.data.charAt(data_index_) === '\n') { 
  line_number_ += 1;
 }

 if(update_function_and_update_data.data.charAt(data_index_) === '"') {
  data_index_ += 1;
  data_index_and_line_number_update = double_quote_string(data_index_, true, line_number_, false);
  update();
  return recurse(data_index_);
 }

 if(update_function_and_update_data.data.charAt(data_index_) === "'") {
  data_index_ += 1;
  data_index_and_line_number_update = single_quote_string(data_index_, true, line_number_, false);
  update();
  return recurse(data_index_);
 }

 if(update_function_and_update_data.data.charAt(data_index_) === '`') { 
  data_index_ += 1;
  data_index_and_line_number_update = template_string(data_index_, true, line_number_);
  update();
  return recurse(data_index_);
 }

 if(
  update_function_and_update_data.data.charAt(data_index_) === '/' && 
  update_function_and_update_data.data.charAt(data_index_ + 1) === '/'
 ) {
  in_function_build_string_ += '/';
  data_index_ += 2;
  data_index_and_line_number_update = singleline_comment(data_index_, true, line_number_);
  update();
  return recurse(data_index_);
 }

 if(
  update_function_and_update_data.data.charAt(data_index_) === '/' && 
  update_function_and_update_data.data.charAt(data_index_ + 1) === '*'
 ) {
  in_function_build_string_ += '*';
  data_index_ += 2;
  data_index_and_line_number_update = multiline_comment(data_index_, true, line_number_);
  update();
  return recurse(data_index_);
 }

 if(
  update_function_and_update_data.data.charAt(data_index_) === '/' &&
  update_function_and_update_data.data.charAt(data_index_ + 1) !== '/'  && 
  update_function_and_update_data.data.charAt(data_index_ + 1) !== '*' 
 ) { 
  in_function_build_string_ += update_function_and_update_data.data.charAt(data_index_ + 1);
  data_index_ += 2;
  data_index_and_line_number_update = regex(data_index_, true, line_number_);
  update();
  return recurse(data_index_);
 }

 if(update_function_and_update_data.data.charAt(data_index_) === '{') { 
  beginning_bracket_count += 1;
  data_index_ += 1;
  return recurse(data_index_);
 }

 if(update_function_and_update_data.data.charAt(data_index_) === '}') { 
  ending_bracket_count += 1;
  data_index_ += 1; 
  if(beginning_bracket_count === ending_bracket_count) { 
   return;
  }
  return recurse(data_index_);
 }

 data_index_ += 1; 
 return recurse(data_index_);

}

function update() {  
 data_index_ = data_index_and_line_number_update.data_index_;
 line_number_ = data_index_and_line_number_update.line_number_;
 in_function_build_string_ += data_index_and_line_number_update.build_string;
}

function single_statement(data_index_) {} //build a single statement and return

function end() { 
 return {
  ending_data_index: data_index_, 
  ending_line_number: line_number_, 
  build_string: in_function_build_string_,
 } 
}

module.exports = build_body_of_function;