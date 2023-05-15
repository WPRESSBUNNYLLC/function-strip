    
  /* 

   Title: function parser
   description: strips and labels data structures from files with references

   Author: Alex
   
  */

   let fs = require('file-system');
   let shared = require('./data');

   let initiate_arrow = require('generate/functions/arrowJs/arrow_main');
   let initiate_regular = require('generate/functions/regularJs/regular_main');

   let html_tag = require('generate/html_recursive_exit/html_tag');
   let html_comment = require('./html_recursive_exit/html_comment');

   let double_quote_string = require('generate/script_recursive_exit/double-quote-string');
   let multiline_comment = require('generate/script_recursive_exit/multiline-comment');
   let regex = require('./script_recursive_exit/regex');
   let single_quote_string = require('generate/script_recursive_exit/single-quote-string');
   let singleline_comment = require('generate/script_recursive_exit/singleline-comment');
   let template_string = require('generate/script_recursive_exit/template-string');

   /* 
   * data about the file. line_number and fp used in the build string description
   * @param {data_index} the character index in the file
   * @param {data} the files text
   * @param {data_length} used to end the file... could use error
   * @param {exported_functions} the long string of functions placed in file
   * @param {fp} the file path of the function
   * @param {line_number} the current line number
   * @param {function_index} the index for each function
   * @param {folders} folders of all the files to test
   * @param {file_type} whether a .html, .js or .ts file. Used for determining certain types of functions and when to check for functions. example <script
   * @param {function_types} types of functions being stripped
   * @param {valid_parens} valid parens for backtracking beginning of regular
   * @param {tagg_update} used to copy index and line number back over from other file to main
   * @param {function_types} the different functions to execute
   */

   let bts = '';
   let tags = [];
   let temp_line_number = 0;
   const first_valid_character_html_tag = /[a-zA-Z0-9_]/; 
   const punctuator = /[=|\||<|>|!|+|\-|*|/|,|.|%|~|?|:|;|&|^|(|)|[|\]|{|}]/;
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
   const number = /[0-9]/;
   const identifier = /[A-Za-z$_]/;
   let tagg_update = {}; 
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
       } else { 
        iterate_through_file_text();
       }
      } catch(err) { 
       console.log(err.message + '\n' + 'filepath: ' + filepath); 
      }
     }
    }
   })
   
  }

  //run and return data structures...

 }

 function run_from_html(data_index) { 
 
  if(shared.get_data_index() > shared.get_data_length()) { 
   return;
  }
 
  if(shared.get_data().charAt(data_index) === '\n') { 
   shared.update_line_number(1);
  }
 
  if(
   shared.get_data().charAt(shared.get_data_index()) === '<' && 
   shared.get_data().charAt(shared.get_data_index()  + 1) === '!' && 
   shared.data.charAt(shared.get_data_index() + 2) === '-' && 
   shared.data.charAt(shared.get_data_index() + 3) === '-' 
  ) { 
   shared.update_data_index(4);
   html_comment(false);
   return run_from_html();
  }

  if(
   shared.get_data().charAt(shared.get_data_index()) === '<' && 
   shared.get_data().charAt(shared.get_data_index() + 2).test(first_valid_character_html_tag) === true
  ) { 
   temp_line_number = shared.get_line_number();
   bts = '<' +  shared.get_data().charAt(shared.get_data_index()  + 1);
   shared.update_data_index(2);
   tagg_update = html_tag(data_index, line_number, bts, shared.get_data().charAt(shared.get_data_index()  + 1));
   tags.push({
    tag_line_number_start: temp_line_number, 
    tag_line_number_end: shared.get_line_number(), 
    type: 'opening', 
    name: tagg_update.script_name.toLowerCase(), 
    tag_string: tagg_update.tag_string
   })
   if(tagg_update.script_name.toLowerCase() === 'script') { 
    iterate_through_file_text();
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
   tagg_update = html_tag(bts, shared.data.charAt(shared.get_data_index() + 2));
   tags.push({
    tag_line_number_start: temp_line_number, 
    tag_line_number_end: shared.get_line_number(), 
    type: 'closing', 
    name: tagg_update.script_name.toLowerCase(), 
    tag_string: tagg_update.tag_string
   })
   return run_from_html(data_index);
  }

  shared.update_data_index(1); 
  return run_from_html(data_index);
  
 }
 
 function iterate_through_file_text() {
 
  if(shared.get_data_index() > shared.get_data_length()) { 
   return;
  }
 
  if(shared.get_data().charAt(data_index) === '\n') { 
   shared.update_line_number(1)
  }

  if(
   shared.get_data().charAt(shared.get_data_index()) === '/' &&
   shared.get_data().charAt(shared.get_data_index() + 1) === '*'
  ) { 
   shared.update_data_index(2); 
   multiline_comment(false, '');
   return iterate_through_file_text();
  }

  if(
   shared.get_data().charAt(shared.get_data_index()) === '/' &&
   shared.get_data().charAt(shared.get_data_index() + 1) === '/'
  ) { 
   shared.update_data_index(2); 
   singleline_comment(false);
   return iterate_through_file_text();
  }

  if(
   shared.get_data().charAt(shared.get_data_index()) === '/' &&
   shared.get_data().charAt(shared.get_data_index() + 1) !== '/' && 
   shared.get_data().charAt(shared.get_data_index() + 1) !== '*'
  ) {
   shared.update_current_token_type('regex-literal');
   shared.update_current_token(shared.get_data().charAt(shared.get_data_index()));
   shared.update_current_token(shared.get_data().charAt(shared.get_data_index() + 1));
   shared.update_data_index(2); 
   regex(false);
   shared.update_tokens();
   return iterate_through_file_text();
  }

  if(shared.get_data().charAt(shared.get_data_index()) === '"') { 
   shared.update_current_token_type('string-literal');
   shared.update_current_token(shared.get_data().charAt(shared.get_data_index()));
   shared.update_data_index(1); 
   double_quote_string(false, false);
   shared.update_tokens();
   return iterate_through_file_text();
  }

  if(shared.get_data().charAt(shared.get_data_index()) === "'") { 
   shared.update_current_token_type('string-literal');
   shared.update_current_token(shared.get_data().charAt(shared.get_data_index()));
   shared.update_data_index(1); 
   single_quote_string(false, false);
   shared.update_tokens();
   return iterate_through_file_text();
  }

  if(shared.get_data().charAt(shared.get_data_index()) === '`') { 
   shared.update_current_token_type('template-literal');
   shared.update_current_token(shared.get_data().charAt(shared.get_data_index()));
   shared.update_data_index(1); 
   template_string(false);
   shared.update_tokens();
   return iterate_through_file_text();
  }

  if(shared.get_data().charAt(shared.get_data_index()).test(number) === true) { 
   shared.update_current_token_type('numeric-literal');
   shared.update_current_token(shared.get_data().charAt(shared.get_data_index()));
   shared.update_data_index(1); 
   number_(false);
   shared.update_tokens();
   return iterate_through_file_text();
  }

  if(shared.get_data().charAt(shared.get_data_index()).test(identifier) === true) { 
   shared.update_current_token_type('identifier');
   shared.update_current_token(shared.get_data().charAt(shared.get_data_index()));
   shared.update_data_index(1); 
   identifier_(false);
   shared.update_tokens();
   return iterate_through_file_text();
  }

  if(shared.get_data().charAt(shared.get_data_index()).test(punctuator) === true) { 
   shared.update_current_token_type('punctuator');
   shared.update_current_token(shared.get_data().charAt(shared.get_data_index()));
   shared.update_data_index(1);
   if(look_through_punctuator_[shared.get_data().charAt(shared.get_data_index())] === false) {
    shared.update_tokens();
    return iterate_through_file_text();
   }
   punctuator_(false);
   shared.update_tokens();
   return iterate_through_file_text();
  }

  if(file_type === 'html') { 
   if(
    shared.get_data().charAt(shared.get_data_index()) === '<' && 
    shared.get_data().charAt(shared.get_data_index()  + 1) === '/' &&
    shared.get_data().charAt(shared.get_data_index() + 2).test(first_valid_character_html_tag) === true
   ) { 
    temp_line_number = shared.get_line_number();
    bts = '<' + shared.get_data().charAt(shared.get_data_index() + 1) + shared.data.charAt(shared.get_data_index() + 2);
    shared.update_data_index(3);
    tagg_update = html_tag(bts, shared.data.charAt(data_index + 2));
    tags.push({
     tag_line_number_start: temp_line_number, 
     tag_line_number_end: shared.get_line_number(), 
     type: 'closing', 
     name: tagg_update.script_name.toLowerCase(), 
     tag_string: tagg_update.tag_string
    })
    if(tagg_update.script_name.toLowerCase() === 'script') {
     return;
    } else { 
     return iterate_through_file_text(data_index);
    }
   }
  }

  if(
   shared.get_data().charAt(shared.get_data_index()) !== ' ' && 
   shared.get_data().charAt(shared.get_data_index()) !== '\n'
  ) {
   shared.update_current_token_type('unknown');
   shared.update_current_token(shared.get_data().charAt(shared.get_data_index()));
   shared.update_tokens();
  }

  shared.update_data_index(1); 
  return iterate_through_file_text();
 
 }

 module.exports = generate;