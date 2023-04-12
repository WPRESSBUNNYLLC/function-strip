
/*
 determines the entrance and exit of an opening or closing tag... 
 there are three red zones 
 /, ' and " ...   a red zone is exited when a space, > or new line is found.

*/

var double_quote_string = require('./script_recursive_exit/double_quote_string');
var single_quote_string = require('./script_recursive_exit/single_quote_string');
var update_function_and_update_data = require('../data');

var data_ = '';
var data_index_ = 0;
var line_number_ = 0;
var found_space_identify_name = false;
var last_character = [];
var script_name = '';
var data_index_and_line_number_update = {};
var valid_character = /^[a-zA-Z0-9]*$/; //valid character is anything but /, ' and " --- if these three are found, must exit the red zone and iterate through again
var tag_string = '';
var end_red_zone = {};

function html_tag(data_index, line_number, start) { 
 data_ = update_function_and_update_data.data;
 data_index_ = data_index;
 line_number_ = line_number;
 found_space_identify_name = false;
 last_character = [];
 script_name = '';
 data_index_and_line_number_update = {};
 tag_string = start;
 if(start.length === 3) { 
  last_character.push(start.split('')[2]);
 } else { 
  last_character.push(start.split('')[1]);
 }
 return recurse(data_index_);
}

function recurse(data_index_) {

 if(data_index_ > data_.length) { 
  return {
   data_index: data_index_, 
   line_number: line_number_, 
   script_name: script_name, 
   tag_string: tag_string
  }
 }

 if(data_.charAt(data_index_) === '\n') { 
  line_number_ = line_number_ + 1;
 }

 tag_string += data_.charAt(data_index_);
 
 if(
  found_space_identify_name === false && 
  data_.charAt(data_index_) !== '\n' &&
  data_.charAt(data_index_) !== ' ' && 
  data_.charAt(data_index_) !== '>'  
 ) {
  last_character.push(data_.charAt(data_index_));
  data_index_ = data_index_ + 1;
  return recurse(data_index_);
 }

 if(
  found_space_identify_name === false && 
  data_.charAt(data_index_) === '\n' || 
  data_.charAt(data_index_) === ' ' || 
  data_.charAt(data_index_) === '>'
 ) {
  found_space_identify_name = true;
  script_name = last_character.join();
  last_character = [];
  if(data_.charAt(data_index_) === '>') {
    data_index_ = data_index_ + 1;
    return { 
     data_index: data_index_, 
     line_number: line_number_, 
     script_name: script_name, 
     tag_string: tag_string
    }
  } else {
    data_index_ = data_index_ + 1;
    return recurse(data_index_);
  }
 }

 if(
  found_space_identify_name === true && 
  data_.charAt(data_index_) === "/"
 ) { 
  end_red_zone = red_zone(data_index_);
  if(end_red_zone.end === true)  {
    return;
  } else { 
    return recurse(data_index_);
  }
 }

 if(
  found_space_identify_name === true && 
  data_.charAt(data_index_) !== '"' && 
  data_.charAt(data_index_) !== "'" &&
  data_.charAt(data_index_) !== ">" &&
  data_.charAt(data_index_) !== " " && //should only push characters in a script ioi8ifidoifa --> ="   ---- 
  data_.charAt(data_index_) !== "\n"
 ) { 
  last_character.push(data_.charAt(data_index_)); 
  data_index_ = data_index_ + 1; 
  return recurse(data_index_);
 }

 if(
  data_.charAt(data_index_) === '"' && 
  found_space_identify_name === true
 ) {
  if(
   last_character.length >= 2 &&
   last_character[last_character.length - 1] === '=' && 
   valid_character.test(last_character[last_character.length - 2]) === true //anything but ', " and / 
  ) { 
   data_index_and_line_number_update = double_quote_string(data_index_, false, line_number_, '', true);
   data_index_ = data_index_and_line_number_update.data_index_;
   line_number_ = data_index_and_line_number_update.line_number_;
   tag_string += data_index_and_line_number_update.tag_string;
   last_character = [];
   return recurse(data_index_);
  } else { 
    end_red_zone = red_zone(data_index_);
    if(end_red_zone.end === true)  {
      return;
    } else { 
      return recurse(data_index_);
    }
  }
 }

 if(
  data_.charAt(data_index_) === "'" &&
  found_space_identify_name === true
 ) {
  if(
   last_character.length >= 2 &&
   last_character[last_character.length - 1] === '=' && 
   valid_character.test(last_character[last_character.length - 2]) === true 
  ) { 
   data_index_and_line_number_update = single_quote_string(data_index_, false, line_number_, '', true);
   data_index_ = data_index_and_line_number_update.data_index_;
   line_number_ = data_index_and_line_number_update.line_number_;
   tag_string += data_index_and_line_number_update.tag_string;
   last_character = [];
   return recurse(data_index_);
  } else { 
    end_red_zone = red_zone(data_index_);
    if(end_red_zone.end === true)  {
      return;
    } else { 
      return recurse(data_index_);
    }
   }
 }

 if(
  data_.charAt(data_index_) === ">" && 
  found_space_identify_name === true
 ) {
  data_index_ = data_index_ + 1; 
  return { 
   data_index: data_index_, 
   line_number: line_number_,
   script_name: script_name, 
   tag_string: tag_string
  }
 }

 data_index_ = data_index_ + 1; 
 return recurse(data_index_);

}

function red_zone(data_index_) { //go through the red zone until a space, new line or > is found... then either end the tag or continue in regular fashion... make sure to build the tag as well in this

}

module.exports = html_tag;