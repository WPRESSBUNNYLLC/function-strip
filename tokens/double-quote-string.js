// until "

let shared = require('../data');

function double_quote_string() { 
 while(true) { 
  shared.update_current_token(shared.get_data().charAt(shared.get_data_index()));
  if(
   shared.get_data().charAt(shared.get_data_index()) === '"' && 
   shared.get_data().charAt(shared.get_data_index() - 1) !== '\\'
  ) { 
   break;
  }
  shared.update_data_index(1);
 }
} 

module.exports = double_quote_string;