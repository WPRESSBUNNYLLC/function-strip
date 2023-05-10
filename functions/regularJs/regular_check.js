
/*
 checks if a function
*/

let update_function_and_update_data = require('generate/data');
let data = '';
let in_html = false;
let in_template = false;
 
 function check_regular(data_index) {
  data = update_function_and_update_data.data;
  if(
   check_beginning_regular(data_index) && 
   update_function_and_update_data.data.charAt(data_index) ===   'f' && 
   update_function_and_update_data.data.charAt(data_index+1) === 'u' &&  
   update_function_and_update_data.data.charAt(data_index+2) === 'n' && 
   update_function_and_update_data.data.charAt(data_index+3) === 'c' && 
   update_function_and_update_data.data.charAt(data_index+4) === 't' && 
   update_function_and_update_data.data.charAt(data_index+5) === 'i' && 
   update_function_and_update_data.data.charAt(data_index+6) === 'o' && 
   update_function_and_update_data.data.charAt(data_index+7) === 'n' && 
   check_ending_regular(data_index)
  ) {
   return true;
  } else { 
   return false;
  }
 }

 function check_beginning_regular(data_index) { 
  if(
   update_function_and_update_data.data.charAt(data_index-1) === '\n' ||
   update_function_and_update_data.data.charAt(data_index-1) === ' ' || 
   update_function_and_update_data.data.charAt(data_index-1) === ',' || 
   update_function_and_update_data.data.charAt(data_index-1) === ':' || 
   update_function_and_update_data.data.charAt(data_index-1) === '}' || 
   update_function_and_update_data.data.charAt(data_index-1) === '=' || 
   update_function_and_update_data.data.charAt(data_index-1) === '(' || 
   update_function_and_update_data.data.charAt(data_index-1) === ';' //and abunch of other characters maybe just use regular expression and special character set
  ) {
   return true
  } else { 
   return false
  }
 }

 function check_ending_regular(data_index) { 
  if(
   update_function_and_update_data.data.charAt(data_index+8) === '\n' || 
   update_function_and_update_data.data.charAt(data_index+8) === ' ' || 
   update_function_and_update_data.data.charAt(data_index+8) === '('
  ) { 
   return true
  } else { 
   return false
  }
 }

 module.exports = check_regular;