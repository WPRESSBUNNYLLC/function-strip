
 var data = '';
 var data_index = 0;

 function init_regular_check(data_, data_index_) { 
  data = data_;
  data_index = data_index_;
  return check_regular();
 }

 function check_regular() {
  if(check_beginning_regular() && data.charAt(data_index) === 'f' && data.charAt(data_index+1) === 'u' &&  data.charAt(data_index+2) === 'n' && data.charAt(data_index+3) === 'c' && data.charAt(data_index+4) === 't' && data.charAt(data_index+5) === 'i' && data.charAt(data_index+6) === 'o' && data.charAt(data_index+7) === 'n' && check_ending_regular()) {
   return true;
  } else { 
   return false;
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

 module.exports = init_regular_check;