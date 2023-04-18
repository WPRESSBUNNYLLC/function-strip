
var update_function_and_update_data = require('../../data');
var data = '';
var in_html = false; //used for the other types of functions
 
 function check_regular(data_index) {
  data = update_function_and_update_data.data;
  if(
   check_beginning_regular(data_index) && 
   data.charAt(data_index) ===   'f' && 
   data.charAt(data_index+1) === 'u' &&  
   data.charAt(data_index+2) === 'n' && 
   data.charAt(data_index+3) === 'c' && 
   data.charAt(data_index+4) === 't' && 
   data.charAt(data_index+5) === 'i' && 
   data.charAt(data_index+6) === 'o' && 
   data.charAt(data_index+7) === 'n' && 
   check_ending_regular(data_index)
  ) {
   return true;
  } else { 
   return false;
  }
 }

 function check_beginning_regular(data_index) { 
  if(
   data.charAt(data_index-1) === '\n' ||  //any whatever character ) too
   data.charAt(data_index-1) === ' ' || 
   data.charAt(data_index-1) === ',' || 
   data.charAt(data_index-1) === ':' || 
   data.charAt(data_index-1) === '}' || 
   data.charAt(data_index-1) === '=' || 
   data.charAt(data_index-1) === '(' || 
   data.charAt(data_index-1) === ';'
  ) {
   return true
  } else { 
   return false
  }
 }

 function check_ending_regular(data_index) { 
  if(
   data.charAt(data_index+8) === '\n' || 
   data.charAt(data_index+8) === ' ' || 
   data.charAt(data_index+8) === '('
  ) { 
   return true
  } else { 
   return false
  }
 }

 module.exports = check_regular;