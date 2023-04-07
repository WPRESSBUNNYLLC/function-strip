
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

 try {

  append_first_one_or_two_characters(bt_index);

  var a = append_possible_async(bt_index);

  if(a.continue === false) { 
   return bt_regular_parameter_string.join();
  }

  var b = append_equals(bt_index);

  if(b.continue === false) { 
   return bt_regular_parameter_string.join();
  }

  append_name_and_possibly_type(bt_index);

 } catch(err) { 

  console.log(err.message);

 }

}

/*
 if the first character is a (, append and get out.. if its a  -,+,~,!, continue to seatch for ( and if found, get out... if not found get out. if neither is found, get the fuck out
*/

function append_first_one_or_two_characters(bt_index) { 

}

function append_possible_async(bt_index) { 

}

function append_equals(bt_index) { 

}

function append_name_and_possibly_type(bt_index) { 

}


 module.exports = initiate_regular;