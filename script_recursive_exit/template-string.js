
/*
 determines the exit of a template string... gets very funky
 ",',//,/* <-- handled inside of template literal via outside functions 
 `, ${ handled with a recursive counter and single boolean value for what i am immediately inside of
 console.log(`${`${`//
 `}` + console.log('hello '+ 'world') + ``}`); 
 a1-b1-a2-b2-a3-a2-b1-a1                            a2-a1-b0-a0
*/

let update_function_and_update_data = require('generate/data');
let double_quote_string = require('./script_recursive_exit/double_quote_string');
let single_quote_string = require('./script_recursive_exit/single_quote_string');
let multiline_comment = require('./script_recursive_exit/multiline_comment');
let singleline_comment = require('./script_recursive_exit/singleline_comment');
let regex = require('./script_recursive_exit/regex');

let data_index_ = 0; 
let in_function_ = false
let in_function_build_string_ = '';
let line_number_ = 0;
let recursive_counter_script = 0;
let recursive_counter_string = 0; 
let currently_inside_of = 'string';
let data_index_and_line_number_update = {};
let original_line_number = 0;

function template_string(data_index, in_function, line_number) { 
 data_index_ = data_index;
 in_function_ = in_function;
 in_function_build_string_ = '';
 line_number_ = line_number;
 original_line_number = line_number;
 recursive_counter_string = 1;
 recursive_counter_script = 0;
 currently_inside_of = 'string';
 return recurse(data_index_);
}

function recurse(data_index_) { 

 if(data_index_ > data_.length) {
  throw new Error(
   "Error: The template string in the document has not ended. End of file error \n" + 
   "line number: " + original_line_number
  )
 }

 if(in_function_ === true) { 
  in_function_build_string_ += update_function_and_update_data.data.charAt(data_index_);
 }

 if(update_function_and_update_data.data.charAt(data_index_) === '\n') { 
  line_number_ = line_number_ + 1;
 }

 if(
  currently_inside_of === 'script' && 
  update_function_and_update_data.data.charAt(data_index_) === '"'
 ) {
  data_index_ = data_index_ + 1;
  data_index_and_line_number_update = double_quote_string(data_index_, in_function_, line_number_, false);
  update();
  return recurse(data_index_);
 }

 if(
  currently_inside_of === 'script' && 
  update_function_and_update_data.data.charAt(data_index_) === "'"
 ) {
  data_index_ = data_index_ + 1;
  data_index_and_line_number_update = single_quote_string(data_index_, in_function_, line_number_, false);
  update();
  return recurse(data_index_);
 }

 if(
  currently_inside_of === 'script' && 
  update_function_and_update_data.data.charAt(data_index_) === '/' && 
  update_function_and_update_data.data.charAt(data_index_ + 1) === '/'
 ) {
  in_function_ === true ? in_function_build_string_ += '/' : '';
  data_index_ = data_index_ + 2;
  data_index_and_line_number_update = singleline_comment(data_index_, in_function_, line_number_);
  update();
  return recurse(data_index_);
 }

 if(
  currently_inside_of === 'script' && 
  update_function_and_update_data.data.charAt(data_index_) === '/' && 
  update_function_and_update_data.data.charAt(data_index_ + 1) === '*'
 ) {
  in_function_ === true ? in_function_build_string_ += '*' : '';
  data_index_ = data_index_ + 2;
  data_index_and_line_number_update = multiline_comment(data_index_, in_function_, line_number_);
  update();
  return recurse(data_index_);
 }

 if(
  currently_inside_of === 'script' && 
  update_function_and_update_data.data.charAt(data_index_) === '/' && 
  update_function_and_update_data.data.charAt(data_index_ + 1) !== '/' && 
  update_function_and_update_data.data.charAt(data_index_ + 1) !== '*' 
 ) {
  in_function_ === true ? in_function_build_string_ += update_function_and_update_data.data.charAt(data_index_ + 1) : '';
  data_index_ += 2;
  data_index_and_line_number_update = regex(data_index_, in_function_, line_number_);
  update();
  return recurse(data_index_);
 }

 if(
  currently_inside_of === 'string' && 
  update_function_and_update_data.data.charAt(data_index_) === '$' && 
  update_function_and_update_data.data.charAt(data_index_ + 1) === '{'
 ) { 
  currently_inside_of === 'script'
  recursive_counter_script = recursive_counter_script + 1; 
  in_function_ === true ? in_function_build_string_ += '{' : '';
  data_index_ = data_index_ + 2; 
  return recurse(data_index_);
 }

 if(
  currently_inside_of === 'script' && 
  update_function_and_update_data.data.charAt(data_index_) === '}'
 ) {
  currently_inside_of = 'string'; 
  recursive_counter_script = recursive_counter_script - 1;
  data_index_ = data_index_ + 1;
  return recurse(data_index_);
 }

 if(
  currently_inside_of === 'script' && 
  update_function_and_update_data.data.charAt(data_index_) === '`'
 ) { 
  currently_inside_of = 'string'; 
  recursive_counter_string = recursive_counter_string + 1;
  data_index_ = data_index_ + 1;
  return recurse(data_index_);
 }

 if(
  currently_inside_of === 'string' && 
  update_function_and_update_data.data.charAt(data_index_) === '`'
 ) {
  currently_inside_of = 'script'; 
  recursive_counter_string = recursive_counter_string - 1;
  data_index_ = data_index_ + 1;
  if(
   recursive_counter_string === 0 && 
   recursive_counter_script === 0
  ) {
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