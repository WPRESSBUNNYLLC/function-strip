
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