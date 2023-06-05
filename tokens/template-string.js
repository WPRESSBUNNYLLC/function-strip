const regex_tokenizer = /(?<number>(0b([10]+)|0o([0-7]+)|0x([a-fA-f0-9]+)|(\.[0-9]{1,}|[0]\.?[0-9]{0,}|[1-9]{1}[0-9]{0,}\.?[0-9]{0,})(e[\-+][0-9]+)?))|(?<identifier>(\.?[a-zA-Z_$]{1}([a-zA-Z_$0-9]{0,})))|(?<string>("(.){0,}?")|('(.){0,}?')|(`))|(?<comment>((\/\*)(.|\n){0,}?(\*\/))|((\/\/)(.){0,}))|(?<punctuator>(&&|&=|&)|(\/=|\/)|(===|==|=>|=)|(!==|!=|!)|(>>>=|>>=|>>>|>>|>=|>)|(<<=|<<|<=|<)|(-=|--|-)|(\|\||\|\=|\|)|(%=|%)|(\.\.\.)|(\+\+|\+=|\+)|(^=|=)|(\*=|\*)|([{}[\];\?\:]))|(?<whitespace>(( |\n|\t|\r)+?))|(?<regex>(\/([^=\/\*].)+([^\\]\/)[a-zA-Z]*))/g;
const template_string = '`';

let shared = require('generate/data');

let recursive_counter_script = 0;
let recursive_counter_string = 0; 
let currently_inside_of = 'string';

function template_string() { 
 original_line_number = line_number;
 recursive_counter_string = 1;
 recursive_counter_script = 0;
 currently_inside_of = 'string';
 return recurse(data_index_);
}

function recurse(data_index_) { 

 if(
  currently_inside_of === 'script' && 
  update_function_and_update_data.data.charAt(data_index_) === '"'
 ) {
  data_index_ = data_index_ + 1;
  //
  return recurse(data_index_);
 }

 if(
  currently_inside_of === 'string' && 
  update_function_and_update_data.data.charAt(data_index_) === '$' && 
  update_function_and_update_data.data.charAt(data_index_ + 1) === '{'
 ) { 
  currently_inside_of === 'script'
  recursive_counter_script = recursive_counter_script + 1; 
  in_function_ === true ? in_function_build_string_ += '{' : '';
  data_index_ = data_index_ + 2; 
  return recurse(data_index_);
 }

 if(
  currently_inside_of === 'script' && 
  update_function_and_update_data.data.charAt(data_index_) === '}'
 ) {
  currently_inside_of = 'string'; 
  recursive_counter_script = recursive_counter_script - 1;
  data_index_ = data_index_ + 1;
  return recurse(data_index_);
 }

 if(
  currently_inside_of === 'script' && 
  update_function_and_update_data.data.charAt(data_index_) === '`'
 ) { 
  currently_inside_of = 'string'; 
  recursive_counter_string = recursive_counter_string + 1;
  data_index_ = data_index_ + 1;
  return recurse(data_index_);
 }

 if(
  currently_inside_of === 'string' && 
  update_function_and_update_data.data.charAt(data_index_) === '`'
 ) {
  currently_inside_of = 'script'; 
  recursive_counter_string = recursive_counter_string - 1;
  data_index_ = data_index_ + 1;
  if(
   recursive_counter_string === 0 && 
   recursive_counter_script === 0
  ) {
   //out
  }
  return recurse(data_index_);
 }

 data_index_ = data_index_ + 1; 
 return recurse(data_index_);

}

module.exports = template_string;