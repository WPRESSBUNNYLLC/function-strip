
/*

 * @param {bt_arrow_parameter_string} the parameters of the arrow function. built via an array, and joined as a string returned as the beginning of the function
 * @param {bt_index} the back tracking of an index
 * @param {found_equals} found equals sign so we know when to end... (name and type check)
 * @param {found_async} found async before i found equals if there is an equals. 
 * @param {found_name} found equals now i can get the name and type if there is a type.. there has to be a name though if equals is found
 * @param {in_parameter_set} if in a parameter set, i cannot count a = sign as real
 * @param {in_string_in_parameter_set} if in a string in a parameter set, i cannot count ( as real
 * @param {param_set_over} just to make sure im out.
 
   the only thing to check for is an equals sign on the backtracking set... when an equals sign is found, you know the function has a name and possibly a type
   this should be able to determine when to end. ending is based on = ...no need to count parentheses. you can do this for every function
   just need to check for when in the parameter set for equals signs that should not be counted..
   only thing that needs to come first is the async check before equals check
   fix this code up a little bit and use it for regular..without the parameter set though

*/

var data = '';
var bt_arrow_parameter_string = [];
var bt_index = 0;
var found_equals = false;
var found_async = false;
var found_name = false;
var in_parameter_set = false;
var in_string_in_parameter_set = false;
var in_string_in_parameter_set_ = [];
var param_set_over = false; //backup
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
  in_parameter_set = false;
  param_set_over = false;
  in_string_in_parameter_set = false;
  in_string_in_parameter_set_ = [];
  back_track_arrow(bt_index);
}

function back_track_arrow(bt_index) { 

 //exit a string inside of a parameter set.. for determing real (
 if((in_parameter_set === true && in_string_in_parameter_set === true) && in_string_in_parameter_set_.length > 1 && in_string_in_parameter_set_[in_string_in_parameter_set_.length - 1] === in_string_in_parameter_set_[0]) { 
  in_string_in_parameter_set_ = [];
  in_string_in_parameter_set = false;
  return back_track_arrow(bt_index);
 }

 //enter a string inside of a parameter set
 if((in_parameter_set === true && in_string_in_parameter_set === false) && (data.charAt(bt_index) === '"' || data.charAt(bt_index) === '`' || data.charAt(bt_index) === `'`)) { 
  in_string_in_parameter_set_.push(data.charAt(bt_index)); 
  in_string_in_parameter_set = true;
  bt_arrow_parameter_string.unshift(data.charAt(bt_index));
  bt_index = bt_index - 1;
  return back_track_arrow(bt_index);
 }

 //entering and exiting the parameter set... when exiting making sure not in a string
 if(param_set_over === false && in_parameter_set === false && data.charAt(bt_index) === ')' && found_async === false && found_equals === false) { //shouldnt need last two
  in_parameter_set = true;
  bt_arrow_parameter_string.unshift(data.charAt(bt_index));
  bt_index = bt_index - 1;
  return back_track_arrow(bt_index); 
 } else if(in_parameter_set === true && data.charAt(bt_index) === '(' && in_string_in_parameter_set === false) { 
  in_parameter_set = false;
  param_set_over = true;
  bt_arrow_parameter_string.unshift(data.charAt(bt_index));
  bt_index = bt_index - 1;
  return back_track_arrow(bt_index);
 }

 //pushing every character when in the parameter set
 if(in_parameter_set === true) { 
  bt_arrow_parameter_string.unshift(data.charAt(bt_index));
  bt_index = bt_index - 1;
  return back_track_arrow(bt_index);
 }

 //found async
 if(found_async === false && found_equals === false && data.charAt(bt_index) === 'c' && is_async(bt_index) && in_parameter_set === false) { 
  found_async = true;
  return back_track_arrow(bt_index); //found async
 } else { 
  return bt_arrow_parameter_string.join(); //no async and random set of characters found which are not an equals sign
 }

 //found equals
 if(data.charAt(bt_index) === '=' && found_equals === false && in_parameter_set === false)  { 
  found_equals = true;
  bt_arrow_parameter_string.unshift('=')
  bt_index = bt_index - 1;
  return back_track_arrow(bt_index); //found the equals sign which should always be after if i found async
 } 

 //pushing spaces --should keep this moving -- this can go anywhere maybe ill put it at the top
 if(data.charAt(bt_index) === ' ' || data.charAt(bt_index) === '\n' && in_parameter_set === false) { //push all spaces and new lines
  bt_arrow_parameter_string.unshift(data.charAt(bt_index))
  bt_index = bt_index - 1;
  return back_track_arrow(bt_index);
 }

 //have not found equals and not an equals sign, end
 if(found_equals === false && (data.charAt(bt_index) !== ' ' && data.charAt(bt_index) !== '\n' && data.charAt(bt_index) !== '=') && in_parameter_set === false) { 
  return bt_arrow_parameter_string.join(); //have not found equals and bad character... this works because already checked async
 }

 //found equals and pushing name then checking type.. after checking type... end
 if(found_equals === true && bt_index_drop_off_alphabet.test(data.charAt(bt_index)) && in_parameter_set === false) {
  bt_arrow_parameter_string.unshift(data.charAt(bt_index));
  bt_index = bt_index - 1;
  recurse_name(bt_index);
  return bt_arrow_parameter_string.join();
 }

 //should not hit
 console.log('error arrow');
 bt_index = bt_index - 1; 
 return back_track_arrow(bt_index);

}

//append async if exists
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
   bt_index = bt_index - 1;
  }
  bt_index = bt_index - 5;
  return true;
 }
 return false;
}

//recurse name and check type....
function recurse_name(bt_index) { 
 if(bt_index_drop_off_alphabet.test(data.charAt(bt_index)) && found_name === false) {
  bt_arrow_parameter_string.unshift(data.charAt(bt_index));
  bt_index = bt_index - 1;
  return recurse_name(bt_index);
 } else if(data.charAt(bt_index) === '\n' || data.charAt(bt_index) === ' ') { 
  found_name = true
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