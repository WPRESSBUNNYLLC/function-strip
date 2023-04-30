//init all shared with a switch and return whatever to the function

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