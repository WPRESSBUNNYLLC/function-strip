
/*
 determines when ending a single line comment
*/

let update_function_and_update_data = require('../data');

let data_index_ = 0; 
let in_function_ = false;
let in_function_build_string_ = '';
let line_number_ = 0;

function singleline(data_index, in_function, line_number) { 
 data_index_ = data_index;
 in_function_ = in_function;
 in_function_build_string_ = '';
 line_number_ = line_number;
 return recurse(data_index_);
}

function recurse(data_index_) { 

 if(data_index_ > data_.length) {
  throw new Error(
   "single line comment End of file"
  )
 }

 if(in_function_ === true) { 
  in_function_build_string_ += update_function_and_update_data.data.charAt(data_index_);
 }

 if(update_function_and_update_data.data.charAt(data_index_) === '\n') { 
  data_index_ += 1; 
  line_number_ += 1;
  return {
   data_index: data_index_, 
   line_number: line_number_,
   build_string: in_function_build_string_,
  }
 }

 data_index_ += 1; 
 return recurse(data_index_);

}

module.exports = singleline;