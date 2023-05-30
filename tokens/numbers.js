//all numbers (do others) - https://www.tutorialsteacher.com/javascript/javascript-number#:~:text=The%20Number%20is%20a%20primitive,double%20in%20C%23%20and%20Java.

let shared = require('../data');
let found_decimal = false;
const numbers_ = /[0-9]/;

function numbers() { 
 while(true) {
  if(shared.get_data().charAt(shared.get_data_index()).test(numbers_) === true) { 
   shared.update_current_token(shared.get_data().charAt(shared.get_data_index()));
  } else if(
   shared.get_data().charAt(shared.get_data_index()) === '.' && 
   found_decimal === false
  ) {
   found_decimal = true;
   shared.update_current_token(shared.get_data().charAt(shared.get_data_index()));
  } else { 
   shared.decrease_data_index_for_correct_data_index_and_line_number(1);
   break; 
  }
  shared.update_data_index(1);
 } 
}

module.exports = numbers;