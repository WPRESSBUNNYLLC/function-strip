
let shared = require('../data');

let has_decimal = false;
let has_exponent = false;
let numeric_type = '';

function numbers() { 
 while(true) {
  if(shared.get_current_token().test(/^0b([0-9]+)?$|^0o([0-9]+)?$|^0x([a-zA-Z0-9]+)?$|^([0-9]+)(\.)?([0-9]+)?([0-9]e[\-+][0-9]+)?$/) === false) {
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
  } else if(shared.get_current_token().test(/^0b([0-9]+)?$/) === true) { 
   numeric_type = 'binary;'
  } else if(shared.get_current_token().test(/^([0-9]+)(\.)?([0-9]+)?([0-9]e[\-+][0-9]+)?$/) === true) { 
   numeric_type = 'regular;'
  } else if(shared.get_current_token().test(/^0x([a-zA-Z0-9]+)?$/) === true) { 
   numeric_type = 'hex;'
  } else {
   console.log('error checking for numeric type')
  }   
}

function check_if_might_be_valid() { 
 if(shared.get_current_token().slice(-1) === 'e' && numeric_type === 'regular') {
  if(
   (shared.get_data().charAt(shared.get_data_index() + 1) === '+' || shared.get_data().charAt(shared.get_data_index() + 1) === '-') && 
   shared.get_data().charAt(shared.get_data_index() + 2).test(/[0-9]/) === true
  ) { 
   shared.update_current_token(shared.get_data().charAt(shared.get_data_index() + 1))
   shared.update_current_token(shared.get_data().charAt(shared.get_data_index() + 2))
   shared.update_data_index(3);
   return true;
  }
 }
 return false;
}

function combine_previous() { 
 
} 

module.exports = numbers;