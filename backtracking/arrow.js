
/*
 * @param {bt_arrow_parameter_string} the parameters of the arrow function. built via an array, and joined as a string returned as the beginning of the function
 * @param {bt_index} the back tracking of an index
 * @param {found_equals} found equals sign so we know when to end... (name and type check)
 * @param {found_async} found async before i found equals if there is an equals. 
 * @param {found_name} found equals now i can get the name and type if there is a type.. there has to be a name though if equals is found
 * @param {end_name} name has ended check for the type
 * @param {in_parameter_set} if in a parameter set, i cannot count a = sign as real
 * @param {in_string_in_parameter_set} if in a string in a parameter set, i cannot count ( as real
 * have to use the index boundries set before for counting real '(' ... setting opening and closing index boundries when entering and exiting things in main, using that here for counting... only way for arrow
*/

var data = '';
var bt_arrow_parameter_string = [];
var bt_index = 0;
var found_equals = false;
var found_async = false;
var found_name = false;
var end_name = false
var in_parameter_set = false;
var in_string_in_parameter_set = false;
var in_string_in_parameter_set_ = [];
var opening_parameter_count = 0; 
var closing_parameter_count = 0;
var bt_index_drop_off_alphabet = /^[a-zA-Z0-9_$]*$/; //function name

/*
 initiate the beginning of the arrow function... use the unshifted bt_arrow parameter array for ordering... (look over code and run it)
*/

function initiate_arrow(d, data_index) {

 data = d;

 bt_arrow_parameter_string = [];

 bt_index = data_index - 1;

 found_equals = false;

 found_name = false;

 end_name = false;

 found_async = false;

 in_parameter_set = false;

 in_string_in_parameter_set = false;

 in_string_in_parameter_set_ = [];

 opening_parameter_count = 0;

 closing_parameter_count = 0;

 try {

  append_parameter_set(bt_index);

  var a = append_possible_async(bt_index);

  if(a.continue === false) {
   return bt_arrow_parameter_string.join();
  }

  var b = append_possible_equals(bt_index);

  if(b.continue === false) {
   return bt_arrow_parameter_string.join();
  }

  append_name_and_possible_type(bt_index);

  return bt_arrow_parameter_string.join();

 } catch(err) { 

  console.log(err.message);
  return ''

 }

}

/*
 append the guarenteed parameter set
*/

function append_parameter_set(bt_index) { 

 /*
  append spaces before reaching the parameter set
 */

 if((data.charAt(bt_index) === ' ' || data.charAt(bt_index) === '\n')) {
  bt_arrow_parameter_string.unshift(data.charAt(bt_index))
  bt_index = bt_index - 1;
  return append_parameter_set(bt_index);
 }

 /*
  entering the parameter set -- 
 */

 if(data.charAt(bt_index) === ')') { //
  if(in_parameter_set === false) { 
    in_parameter_set = true; 
  }
  if(in_string_in_parameter_set === false) { 
   closing_parameter_count += 1;
  }
  bt_arrow_parameter_string.unshift(data.charAt(bt_index));
  bt_index = bt_index - 1;
  return append_parameter_set(bt_index); 
 } 

 /*
  exit a string inside of a parameter set.. for determing real ( ...character already pushed below     var a = /[(fd']/g)
 */

 if(
  in_string_in_parameter_set === true && 
  in_string_in_parameter_set_.length > 1 && 
  in_string_in_parameter_set_[in_string_in_parameter_set_.length - 1] === in_string_in_parameter_set_[0] && 
  data.charAt(bt_index-1) !== "\\"
 ) { 
  in_string_in_parameter_set_ = [];
  in_string_in_parameter_set = false;
  return append_parameter_set(bt_index);
 }

 /*
  enter a string inside of a parameter set for determing real (
 */

 if(
  (in_string_in_parameter_set === false) && 
  (data.charAt(bt_index) === '"' || data.charAt(bt_index) === '`' || data.charAt(bt_index) === `'`) //(error on ` ... if `${reg(`)}`) ...cannot determine when in a template literal coming from the right side... need to track entering and exiting the template literal outside the function in main...
 ) { 
  in_string_in_parameter_set_.unshift(data.charAt(bt_index)); 
  in_string_in_parameter_set = true;
  bt_arrow_parameter_string.unshift(data.charAt(bt_index));
  bt_index = bt_index - 1;
  return append_parameter_set(bt_index);
 }

 /*
  exiting the parameter set or appending a (...
 */ 

 if(data.charAt(bt_index) === '(') { 
  if(in_string_in_parameter_set === false) { //would also need to determine if in a regular expression / template literal
   opening_parameter_count += 1;
  }
  bt_arrow_parameter_string.unshift(data.charAt(bt_index));
  bt_index = bt_index - 1;
  if(opening_parameter_count === closing_parameter_count) { 
    in_parameter_set = false;
    return;
  }
  return append_parameter_set(bt_index);
 }

 /*
  pushing every character when in the parameter set.. must come last for other conditions to execute.. dont need condition but helps for error
 */

 if(in_parameter_set === true) {
  bt_arrow_parameter_string.unshift(data.charAt(bt_index));
  bt_index = bt_index - 1;
  return append_parameter_set(bt_index);
 }
 
 /*
  if arrow function is formatted correctly, this statement will not be hit
 */

 throw new error(
 "parameter set error:\n" +
 "The parameter set conditions are ordered for this statement to be unreachable."
 )

}

/*
 append async if it exists
*/

function append_possible_async(bt_index) { 

 /*
  append spaces before finding first character
 */

 if(
  (data.charAt(bt_index) === ' ' || data.charAt(bt_index) === '\n') && 
  found_async === false
 ) {
  bt_arrow_parameter_string.unshift(data.charAt(bt_index))
  bt_index = bt_index - 1;
  return append_possible_async(bt_index);
 }

 /*
  found async, append and get out
 */

 if(
  found_async === false && 
  data.charAt(bt_index) === 'c' && 
  is_async(bt_index) === true
 ) { 
  found_async = true;
  return { 
    continue: true
  }
 }

 /*
  the first character found after the parameter set suggests not async and not equals... get out.. dont need to set to false
 */

 if(
  found_async === false && 
  data.charAt(bt_index) !== 'c' && 
  data.charAt(bt_index) !== ' ' && 
  data.charAt(bt_index) !== '\n' && 
  data.charAt(bt_index) !== '='
 ) { 
  found_async = false;
  return { 
    continue: false
  }
 }

 /*
  the first character found after the parameter set is an equals sign, continue to get the name. found_equals set to true in the next function
 */

 if(
  found_async === false && 
  data.charAt(bt_index) === '='
 ) { 
  found_async = false;
  return { 
    continue: true
  }
 }

 /*
  if arrow function is formatted correctly, this statement will not be hit
 */

 throw new error(
 "async set error:\n" +
 "The async set conditions are ordered for this statement to be unreachable."
 )

}

/*
 append equals if it exists
*/

function append_possible_equals(bt_index) { 

 /*
  append spaces before finding first real character
 */

 if(
  (data.charAt(bt_index) === ' ' || data.charAt(bt_index) === '\n') && 
  found_equals === false
 ) {
  bt_arrow_parameter_string.unshift(data.charAt(bt_index))
  bt_index = bt_index - 1;
  return append_possible_equals(bt_index);
 }

 /*
  the first character found after async is not an equals sign, or a space
 */

 if(
  found_equals === false && 
  data.charAt(bt_index) !== ' ' && 
  data.charAt(bt_index) !== '\n' && 
  data.charAt(bt_index) !== '='
 ) { 
  found_equals = false;
  return { 
    continue: false
  }
 }

 /*
  found equals
 */

 if(
  found_equals === false && 
  data.charAt(bt_index) === '='
 ) { 
  found_equals = true;
  return { 
    continue: true
  }
 }

 /*
  if arrow function is formatted correctly, this statement will not be hit
 */

 throw new error(
 "equals set error:\n" +
 "The equals set conditions are ordered for this statement to be unreachable."
 )

}

/*
 append function name and possibly the type
*/

function append_name_and_possible_type(bt_index) { 

 /*
  append spaces before finding first real character for the name
 */

 if(
  (data.charAt(bt_index) === ' ' || data.charAt(bt_index) === '\n') && 
  found_name === false
 ) {
  bt_arrow_parameter_string.unshift(data.charAt(bt_index))
  bt_index = bt_index - 1;
  return append_possible_equals(bt_index);
 }

 /*
  found the first character that sugests the name
 */
  
 if(
  found_name === false && 
  bt_index_drop_off_alphabet.test(data.charAt(bt_index)) === true
 ) {
  found_name = true;
  bt_arrow_parameter_string.unshift(data.charAt(bt_index));
  bt_index = bt_index - 1;
  recurse_name(bt_index);
  return;
 }

 /*
  if arrow function is formatted correctly, this statement will not be hit. if unknown character for name most likely
 */

 throw new error(
 "name and type set error:\n" +
 "The name set conditions are ordered for this statement to be unreachable."
 )

}

/*
 append async if exists
*/

function is_async(bt_index) { 
 if(
  (data.charAt(bt_index-5) === ' ' || data.charAt(bt_index-5) === '\n' || data.charAt(bt_index-5) === ':' || data.charAt(bt_index-5) === ',' || data.charAt(bt_index-5) === '=') && 
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
  if(data.charAt(bt_index-5) === ' ' || data.charAt(bt_index-5) === '\n') { 
   bt_arrow_parameter_string.unshift(data.charAt(bt_index-5));
   bt_index = bt_index - 1;
  }
  bt_index = bt_index - 5; //starts on an index thats an actual character for equals sign etc
  return true;
 }
 return false;
}

/*
 recurse name and check type then end it....
*/

function recurse_name(bt_index) { 
 if(
  bt_index_drop_off_alphabet.test(data.charAt(bt_index)) === true && 
  end_name === false
 ) {
  bt_arrow_parameter_string.unshift(data.charAt(bt_index));
  bt_index = bt_index - 1;
  return recurse_name(bt_index);
 } else if(
  data.charAt(bt_index) === '\n' || 
  data.charAt(bt_index) === ' '
 ) { 
  end_name = true
  bt_arrow_parameter_string.unshift(data.charAt(bt_index));
  bt_index = bt_index - 1;
  return recurse_name(bt_index);
 } else if(
  data.charAt(bt_index) === 't' || 
  data.charAt(bt_index) === 'r'
 ) { 
  check_type(bt_index);
  return;
 } else { 
  return; //implies no type
 }
}

/*
 append type if there is one then end it
*/

function check_type(bt_index) { 
 if(
  data.charAt(bt_index) === 'r' && 
  data.charAt(bt_index - 1) === 'a' && 
  data.charAt(bt_index - 2) === 'v' && 
  (data.charAt(bt_index - 3) === ' ' || data.charAt(bt_index - 3) === '\n')
 ) { 
  bt_arrow_parameter_string.unshift('r');
  bt_arrow_parameter_string.unshift('a');
  bt_arrow_parameter_string.unshift('v');
 } else if(
  data.charAt(bt_index) === 't' && 
  data.charAt(bt_index - 1) === 'e' && 
  data.charAt(bt_index - 2) === 'l' && 
  (data.charAt(bt_index - 3) === ' ' || data.charAt(bt_index - 3) === '\n')
 ) { 
  bt_arrow_parameter_string.unshift('t');
  bt_arrow_parameter_string.unshift('e');
  bt_arrow_parameter_string.unshift('l');
 } else if(
  data.charAt(bt_index) === 't' && 
  data.charAt(bt_index - 1) === 's' && 
  data.charAt(bt_index - 2) === 'n' && 
  data.charAt(bt_index - 3) === 'o' && 
  data.charAt(bt_index - 4) === 'c' && 
  (data.charAt(bt_index - 5) === ' ' || data.charAt(bt_index - 5) === '\n')
 ) { 
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