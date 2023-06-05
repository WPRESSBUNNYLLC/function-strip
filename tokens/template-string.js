/*
 determines the exit of a template string... gets very funky
 ",',//,/* <-- handled inside of template literal via outside functions 
 `, ${ handled with a recursive counter and single boolean value for what i am immediately inside of
 console.log(`${`${`//
 `}` + console.log('hello '+ 'world') + ``}`); 
 a1-b1-a2-b2-a3-a2-b1-a1                            a2-a1-b0-a0
*/

//not sure how to do this

let update_function_and_update_data = require('generate/data');

let recursive_counter_script = 0;
let recursive_counter_string = 0; 
let currently_inside_of = 'string';

function template_string() { 
 original_line_number = line_number;
 recursive_counter_string = 1;
 recursive_counter_script = 0;
 currently_inside_of = 'string';
 return recurse(data_index_);
}

function recurse(data_index_) { 

 if(
  currently_inside_of === 'script' && 
  update_function_and_update_data.data.charAt(data_index_) === '"'
 ) {
  data_index_ = data_index_ + 1;
  //
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
   //out
  }
  return recurse(data_index_);
 }

 data_index_ = data_index_ + 1; 
 return recurse(data_index_);

}

module.exports = template_string;