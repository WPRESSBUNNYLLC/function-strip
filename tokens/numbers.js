
let shared = require('../data');
let numeric_type = '';

function numbers() { 
 while(true) {
  if(shared.get_current_token().test(/^0b([10]+)$|^0o([0-7]+)$|^0x([a-fA-f0-9]+)$|^(\.[0-9]{1,}|[0]\.?[0-9]{0,}|[1-9]{1}[0-9]{0,}\.?[0-9]{0,})(e[\-+][0-9]+)?$/) === false) {
   if(check_if_might_be_valid() === true) {
    continue;
   }
   shared.pop_current_token();
   shared.decrease_data_index_for_correct_data_index_and_line_number(1);
   numeric_type = '';
   break;
  }
  shared.update_current_token(shared.get_data().charAt(shared.get_data_index()));
  if(numeric_type === '') {
   check_numeric_type();
  }
  shared.update_data_index(1);
 }
}

function check_numeric_type() { 
  if(shared.get_current_token().test(/0o([0-7]+)$/) === true) { 
   numeric_type = 'octal;'
  } else if(shared.get_current_token().test(/^0b([10]+)$/) === true) { 
   numeric_type = 'binary;'
  } else if(shared.get_current_token().test(/^(\.[0-9]{1,}|[0]\.?[0-9]{0,}|[1-9]{1}[0-9]{0,}\.?[0-9]{0,})(e[\-+][0-9]+)?$/) === true) {
   numeric_type = 'regular;'
  } else if(shared.get_current_token().test(/^0x([a-fA-f0-9]+)$/) === true) { 
   numeric_type = 'hex;'
  } else {
   numeric_type = 'regular';
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

 if(shared.get_current_token().slice(-1) === 'o' && numeric_type === 'octal') {
  if(shared.get_data().charAt(shared.get_data_index() + 1).test(/[0-7]/)) { 
   shared.update_current_token(shared.get_data().charAt(shared.get_data_index() + 1))
   shared.update_data_index(2);
   return true;
  }
 }

 if(shared.get_current_token().slice(-1) === 'x' && numeric_type === 'hex') {
  if(shared.get_data().charAt(shared.get_data_index() + 1).test(/[a-fA-f0-9]/)) { 
   shared.update_current_token(shared.get_data().charAt(shared.get_data_index() + 1))
   shared.update_data_index(2);
   return true;
  }
 }

 if(shared.get_current_token().slice(-1) === 'b' && numeric_type === 'binary') {
  if(shared.get_data().charAt(shared.get_data_index() + 1).test(/[10]/)) { 
   shared.update_current_token(shared.get_data().charAt(shared.get_data_index() + 1))
   shared.update_data_index(2);
   return true;
  }
 }

 return false;

}

module.exports = numbers;