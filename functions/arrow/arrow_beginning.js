
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
var opening_parameter_count = 0; 
var closing_parameter_count = 0;
var valid_parens = {};

function initiate_arrow(data_index, boundries) {
 valid_parens = boundries;
 data = d;
 bt_arrow_parameter_string = [];
 bt_index = data_index - 1;
 found_equals = false;
 found_name = false;
 end_name = false;
 found_async = false;
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

 beginning_string.unshift(data.charAt(bt_index));

 if(
  data.charAt(bt_index) === ')' && 
  valid_parens[`${bt_index}-closing`] === true
 ) { 
   closing_parameter_count += 1;
 }

 if(
  data.charAt(bt_index) === '(' && 
  valid_parens[`${bt_index}-opening`] === true
 ) { 
   opening_parameter_count += 1;
   if(opening_parameter_count === closing_parameter_count) { 
    return;
   }
 }

 bt_index -= 1; 
 return append_parameter_set(bt_index);

}

function append_possible_async(bt_index) { 

}

function append_possible_equals(bt_index) { 

}

function append_name_and_possible_type(bt_index) { 

}

module.exports = initiate_arrow; 
