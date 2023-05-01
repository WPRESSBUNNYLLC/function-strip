
/*
 builds the string of a few shared functions returned to function body or beginning
*/

var build_string; 
var line_number; 
var data_index;

function init(p, line_number_, data_index_) { 
 line_number = line_number_; 
 data_index = data_index_
 switch(p) {
  case 'initiate_enclosed_and_invoked':
  return initiate_enclosed_and_invoked();
  case 'equals':
  return equals();
  case 'async':
  return async();
  case 'name_and_type':
  return name_and_type();
  default: throw new error('invalid paramater');
 }
}

function initiate_enclosed_and_invoked() { 

}

function equals() { 

}

function async() {

}

function name_and_type() { 

}

module.exports = init;