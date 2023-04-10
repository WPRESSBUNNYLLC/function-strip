
/*
 determines the exit of a bad closing tag in an html document... whether opening or closing... this is for strings which contain the function keyword.... might not need this tag... comes from html function
*/

var data_ = '';
var data_index_ = 0;
var line_number_ = 0;
var found_space_identify_name = false;
var last_character = [];
var script_name = '';

function html_bad_tag(data, data_index, line_number) { 
 data_ = data;
 data_index_ = data_index;
 line_number_ = line_number;
 found_space_identify_name = false;
 last_character = [];
 script_name = '';
 return recurse(data_index_);
}

function recurse(data_index_) { 

 if(data_index_ >= data_.length) { 
  return {
   data_index: data_index_, 
   line_number: line_number_
  }
 }

 if(data_.charAt(data_index_) === '\n') { 
  line_number_ = line_number_ + 1;
 }

 if(
  found_space_identify_name === false && 
  data_.charAt(data_index_) !== '\n' &&
  data_.charAt(data_index_) !== ' ' && 
  data_.charAt(data_index_) !== '>' //maybe use a reguar expression for the correct name but i doubt there will be anything else other than a-z 
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
     line_number: line_number_
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
  data_.charAt(data_index_) !== " "
 ) { 
  last_character.push(data_.charAt(data_index_)); 
 }

 if(data_.charAt(data_index_) === '"') {
  if(last_character[last_character.length - 1] !== '=' ) {  //and one prior not a character
   //some error or just wrong code i need to check or something else
  } else { 
    //run regular
  }
 }

 if(data_.charAt(data_index_) === "'") {
  if(last_character[last_character.length - 1] !== '=') { //and one prior not a character
    //some error or just wrong code i need to check or something else
  } else { 
    //run regular
  }
 }

 data_index_ = data_index_ + 1; 
 return recurse(data_index_);

}

module.exports = html_bad_tag;