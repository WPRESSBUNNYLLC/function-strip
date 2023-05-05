var data = '';
var bt_index = 0;
var bt_regular_parameter_string = [];
var found_equals = false;
var found_async = false;
var found_name = false;

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
  return '';
 }
}

function append_possible_async(bt_index) { 

}

module.exports = initiate_regular;