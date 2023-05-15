
/*
 determines when ending a single quote string
*/

let update_function_and_update_data = require('generate/data');

let in_function_ = false
let in_function_build_string_ = '';
let original_line_number = 0;
let in_tag_ = false;
let in_tag_string = '';

function double_quote_string(in_function, in_tag) { 
 in_function_ = in_function;
 original_line_number = line_number;
 in_function_build_string_ = '';
 in_tag_ = in_tag;
 in_tag_string = '';
 return recurse(data_index_);
}

function recurse(data_index_) { 

 if(data_index_ > data_.length) {
  throw new Error(
   "Error: The double quote string in the document has not ended. End of file error \n" + 
   "line number: " + original_line_number
  )
 }

 if(update_function_and_update_data.data.charAt(data_index_) === '\n') { 
  line_number_ += 1;
 }

 if(in_function_ === true) { 
  in_function_build_string_ += update_function_and_update_data.data.charAt(data_index_);
 }

 if(in_tag_ === true) { 
  in_tag_string += update_function_and_update_data.data.charAt(data_index_);
 }

 if(
  update_function_and_update_data.data.charAt(data_index_) === '"' && 
  (in_tag_ === true || (update_function_and_update_data.data.charAt(data_index_ - 1) !== '\\' && in_tag_ === false))
 ) { 
  data_index_ += 1; 
  return {
   data_index: data_index_, 
   line_number: line_number_,
   build_string: in_function_build_string_,
   tag_string: in_tag_string
  }
 }

 data_index_ += 1; 
 return recurse(data_index_);

} 

module.exports = double_quote_string;