
/*
 checks if a function
*/

let update_function_and_update_data = require('generate/data');
let data = '';

function check_arrow(data_index) {
 data = update_function_and_update_data.data;
 if(
  update_function_and_update_data.data.charAt(data_index) === '=' && 
  update_function_and_update_data.data.charAt(data_index+1) ===  '>' 
 ) {
   return true;
  } else { 
   return false;
  }
}

module.exports = check_arrow;