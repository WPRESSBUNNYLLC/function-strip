
/*
 initiates the process of building the function
*/

let check_if_function = require('generate/functions/regularJs/regular_check');
let build_beginning_of_function = require('generate/functions/regularJs/regular_beginning');
let build_body_of_function = require('generate/functions/regularJs/regular_body');

 function initiate_regular(data_index, line_number) { 

  let return_object = {};

  if(check_if_function(data_index) === false) { 
   return_object.is_function = false;
   return return_object;
  }

  return_object.is_function = true;
  return_object.beginning_line_number = line_number;

  let beginning_function_ = build_beginning_of_function(data_index); 

  return_object.build_string = beginning_function_.build_string + "function";
  return_object.is_async = beginning_function_.is_async;
  return_object.has_name = beginning_function_.has_name; //push both names
  return_object.is_enclosed = beginning_function_.is_enclosed;

  data_index = data_index + 8; 

  let body_of_function = build_body_of_function(data_index, line_number, return_object.is_enclosed);

  return_object.build_string += body_of_function.build_string;
  return_object.parameters = body_of_function.parameters;
  return_object.ending_line_number = body_of_function.ending_line_number;
  return_object.data_index = body_of_function.data_index;
  return_object.is_invoked = body_of_function.is_invoked;

  if(
   return_object.is_enclosed === true && 
   return_object.found_enclosing === false
  ) { 
   throw new Error(
    "Error: The enclosed function does not have a closing paren" + 
    "line number: " + return_object.beginning_line_number
   )
  }

  return return_object;

 }

 module.exports = initiate_regular;