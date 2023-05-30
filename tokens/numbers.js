
let shared = require('../data');

const number_error_regular = /^0b([0-9]+)?$|^0o([0-9]+)?$|^0x([a-zA-Z0-9]+)?$|^([0-9]+)(\.)?([0-9]+)?([0-9]e[\-+][0-9]+)?$/;
let has_decimal = false;
let has_exponent = false;
let numeric_type = '';

function numbers() { 
 while(true) {
  if(shared.get_current_token().test(number_error_regular) === false) { 
   if(check_if_might_be_valid() === true) {
    continue;
   }
   shared.pop_current_token();
   shared.decrease_data_index_for_correct_data_index_and_line_number(1);
   if(has_decimal === false) {
    let tokens = shared.get_tokens()[shared.get_file_name()].tokens;
    tokens[tokens.length - 1] === '.' && numeric_type === 'regular' ? combine_previous() : '';
   }
   has_decimal = false;
   has_exponent = false;
   numeric_type = '';
   break;
  }
  if(has_decimal === false && shared.get_data().charAt(shared.get_data_index()) === '.') {
   has_decimal = true;
  }
  if(has_exponent === false && shared.get_data().charAt(shared.get_data_index()) === 'e') { 
   has_exponent = true;
  }
  if(numeric_type === '') {
   check_numeric_type();
  }
  shared.update_current_token(shared.get_data().charAt(shared.get_data_index()));
  shared.update_data_index(1);
 }
}

function check_numeric_type() { 
  if(shared.get_current_token().test(/0o([0-9]+)?$/) === true) { 
   numeric_type = 'octal;'
  }
  if(shared.get_current_token().test(/^0b([0-9]+)?$/) === true) { 
   numeric_type = 'binary;'
  }
  if(shared.get_current_token().test(/^([0-9]+)(\.)?([0-9]+)?([0-9]e[\-+][0-9]+)?$/) === true) { 
   numeric_type = 'regular;'
  }
  if(shared.get_current_token().test(/^0x([a-zA-Z0-9]+)?$/) === true) { 
   numeric_type = 'hex;'
  }    
}

function check_if_might_be_valid() { 
 if(shared.get_current_token().slice(-1) === 'e' && numeric_type === 'regular') {
  //if next token is either +,- and next is a number ...add to tokens, increase data index and continue
  return true;
 } else {
  return false;
 }
}

function combine_previous() { 
 //combine the beginning and ending of this and previous
} 

module.exports = numbers;