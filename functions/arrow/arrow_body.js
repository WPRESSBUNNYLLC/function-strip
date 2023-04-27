
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

 
*/

var update_function_and_update_data = require('../data');
var double_quote_string = require('./script_recursive_exit/double_quote_string');
var single_quote_string = require('./script_recursive_exit/single_quote_string');
var multiline_comment = require('./script_recursive_exit/multiline_comment');
var singleline_comment = require('./script_recursive_exit/singleline_comment');
var template_string = require('./script_recursive_exit/template_string');
var regex = require('./script_recursive_exit/regex');

var data_index_ = 0;
var data_ = '';
var line_number_ = 0;
var original_line_number = '';
var in_function_build_string_ = ''; 
var bracket_type = 'none';
var opening_bracket = '';
var closing_bracket = '';
var found_opening_bracket = false;
var found_new_line = false;
var beginning_bracket_count = 0;
var ending_bracket_count = 0;
var data_index_and_line_number_update = {};
var is_invokable = false; 
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
 bracket_type = 'none'; 
 opening_bracket = '';
 closing_bracket = '';
 found_opening_bracket = false;
 found_new_line = false;
 is_invokable = i;
 invokable_return_object = {
  found_enclosing: false, 
  found_opening_invokable: false, 
  found_closing_invokable: false
 }; 
 recurse(data_index_);
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
  found_new_line = true;
  if(found_opening_bracket === false) { 
    finish_first_statement(); //when finishing the first statement, look at the previous build string, and check if a statement was already made... if so, get the fuck out. if no statement or in the middle of one, finish it and get the fuck out. just figure it out.
    return end();
  }
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

 if(
  data_.charAt(data_index_) === '{' && 
  bracket_type === 'none'
 ) { 
  found_opening_bracket = true;
  bracket_type = 'reg';
  opening_bracket = '{';
  closing_bracket = '}';
 } else if(
  data_.charAt(data_index_) === '(' && 
  bracket_type === 'none'
 ) { 
  found_opening_bracket = true;
  bracket_type = 'paren';
  opening_bracket = '(';  
  closing_bracket = ')';
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
   if(is_invokable === true) {
    check_invokable(data_index_);
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
  found_new_line = data_index_and_line_number_update.found_new_line;
  if(
   found_new_line === true && 
   found_opening_bracket === false
  ) { 
   finish_first_statement(); 
   return end();
  }
}

function check_invokable(data_index_) { 

 if(data_index_ > data_.length) {
  return;
 }

 if(
  data_.charAt(data_index_) === ')' && 
  invokable_string === ''
 ) {
  invokable_string += ')';
  in_function_build_string_ += data_.charAt(data_index_);  ;
  data_index_ = data_index_ + 1;
  invokable_return_object.found_enclosing = true;
  return check_invokable(data_index_);
 } 

 if(
  data_.charAt(data_index_) === '(' && 
  invokable_string === ')'
 ) {
  invokable_string += '(';
  remember_me = data_index_;
  data_index_ = data_index_ + 1;
  invokable_return_object.found_opening_invokable = true;
  return check_invokable(data_index_);
 } 

 if(
  data_.charAt(data_index_) === ')' && 
  invokable_string === ')('
 ) {
  in_function_build_string_ += '()';
  data_index_ = data_index_ + 1;
  invokable_return_object.found_closing_invokable = true;
  return;
 } 

 if(data_.charAt(data_index_) === '\n') { 
  in_function_build_string_ += data_.charAt(data_index_);
  data_index_ = data_index_ + 1;
  line_number_ = line_number_ + 1;
  return check_invokable(data_index_);
 }

 if(data_.charAt(data_index_) === ' ') { 
  in_function_build_string_ += data_.charAt(data_index_);
  data_index_ = data_index_ + 1;
  return check_invokable(data_index_);
 }

 if(invokable_return_object.found_opening_invokable === true) { 
  data_index_ = remember_me;
 }

 return;

}

function finish_first_statement() { 
  //look at the build string and compartmentalize it into sections of strings, left hand assignments and operations and then keywords and all that
  //split it on spaces
  //check if in the middle of it
  //if in the middle of it finish it
  //when done, end it
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