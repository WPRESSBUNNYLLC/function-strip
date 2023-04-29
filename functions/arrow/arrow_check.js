
/*
 checks if a function
*/

var update_function_and_update_data = require('../../data');
var data = '';

function check_arrow(data_index) {
 data = update_function_and_update_data.data;
 if(
  data.charAt(data_index) === '=' && 
  data.charAt(data_index+1) ===  '>' 
 ) {
   return true;
  } else { 
   return false;
  }
}

module.exports = check_arrow;