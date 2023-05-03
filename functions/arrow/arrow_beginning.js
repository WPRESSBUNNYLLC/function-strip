
/*
 recurses backwards the parameters of the arrow function and additional things
*/

var update_function_and_update_data = require('../data');

var data = '';
var beginning_string = [];
var bt_index = 0;
var found_equals = false;
var found_async = false;
var found_name = false;
var end_name = false
var opening_parameter_count = 0; 
var closing_parameter_count = 0;
var space_found = false;
var valid_parens = {};

function initiate_arrow(data_index, boundries) {
 valid_parens = boundries;
 data = update_function_and_update_data.data;
 beginning_string = [];
 bt_index = data_index - 1;
 found_equals = false;
 found_name = false;
 end_name = false;
 found_async = false;
 space_found = false;
 opening_parameter_count = 0;
 closing_parameter_count = 0;
 is_parameter_set_or_is_name(bt_index);
}

function is_parameter_set_or_is_name(bt_index) { 

 beginning_string.unshift(data.charAt(bt_index));

 if(data.charAt(bt_index) === ')') { 
  closing_parameter_count += 1; 
  bt_index -= 1;
  append_parameter_set(bt_index); 
  return;
 }

 if(
  data.charAt(bt_index) !== ')' && 
  data.charAt(bt_index) !== ' ' && 
  data.charAt(bt_index) !== '\n'
  ) { 
  bt_index -= 1;
  append_name(bt_index); 
  return;
 }

 bt_index -= 1; 
 return is_parameter_set_or_is_name(bt_index);

} 

function append_name(bt_index) { 

 beginning_string.unshift(data.charAt(bt_index));

 if(data.charAt(bt_index) === '=') { 
  bt_index -= 1;
  append_name_and_possible_type(bt_index);
  return;
 }

 if(
  data.charAt(bt_index) === ' ' || 
  data.charAt(bt_index) === '\n'
 ) { 
  bt_index -= 1;
  append_possible_async(bt_index);
  return;
 }


 bt_index -= 1; 
 return append_name(bt_index);

}

function append_parameter_set(bt_index) { 

 beginning_string.unshift(data.charAt(bt_index));

 if(
  data.charAt(bt_index) === ')' && 
  valid_parens[`${bt_index}-closing`] === true
 ) { 
  closing_parameter_count += 1;
 }

 if(
  data.charAt(bt_index) === '(' && 
  valid_parens[`${bt_index}-opening`] === true
 ) { 
  opening_parameter_count += 1;
  if(opening_parameter_count === closing_parameter_count) { 
   bt_index -= 1;
   finish_parameter_set(bt_index)
   return;
  }
 }

 bt_index -= 1; 
 return append_parameter_set(bt_index);

}

function finish_parameter_set(bt_index) { 

 while(true) {

  if(
   data.charAt(bt_index) !== ' ' && 
   data.charAt(bt_index) !== '\n' && 
   data.charAt(bt_index) !== 'c' 
  ) { 
   end = true; 
   break;
  } 

  if(data.charAt(bt_index) === 'c') { 
   append_async();
   break;
  } 

  if(data.charAt(bt_index) === '=') { 
   beginning_string.unshift(data.charAt(bt_index));
   bt_index -= 1;
   append_name_and_possible_type();
   break;
  }

  beginning_string.unshift(data.charAt(bt_index));
  bt_index -= 1;

 }

}

function append_async(bt_index) { 

 if(
  data.charAt(bt_index - 4) === 'a' &&
  data.charAt(bt_index - 3) === 's' && 
  data.charAt(bt_index - 2) === 'y' &&
  data.charAt(bt_index - 1) === 'n' &&
  data.charAt(bt_index) === 'c'
 ) { 
  beginning_string.unshift(data.charAt(bt_index));
  beginning_string.unshift(data.charAt(bt_index - 1));
  beginning_string.unshift(data.charAt(bt_index - 2));
  beginning_string.unshift(data.charAt(bt_index - 3));
  beginning_string.unshift(data.charAt(bt_index - 4));
  bt_index -= 5;
  finish_async(bt_index);
 }

}

function finish_async() { 

 while(true) { 

  if(
   data.charAt(bt_index) !== ' ' && 
   data.charAt(bt_index) !== '\n' && 
   data.charAt(bt_index) !== '=' 
  ) { 
   end = true; 
   break;
  }

  if(data.charAt(bt_index) === '=') { 
   beginning_string.unshift(data.charAt(bt_index));
   bt_index -= 1;
   append_name_and_possible_type(bt_index);
   break;
  }

  beginning_string.unshift(data.charAt(bt_index));
  bt_index -= 1;

 }

}

function append_name_and_possible_type(bt_index) { 

 beginning_string.unshift(data.charAt(bt_index));

 if(
  space_found === false && 
  data.charAt(bt_index) === ' ' || 
  data.charAt(bt_index) === '\n'
 ) { 
  space_found === true
 }

 if(
  space_found === true && 
  data.charAt(bt_index) === ' ' || 
  data.charAt(bt_index) === '\n'
 ) { 
  bt_index -= 1; 
  get_type(bt_index)
  return;
 }

 bt_index -= 1; 
 return append_name_and_possible_type(bt_index);

}

function get_type(bt_index) { 

 if(
  data.charAt(bt_index) !== 't' &&
  data.charAt(bt_index) !== 'r' && 
  data.charAt(bt_index) !== ' ' && 
  data.charAt(bt_index) !== '\n'
 ) { 
  return;
 }

 if(
  data.charAt(bt_index) === 't' || 
  data.charAt(bt_index) === 'r'
 ) { 
  append_type(bt_index);
  return;
 }

 beginning_string.unshift(data.charAt(bt_index));

 bt_index -= 1; 
 return get_type(bt_index);
 
}

function append_type(bt_index) { 

 if(  
  (data.charAt(bt_index - 3) === ' ' || data.charAt(bt_index - 3) === '\n') &&
  data.charAt(bt_index - 2) === 'l' && 
  data.charAt(bt_index - 1) === 'e' &&
  data.charAt(bt_index) === 't'
 ) { 
  beginning_string.unshift(data.charAt(bt_index));
  beginning_string.unshift(data.charAt(bt_index - 1));
  beginning_string.unshift(data.charAt(bt_index - 2));
 }

 if(  
  (data.charAt(bt_index - 3) === ' ' || data.charAt(bt_index - 3) === '\n') &&
  data.charAt(bt_index - 2) === 'v' && 
  data.charAt(bt_index - 1) === 'a' &&
  data.charAt(bt_index) === 'r'
 ) { 
  beginning_string.unshift(data.charAt(bt_index));
  beginning_string.unshift(data.charAt(bt_index - 1));
  beginning_string.unshift(data.charAt(bt_index - 2));
 }

 if(  
  (data.charAt(bt_index - 5) === ' ' || data.charAt(bt_index - 5) === '\n') &&
  data.charAt(bt_index - 4) === 'c' && 
  data.charAt(bt_index -  3) === 'o' &&
  data.charAt(bt_index - 2) === 'n' &&
  data.charAt(bt_index - 1) === 's' &&
  data.charAt(bt_index) === 't'
 ) { 
  beginning_string.unshift(data.charAt(bt_index));
  beginning_string.unshift(data.charAt(bt_index - 1));
  beginning_string.unshift(data.charAt(bt_index - 2));
  beginning_string.unshift(data.charAt(bt_index - 3));
  beginning_string.unshift(data.charAt(bt_index - 4));
 }

 return;

}

module.exports = initiate_arrow; 
