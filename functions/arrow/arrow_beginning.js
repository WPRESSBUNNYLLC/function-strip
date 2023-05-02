
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
  found_equals = true;
  bt_index -= 1;
  append_name_and_possible_type(bt_index);
  return;
 }

 if(
  data.charAt(bt_index) === ' ' || 
  data.charAt(bt_index) === '\n'
 ) { 
  found_equals = false;
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
    while(true) {
     beginning_string.unshift(data.charAt(bt_index));
     if(data.charAt(bt_index) === 'c') { 
      bt_index -= 1;
      append_async();
      break;
     } else if(data.charAt(bt_index) === '=') { 
      bt_index -= 1;
      append_name_and_possible_type();
      break;
     }
     bt_index -= 1;
    }
    return;
   }
 }

 bt_index -= 1; 
 return append_parameter_set(bt_index);

}

function append_async(bt_index) { 

  if(
   data.charAt(bt_index - 3) === 'a' &&
   data.charAt(bt_index - 2) === 's' && 
   data.charAt(bt_index - 1) === 'y' &&
   data.charAt(bt_index) === 'n'
  ) { 
   beginning_string.unshift(data.charAt(bt_index));
   beginning_string.unshift(data.charAt(bt_index - 1));
   beginning_string.unshift(data.charAt(bt_index - 2));
   beginning_string.unshift(data.charAt(bt_index - 3));
   bt_index -= 4;
   while(true) { 
    beginning_string.unshift(data.charAt(bt_index));
    if(data.charAt(bt_index) === '=') { 
     bt_index -= 1;
     append_name_and_possible_type(data.charAt(bt_index));
     break;
    }
    bt_index -= 1;
   }
   return;
  } else { 
   throw new error(
   'async was not found which is \n' +
   'the only key word that can be allowed \n' +
   'between the equals and the parameter set.'
   )
  }

}

function append_name_and_possible_type(bt_index) { 
 //name then type
}

module.exports = initiate_arrow; 
