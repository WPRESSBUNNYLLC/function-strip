
/*
  * @param {drop_off_index_reg} index used to determine if an async function
  * @param {bt_regular_parameter_string} using this to backtrack and build the beginning of the build string. "var wow = async function" then pushing the character sets
  * @param {regular_function_type_found} if type of function found, avoid running async or run async (,+,-,~,! 
  * @param {regular_function_async_found} if async found, append and also check for the last character... then end it
  * @param {regular_function_found_equals} when equals is found, turn off others and the function name then type
  * i fucked this up so i decided to go back... 
*/

var data = '';
var drop_off_index_reg = 0;
var bt_regular_parameter_string = [];
var regular_function_type_found = false;
var regular_function_async_found = false;
var regular_function_found_equals = false; 
var regular_function_name_found = false;

/*
 initiate the beginning of the regular function... use the unshifted bt_regular_parameter_string parameter array for ordering
*/

function initiate_regular(d, data_index) { 
 data = d;
 drop_off_index_reg = data_index - 1; //just start on the first character going backwards and rely on the backtracking functions to determine when to stop
 bt_regular_parameter_string = [];
 regular_function_type_found = false;
 regular_function_async_found = false;
 regular_function_found_equals = false; 
 regular_function_name_found = false;
 back_track_regular(drop_off_index_reg);
}

//the only thing to check for is an equals sign on the backtracking set... when an equals sign is found, you know the function has a name and you can check for the name and if theres a type a type as well. an equals sign before the possible async
//so right after the possible async, IF there is an equals sign, then i know i can check for a name and a type and know when to stop.... however if : or , I know there is no name and no type.
//right at the beginning make sure to check for the single characters and append then run the below

//if : stop
//if , stop
//if no async and no = stop
//if async and no =, stop
//if =, check for name then type... type is a set uncertain. name is certain

//this should be able to determine when to end. ending is based on =

 module.exports = initiate_regular;