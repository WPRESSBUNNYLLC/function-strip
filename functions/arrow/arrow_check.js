  
 function check_arrow(data, data_index) {
  if(check_beginning_arrow(data, data_index) && data.charAt(data_index) ===  '=' && data.charAt(data_index+1) ===  '>' && check_ending_arrow(data, data_index)) {
   return true;
  } else { 
    return false;
  }
 }

function check_beginning_arrow(data, data_index) { 
  if(data.charAt(data_index-1) === '\n' || data.charAt(data_index-1) === ' ' || data.charAt(data_index-1) === ')') { 
   return true
  } else { 
   return false
  }
 }

function check_ending_arrow(data, data_index) { 
  if(data.charAt(data_index+2) === '\n' || data.charAt(data_index+2) === ' ' || data.charAt(data_index+2) === '{') { 
   return true
  } else { 
   return false
  }
 }

 module.exports = check_arrow;