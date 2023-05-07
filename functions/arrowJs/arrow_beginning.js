

/*
 recurses backwards the parameters of the arrow function and additional things... will have to build the beginning of this from the other side doing some stuff. this just gets async.. maybe dont get async here and just work it out some other way.. 
*/

var update_function_and_update_data = require('../data');

var data = '';
var beginning_string = [];
var bt_index = 0;
var found_async = false;
var parameters = [];
var opening_parameter_count = 0; 
var closing_parameter_count = 0;
var valid_parens = {};

function initiate_arrow(data_index, boundries) { 
 valid_parens = boundries;
 data = update_function_and_update_data.data;
 beginning_string = [];
 bt_index = data_index - 1;
 found_async = false;
 parameters = [];
 opening_parameter_count = 0;
 closing_parameter_count = 0;
 is_parameter_set_or_is_name(bt_index);
 return end();
}

function is_parameter_set_or_is_name(bt_index) { 

 beginning_string.unshift(data.charAt(bt_index));

 if(data.charAt(bt_index) === ')') { 
  closing_parameter_count += 1; 
  parameters.unshift(')');
  bt_index -= 1;
  append_parameter_set(bt_index); 
  return;
 }

 if(
  data.charAt(bt_index) !== ')' && 
  data.charAt(bt_index) !== ' ' && 
  data.charAt(bt_index) !== '\n'
 ) { 
  parameters.unshift(data.charAt(bt_index));
  bt_index -= 1;
  append_parameter_name(bt_index); 
  return;
 }

 bt_index -= 1; 
 return is_parameter_set_or_is_name(bt_index);

} 

function append_parameter_name(bt_index) {

 beginning_string.unshift(data.charAt(bt_index));

 if(data.charAt(bt_index) === '=') { 
  return;
 }

 if(
  data.charAt(bt_index) === ' ' || 
  data.charAt(bt_index) === '\n'
 ) { 
  bt_index -= 1;
  finish_parameter_set(bt_index);
  return;
 }

 parameters.unshift(data.charAt(bt_index));

 bt_index -= 1; 
 return append_parameter_name(bt_index);

}

function append_parameter_set(bt_index) {

 beginning_string.unshift(data.charAt(bt_index));
 parameters.unshift(data.charAt(bt_index));

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
   data.charAt(bt_index) !== 'c' && 
   data.charAt(bt_index) !== ' ' && 
   data.charAt(bt_index) !== '\n'
  ) { 
   break;
  }

  if(data.charAt(bt_index) === 'c') { 
   append_async();
   break;
  } 

  beginning_string.unshift(data.charAt(bt_index));
  bt_index -= 1;

 }

}

function append_async(bt_index) { 

 if(
  data.charAt(bt_index - 5) === ' ' || data.charAt(bt_index - 5) === '\n' || data.charAt(bt_index - 5) === '=' || data.charAt(bt_index - 5) === '(' && // a few more
  data.charAt(bt_index - 4) === 'a' &&
  data.charAt(bt_index - 3) === 's' && 
  data.charAt(bt_index - 2) === 'y' &&
  data.charAt(bt_index - 1) === 'n' &&
  data.charAt(bt_index) ===     'c'
 ) { 
  beginning_string.unshift(data.charAt(bt_index));
  beginning_string.unshift(data.charAt(bt_index - 1));
  beginning_string.unshift(data.charAt(bt_index - 2));
  beginning_string.unshift(data.charAt(bt_index - 3));
  beginning_string.unshift(data.charAt(bt_index - 4));
  bt_index -= 5;
  found_async = true;
 }

}

function end() { 
 return { 
  found_async: found_async, 
  parameters: parameters.join(), 
  build_string: beginning_string.join(), 
  beginning_index: bt_index
 }
}

module.exports = initiate_arrow;