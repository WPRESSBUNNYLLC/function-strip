
let shared = require('../data');
//binary, octal, hex, regular/exponent/decimal -- have to look ahead for some like e --- no, you can not find this on stack overflow... hand written pat. ya fuckin bum
const number_error_regular = /^0b([0-9]+)?$|^0o([0-9]+)?$|^0x([a-zA-Z0-9]+)?$|^([0-9]+)(\.)?([0-9]+)?([0-9]e[\-+][0-9]+)?$/;
let is_hexa = false; 
let is_binary = false; 
let is_octal = false; 
let is_regular = false;

function numbers() { 
 while(true) {
  if(shared.get_current_token().test(number_error_regular) === false) { 
   shared.pop_current_token();
   shared.decrease_data_index_for_correct_data_index_and_line_number(1);
   break;
  }
  shared.update_current_token(shared.get_data().charAt(shared.get_data_index()));
  shared.update_data_index(1);
 }
}

module.exports = numbers;