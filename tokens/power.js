// ^ ^=	

let shared = require('../data');

function power() {
  if(shared.get_data().charAt(shared.get_data_index()) === '=') { 
   shared.update_current_token('=');
  } else { 
   shared.decrease_data_index_for_correct_data_index_and_line_number(1);
  }
}

module.exports = power;