  
  /* 

   Title: generate

   Description: 
   strips every chosen type of function in .html, .js, .ts files using character sets and backtracking arrays. Supports react. capable of additional languages using the file type as an extra condition wrapped in the main function. assumeds documents has no errors
   does not strip functions that are found inside strings("'`), single line comments and multline comments and outside of script tags in html documents. 
   Includes the line number, filepath and function name for each function.
   Includes a list of function types to strip. All configurable.

   Author: Alexander
   License: MIT

   TODO:
   https://blog.sessionstack.com/how-javascript-works-the-different-ways-of-declaring-a-function-5-best-practices-8a0324c06fe2
   make sure to recurse on if a function is invokable (); - do this at the end after push function
   check for escaped strings - check and comments if comments can be escaped. not sure
   add in additional characters in addition to new line and " " if necessary. i dont think it is
   add when in and out of a regular expression outside a string for counting/entering and inside a string for counting .... console.log(`The value of lastIndex is ${/d(b+```)d/g.lastIndex}`); vs const re = /^(?:\d{3}|\(\d{3}\))([-/.])\d{3}\1\d{4}$/; ...
   take regular expressions outside and indide into consideration and template literals for counting
   make file types a wrapper condition. 
   add files for exiting
   add an updater for whether or not to pass in data if its the same file... just so the entire data isnt passed more than once
   
   when i go into a function, every consditional variable for outside the function should already be reset.
   when i leave a function, every consditional variable for inside the function should be reset

   backtracking
   the only thing to check for is an equals sign in the backtracking set... when an equals sign is found, you know the function has a name and possibly a type. 
   this should be able to determine when to end. ending is based on = ...no need to count parentheses. you can do this for every function
   
  */

   var fs = require('file-system');

   var initiate_arrow = require('./backtracking/arrow');
   var initiate_regular = require('./backtracking/regular');

   var html_enter_script = require('./html_recursive_exit/html_enter_script');
   var html_end_script = require('./html_recursive_exit/html_end_script'); 
   var html_bad_closing_tag = require('./html_recursive_exit/html_bad_closing_tag');
   var html_bad_opening_tag = require('./html_recursive_exit/html_bad_opening_tag');
   var html_comment = require('./html_recursive_exit/html_comment');

   var double_quote_string = require('./script_recursive_exit/double_quote_string');
   var multiline_comment = require('./script_recursive_exit/multiline_comment');
   var regex = require('./script_recursive_exit/regex');
   var single_quote_string = require('./script_recursive_exit/single_quote_string');
   var singleline_comment = require('./script_recursive_exit/singleline_comment');
   var template_string = require('./script_recursive_exit/template_string');

   /* 
   * data about the file. line_number and fp used in the build string description
   * @param {data_index} the character index in the file
   * @param {data} the files text
   * @param {data_length} used to end the file... could use error
   * @param {exported_functions} the long string of functions placed in file
   * @param {fp} the file path of the function
   * @param {line_number} the current line number
   * @param {function_line_number} the line number of the function
   * @param {folders} folders of all the files to test
   * @param {file_type} whether a .html, .js or .ts file. Used for determining certain types of functions and when to check for functions. example <script
   * @param {debug} array of specific actions to make sure things are kept in order
   * @param {function_types} types of functions being stripped
   */
 
   var data_index = 0;
   var data = '';
   var data_length = 0;
   var exported_functions = [];
   var fp = '';
   var line_number = 0;
   var function_line_number = 0;
   var folders = [];
   var debug = [];
   var file_type = '';
   var function_types = {
     regular: true,
     arrow: true, 
   }
 
   /*
   * denoting inside or outside the function, for reading and acting.. can rid some conditions here
   * @param {in_function} if in function or not in function for operations
   */
 
   var in_function = false;
 
   /*
   * inside the function. Strings, single line and multiline comments are used to determine wheter a bracket should be added. Brackets determine function end.
   * @param {opening_bracket} used to note when a function with brackets ends. could use count instead
   * @param {closing_bracket} used to note when a function with brackets ends. could use count instead
   * @param {build_string} the function being built
   * @param {function_index} index of the function
   * @param {in_arrow} if in an arrow function
   * @param {has_bracket} if the function contains an opening bracket. for arrow function (above)
   */
 
   var opening_bracket = 0;
   var closing_bracket = 0;
   var build_string = '';
   var function_index = 1;
   var is_arrow = false;
   var has_bracket = false;

 /* 
   * track the opening and closing indexes for counting the correct amount of '(' in arrow function parameter set... reset when entering arrow function... will be called someting more general if another type of function needs to be backtracked for parameters... not sure what else i can use this for counting
   * used to copy index and line number back over from other file to main
 */

  var arrow_index_parameter_boundries = [];
  var data_index_and_line_number_update = {};
 
 /* 
   * search folders, files and get all arrow functions with and without brackets regular functions with brackets. line numbers, filepaths, function names.
   * @param {fldr} folders being traversed
   * @param {f_t_g} The function file path being written to. if non existant, is created.
   * @param {f_t} The function types you would like to strip
 */
 
 function generate(fldrs, f_t_g, f_t) {
 
  var error_initial = '';
 
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
 
   var errors = '';
 
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
 
   fs.recurseSync(folders[i].folder, folders[i].files == 'all' ? null : folders[i].files, (filepath, relative, filename) => {
 
    if(filename) { 
 
     file_type = filename.split(''); //just use a regular expression here or a while loop. i know its ugly. shut up
 
     if(
      file_type.length >= 2 &&
      file_type[file_type.length - 1].toLowerCase() === 's' && 
      file_type[file_type.length - 2].toLowerCase() === 't'
     ) { 
      file_type = 'typescript';
     } else if(
      file_type.length >= 2 &&
      file_type[file_type.length - 1].toLowerCase() === 's' && 
      file_type[file_type.length - 2].toLowerCase() === 'j'
     ) { 
      file_type = 'javascript';
     } else if(
      file_type.length >= 4 &&
      file_type[file_type.length - 1].toLowerCase() === 'l' && 
      file_type[file_type.length - 2].toLowerCase() === 'm' && 
      file_type[file_type.length - 3].toLowerCase() === 't' && 
      file_type[file_type.length - 4].toLowerCase() === 'h'
     ) {
      file_type = 'html';
     } else { 
      file_type = '';
     }
 
     if(file_type !== '') {
      data_index = 0;
      data = fs.readFileSync(filepath, 'utf8');
      data_length = data.length;
      fp = filepath;
      line_number = 0;
      function_line_number = 0;
      in_function = false;
      opening_bracket = 0;
      closing_bracket = 0;
      build_string = '';
      is_arrow = false;
      has_bracket = false;
      if(file_type === 'html') { 
        run_from_html(data_index);
      } else { 
        iterate_through_file_text(data_index);
      }
     }
 
    }
 
   })
 
  }

  return exported_functions;
 
 }

 /*
  when in an html script, find out when in a script tag and run the script function.... make sure to add bad opening and closing tags on this
 */

 function run_from_html(data_index) { 

  /*
   leave file on data length
  */
 
  if(data_index >= data_length) { 
   return;
  }
 
  /*
   increase line number for file description in build_string
  */
 
  if(data.charAt(data_index) === '\n') { 
   line_number = line_number + 1;
  }
  
  /*
   enter and exit an html comment
  */
 
  if(
   data.charAt(data_index) === '<' && 
   data.charAt(data_index + 1) === '!' && 
   data.charAt(data_index + 2) === '-' && 
   data.charAt(data_index + 3) === '-' 
  ) { 
   data_index = data_index + 4; 
   data_index_and_line_number_update = html_comment(data, data_index, false, line_number);
   data_index = data_index_and_line_number_update.data_index;
   line_number = data_index_and_line_number_update.line_number;
   return run_from_html(data_index);
  }
 
  /*
   enter into an html script and exit in the main file
  */

  data_index_and_line_number_update = html_enter_script(data_index);
  if(data_index_and_line_number_update.in_script === true) { 
   data_index = data_index_and_line_number_update.data_index;
   line_number = data_index_and_line_number_update.line_number
   iterate_through_file_text(data_index);
   return run_from_html(data_index);
  }

  /*
   continue through the html document
  */

  data_index = data_index + 1; 
  return run_from_html(data_index);
  
 }
 
 /*
  recursing on every condition while turning things on and off, making things easier to read. When a definition for a function is found, backtracking to start the build string with the correct beginning value of the function.
 */
 
 function iterate_through_file_text(data_index) {
 
  /*
   leave file on data length
  */
 
  if(data_index >= data_length) { 
   return;
  }
 
  /*
   increase line number for file description in build_string
  */
 
  if(data.charAt(data_index) === '\n') { 
   line_number = line_number + 1;
  }

  /*
   if the html script has ended, get out and continue through the html document until another script found
  */

  if(file_type === 'html') {
   data_index_and_line_number_update = html_end_script(data_index);
   if(data_index_and_line_number_update.end_script === true) { 
    data_index = data_index_and_line_number_update.data_index;
    line_number = data_index_and_line_number_update.line_number
    return;
   }
  }
 
  /*
   enter and exit a multiline comment
  */

  if(
   data.charAt(data_index) === '/' &&
   data.charAt(data_index + 1) === '*'
  ) { 
   arrow_index_parameter_boundries.push({boundry_type: 'multiline_comment', first_index: data_index, last_index: 'to be determined'});
   data_index = data_index + 2; 
   data_index_and_line_number_update = multiline_comment(data, data_index, in_function, line_number);
   data_index = data_index_and_line_number_update.data_index;
   line_number = data_index_and_line_number_update.line_number;
   arrow_index_parameter_boundries[arrow_index_parameter_boundries.length - 1].last_index = data_index;
   return iterate_through_file_text(data_index);
  }

  /*
   enter and exit a single line comment
  */

  if(
   data.charAt(data_index) === '/' &&
   data.charAt(data_index + 1) === '/'
  ) { 
   arrow_index_parameter_boundries.push({boundry_type: 'singleline_comment', first_index: data_index, last_index: 'to be determined'});
   data_index = data_index + 2; 
   data_index_and_line_number_update = singleline_comment(data, data_index, in_function, line_number);
   data_index = data_index_and_line_number_update.data_index;
   line_number = data_index_and_line_number_update.line_number;
   arrow_index_parameter_boundries[arrow_index_parameter_boundries.length - 1].last_index = data_index;
   return iterate_through_file_text(data_index);
  }

  /* 
   enter and exit a double quote string
  */

  if(data.charAt(data_index) === '"') { 
   arrow_index_parameter_boundries.push({boundry_type: 'double_quote', first_index: data_index, last_index: 'to be determined'});
   data_index = data_index + 1; 
   data_index_and_line_number_update = double_quote_string(data, data_index, in_function, line_number);
   data_index = data_index_and_line_number_update.data_index;
   line_number = data_index_and_line_number_update.line_number;
   arrow_index_parameter_boundries[arrow_index_parameter_boundries.length - 1].last_index = data_index;
   return iterate_through_file_text(data_index);
  }

  /* 
   enter and exit a single quote
  */

  if(data.charAt(data_index) === "'") { 
   arrow_index_parameter_boundries.push({boundry_type: 'double_quote', first_index: data_index, last_index: 'to be determined'});
   data_index = data_index + 1; 
   data_index_and_line_number_update = single_quote_string(data, data_index, in_function, line_number);
   data_index = data_index_and_line_number_update.data_index;
   line_number = data_index_and_line_number_update.line_number;
   arrow_index_parameter_boundries[arrow_index_parameter_boundries.length - 1].last_index = data_index;
   return iterate_through_file_text(data_index);
  }

  /* 
   enter and exit a template literal string
  */

  if(data.charAt(data_index) === '`') { 
   arrow_index_parameter_boundries.push({boundry_type: 'template_quote', first_index: data_index, last_index: 'to be determined'});
   data_index = data_index + 1; 
   data_index_and_line_number_update = template_string(data, data_index, in_function, line_number);
   data_index = data_index_and_line_number_update.data_index;
   line_number = data_index_and_line_number_update.line_number;
   arrow_index_parameter_boundries[arrow_index_parameter_boundries.length - 1].last_index = data_index;
   return iterate_through_file_text(data_index);
  }
 
  /* 
   Enter into a regular function and start the build string.
  */
 
  if(
   ((data.charAt(data_index-1) === '\n' || data.charAt(data_index-1) === ' ' || data.charAt(data_index-1) === ',' || data.charAt(data_index-1) === ':') || ((data.charAt(data_index-1) === '=' || data.charAt(data_index-1) === '(' || data.charAt(data_index-1) === '+' || data.charAt(data_index-1) === '-' || data.charAt(data_index-1) === '~' || data.charAt(data_index-1) === '!') && (data.charAt(data_index-2) === ' ' || data.charAt(data_index-2) === '\n' || data.charAt(data_index-2) === ',' || data.charAt(data_index-2) === ':'))) &&
   data.charAt(data_index  ) === 'f' && 
   data.charAt(data_index+1) === 'u' &&  
   data.charAt(data_index+2) === 'n' && 
   data.charAt(data_index+3) === 'c' && 
   data.charAt(data_index+4) === 't' && 
   data.charAt(data_index+5) === 'i' && 
   data.charAt(data_index+6) === 'o' && 
   data.charAt(data_index+7) === 'n' && 
   (data.charAt(data_index+8) === '\n' || data.charAt(data_index+8) === ' ' || data.charAt(data_index+8) === '(') &&
   in_function === false && 
   function_types.regular === true
  ) {
   in_function = true;
   is_arrow = false;
   function_line_number = line_number;
   build_string = initiate_regular(data, data_index) + " function"; 
   data_index = data_index + 8; 
   return iterate_through_file_text(data_index);
  }
 
  /*
   enter into an arrow function and start the build string
  */
 
  if(
   (data.charAt(data_index-1) === '\n' || data.charAt(data_index-1) === ' ' || data.charAt(data_index-1) === ')') && 
   data.charAt(data_index  ) ===  '='  && 
   data.charAt(data_index+1) ===  '>'  && 
   (data.charAt(data_index+2) === '\n' || data.charAt(data_index+2) === ' ' || data.charAt(data_index+2) === '{') &&
   in_function === false && 
   function_types.arrow === true
  ) {
   in_function = true;
   function_line_number = line_number;
   is_arrow = true;
   build_string = initiate_arrow(data, data_index) + " =>";
   arrow_index_parameter_boundries = []; //only used here
   data_index = data_index + 2;
   return iterate_through_file_text(data_index);
  }
 
  /*
   if in a function and a bracket..increase count
  */
 
  if(
   data.charAt(data_index) === '{' && 
   in_function === true
  ) {
   opening_bracket = opening_bracket + 1; 
   has_bracket = true; //has bracket needs to be noted above too or not
   build_string += data.charAt(data_index);
   data_index = data_index + 1;
   return iterate_through_file_text(data_index);
  } 
 
  /*
   if not in a comment or string, keeping count of ending bracket to know when to end the function
  */
  
  if(
   data.charAt(data_index) === '}' && 
   in_function === true
  ) {
   closing_bracket = closing_bracket + 1;
   build_string += data.charAt(data_index);
   data_index = data_index + 1;
   return iterate_through_file_text(data_index);
  }
 
  /* 
   end creating the function.. this condition should hit one time then going out of the function.
  */
 
  if(
   ((is_arrow === true && has_bracket === false && data.charAt(data_index) === '\n') || 
   (opening_bracket === closing_bracket && opening_bracket > 0)) && 
   in_function === true
  ) { 
   push_function();
   function_index = function_index + 1;
   build_string = '';
   has_bracket = false;
   in_function = false;
   opening_bracket = 0; 
   closing_bracket = 0;
   data_index = data_index + 1;
   return iterate_through_file_text(data_index);
  }
 
  /* 
   pushing every character when in the function... the build string is also in the other files copied over.... if not in the function, just moving next
  */
  
  if(in_function === true) { 
   build_string += data.charAt(data_index);
   data_index = data_index + 1;
   return iterate_through_file_text(data_index);
  } else { 
   data_index = data_index + 1;
   return iterate_through_file_text(data_index);
  }

  /*
   this statement should not execute
  */

  throw new error(
   "in function error:\n" +
   "The in function conditions are ordered for this statement to be unreachable."
  )
 
 }
 
 /*
  CHECK BEGINNING OF HTML SCRIPT ------------------------------------------- just check for strings here
 */
 
 function recurse_check_script(html_end_script_data_index) { 
  
 }
 
 /*
  CHECK ENDING HTML SCRIPT
 */
 
 function recurse_check_end_script(html_end_script_data_index_two) { 
 
 }
 
 /*
  PUSH THE FUNCTION ----------------------------------------------------- make this an array of objects with has_name etc
 */
 
 function push_function() {
  exported_functions.push({ 
    index: function_index, 
    filepath: fp, 
    line_number: function_line_number + 1,
    function_: build_string, 
    is_async: false, 
    has_name: false, 
    parameters: 'going to add this in'
  });
 }
 
 module.exports = generate;