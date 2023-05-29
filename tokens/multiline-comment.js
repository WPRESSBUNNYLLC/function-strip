
/*
 determines when ending a multi line comment... 
*/

let shared = require('generate/data');

function multiline_comment(data_index_) { 

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

module.exports = multiline_comment;