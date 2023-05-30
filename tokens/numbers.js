
let shared = require('../data');

const number_error_regular = /^0b([0-9]+)?$|^0o([0-9]+)?$|^0x([a-zA-Z0-9]+)?$|^([0-9]+)(\.)?([0-9]+)?([0-9]e[\-+][0-9]+)?$/;
const binary = /^0b([0-9]+)?$/;
const octal = /^0o([0-9]+)?$/;
const hex = /^0x([a-zA-Z0-9]+)?$/;
const regular = /^([0-9]+)(\.)?([0-9]+)?([0-9]e[\-+][0-9]+)?$/;
let has_decimal = false;

function numbers() { 
 while(true) {
  if(shared.get_current_token().test(number_error_regular) === false) { 
   if(check_if_might_be_valid() === true) continue;
   shared.pop_current_token();
   shared.decrease_data_index_for_correct_data_index_and_line_number(1);
   if(has_decimal === false && shared.get_tokens()[shared.get_tokens().length - 1].token === '.') combine_previous();
   break;
  }
  if(shared.get_data().charAt(shared.get_data_index())) has_decimal = true;
  shared.update_current_token(shared.get_data().charAt(shared.get_data_index()));
  shared.update_data_index(1);
 }
}

 //if on e for last and a regular number then check next two values for - or + 32 -- just use a set of regular expressions and add to tokens / increase data index
function check_if_might_be_valid() { 
 if() { 

 }
}

function combine_previous() { 
 //combine the previous decimal value
} 

module.exports = numbers;