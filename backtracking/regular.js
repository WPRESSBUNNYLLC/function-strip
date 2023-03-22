
/*
  * @param {drop_off_index_reg} index used to determine if an async function
  * @param {bt_regular_parameter_string} using this to backtrack and build the beginning of the build string. "var wow = async function" then pushing the character sets
  * @param {regular_function_type_found} if type of function found, avoid running async or run async (,+,-,~,! 
  * @param {regular_function_async_found} if async found, append and also check for the last character... then end it
  * @param {regular_function_found_equals} when equals is found, turn off others and the function name then type
*/

var data = '';
var drop_off_index_reg = 0;
var bt_regular_parameter_string = [];
var regular_function_type_found = false;
var regular_function_async_found = false;
var regular_function_found_equals = false; 

/*
 initiate the beginning of the regular function... use the unshifted bt_regular_parameter_string parameter array for ordering
*/

function initiate_regular(d, data_index) { 
 data = d;
 drop_off_index_reg = data_index - 2; //this is either going to be two or three. but before that, make sure you check the tilde whatever things and push to the backtracking array
 bt_regular_parameter_string = [];
 regular_function_type_found = false;
 regular_function_async_found = false;
 regular_function_found_equals = false; 
 back_track_regular(drop_off_index_reg);
}

/*
 backtrack beginning of regular.. ordered recursive set
*/
  
function back_track_regular(drop_off_index_reg) { 

 if(
  data.charAt(drop_off_index_reg) === 'c' && 
  take_five(drop_off_index_reg) === true && 
  regular_function_async_found === false && 
  regular_function_type_found === false && 
  regular_function_found_equals === false 
 ) {
  bt_regular_parameter_string.unshift('c');
  bt_regular_parameter_string.unshift('n');
  bt_regular_parameter_string.unshift('y');
  bt_regular_parameter_string.unshift('s');
  bt_regular_parameter_string.unshift('a');
  drop_off_index_reg = drop_off_index_reg - 6;
  regular_function_async_found = true;
  return back_track_regular(drop_off_index_reg);
  }

  //check for characters right before function where async and equals doesnt exist..

}
 
function take_five(drop_off_index_reg) { 
  if(
    (data.charAt(drop_off_index_reg-5) === ' ' || data.charAt(drop_off_index_reg-5) === '\s' || data.charAt(drop_off_index_reg-5) === '\n') && //or : for the beginning of an object. if : then get out. actually i can just check that on the index
    data.charAt(drop_off_index_reg-4) === 'a' &&
    data.charAt(drop_off_index_reg-3) === 's' &&
    data.charAt(drop_off_index_reg-2) === 'y' &&
    data.charAt(drop_off_index_reg-1) === 'n' &&
    data.charAt(drop_off_index_reg  ) === 'c'
  ) { 
    return true;
  } else { 
    return false;
  }
}

 module.exports = initiate_regular;