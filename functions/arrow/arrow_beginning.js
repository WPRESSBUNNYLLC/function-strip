
/*
 recurses backwards the parameters of the arrow function and additional things
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
var bt_index_drop_off_alphabet = /a-zA-Z0-9_$/;
var paren_boundries = [];

function initiate_arrow(d, data_index, b) {
 paren_boundries = b;
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
  var a = is_parameter_set_or_is_name(bt_index);
  if(a.is_parameter_set === true) { 
   append_parameter_set(bt_index);
  } else { 
   append_name();
  }
  var b = append_possible_async(bt_index);
  if(b.continue === false) {
   return bt_arrow_parameter_string.join();
  }
  var c = append_possible_equals(bt_index);
  if(c.continue === false) {
   return bt_arrow_parameter_string.join();
  }
  append_name_and_possible_type(bt_index);
  return bt_arrow_parameter_string.join();
 } catch(err) { 
  console.log(err.message);
  return '';
 }
}

function is_parameter_set_or_is_name(bt_index) { 

} 

function append_name(bt_index) { 

}

function append_parameter_set(bt_index) { 

}

function append_possible_async(bt_index) { 

}

function append_possible_equals(bt_index) { 

}

function append_name_and_possible_type(bt_index) { 

}

module.exports = initiate_arrow;