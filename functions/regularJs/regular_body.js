
/*
 builds the function body
*/

let update_function_and_update_data = require('../data');
let double_quote_string = require('generate/functions/regularJs/script_recursive_exit/double_quote_string');
let single_quote_string = require('generate/functions/regularJs/script_recursive_exit/single_quote_string');
let multiline_comment = require('generate/functions/regularJs/script_recursive_exit/multiline_comment');
let singleline_comment = require('generate/functions/regularJs/script_recursive_exit/singleline_comment');
let template_string = require('generate/functions/regularJs/script_recursive_exit/template_string');
let regex = require('generate/functions/regularJs/script_recursive_exit/regex');

let data_index_ = 0;
let line_number_ = 0;
let function_name = '';
let in_parameter_set = 'out';
let parameter_string = '';
let opening_parameter_count = 0; 
let closing_parameter_count = 0;
let original_line_number = 0;
let in_function_build_string_ = '';
let beginning_bracket_count = 0;
let ending_bracket_count = 0;
let data_index_and_line_number_update = {};

function build_body_of_function(data_index, line_number) {
 data_index_ = data_index;
 line_number_ = line_number;
 original_line_number = line_number;
 function_name = '';
 in_parameter_set = 'out';
 parameter_string = '';
 opening_parameter_count = 0; 
 closing_parameter_count = 0;
 in_function_build_string_ = '';
 recurse(data_index_);
 return end();
}

function recurse(data_index_) {  

 if(data_index_ > data_.length) {
  throw new Error(
   "Error: The function in the document has not ended. End of file error" + 
   "line number: " + original_line_number
  )
 }

 if(update_function_and_update_data.data.charAt(data_index_) === '\n') { 
  line_number_ += 1;
 }

 in_function_build_string_ += update_function_and_update_data.data.charAt(data_index_); 
 
 if(in_parameter_set === 'in') { 
  parameter_string += update_function_and_update_data.data.charAt(data_index_); 
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
  parameter_string += in_parameter_set === 'in' ? '/' : ''
  data_index_ += 2;
  data_index_and_line_number_update = singleline_comment(data_index_, true, line_number_);
  update('single_line');
  return recurse(data_index_);
 }

 if(
  update_function_and_update_data.data.charAt(data_index_) === '/' && 
  update_function_and_update_data.data.charAt(data_index_ + 1) === '*'
 ) {
  in_function_build_string_ += '*';
  parameter_string += in_parameter_set === 'in' ? '/' : ''
  data_index_ += 2;
  data_index_and_line_number_update = multiline_comment(data_index_, true, line_number_);
  update('multi-line');
  return recurse(data_index_);
 }

 if(
  update_function_and_update_data.data.charAt(data_index_) === '/' &&
  update_function_and_update_data.data.charAt(data_index_ + 1) !== '/' && 
  update_function_and_update_data.data.charAt(data_index_ + 1) !== '*'
 ) { 
  in_function_build_string_ += update_function_and_update_data.data.charAt(data_index_ + 1);
  parameter_string += in_parameter_set === 'in' ? update_function_and_update_data.data.charAt(data_index_ + 1) : ''
  data_index_ += 2;
  data_index_and_line_number_update = regex(data_index_, true, line_number_);
  update();
  return recurse(data_index_);
 }

 if(
  in_parameter_set === 'out' &&
  update_function_and_update_data.data.charAt(data_index_) !== ' ' && 
  update_function_and_update_data.data.charAt(data_index_) !== '\n' && 
  update_function_and_update_data.data.charAt(data_index_) !== '('
 ) { 
  function_name += update_function_and_update_data.data.charAt(data_index_);
  data_index_ += 1; 
  return recurse(data_index_);
 }

 if(
  in_parameter_set === 'out' &&
  update_function_and_update_data.data.charAt(data_index_) === '(' 
 ) {  
  in_parameter_set = 'in';
  parameter_string += update_function_and_update_data.data.charAt(data_index_);
  opening_parameter_count += 1;
  data_index_ += 1;
  return recurse(data_index_);
 } 

 if(
  in_parameter_set === 'in' &&
  update_function_and_update_data.data.charAt(data_index_) === '(' 
 ) { 
  opening_parameter_count += 1;
  data_index_ += 1; 
  return recurse(data_index_);
 } 

 if(
  in_parameter_set === 'in' && 
  update_function_and_update_data.data.charAt(data_index_) === ')'
 ) { 
  closing_parameter_count += 1; 
  if(opening_parameter_count === closing_parameter_count) {
   in_parameter_set = 'done';
  }
  data_index_ += 1; 
  return recurse(data_index_);
 }

 if(
  in_parameter_set === 'done' &&
  update_function_and_update_data.data.charAt(data_index_) === '{' 
 ) { 
  beginning_bracket_count += 1;
  data_index_ += 1; 
  return recurse(data_index_);
 }

 if(
  in_parameter_set === 'done' &&
  update_function_and_update_data.data.charAt(data_index_) === '}' 
 ) { 
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

function update(neglect_comments_before_parameter_set) {  //if have not reached the parameter set and see a comment (which would be the only valid statement) dont append it to the function body
 data_index_ = data_index_and_line_number_update.data_index_;
 line_number_ = data_index_and_line_number_update.line_number_;
 in_function_build_string_ += data_index_and_line_number_update.build_string; 
 if(in_parameter_set === 'in') { 
  parameter_string += data_index_and_line_number_update.build_string; 
 }
}

function end() { 
 return {
  data_index: data_index_, 
  line_number: line_number_, 
  build_string: in_function_build_string_,
  parameters: parameter_string, 
  name: function_name,
 }
}

module.exports = build_body_of_function;