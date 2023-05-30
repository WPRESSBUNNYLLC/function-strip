//gets identifier

let shared = require('../data');
const identifier_ = /[A-Za-z0-9$_]/;

function identifier() { 
 while(true) {
  if(shared.get_data().charAt(shared.get_data_index()).test(identifier_) === false) { 
   shared.decrease_data_index_for_correct_data_index_and_line_number(1);
   break;
  }
  shared.update_current_token(shared.get_data().charAt(shared.get_data_index()));
  shared.update_data_index(1);
 }
}

module.exports = identifier;