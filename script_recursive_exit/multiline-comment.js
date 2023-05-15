
/*
 determines when ending a multi line comment... 
*/

let update_function_and_update_data = require('generate/data');

let in_function_ = false;
let in_function_build_string_ = '';

function multiline(in_function) { 
 in_function_ = in_function;
 in_function_build_string_ = '';
 return recurse(data_index_);
}

function recurse(data_index_) { 

 if(data_index_ > data_.length) {
  throw new Error(
   "multiline comment End of file" //if in function is true... could not capture function
  )
 }

 if(in_function_ === true) { 
  in_function_build_string_ += update_function_and_update_data.data.charAt(data_index_);
 }

 if(update_function_and_update_data.data.charAt(data_index_) === '\n') { 
  line_number_ += 1;
 }

 if(
  update_function_and_update_data.data.charAt(data_index_) === '*' &&
  update_function_and_update_data.data.charAt(data_index_ + 1) === '/'
 ) { 
  in_function_ === true ? in_function_build_string_ += '/' : '';
  data_index_ += 2; 
  return {
   data_index: data_index_, 
   line_number: line_number_,
   build_string: in_function_build_string_,
  }
 }

 data_index_ += 1; 
 return recurse(data_index_);

}

module.exports = multiline;