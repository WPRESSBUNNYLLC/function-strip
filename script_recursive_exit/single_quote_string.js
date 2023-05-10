
/*
 determines when ending a single quote string
*/

let update_function_and_update_data = require('../data');

let data_index_ = 0;
let in_function_ = false;
let in_function_build_string_ = '';
let line_number_ = 0;
let original_line_number = 0;
let in_tag_ = false;
let in_tag_string = '';

function single_quote_string(data_index, in_function, line_number, in_tag) { 
 data_index_ = data_index;
 in_function_ = in_function;
 line_number_ = line_number;
 original_line_number = line_number;
 in_function_build_string_ = '';
 in_tag_ = in_tag;
 in_tag_string = '';
 return recurse(data_index_);
}

function recurse(data_index_) {
    
 if(data_index_ > data_.length) {
  throw new Error(
   "Error: The single quote string in the document has not ended. End of file error \n" + 
   "line number: " + original_line_number
  )
 }

 if(in_function_ === true) { 
  in_function_build_string_ += update_function_and_update_data.data.charAt(data_index_);
 }

 if(in_tag_ === true) { 
  in_tag_string += update_function_and_update_data.data.charAt(data_index_);
 }

 if(update_function_and_update_data.data.charAt(data_index_) === '\n') { 
  line_number_ = line_number_ + 1;
 }

 if(
  update_function_and_update_data.data.charAt(data_index_) === "'" && 
  (in_tag_ === true || (update_function_and_update_data.data.charAt(data_index_ - 1) !== '\\' && in_tag_ === false))
 ) { 
  data_index_ = data_index_ + 1; 
  return {
   data_index: data_index_, 
   line_number: line_number_,
   build_string: in_function_build_string_,
   in_tag: in_tag_string
  }
 }

 data_index_ = data_index_ + 1; 
 return recurse(data_index_);

} 

module.exports = single_quote_string;