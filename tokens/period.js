// . ...

let shared = require('../data');

function period() {
  if(
   shared.get_data().charAt(shared.get_data_index()) === '.' && 
   shared.get_data().charAt(shared.get_data_index() + 1) === '.'
  ) { 
   shared.update_current_token('.');
   shared.update_current_token('.');
   shared.update_data_index(1);
  } else { 
   shared.decrease_data_index_for_correct_data_index_and_line_number(1);
  }
}

module.exports = period;