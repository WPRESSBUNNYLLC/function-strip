let fs = require('file-system');
let shared = require('./data');
let initiate_arrow = require('generate/functions/arrowJs/arrow_main');
let initiate_regular = require('generate/functions/regularJs/regular_main');
let html_tag = require('generate/html_recursive_exit/html_tag');
let html_comment = require('./html_recursive_exit/html_comment');
let double_quote_string = require('generate/tokens/double-quote-string');
let multiline_comment = require('generate/tokens/multiline-comment');
let regex = require('./tokens/regex');
let single_quote_string = require('generate/tokens/single-quote-string');
let singleline_comment = require('generate/tokens/singleline-comment');
let template_string = require('generate/tokens/template-string');
let equals = require('generate/tokens/equals');
let greater_than = require('generate/tokens/greater-than');
let less_than = require('generate/tokens/less-than');
let exclamation = require('generate/tokens/exclamation');
let plus = require('generate/tokens/plus');
let minice = require('generate/tokens/minice');
let times = require('generate/tokens/times');
let division = require('generate/tokens/division');
let percent = require('generate/tokens/percent');
let and = require('generate/tokens/and');
let or = require('generate/tokens/or');
let power = require('generate/tokens/power');
let period = require('generate/tokens/period');
let identifier_ = require('generate/tokens/identifier');
let number_ = require('generate/tokens/numbers');
let bts = '';
let tags = [];
let temp_line_number = 0;
const first_valid_character_html_tag = /[a-zA-Z0-9_]/; 
const punctuator = /[=<>\\!+\-*/,.%~?:;&^()[\]|{}]/;
const look_through_punctuator_ = { 
'=': 'equals', 
'>': 'greater_than', 
'<': 'less_than', 
'!': 'exclamation', 
'+': 'plus', 
'-': 'minice', 
'*': 'times', 
'/': 'division', 
'%': 'percent', 
'&': 'and', 
'|': 'or', 
'^': 'power',
'.': 'period'
}
const punctuator_ = (op) => look_through_punctuator_[op]();
const number = /[0-9]/;
const identifier = /[A-Za-z$_]/;
let tag_update = {}; 
let folders = [];
let file_type = '';

 /* 
   * search folders, files and get all arrow functions with and without brackets regular functions with brackets. line numbers, filepaths, function names.
   * @param {fldr} folders being traversed
   * @param {f_t_g} The function file path being written to. if non existant, is created.
   * @param {f_t} The function types you would like to strip
 */
 
 function generate(fldrs, f_t_g, f_t) {
 
  let error_initial = '';
 
  if(
   typeof(f_t) !== 'object' ||
   typeof(f_t.regular) !== 'boolean' || 
   typeof(f_t.arrow) !== 'boolean'
  ) { 
   error_initial += 'f_t: function types must be regular, arrow, react_function_component and react_class_component \n';
  }
 
  if(typeof(f_t_g) !== 'string') { 
   error_initial += 'f_t_g: file to generate must be a string \n';
  }
 
  if(typeof(fldrs) !== 'object' || Array.isArray(fldrs) == false) { 
   error_initial += 'folders: an array was not passed \n';
  }
 
  if(error_initial.trim().length > 0) { 
   throw new Error(error_initial);
  }
 
  function_types = f_t;
  file_to_generate = f_t_g;
  folders = fldrs;
 
  for(let i = 0; i < folders.length; i++) {
 
   let errors = '';
 
   if(typeof(folders[i].folder) !== 'string') { 
    errors += 'folder: folder must be a string \n';
   }
 
   if(
    typeof(folders[i].files) !== 'string' && 
    (typeof(folders[i].files) !== 'object' || 
    Array.isArray(folders[i].files == false))
   ) { 
    errors += 'files: files must be a string or array \n';
   }
 
   if(typeof(folders[i].files) == 'string' && folders[i].files !== 'all') {  
    errors += 'files: if files is a string, the keyword must be (all) for all files and folders \n';
   }
 
   if(errors.trim().length > 0) { 
    errors += `index: ${i}`;
    throw new Error(errors);
   }
 
   fs.recurseSync(
    folders[i].folder, 
    folders[i].files == 'all' ? null : folders[i].files, 
    (filepath, relative, filename) => {
    if(filename) { 
     file_type = filename.split('.');
     file_type = file_type[file_type.length - 1].toLowerCase(); 
     if(file_type === 'ts') { 
      file_type = 'typescript';
     } else if(file_type === 'js') { 
      file_type = 'javascript';
     } else if(file_type === 'html') {
      file_type = 'html';
     } else { 
      file_type = '';
     }
     if(file_type !== '') {
      shared.update_data(fs.readFileSync(filepath, 'utf8'), filepath);
      try {
       if(file_type === 'html') { 
        run_from_html();
       } else if(file_type === 'javascript') { 
        js();
       } 
      } catch(err) { 
       console.log(err.message + '\n' + 'filepath: ' + filepath); 
      }
     }
    }
   })
   
  }

  //run, clean, find errors, and return data structures... or maybe do this after each token gets inserted at the last place

 }

 function run_from_html() { 
 
  if(shared.get_data_index() > shared.get_data_length()) { 
   return;
  }
 
  if(shared.get_data().charAt(shared.get_data_index()) === '\n') { 
   shared.update_line_number(1);
  }
 
  if(
   shared.get_data().charAt(shared.get_data_index()) === '<' && 
   shared.get_data().charAt(shared.get_data_index() + 1) === '!' && 
   shared.data.charAt(shared.get_data_index() + 2) === '-' && 
   shared.data.charAt(shared.get_data_index() + 3) === '-' 
  ) { 
   shared.update_data_index(4);
   html_comment();
   return run_from_html();
  }

  if(
   shared.get_data().charAt(shared.get_data_index()) === '<' && 
   shared.get_data().charAt(shared.get_data_index() + 2).test(first_valid_character_html_tag) === true
  ) { 
   temp_line_number = shared.get_line_number();
   bts = '<' +  shared.get_data().charAt(shared.get_data_index() + 1);
   shared.update_data_index(2);
   tag_update = html_tag(bts, shared.get_data().charAt(shared.get_data_index() + 1));
   tags.push({
    tag_line_number_start: temp_line_number, 
    tag_line_number_end: shared.get_line_number(), 
    type: 'opening', 
    name: tag_update.script_name.toLowerCase(), 
    tag_string: tag_update.tag_string
   })
   if(tag_update.script_name.toLowerCase() === 'script') { 
    js();
   } 
   return run_from_html();
  }

  if(
   shared.get_data().charAt(shared.get_data_index()) === '<' && 
   shared.get_data().charAt(shared.get_data_index() + 1) === '/' &&
   shared.get_data().charAt(shared.get_data_index() + 2).test(first_valid_character_html_tag) === true
  ) { 
   temp_line_number = shared.get_line_number();
   bts = '<' + shared.get_data().charAt(shared.get_data_index() + 1) + shared.get_data().charAt(shared.get_data_index() + 2);
   shared.update_data_index(3);
   tag_update = html_tag(bts, shared.data.charAt(shared.get_data_index() + 2));
   tags.push({
    tag_line_number_start: temp_line_number, 
    tag_line_number_end: shared.get_line_number(), 
    type: 'closing', 
    name: tag_update.script_name.toLowerCase(), 
    tag_string: tag_update.tag_string
   })
   return run_from_html();
  }

  shared.update_data_index(1); 
  return run_from_html();
  
 }
 
 function js() {
 
  if(shared.get_data_index() > shared.get_data_length()) { 
   return;
  }

  if(file_type === 'html') { //this would be assuming out of all scopes -- would have to do this on the fly... ill figure it out
   if(
    shared.get_data().charAt(shared.get_data_index()) === '<' && 
    shared.get_data().charAt(shared.get_data_index() + 1) === '/' &&
    shared.get_data().charAt(shared.get_data_index() + 2).test(first_valid_character_html_tag) === true
   ) { 
    temp_line_number = shared.get_line_number();
    bts = '<' + shared.get_data().charAt(shared.get_data_index() + 1) + shared.data.charAt(shared.get_data_index() + 2);
    shared.update_data_index(3);
    tag_update = html_tag(bts, shared.data.charAt(shared.get_data_index() + 2));
    tags.push({
     tag_line_number_start: temp_line_number, 
     tag_line_number_end: shared.get_line_number(), 
     type: 'closing', 
     name: tag_update.script_name.toLowerCase(), 
     tag_string: tag_update.tag_string
    })
    if(tag_update.script_name.toLowerCase() === 'script') {
     return;
    } else { 
     return js();
    }
   }
  }
 
  if(shared.get_data().charAt(shared.get_data_index()) === '\n') { 
   shared.update_current_token_type('new-line');
   shared.update_current_token(shared.get_data().charAt(shared.get_data_index()));
   shared.set_beginning_token_line_number_and_data_index(shared.get_data_index(), shared.get_line_number());
   shared.set_ending_token_line_number_and_data_index(shared.get_data_index(), shared.get_line_number());
   shared.update_tokens();
   shared.update_line_number(1);
   shared.build_data_structure();
   shared.update_data_index(1);
   return js();
  }

  if(shared.get_data().charAt(shared.get_data_index()) === ' ') {
   shared.update_current_token_type('spaces');
   shared.update_current_token(shared.get_data().charAt(shared.get_data_index()));
   shared.set_beginning_token_line_number_and_data_index(shared.get_data_index(), shared.get_line_number());
   shared.update_data_index(1); 
   spaces_();
   shared.set_ending_token_line_number_and_data_index(shared.get_data_index(), shared.get_line_number());
   shared.update_tokens();
   shared.build_data_structure();
   shared.update_data_index(1);
   return js();
  }

  if(
   shared.get_data().charAt(shared.get_data_index()) === '/' &&
   shared.get_data().charAt(shared.get_data_index() + 1) === '*'
  ) { 
   shared.update_current_token_type('multi-line-comment');
   shared.update_current_token(shared.get_data().charAt(shared.get_data_index()));
   shared.update_current_token(shared.get_data().charAt(shared.get_data_index() + 1));
   shared.set_beginning_token_line_number_and_data_index(shared.get_data_index(), shared.get_line_number());
   shared.update_data_index(2); 
   multiline_comment();
   shared.set_ending_token_line_number_and_data_index(shared.get_data_index(), shared.get_line_number());
   shared.update_tokens();
   shared.build_data_structure();
   shared.update_data_index(1);
   return js();
  }

  if(
   shared.get_data().charAt(shared.get_data_index()) === '/' &&
   shared.get_data().charAt(shared.get_data_index() + 1) === '/'
  ) { 
   shared.update_current_token_type('single-line-comment');
   shared.update_current_token(shared.get_data().charAt(shared.get_data_index()));
   shared.update_current_token(shared.get_data().charAt(shared.get_data_index() + 1));
   shared.set_beginning_token_line_number_and_data_index(shared.get_data_index(), shared.get_line_number());
   shared.update_data_index(2); 
   singleline_comment();
   shared.set_ending_token_line_number_and_data_index(shared.get_data_index(), shared.get_line_number());
   shared.update_tokens();
   shared.build_data_structure();
   shared.update_data_index(1);
   return js();
  }

  if(
   shared.get_data().charAt(shared.get_data_index()) === '/' &&
   shared.get_data().charAt(shared.get_data_index() + 1) !== '/' && 
   shared.get_data().charAt(shared.get_data_index() + 1) !== '*'
  ) {
   shared.update_current_token_type('regex-literal');
   shared.update_current_token(shared.get_data().charAt(shared.get_data_index()));
   shared.update_current_token(shared.get_data().charAt(shared.get_data_index() + 1));
   shared.set_beginning_token_line_number_and_data_index(shared.get_data_index(), shared.get_line_number());
   shared.update_data_index(2); 
   regex();
   shared.set_ending_token_line_number_and_data_index(shared.get_data_index(), shared.get_line_number());
   shared.update_tokens();
   shared.build_data_structure();
   shared.update_data_index(1);
   return js();
  }

  if(shared.get_data().charAt(shared.get_data_index()) === '"') { 
   shared.update_current_token_type('string-literal');
   shared.update_current_token(shared.get_data().charAt(shared.get_data_index()));
   shared.set_beginning_token_line_number_and_data_index(shared.get_data_index(), shared.get_line_number());
   shared.update_data_index(1); 
   double_quote_string(false);
   shared.set_ending_token_line_number_and_data_index(shared.get_data_index(), shared.get_line_number());
   shared.update_tokens();
   shared.build_data_structure();
   shared.update_data_index(1);
   return js();
  }

  if(shared.get_data().charAt(shared.get_data_index()) === "'") { 
   shared.update_current_token_type('string-literal');
   shared.update_current_token(shared.get_data().charAt(shared.get_data_index()));
   shared.set_beginning_token_line_number_and_data_index(shared.get_data_index(), shared.get_line_number());
   shared.update_data_index(1); 
   single_quote_string(false);
   shared.set_ending_token_line_number_and_data_index(shared.get_data_index(), shared.get_line_number());
   shared.update_tokens();
   shared.build_data_structure();
   shared.update_data_index(1);
   return js();
  }

  if(shared.get_data().charAt(shared.get_data_index()) === '`') { 
   shared.update_current_token_type('template-literal');
   shared.update_current_token(shared.get_data().charAt(shared.get_data_index()));
   shared.set_beginning_token_line_number_and_data_index(shared.get_data_index(), shared.get_line_number());
   shared.update_data_index(1); 
   template_string();
   shared.set_ending_token_line_number_and_data_index(shared.get_data_index(), shared.get_line_number());
   shared.update_tokens();
   shared.build_data_structure();
   shared.update_data_index(1);
   return js();
  }

  if(shared.get_data().charAt(shared.get_data_index()).test(number) === true) { 
   shared.update_current_token_type('numeric-literal');
   shared.update_current_token(shared.get_data().charAt(shared.get_data_index()));
   shared.set_beginning_token_line_number_and_data_index(shared.get_data_index(), shared.get_line_number());
   shared.update_data_index(1); 
   number_();
   shared.set_ending_token_line_number_and_data_index(shared.get_data_index(), shared.get_line_number());
   shared.update_tokens();
   shared.build_data_structure();
   shared.update_data_index(1);
   return js();
  }

  if(shared.get_data().charAt(shared.get_data_index()).test(identifier) === true) { 
   shared.update_current_token_type('identifier');
   shared.update_current_token(shared.get_data().charAt(shared.get_data_index()));
   shared.set_beginning_token_line_number_and_data_index(shared.get_data_index(), shared.get_line_number());
   shared.update_data_index(1); 
   identifier_();
   shared.set_ending_token_line_number_and_data_index(shared.get_data_index(), shared.get_line_number());
   shared.update_tokens();
   shared.build_data_structure();
   shared.update_data_index(1);
   return js();
  }

  if(shared.get_data().charAt(shared.get_data_index()).test(punctuator) === true) { 
   shared.update_current_token_type('punctuator');
   shared.update_current_token(shared.get_data().charAt(shared.get_data_index()));
   shared.set_beginning_token_line_number_and_data_index(shared.get_data_index(), shared.get_line_number());
   if(look_through_punctuator_[shared.get_current_token()] === false) {
    shared.set_ending_token_line_number_and_data_index(shared.get_data_index(), shared.get_line_number());
    shared.update_tokens();
    shared.build_data_structure();
    shared.update_data_index(1);
    return js();
   }
   shared.update_data_index(1); 
   punctuator_(shared.get_data().charAt(shared.get_data_index()));
   shared.set_ending_token_line_number_and_data_index(shared.get_data_index(), shared.get_line_number());
   shared.update_tokens();
   shared.build_data_structure();
   shared.update_data_index(1);
   return js();
  }

  if(shared.get_data().charAt(shared.get_data_index()) !== ' ') {
   shared.update_current_token_type('unknown');
   shared.update_current_token(shared.get_data().charAt(shared.get_data_index()));
   shared.set_beginning_token_line_number_and_data_index(shared.get_data_index(), shared.get_line_number());
   shared.set_ending_token_line_number_and_data_index(shared.get_data_index(), shared.get_line_number());
   shared.update_tokens();
   shared.build_data_structure();
   shared.update_data_index(1);
   return js();
  }

  shared.update_data_index(1); 
  return js();
 
 }
 
 module.exports = generate;