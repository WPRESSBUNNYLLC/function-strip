  
 
var update_function_and_update_data = require('../../data');
var data = '';

function check_arrow(data_index) {
 data = update_function_and_update_data.data;
 if(
  check_beginning_arrow(data_index) && 
  data.charAt(data_index) ===  '=' && 
  data.charAt(data_index+1) ===  '>' && 
  check_ending_arrow(data_index)
 ) {
   return true;
  } else { 
   return false;
  }
}

function check_beginning_arrow(data_index) {
 if(
  data.charAt(data_index-1) === '\n' || 
  data.charAt(data_index-1) === ' ' || 
  data.charAt(data_index-1) === ')' //or  a character for minice 2 found in other function
 ) {
   return true
  } else { 
   return false
  }
 }

function check_ending_arrow(data_index) { 
 if(
  data.charAt(data_index+2) === '\n' || 
  data.charAt(data_index+2) === ' ' || 
  data.charAt(data_index+2) === '{'
 ) { 
   return true
  } else { 
   return false
  }
 }

 module.exports = check_arrow;