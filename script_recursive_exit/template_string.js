
/*
 determines the exit of a template string... gets very funky
 ",',//,/* <-- handled inside of template literal via outside functions 
 `, ${ handled with a recursive counter and single boolean value for what i am immediately inside of
*/

console.log(`${console.log(`${console.log(`${console.log('hello world')}`)}`)}`)

var update_function_and_update_data = require('../data');
var double_quote_string = require('./script_recursive_exit/double_quote_string');
var single_quote_string = require('./script_recursive_exit/single_quote_string');
var multiline_comment = require('./script_recursive_exit/multiline_comment');
var singleline_comment = require('./script_recursive_exit/singleline_comment');
var regex = require('./script_recursive_exit/regex');

var data_ = '';
var data_index_ = 0; 
var in_function_ = false, in_function_build_string_ = '';
var line_number_ = 0;
var recursive_counter_literal = 0;
var recursive_counter_template = 0; 
var currently_inside_of = 'template';
var data_index_and_line_number_update = {};

function template_string(data_index, in_function, line_number) { 
 data_ = update_function_and_update_data.data;
 data_index_ = data_index;
 in_function_ = in_function;
 in_function_build_string_ = '';
 line_number_ = line_number;
 recursive_counter_template = 1;
 recursive_counter_literal = 0;
 currently_inside_of = 'template';
 return recurse(data_index_);
}

function recurse(data_index_) { 

 if(data_index_ > data_.length) {
  return {
   data_index: data_index_, 
   line_number: line_number_,
   build_string: in_function_build_string_,
  }
 }

 if(in_function_ === true) { 
  in_function_build_string_ += data_.charAt(data_index_);
 }

 if(data_.charAt(data_index_) === '\n') { 
  line_number_ = line_number_ + 1;
 }

 if(currently_inside_of === 'literal' && data_.charAt(data_index_) === '"') {
  data_index_and_line_number_update = double_quote_string(data_index_, in_function_, line_number_, false);
  update();
  return recurse(data_index_);
 }

 if(currently_inside_of === 'literal' && data_.charAt(data_index_) === "'") {
  data_index_and_line_number_update = single_quote_string(data_index_, in_function_, line_number_, false);
  update();
  return recurse(data_index_);
 }

 if(currently_inside_of === 'literal' && data_.charAt(data_index_) === '//') {
  data_index_and_line_number_update = singleline_comment(data_index_, in_function_, line_number_);
  update();
  return recurse(data_index_);
 }

 if(currently_inside_of === 'literal' && data_.charAt(data_index_) === '/*') {
  data_index_and_line_number_update = multiline_comment(data_index_, in_function_, line_number_);
  update();
  return recurse(data_index_);
 }

 if(currently_inside_of === 'literal' && data_.charAt(data_index_) === '/') {
  data_index_and_line_number_update = regex(data_index_, in_function_, line_number_);
  update();
  return recurse(data_index_);
 }

 if(currently_inside_of === 'template' && data_.charAt(data_index_) === '$' && data_.charAt(data_index_ + 1) === '{') { 
  currently_inside_of === 'literal'
  recursive_counter_literal = recursive_counter_literal + 1; 
  in_function_ === true ? in_function_build_string_ += data_.charAt(data_index_ + 1) : '';
  data_index_ = data_index_ + 2; 
  return recurse(data_index_);
 }

 if(currently_inside_of === 'literal' && data_.charAt(data_index_) === '}') {
  currently_inside_of = 'template'; 
  recursive_counter_literal = recursive_counter_literal - 1;
  data_index_ = data_index_ + 1;
  return recurse(data_index_);
 }

 if(currently_inside_of === 'literal' && data_.charAt(data_index_) === '`') {
  currently_inside_of = 'template'; 
  recursive_counter_template = recursive_counter_template + 1;
  data_index_ = data_index_ + 1;
  return recurse(data_index_);
 }

 if(currently_inside_of === 'template' && data_.charAt(data_index_) === '`') {
  if(recursive_counter_literal > 0) {
    currently_inside_of = 'literal'; 
  }
  recursive_counter_template = recursive_counter_template - 1;
  data_index_ = data_index_ + 1;
  if(recursive_counter_template === 0 && recursive_counter_literal === 0) {
   return {
    data_index: data_index_, 
    line_number: line_number_,
    build_string: in_function_build_string_,
   }
  }
  return recurse(data_index_);
 }

 data_index_ = data_index_ + 1; 
 return recurse(data_index_);

}

function update() { 
  data_index_ = data_index_and_line_number_update.data_index_;
  line_number_ = data_index_and_line_number_update.line_number_;
  if(in_function_ === true) { 
    in_function_build_string_ += data_index_and_line_number_update.build_string;
  }
}

module.exports = template_string;