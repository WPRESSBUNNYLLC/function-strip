
/*
 determines the exit of a bad closing tag in an html document... mkae usre to look over this again.... im assuming there are going to be some errors
*/

var double_quote_string = require('./script_recursive_exit/double_quote_string');
var single_quote_string = require('./script_recursive_exit/single_quote_string');

var data_ = '';
var data_index_ = 0;
var line_number_ = 0;
var found_space_identify_name = false;
var last_character = [];
var script_name = '';
var data_index_and_line_number_update = {};

function html_bad_tag(data, data_index, line_number) { 
 data_ = data;
 data_index_ = data_index;
 line_number_ = line_number;
 found_space_identify_name = false;
 last_character = [];
 script_name = '';
 data_index_and_line_number_update = {};
 return recurse(data_index_);
}

function recurse(data_index_) { 

 if(data_index_ >= data_.length) { 
  return {
   data_index: data_index_, 
   line_number: line_number_, 
   script_name: script_name
  }
 }

 if(data_.charAt(data_index_) === '\n') { 
  line_number_ = line_number_ + 1;
 }
 
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
     script_name: script_name
    }
  } else {
    data_index_ = data_index_ + 1;
    return recurse(data_index_);
  }
 }

 if(
  found_space_identify_name === true && 
  data_.charAt(data_index_) !== '"' && 
  data_.charAt(data_index_) !== "'" &&
  data_.charAt(data_index_) !== "\n" &&
  data_.charAt(data_index_) !== " " && 
  data_.charAt(data_index_) !== ">"
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
   last_character[last_character.length - 1] === '=' && 
   last_character[last_character.length - 2] === 'a-2'
  ) { 
    data_index_and_line_number_update = double_quote_string(data_, data_index_, line_number_);
    data_index_ = data_index_and_line_number_update.data_index_;
    line_number_ = data_index_and_line_number_update.line_number_;
    return recurse(data_index_);
  } else { 
    throw new error('if beginning a string inside of a script tag, the previous character must be an equals sign and the previous to that must be a letter'); 
  }
 }

 if(
  data_.charAt(data_index_) === "'" &&
  found_space_identify_name === true
 ) {
  if(
   last_character[last_character.length - 1] === '=' && 
   last_character[last_character.length - 2] === 'a-2'
  ) { 
    data_index_and_line_number_update = single_quote_string(data_, data_index_, line_number_);
    data_index_ = data_index_and_line_number_update.data_index_;
    line_number_ = data_index_and_line_number_update.line_number_;
    return recurse(data_index_);
  } else { 
     throw new error('if beginning a string inside of a script tag, the previous character must be an equals sign and the previous to that must be a letter');
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
   script_name: script_name
  }
 }

 data_index_ = data_index_ + 1; 
 return recurse(data_index_);

}

module.exports = html_bad_tag;