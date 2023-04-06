
/*
 determines when ending a multi line comment... 
*/

var data_ = '';
var data_index_ = 0;
var in_function_ = false, in_function_build_string_ = '';
var line_number_ = 0;

function multiline(data, data_index, in_function, line_number, build_string) { 
 data_ = data;
 data_index_ = data_index;
 in_function_ = in_function;
 in_function_build_string_ = build_string;
 line_number_ = line_number;
 return recurse(data_index_);
}

function recurse(data_index_) { 

 if(in_function_ === true) { 
  in_function_build_string_ += data_.charAt(data_index_);
 }

 if(data_index_ === data_.length) {
  return {
   data_index: data_index_, 
   line_number: line_number_, 
   build_string: in_function_build_string_,
   exit_document: true
  }
 }

 if(data_.charAt(data_index_) === '\n') { 
  line_number_ = line_number_ + 1;
 }

 if(
  data_.charAt(data_index_) === '*' &&
  data_.charAt(data_index_ + 1) === '/'
 ) { 
  data_index_ = data_index_ + 2; 
  return {
    data_index: data_index_, 
    line_number: line_number_,
    build_string: in_function_build_string_,
    exit_document: false
   }
 }

 data_index_ = data_index_ + 1; 
 return recurse(data_index_);

}

module.exports = multiline;