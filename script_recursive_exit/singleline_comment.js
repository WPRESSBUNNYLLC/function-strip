
/*
 determines when ending a single line comment
*/

var data_ = '';
var data_index_ = 0; 
var in_function_ = false, in_function_build_string = '';
var line_number_ = 0;

function singleline(data, data_index, in_function, line_number) { 
 data_ = data;
 data_index_ = data_index;
 in_function_ = in_function;
 line_number_ = line_number;
 return recurse(data_index_);
}

function recurse(data_index_) { 

 if(data_index_ === data_.length) { //should exit in document
  return {
   data_index: data_index_, 
   line_number: line_number_,
   if_in_function: '' // if in function add all the characters and return back
  }
 }

 if(data_.charAt(data_index_) === '\n') { 
  line_number_ = line_number_ + 1;
 }

 if(
  data_.charAt(data_index_) === '/' &&
  data_.charAt(data_index_ + 1) === '/'
 ) { 
  data_index_ = data_index_ + 2; 
  return {
    data_index: data_index_, 
    line_number: line_number_,
    if_in_function: '' // if in function add all the characters and return back
   }
 }

 data_index_ = data_index_ + 1; 
 return recurse(data_index_);

}

module.exports = singleline;