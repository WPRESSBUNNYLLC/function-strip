
/*
 append possible async
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
