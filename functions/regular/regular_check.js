
  
 function check_regular() {
  if(check_beginning_regular() && data.charAt(data_index) === 'f' && data.charAt(data_index+1) === 'u' &&  data.charAt(data_index+2) === 'n' && data.charAt(data_index+3) === 'c' && data.charAt(data_index+4) === 't' && data.charAt(data_index+5) === 'i' && data.charAt(data_index+6) === 'o' && data.charAt(data_index+7) === 'n' && check_ending_regular()) {
   function_line_number = line_number;
   build_string = initiate_regular(data, data_index) + " function"; 
   data_index = data_index + 8; 
   build_string += initiate_regular_main(data, data_index)
   return { 
    data_index: data_index, 
    build_string: build_string
   } 
  }
 }
 
 function check_beginning_regular() { 
  if((data.charAt(data_index-1) === '\n' || data.charAt(data_index-1) === ' ' || data.charAt(data_index-1) === ',' || data.charAt(data_index-1) === ':') || ((data.charAt(data_index-1) === '=' || data.charAt(data_index-1) === '(' || data.charAt(data_index-1) === '+' || data.charAt(data_index-1) === '-' || data.charAt(data_index-1) === '~' || data.charAt(data_index-1) === '!') && (data.charAt(data_index-2) === ' ' || data.charAt(data_index-2) === '\n' || data.charAt(data_index-2) === ',' || data.charAt(data_index-2) === ':'))) {
    return true
  } else { 
    return false
  }
 }

 function check_ending_regular() { 
  if((data.charAt(data_index+8) === '\n' || data.charAt(data_index+8) === ' ' || data.charAt(data_index+8) === '(')) { 
   return true
  } else { 
   return false
  }
 }

 module.exports = check_regular;