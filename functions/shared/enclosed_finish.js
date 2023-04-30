
function initiate_enclosed(data_index_, line_number_) {

}

function get_enclosed(data_index_) { 

 if(data_index_ > data_.length) {
  return
 }

 if(data_.charAt(data_index_) === ')') {
  in_function_build_string_ += data_.charAt(data_index_);  ;
  data_index_ = data_index_ + 1;
  found_enclosing = true;
  return true;
 } 

}

module.exports = initiate_enclosed;