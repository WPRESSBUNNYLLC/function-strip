
var return_object = {};

function init(p) { 
 return_object = {};
 switch(p) {
  case 'initiate_enclosed_and_invoked':
  return initiate_enclosed_and_invoked();
  case 'equals':
  return equals();
  case 'async':
  return async();
  case 'name_and_type':
  return initiate_enclosed_and_invoked();
  default: throw new error('invalid paramater');
 }
}

function initiate_enclosed_and_invoked() { 
 found_enclosing_ldb = get_enclosed(data_index_, line_number_);
 data_index_ = found_enclosing_ldb.data_index_; 
 line_number_ = found_enclosing_ldb.line_number_;
 in_function_build_string_ += found_enclosing_ldb.build_string;
 found_enclosing = found_enclosing_ldb.found_closing;
 if(found_enclosing === false) return;
 found_opening_and_closing_invokable_ldb = check_invokable(data_index_, line_number_);
 data_index_ = found_opening_and_closing_invokable_ldb.data_index_; 
 line_number_ = found_opening_and_closing_invokable_ldb.line_number_;
 in_function_build_string_ += found_opening_and_closing_invokable_ldb.build_string;
 found_opening_and_closing_invokable = found_opening_and_closing_invokable_ldb.found_opening_and_closing_invokable;
}

function equals() { 

}

function async() {

}

function name_and_type() { 

}