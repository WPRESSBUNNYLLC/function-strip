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
*/

var data = '';
var data_index = 0; //get rid of this
var bt_arrow_parameter_string = [];
var bt_index = 0;
var in_bt_quotation_string = [];
var in_bt_string = false;
var opening_bt_parentheses = 0;
var closing_bt_parentheses = 0;
var is_arrow = true;
var bt_index_drop_off_found_first_character = false;
var bt_index_drop_off_function_name = 0;
var bt_index_drop_off_append_equals = false;
var bt_af_is_async_check = false;
var bt_index_drop_off_alphabet = /^[a-zA-Z0-9_$]*$/; //function name

/*
 initiate the beginning of the arrow function... use the unshifted bt_arrow parameter array for ordering
*/

function initiate_arrow(d, d_i) {
  data = d;
  data_index = d_i; //get rid of this and just set the bt_index to minice 1
  bt_arrow_parameter_string = [];
  bt_index = data_index - 1;
  in_bt_quotation_string = [];
  in_bt_string = false;
  opening_bt_parentheses = 0;
  closing_bt_parentheses = 0;
  is_arrow = true;
  bt_index_drop_off_found_first_character = false;
  bt_index_drop_off_function_name = 0;
  bt_index_drop_off_append_equals = false;
  bt_af_is_async_check = false;
  back_track_arrow(bt_index);
}

function back_track_arrow(bt_index) { 

 /*
  end traversing a string inside a function parameter set
 */

 if(
  in_bt_string === true &&
  in_bt_quotation_string.length > 1 && 
  in_bt_quotation_string[in_bt_quotation_string.length - 1] === in_bt_quotation_string[0]
 ) { 
  in_bt_quotation_string = [];
  in_bt_string = false;
  return back_track_arrow(bt_index);
 }

 /*
  begin traversing a string inside a function parameter set. dont need first two but helps make things clear.
 */

 if(
  (in_bt_string === false || in_bt_string === true) &&
  (data.charAt(bt_index) === '"' || data.charAt(bt_index) === '`' || data.charAt(bt_index) === `'`)
 ) { 
  in_bt_quotation_string.push(data.charAt(bt_index)); 
  in_bt_string = true;
  bt_arrow_parameter_string.unshift(data.charAt(bt_index));
  bt_index = bt_index - 1;
  return back_track_arrow(bt_index);
 }

 /*
  track opening and closing parentheses. will always be 1 = 1
 */

 if(in_bt_string === false && data.charAt(bt_index) === ')') {
  closing_bt_parentheses = closing_bt_parentheses + 1;
 } else if(in_bt_string === false && data.charAt(bt_index) === '(') { 
  opening_bt_parentheses = opening_bt_parentheses + 1;
 }

 /*
  adding to the arrow function parameter set. I add every character from opening to close
 */

 bt_arrow_parameter_string.unshift(data.charAt(bt_index));
 
 /*
  return the parameters "wow = (a,b,c)" or "wow = async (a,b,c)" count should always be 1 here for closing and opening 1 = 1
 */

 if(closing_bt_parentheses === opening_bt_parentheses && closing_bt_parentheses === 1) { 
  bt_index_drop_off_function_name = bt_index - 1;
  get_arrow_parameter_function_name(bt_index_drop_off_function_name);
  get_declaration_type(bt_index_drop_off_function_name);
  bt_arrow_parameter_string = bt_arrow_parameter_string.join();
  return bt_arrow_parameter_string; //returns the beginning string of the function
 }

 /*
  move back one character and go again
 */

 bt_index = bt_index - 1;
 return back_track_arrow(bt_index);

} 

/*
 get the arrow function name by backtracking
*/

function get_arrow_parameter_function_name(bt_index_drop_off_function_name) { 

  /*
   immediately take async into consideration when c is found here - runs once
  */

  if(
    bt_af_is_async_check === false && 
    data.charAt(bt_index_drop_off_function_name) === 'c' && 
    bt_index_drop_off_found_first_character === false
   ) {
    is_async(bt_index_drop_off_function_name);
    return get_arrow_parameter_function_name(bt_index_drop_off_function_name);
  }

  /*
    the function name has been appended because a space between the declaration type and function. Or stop when a ':' is found where there is no function name. not sure if /s and ' ' are the same thing 
  */

  if(
   (bt_index_drop_off_found_first_character === true && (data.charAt(bt_index_drop_off_function_name) === '\s' || data.charAt(bt_index_drop_off_function_name) === ' ' || data.charAt(bt_index_drop_off_function_name) === ':')) ||
   (bt_index_drop_off_found_first_character === false && data.charAt(bt_index_drop_off_function_name) === ':')
  ) { 
   return;
  }

  /*
   if the first character hasnt been found yet, check to see if a first character exists.
  */

  if(bt_index_drop_off_found_first_character === false) {
    bt_index_drop_off_found_first_character = bt_index_drop_off_alphabet.test(data.charAt(bt_index_drop_off_function_name)); 
  }

  /*
   if first character found, unshift.. if first found and first time, make sure to append an equals sign first.
  */

  if(
    bt_index_drop_off_found_first_character === true && 
    bt_index_drop_off_append_equals === false
  ) { 
    bt_index_drop_off_append_equals = true
    bt_arrow_parameter_string.unshift(' = ');
    bt_arrow_parameter_string.unshift(data.charAt(bt_index_drop_off_function_name));
  } else if(bt_index_drop_off_found_first_character === true && bt_index_drop_off_append_equals === true) { 
    bt_arrow_parameter_string.unshift(data.charAt(bt_index_drop_off_function_name));
  } 

  /*
   move back one
  */

  bt_index_drop_off_function_name = bt_index_drop_off_function_name - 1;
  return get_arrow_parameter_function_name(bt_index_drop_off_function_name);

}

 /*
  if async exists add to the string... if not an async function, index remains the same for the next condition, which begins the function name... look at this again
 */

function is_async(bt_index_drop_off_function_name) { 

 if(
  (data.charAt(bt_index_drop_off_function_name-5) === ' ' || data.charAt(bt_index_drop_off_function_name-5) === '\n' || data.charAt(bt_index_drop_off_function_name-5) === '\s') && //possibly add a : ...if :, then append async and just end
  data.charAt(bt_index_drop_off_function_name-4) === 'a' &&
  data.charAt(bt_index_drop_off_function_name-3) === 's' &&
  data.charAt(bt_index_drop_off_function_name-2) === 'y' &&
  data.charAt(bt_index_drop_off_function_name-1) === 'n' &&
  data.charAt(bt_index_drop_off_function_name  ) === 'c'
 ) { 
  bt_arrow_parameter_string.unshift(' ');
  bt_arrow_parameter_string.unshift('c');
  bt_arrow_parameter_string.unshift('n');
  bt_arrow_parameter_string.unshift('y');
  bt_arrow_parameter_string.unshift('s');
  bt_arrow_parameter_string.unshift('a');
  bt_index_drop_off_function_name = bt_index_drop_off_function_name - 6;
 }

 bt_af_is_async_check = true;
 return;

}

/*
 get declaration type. backtrack until first letter and check for every type previous to if - = let var const whatever...
*/

function get_declaration_type(bt_index_drop_off_function_name) { 

}

module.exports = initiate_arrow;