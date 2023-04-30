
function initiate_invokable() { 

}

function check_invokable(data_index_) { 

 if(data_index_ > data_.length) {
  return
 }

 if(data_.charAt(data_index_) === '(') {
  invokable_string += '(';
  remember_me = data_index_;
  data_index_ = data_index_ + 1;
  found_opening_invokable = true;
  return check_invokable(data_index_);
 } 

 if(data_.charAt(data_index_) === ')') {
  in_function_build_string_ += '()';
  data_index_ = data_index_ + 1;
  found_closing_invokable = true;
  return;
 } 

 if(data_.charAt(data_index_) === '\n') { 
  in_function_build_string_ += data_.charAt(data_index_);
  data_index_ = data_index_ + 1;
  line_number_ = line_number_ + 1;
  return check_invokable(data_index_);
 }

 if(data_.charAt(data_index_) === ' ') { 
  in_function_build_string_ += data_.charAt(data_index_);
  data_index_ = data_index_ + 1;
  return check_invokable(data_index_);
 }

 if(found_opening_invokable === true) { 
  data_index_ = remember_me;
 }

 return false;

}