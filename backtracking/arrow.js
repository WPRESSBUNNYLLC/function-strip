
/*
 * @param {bt_arrow_parameter_string} the parameters of the arrow function. built via an array, and joined as a string returned as the beginning of the function
 * @param {bt_index} the back tracking of an index
 * @param {bt_index_drop_off_function_name} the index that backtracks the arrow function name. definition used for ending
 * @param {bt_index_drop_off_alphabet} once the first character is hit, set below to on
 * @param {bt_index_drop_off_found_first_character} once on, when first space or new line hit, end and return the name and function parameters
 * @param {bt_index_drop_off_append_equals} once a character is found, make sure to append the equals sign before the function name
 * @param {in_bt_quotation_string} in and out of a string within the parameter set
 * @param {in_bt_string} compliment of above. denotes in and out of a string within the parameter set
 * @param {opening_bt_parentheses} opening parentheses used for ending. could use count
 * @param {closing_bt_parentheses} closing parentheses used for ending. could use count.
 * @param {bt_af_is_async_check} used to turn on or off the condition that appends 'async'
 * i fucked this up so doing again
*/

var data = '';
var bt_arrow_parameter_string = [];
var bt_index = 0;
var found_equals = false;
var found_async = false;
var found_name = false;
var bt_index_drop_off_alphabet = /^[a-zA-Z0-9_$]*$/; //function name

/*
 initiate the beginning of the arrow function... use the unshifted bt_arrow parameter array for ordering
*/

function initiate_arrow(d, data_index) {
  data = d;
  bt_arrow_parameter_string = [];
  bt_index = data_index - 1;
  found_equals = false;
  found_name = false;
  found_async = false;
  back_track_arrow(bt_index);
}

//the only thing to check for is an equals sign on the backtracking set... when an equals sign is found, you know the function has a name and you can check for the name and if theres a type a type as well. an equals sign before the possible async
//so right after the possible async, IF there is an equals sign, then i know i can check for a name and a type and know when to stop.... however if : or , I know there is no name and no type.

//if : stop
//if , stop
//if no async and no = stop
//if async and no =, stop
//if =, check for name then type... type is a set

//this should be able to determine when to end. ending is based on = ...no need to count parentheses. you can do this for every function

function back_track_arrow(bt_index) { 

 //found async
 if(found_async === false && found_equals === false && data.charAt(bt_index) === 'c' && is_async(bt_index)) { 
  found_async = true;
  return back_track_arrow(bt_index); //found async
 } else { 
  return bt_arrow_parameter_string.join(); //no async and random set of characters found which are not equals
 }

 //found equals
 if(data.charAt(bt_index) === '=' && found_equals === false)  { 
  found_equals = true;
  bt_arrow_parameter_string.unshift('=')
  bt_index = bt_index - 1;
  return back_track_arrow(bt_index); //found the equals sign which should always be after if i found async
 } 

 //pushing spaces --should keep this moving -- this can go anywhere maybe ill put it at the top
 if(data.charAt(bt_index) === ' ' || data.charAt(bt_index) === '\n') { //push all spaces and new lines
  bt_arrow_parameter_string.unshift(data.charAt(bt_index))
  bt_index = bt_index - 1;
  return back_track_arrow(bt_index);
 }

 //have not found equals and not an equals sign, end
 if(found_equals === false && (data.charAt(bt_index) !== ' ' && data.charAt(bt_index) !== '\n' && data.charAt(bt_index) !== '=')) { 
  return bt_arrow_parameter_string.join(); //have not found equals and bad character
 }

 //found equals and pushing name then checking type.. after checking type... end
 if(found_equals === true && bt_index_drop_off_alphabet.test(data.charAt(bt_index))) {
  bt_arrow_parameter_string.unshift(data.charAt(bt_index));
  bt_index = bt_index - 1;
  recurse_name(bt_index);
  return;
 }

}

function is_async(bt_index) { 

 if(
  (data.charAt(bt_index-5) === ' ' || data.charAt(bt_index-5) === '\n' || data.charAt(bt_index-5) === '\s' || data.charAt(bt_index-5) === ':' || data.charAt(bt_index-5) === ',') && 
  data.charAt(bt_index-4) === 'a' &&
  data.charAt(bt_index-3) === 's' &&
  data.charAt(bt_index-2) === 'y' &&
  data.charAt(bt_index-1) === 'n' &&
  data.charAt(bt_index  ) === 'c'
 ) { 
  bt_arrow_parameter_string.unshift('c');
  bt_arrow_parameter_string.unshift('n');
  bt_arrow_parameter_string.unshift('y');
  bt_arrow_parameter_string.unshift('s');
  bt_arrow_parameter_string.unshift('a');
  if(data.charAt(bt_index-5) === ' ' || data.charAt(bt_index-5) === '\n' || data.charAt(bt_index-5) === '\s') { 
   bt_arrow_parameter_string.unshift(data.charAt(bt_index-5));
  }
  bt_index = bt_index - 5;
  return true;
 }

 return false;

}

//recurse name and check type....
function recurse_name(bt_index) { 
 if(bt_index_drop_off_alphabet.test(data.charAt(bt_index))) {
  bt_arrow_parameter_string.unshift(data.charAt(bt_index));
  bt_index = bt_index - 1;
  return recurse_name(bt_index);
 } else if(data.charAt(bt_index) === '\n' || data.charAt(bt_index) === ' ') { 
  bt_arrow_parameter_string.unshift(data.charAt(bt_index));
  bt_index = bt_index - 1;
  return recurse_name(bt_index);
 } else if(data.charAt(bt_index) === 't' || data.charAt(bt_index) === 'r') { 
  check_type(bt_index);
  return;
 } else { 
  return;
 }
}

//append type if there is one then end it
function check_type(bt_index) { 
  if(data.charAt(bt_index) === 'r' && data.charAt(bt_index - 1) === 'a' && data.charAt(bt_index - 2) === 'v' && (data.charAt(bt_index - 3) === ' ' || data.charAt(bt_index - 3) === '\n')) { 
    bt_arrow_parameter_string.unshift('r');
    bt_arrow_parameter_string.unshift('a');
    bt_arrow_parameter_string.unshift('v');
  } else if(data.charAt(bt_index) === 't' && data.charAt(bt_index - 1) === 'e' && data.charAt(bt_index - 2) === 'l' && (data.charAt(bt_index - 3) === ' ' || data.charAt(bt_index - 3) === '\n')) { 
    bt_arrow_parameter_string.unshift('t');
    bt_arrow_parameter_string.unshift('e');
    bt_arrow_parameter_string.unshift('l');
  } else if(data.charAt(bt_index) === 't' && data.charAt(bt_index - 1) === 's' && data.charAt(bt_index - 2) === 'n' && data.charAt(bt_index - 3) === 'o' && data.charAt(bt_index - 4) === 'c' && (data.charAt(bt_index - 3) === ' ' || data.charAt(bt_index - 3) === '\n')) { 
    bt_arrow_parameter_string.unshift('t');
    bt_arrow_parameter_string.unshift('s');
    bt_arrow_parameter_string.unshift('n');
    bt_arrow_parameter_string.unshift('o');
    bt_arrow_parameter_string.unshift('c');
  } else { 
    return
  }
}

module.exports = initiate_arrow;