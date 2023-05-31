//< <= << <<=	

let shared = require('../data');

function less_than() { 
  if(
   shared.get_data().charAt(shared.get_data_index()) === '<' && 
   shared.get_data().charAt(shared.get_data_index() + 1) === '='
  ) { 
   shared.update_current_token('<');
   shared.update_current_token('=');
   shared.update_data_index(1)  
  } else if(shared.get_data().charAt(shared.get_data_index()) === '<') { 
   shared.update_current_token('<');  
  } else if(shared.get_data().charAt(shared.get_data_index()) === '=') { 
   shared.update_current_token('=');
  } else { 
   shared.decrease_data_index_for_correct_data_index_and_line_number(1);
  }
}

module.exports = less_than;