
let data = '';
let data_length = 0;
let line_number = 0; 
let data_index = 0; 
let beginning_token_index = 0; 
let ending_token_index = 0; 
let beginning_token_line_number = 0; 
let ending_token_line_number = 0;
let tokens = {};
let token_file_path = '';
let current_look_ahead_token = '';
let current_look_ahead_token_type = '';
let in_script_mode_ = false;
let in_value_error = '';
let data_structures = {};

function update_data(data_, file_path) { 
 tokens[file_path] = { 
  tokens: [],
  assignment_errors: {}, 
  expect_errors: {}, 
  ds: {}
 }
 data = data_;
 data_length = data.length;
 data_index = 0; 
 line_number = 0; 
 token_file_path = file_path;
 current_look_ahead_token = '';
 current_look_ahead_token_type = '';
 in_value_error = '';
 in_script_mode_ = false;
}

function update_line_number(line_number_) { 
 line_number += line_number_;
}

function update_data_index(data_index_) { 
 data_index += data_index_;
}

function set_data_index(data_index_) { 
 data_index = data_index_;
}

function update_tokens() { 
 tokens[token_file_path].tokens.push({ 
  token: current_look_ahead_token, 
  type: current_look_ahead_token_type, 
  beginning_index: beginning_token_index, 
  ending_index: ending_token_index, 
  beginning_line_number: beginning_token_line_number, 
  ending_line_number: ending_token_line_number,
  error: in_value_error, 
  skip: (
   current_look_ahead_token_type === 'single-line-comment' || 
   current_look_ahead_token_type === 'multi-line-comment' || 
   current_look_ahead_token_type === 'spaces' || 
   current_look_ahead_token_type === 'new-line') ? true : false
 });
 current_look_ahead_token = '';
 current_look_ahead_token_type = '';
 in_value_error = '';
}

function update_current_token(token_character) { 
 current_look_ahead_token += token_character;
}

function update_current_token_type(t) { 
 current_look_ahead_token_type = t;
}

function set_beginning_token_line_number_and_data_index(i, l) {
 beginning_token_index = i; 
 beginning_token_line_number = l;
}

function set_ending_token_line_number_and_data_index(i, l) { 
 ending_token_index = i; 
 ending_token_line_number = l;
}

function get_current_token() { 
 return current_look_ahead_token
}

function get_current_token_type() { 
 return current_look_ahead_token_type;
}

function get_data_index() { 
 return data_index;
}

function get_line_number() {
 return line_number;
}

function get_tokens() { 
 return tokens;
}

function get_data() { 
 return data;
}

function get_data_length() { 
 return data_length;
}

function in_script_mode(mode) { 
 in_script_mode_ = mode;
}

function set_in_value_error(error) { 
 in_value_error = error;
}

let current_expression = [];
let current_tokens = [];
let last_token = ''
let current_file = ''
let block_count = 0;
let index = 0;

function build_data_structure() { 
 for(const property in get_tokens()) {
  current_tokens = property.tokens;
  current_file = property;
  block_set();
 }
}

function block_set() { //jsut create a recursive block set for each thing and handle some other things...

 if(current_tokens.length < 1) { 
  return;
 }

 if(
  current_tokens[i].type === 'key-word' && 
  current_tokens[i].value === 'function'
 ) { 

 }

 if(
  current_tokens[i].type === 'key-word' && 
  current_tokens[i].value === 'while'
 ) { 

 }

 if(
  current_tokens[i].type === 'key-word' && 
  current_tokens[i].value === 'if'
 ) { 

 }

 if(
  current_tokens[i].type === 'key-word' && 
  current_tokens[i].value === 'else'
 ) { 

 }

 if(
  current_tokens[i].type === 'key-word' && 
  current_tokens[i].value === 'for'
 ) { 

 }

 if(
  current_tokens[i].type === 'key-word' && 
  current_tokens[i].value === 'do'
 ) { 

 }

 //if identifier and ( then get parameters... and continue and count through

 //if identifier then =, get expression

}

module.exports = {
 get_data: get_data, 
 get_data_index: get_data_index, 
 get_line_number: get_line_number, 
 get_tokens: get_tokens, 
 get_current_token: get_current_token,
 get_current_token_type: get_current_token_type,
 get_data_length: get_data_length,
 update_current_token: update_current_token, 
 update_current_token_type: update_current_token_type,
 update_data: update_data, 
 update_data_index: update_data_index, 
 set_data_index: set_data_index,
 update_line_number: update_line_number,
 update_tokens: update_tokens, 
 in_script_mode: in_script_mode, 
 set_in_value_error: set_in_value_error, 
 set_beginning_token_line_number_and_data_index: set_beginning_token_line_number_and_data_index, 
 set_ending_token_line_number_and_data_index: set_ending_token_line_number_and_data_index
}