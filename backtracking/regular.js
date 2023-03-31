
/*
 * @param {bt_regular_parameter_string} using this to backtrack and build the beginning of the build string. "var wow = async function" then pushing the character sets
 * @param {bt_index} the back tracking of an index
 * @param {found_equals} found equals sign so we know when to end... (name and type check)
 * @param {found_async} found async before i found equals if there is an equals. 
 * @param {found_name} found equals now i can get the name and type if there is a type.. there has to be a name though if equals is found
*/

var data = '';
var bt_index = 0;
var bt_regular_parameter_string = [];
var found_equals = false;
var found_async = false;
var found_name = false;
var bt_index_drop_off_alphabet = /^[a-zA-Z0-9_$]*$/;

/*
 initiate the beginning of the regular function... 
*/

function initiate_regular(d, data_index) { 
 data = d;
 bt_index = data_index - 1;
 bt_regular_parameter_string = [];
 found_equals = false;
 found_async = false;
 found_name = false;
 //append_first_one_or_two_characters.. -, ~, +, !, (,
 //append_possible_async
 //append_equals
 //append_name_and_type
 //vs
 back_track_regular(bt_index); //possibly change this to above for clarity

}

function back_track_regular(bt_index) { 

 
}


 module.exports = initiate_regular;