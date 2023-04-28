
/*
 builds the function body -- needs to take (body) and new line into consideration

 let a = 1; 
 let b = 2; 
 let c = 3;
 let d = 0;

 var cc = () =>

 d = a  
  + b + 
 c;

 console.log(d);
 cc();
 console.log(d);

 using finish_first_statement as something completely seperate...

 also have to take this into consideration if opening is ( 
 var c = () => (a) + (b);

 var bb = () => d = (a) + (b) - (c);

 console.log(d);
 bb();
 console.log(d);

*/

var update_function_and_update_data = require('../data');
var double_quote_string = require('./script_recursive_exit/double_quote_string');
var single_quote_string = require('./script_recursive_exit/single_quote_string');
var multiline_comment = require('./script_recursive_exit/multiline_comment');
var singleline_comment = require('./script_recursive_exit/singleline_comment');
var template_string = require('./script_recursive_exit/template_string');
var regex = require('./script_recursive_exit/regex');
var finish_first_statement = require('generate/functions/arrow/return_first_statement');
var check_if_a_single_statement = require('generate/functions/arrow/check_if_single_statement');

var data_index_ = 0;
var data_ = '';
var line_number_ = 0;
var original_line_number = '';
var in_function_build_string_ = ''; 
var opening_bracket = '';
var closing_bracket = '';
var beginning_bracket_count = 0;
var ending_bracket_count = 0;
var data_index_and_line_number_update = {};
var finish_first_statement_line_number_data_index_and_build_string_update = {};
var invokable_return_object = {
  found_enclosing: false, 
  found_opening_invokable: false, 
  found_closing_invokable: false
};

function build_body_of_function(data_index, line_number, i) {
 data_ = update_function_and_update_data.data;
 data_index_ = data_index;
 line_number_ = line_number;
 original_line_number = line_number;
 in_function_build_string_ = '';
 opening_bracket = '';
 closing_bracket = '';
 first_statement_descriptor = [];
 is_invokable = i;
 invokable_return_object = {
  found_enclosing: false, 
  found_opening_invokable: false, 
  found_closing_invokable: false
 }; 
 check_if_single_statement_or_enclosed_function(data_index_);
}

function check_if_single_statement_or_enclosed_function(data_index_) { 

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
  data_.charAt(data_index_) !== '{' && 
  data_.charAt(data_index_) !== '('
 ) { 
  finish_first_then_end();
  return end();
 }

 if(data_.charAt(data_index_) === '{') { 
  opening_bracket = '{';
  closing_bracket = '}';
  return recurse(data_index_);
 } 
 
 if(data_.charAt(data_index_) === '(') { 
  opening_bracket = '(';  
  closing_bracket = ')';
  if(check_if_a_single_statement(data_index_, line_number_, in_function_build_string_) === false) { //make this a variable
   return recurse();
  } else { 
   finish_first_then_end();
   return end();
  }
 }

 data_index_ += 1; 
 return check_if_single_statement_or_enclosed_function(data_index_);

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

 if(data_.charAt(data_index_) === opening_bracket) { 
  beginning_bracket_count += 1;
  data_index_ = data_index_ + 1; 
  return recurse(data_index_);
 }

 if(data_.charAt(data_index_) === closing_bracket) { 
  ending_bracket_count += 1;
  data_index_ = data_index_ + 1; 
  if(beginning_bracket_count === ending_bracket_count) { 
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
 finish_first_statement_line_number_data_index_and_build_string_update = finish_first_statement(data_index_, line_number_, in_function_build_string_); 
 data_index_ = finish_first_statement_line_number_data_index_and_build_string_update.data_index_;
 line_number_ = finish_first_statement_line_number_data_index_and_build_string_update.line_number_;
 in_function_build_string_ += finish_first_statement_line_number_data_index_and_build_string_update.build_string;
}

function end() { 
 return {
  data_index: data_index_, 
  line_number: line_number_, 
  build_string: in_function_build_string_,
  is_invoked: invokable_return_object.found_opening_invokable && invokable_return_object.found_closing_invokable ? true : false,
  found_closing: invokable_return_object.found_enclosing
 } 
}

module.exports = build_body_of_function;