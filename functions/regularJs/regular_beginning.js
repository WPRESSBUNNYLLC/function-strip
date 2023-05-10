let data = '';
let bt_index = 0;
let bt_regular_parameter_string = [];
let found_equals = false;
let found_async = false;
let found_name = false;

function initiate_regular(data_index) { 
 bt_index = data_index - 1;
 bt_regular_parameter_string = [];
 found_equals = false;
 found_async = false;
 found_name = false;
 try {
  append_first_one_or_two_characters(bt_index);
  let a = append_possible_async(bt_index);
  if(a.continue === false) { 
   return bt_regular_parameter_string.join();
  }
  let b = append_equals(bt_index);
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