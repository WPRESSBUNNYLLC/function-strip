
/*
 builds the function body
*/

var update_function_and_update_data = require('../data');
var double_quote_string = require('./script_recursive_exit/double_quote_string');
var single_quote_string = require('./script_recursive_exit/single_quote_string');
var multiline_comment = require('./script_recursive_exit/multiline_comment');
var singleline_comment = require('./script_recursive_exit/singleline_comment');
var template_string = require('./script_recursive_exit/template_string');
var regex = require('./script_recursive_exit/regex');
var finish_first_statement = require('generate/functions/arrow/return_first_statement');

var data_index_ = 0;
var data_ = '';
var line_number_ = 0;
var original_line_number = '';
var in_function_build_string_ = ''; 
var beginning_bracket_count = 0;
var ending_bracket_count = 0;
var data_index_and_line_number_update = {};
var finish_first_ldb = {};
var is_enclosed = false;
var levels_deep_enclosed = 0;
var found_enclosing_ldb = {};
var found_opening_and_closing_invokable_ldb = {};
var found_enclosing = false; 
var found_opening_and_closing_invokable = false;

function build_body_of_function(data_index, line_number, closed, deep_enclosed) {
 data_ = update_function_and_update_data.data;
 data_index_ = data_index;
 line_number_ = line_number;
 original_line_number = line_number;
 in_function_build_string_ = '';
 is_enclosed = closed;
 levels_deep_enclosed = deep_enclosed;
 found_enclosing = false; 
 found_opening_and_closing_invokable = false;
 found_enclosing_ldb = {};
 found_opening_and_closing_invokable_ldb = {};
 return check_if_single_statement_or_bracket_function(data_index_);
}

function check_if_single_statement_or_bracket_function(data_index_) { 

 if(data_index_ > data_.length) {
  throw new Error(
   "Error: The function in the document has not ended. End of file error \n" + 
   "line number: " + original_line_number
  )
 }

 in_function_build_string_ += data_.charAt(data_index_); 

 if(data_.charAt(data_index_) === '\n') { 
  line_number_ = line_number_ + 1;
 }

 if(
  data_.charAt(data_index_) !== '\n' && 
  data_.charAt(data_index_) !== ' ' && 
  data_.charAt(data_index_) !== '{'
 ) { 
  data_index_ += 1;
  return finish_first_then_end();
 }

 if(data_.charAt(data_index_) === '{') { 
  beginning_bracket_count += 1;
  data_index_ += 1;
  return recurse(data_index_);
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

 in_function_build_string_ += data_.charAt(data_index_); 

 if(data_.charAt(data_index_) === '\n') { 
  line_number_ = line_number_ + 1;
 }

 if(data_.charAt(data_index_) === '"') {
  data_index_ = data_index_ + 1;
  data_index_and_line_number_update = double_quote_string(data_index_, true, line_number_, false);
  update();
  return recurse(data_index_);
 }

 if(data_.charAt(data_index_) === "'") {
  data_index_ = data_index_ + 1;
  data_index_and_line_number_update = single_quote_string(data_index_, true, line_number_, false);
  update();
  return recurse(data_index_);
 }

 if(data_.charAt(data_index_) === '`') { 
  data_index_ = data_index_ + 1;
  data_index_and_line_number_update = template_string(data_index_, true, line_number_);
  update();
  return recurse(data_index_);
 }

 if(
  data_.charAt(data_index_) === '/' && 
  data_.charAt(data_index_ + 1) === '/'
 ) {
  in_function_build_string_ += data_.charAt(data_index_ + 1);
  data_index_ = data_index_ + 2;
  data_index_and_line_number_update = singleline_comment(data_index_, true, line_number_);
  update();
  return recurse(data_index_);
 }

 if(
  data_.charAt(data_index_) === '/' && 
  data_.charAt(data_index_ + 1) === '*'
 ) {
  in_function_build_string_ += data_.charAt(data_index_ + 1);
  data_index_ = data_index_ + 2;
  data_index_and_line_number_update = multiline_comment(data_index_, true, line_number_);
  update();
  return recurse(data_index_);
 }

 if(data_.charAt(data_index_) === '/') { 
  in_function_build_string_ += data_.charAt(data_index_ + 1);
  data_index_ = data_index_ + 2;
  data_index_and_line_number_update = regex(data_index_, true, line_number_);
  update();
  return recurse(data_index_);
 }

 if(data_.charAt(data_index_) === '{') { 
  beginning_bracket_count += 1;
  data_index_ = data_index_ + 1; 
  return recurse(data_index_);
 }

 if(data_.charAt(data_index_) === '}') { 
  ending_bracket_count += 1;
  data_index_ = data_index_  + 1; 
  if(beginning_bracket_count === ending_bracket_count) { 
   if(is_enclosed === true) {
    initiate_enclosed_and_invoked(); //init with a switch
   }
   return end();
  }
  return recurse(data_index_);
 }

 data_index_ = data_index_ + 1; 
 return recurse(data_index_);

}

function update() {  
 data_index_ = data_index_and_line_number_update.data_index_;
 line_number_ = data_index_and_line_number_update.line_number_;
 in_function_build_string_ += data_index_and_line_number_update.build_string;
}

function finish_first_then_end() { 
 finish_first_ldb = finish_first_statement(data_index_, line_number_, in_function_build_string_); 
 data_index_ = finish_first_ldb.data_index_;
 line_number_ = finish_first_ldb.line_number_;
 in_function_build_string_ += finish_first_ldb.build_string;
 return end();
}

function end() { 
 return {
  data_index: data_index_, 
  line_number: line_number_, 
  build_string: in_function_build_string_,
  found_opening_and_closing_invokable: found_opening_and_closing_invokable,
  found_closing: found_enclosing
 } 
}

module.exports = build_body_of_function;