
var check_if_function = require('./regular_check');
var build_beginning_of_function = require('./regular_beginning');
var build_body_of_function = require('./regular_body');

 function initiate_regular(data_index, line_number) { 

  var return_object = {};

  if(check_if_function(data_index) === false) { 
   return_object.is_function = false;
   return return_object;
  }

  return_object.is_function = true;
  return_object.beginning_line_number = line_number;

  var beginning_function_ = build_beginning_of_function(data_index);

  return_object.build_string = beginning_function_.build_string + "function";
  return_object.is_async = beginning_function_.is_async;
  return_object.has_name = beginning_function_.has_name;

  data_index = data_index + 8; 

  var body_of_function = build_body_of_function(data_index, line_number);

  return_object.build_string += body_of_function.build_string;
  return_object.parameters = body_of_function.parameters;
  return_object.ending_line_number = body_of_function.ending_line_number;
  return_object.data_index = body_of_function.data_index;

  return return_object;

 }

 module.exports = initiate_regular;
