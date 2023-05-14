  
  /* 

   Title: function parser
   description: strips and labels data structures from files with references

   Author: Alex
   
  */

   let fs = require('file-system');
   let vip = require('./data');

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
   * @param {data_index_and_line_number_update} used to copy index and line number back over from other file to main
   * @param {function_types} the different functions to execute
   */

   let bts = '';
   let tags = [];
   let temp_line_number = 0;
   let data_index = 0;
   let in_script_mode = false;
   const first_valid_character_html_tag = /[a-zA-Z0-9_]/; 
   const operator = /[=|\||<|>|!|+|\-|*|/|,|.|%|~|?|:|;|&|^|(|)|[|\]|{|}]/;
   const look_through_operator_ = { 
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
    '.': 'period' // ...args in invokation maybe just keep this the same
   }
   const number = /[0-9]/;
   const definition_or_key_word = /[A-Za-z$_]/;
   let data_index_and_line_number_update = {}; 
   let function_index = 1;
   let possibly_push_arrow = {};
   let possibly_push_regular = {};
   let data_length = 0;
   let exported_functions = [];
   let valid_parens = {};
   let fp = '';
   let line_number = 0;
   let folders = [];
   let file_type = '';
   let function_types = {
     regular: true,
     arrow: true, 
   }
 
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
      vip.update_data(fs.readFileSync(filepath, 'utf8'), filepath);
      valid_parens = {};
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

  return exported_functions;
 
 }

 function run_from_html(data_index) { 
 
  if(vip.get_data_index() > vip.get_data_length()) { 
   return;
  }
 
  if(vip.get_data().charAt(data_index) === '\n') { 
   vip.update_line_number(1);
  }
 
  if(
   vip.get_data().charAt(vip.get_data_index()) === '<' && 
   vip.get_data().charAt(vip.get_data_index()  + 1) === '!' && 
   vip.data.charAt(vip.get_data_index() + 2) === '-' && 
   vip.data.charAt(vip.get_data_index() + 3) === '-' 
  ) { 
   vip.update_data_index(4);
   html_comment(false);
   return run_from_html();
  }

  if(
   vip.get_data().charAt(vip.get_data_index()) === '<' && 
   vip.get_data().charAt(vip.get_data_index() + 2).test(first_valid_character_html_tag) === true
  ) { 
   temp_line_number = vip.get_line_number();
   bts = '<' +  vip.get_data().charAt(vip.get_data_index()  + 1);
   vip.update_data_index(2);
   data_index_and_line_number_update = html_tag(data_index, line_number, bts, vip.get_data().charAt(vip.get_data_index()  + 1));
   tags.push({
    tag_line_number_start: temp_line_number, 
    tag_line_number_end: vip.get_line_number(), 
    type: 'opening', 
    name: data_index_and_line_number_update.script_name.toLowerCase(), 
    tag_string: data_index_and_line_number_update.tag_string
   })
   if(data_index_and_line_number_update.script_name.toLowerCase() === 'script') { 
    iterate_through_file_text();
   } 
   return run_from_html();
  }

  if(
   vip.get_data().charAt(vip.get_data_index()) === '<' && 
   vip.get_data().charAt(vip.get_data_index()  + 1) === '/' &&
   vip.get_data().charAt(vip.get_data_index() + 2).test(first_valid_character_html_tag) === true
  ) { 
   temp_line_number = vip.get_line_number();
   bts = '<' + vip.get_data().charAt(vip.get_data_index()  + 1) + vip.get_data().charAt(vip.get_data_index() + 2);
   vip.update_data_index(3);
   data_index_and_line_number_update = html_tag(bts, vip.data.charAt(vip.get_data_index() + 2));
   tags.push({
    tag_line_number_start: temp_line_number, 
    tag_line_number_end: vip.get_line_number(), 
    type: 'closing', 
    name: data_index_and_line_number_update.script_name.toLowerCase(), 
    tag_string: data_index_and_line_number_update.tag_string
   })
   return run_from_html(data_index);
  }

  vip.update_data_index(1); 
  return run_from_html(data_index);
  
 }
 
 function iterate_through_file_text() {
 
  if(vip.get_data_index() > vip.get_data_length()) { 
   return;
  }
 
  if(vip.get_data().charAt(data_index) === '\n') { 
   vip.update_line_number(1)
  }

  if(
   vip.get_data().charAt(vip.get_data_index()) === '/' &&
   vip.get_data().charAt(vip.get_data_index()  + 1) === '*'
  ) { 
   vip.update_data_index(2); 
   multiline_comment(false, '');
   return iterate_through_file_text();
  }

  if(
   vip.get_data().charAt(vip.get_data_index()) === '/' &&
   vip.get_data().charAt(vip.get_data_index()  + 1) === '/'
  ) { 
   vip.update_data_index(2); 
   singleline_comment(false);
   return iterate_through_file_text();
  }

  if(
   vip.get_data().charAt(vip.get_data_index()) === '/' &&
   vip.get_data().charAt(vip.get_data_index()  + 1) !== '/' && 
   vip.get_data().charAt(vip.get_data_index()  + 1) !== '*'
  ) {
   vip.update_current_token_type('regex');
   vip.update_current_token(vip.get_data().charAt(vip.get_data_index()));
   vip.update_current_token(vip.get_data().charAt(vip.get_data_index() + 1));
   vip.update_data_index(2); 
   regex(false);
   vip.update_tokens();
   return iterate_through_file_text();
  }

  if(vip.get_data().charAt(vip.get_data_index()) === '"') { 
   vip.update_current_token_type('single-quote');
   vip.update_current_token(vip.get_data().charAt(vip.get_data_index()));
   vip.update_data_index(1); 
   double_quote_string(false, false);
   vip.update_tokens();
   return iterate_through_file_text();
  }

  if(vip.get_data().charAt(vip.get_data_index()) === "'") { 
   vip.update_current_token_type('double-quote');
   vip.update_current_token(vip.get_data().charAt(vip.get_data_index()));
   vip.update_data_index(1); 
   single_quote_string(false, false);
   vip.update_tokens();
   return iterate_through_file_text();
  }

  if(vip.get_data().charAt(vip.get_data_index()) === '`') { 
   vip.update_current_token_type('template-string');
   vip.update_current_token(vip.get_data().charAt(vip.get_data_index()));
   vip.update_data_index(1); 
   template_string(false);
   vip.update_tokens();
   return iterate_through_file_text();
  }

  if(vip.get_data().charAt(vip.get_data_index()).test(number) === true) { 
   vip.update_current_token_type('number');
   vip.update_current_token(vip.get_data().charAt(vip.get_data_index()));
   vip.update_data_index(1); 
   number_(false);
   vip.update_tokens();
   return iterate_through_file_text();
  }

  if(vip.get_data().charAt(vip.get_data_index()).test(definition_or_key_word) === true) { 
   vip.update_current_token_type('to be determined as key word or identifier');
   vip.update_current_token(vip.get_data().charAt(vip.get_data_index()));
   vip.update_data_index(1); 
   key_word_or_identifier_(false);
   vip.update_tokens();
   return iterate_through_file_text();
  }

  if(vip.get_data().charAt(vip.get_data_index()).test(operator) === true) { 
   if(look_through_operator_[vip.get_data().charAt(vip.get_data_index())] === false) {
    vip.update_tokens(vip.get_data().charAt(vip.get_data_index()), 'punctuator');
    vip.update_tokens();
    vip.update_data_index(1);
    return iterate_through_file_text();
   }
   vip.update_current_token_type('operator');
   vip.update_current_token(vip.get_data().charAt(vip.get_data_index()));
   vip.update_data_index(1); 
   operator_(false);
   vip.update_tokens();
   return iterate_through_file_text();
  }

  if(file_type === 'html') { 
   if(
    vip.get_data().charAt(vip.get_data_index()) === '<' && 
    vip.get_data().charAt(vip.get_data_index()  + 1) === '/' &&
    vip.get_data().charAt(vip.get_data_index() + 2).test(first_valid_character_html_tag) === true
   ) { 
    temp_line_number = vip.get_line_number();
    bts = '<' + vip.get_data().charAt(vip.get_data_index()  + 1) + vip.data.charAt(vip.get_data_index() + 2);
    vip.update_data_index(3);
    data_index_and_line_number_update = html_tag(bts, vip.data.charAt(data_index + 2));
    tags.push({
     tag_line_number_start: temp_line_number, 
     tag_line_number_end: vip.get_line_number(), 
     type: 'closing', 
     name: data_index_and_line_number_update.script_name.toLowerCase(), 
     tag_string: data_index_and_line_number_update.tag_string
    })
    if(data_index_and_line_number_update.script_name.toLowerCase() === 'script') {
     return;
    } else { 
     return iterate_through_file_text(data_index);
    }
   }
  }

  vip.update_current_token_type('unknown');
  vip.reset_current_token();
  vip.update_current_token(vip.get_data().charAt(vip.get_data_index()));
  vip.update_tokens();

  vip.update_data_index(1); 
  return iterate_through_file_text();
 
 }

 module.exports = generate;