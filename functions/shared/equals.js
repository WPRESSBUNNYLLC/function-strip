
/*
 append equals if it exists..return the updated array and replace with running in main 
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