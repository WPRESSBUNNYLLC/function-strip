  
  /* 

   Title: generate

   Description: 
   strips a varierty of functions in .html, .js, .ts files using character sets, backtracking arrays and the addition of a build string (no ast). entering into a function when not in a template literal, single quote, double quote, multiline comment, single line comment, regular expression. counting brackets within each function file using the same script recursive exit.
   does not strip functions that are found inside strings("'`), single line comments and multline comments and outside of script tags in html documents. 
   Includes the line number, filepath and function name for each function.
   Includes a list of function types to strip. All configurable.

   Author: Alexander
   License: MIT
   
  */

   var fs = require('file-system');

   var initiate_arrow = require('./functions/arrow/arrow_main');
   var initiate_regular = require('./functions/regular/regular_main');

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
   * @param {function_index} the index for each function
   * @param {folders} folders of all the files to test
   * @param {file_type} whether a .html, .js or .ts file. Used for determining certain types of functions and when to check for functions. example <script
   * @param {function_types} types of functions being stripped
   * @param {arrow_index_parameter_boundries} track the opening and closing indexes for counting the correct amount of '(' in arrow function parameter set... reset when entering arrow function... will be called someting more general if another type of function needs to be backtracked for parameters... not sure what else i can use this for counting
   * @param {data_index_and_line_number_update} used to copy index and line number back over from other file to main
   * @param {function_types} the different functions to execute
   */
 
   var data_index = 0;
   var arrow_index_parameter_boundries = [];
   var data_index_and_line_number_update = {}; 
   var function_index = 1;
   var possibly_push_arrow;
   var possibly_push_regular;
   var data = '';
   var data_length = 0;
   var exported_functions = [];
   var fp = '';
   var line_number = 0;
   var folders = [];
   var file_type = '';
   var function_types = {
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
 
  if(data_index >= data_length) { 
   return;
  }
 
  if(data.charAt(data_index) === '\n') { 
   line_number = line_number + 1;
  }
 
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

  //add opening bad tag check 

  //add closing bad tag check
 
  data_index_and_line_number_update = html_enter_script(data_index);
  if(data_index_and_line_number_update.in_script === true) { 
   data_index = data_index_and_line_number_update.data_index;
   line_number = data_index_and_line_number_update.line_number
   iterate_through_file_text(data_index);
   return run_from_html(data_index);
  }

  data_index = data_index + 1; 
  return run_from_html(data_index);
  
 }
 
 /*
  When a definition for a function is found, backtracking to start the build string with the correct beginning value of the function.
 */
 
 function iterate_through_file_text(data_index) {
 
  if(data_index >= data_length) { 
   return;
  }
 
  if(data.charAt(data_index) === '\n') { 
   line_number = line_number + 1;
  }

  if(
   data.charAt(data_index) === '/' &&
   data.charAt(data_index + 1) === '*'
  ) { 
   arrow_index_parameter_boundries.push({boundry_type: 'multiline_comment', first_index: data_index, last_index: 'to be determined'});
   data_index = data_index + 2; 
   data_index_and_line_number_update = multiline_comment(data, data_index, false, line_number, '');
   data_index = data_index_and_line_number_update.data_index;
   line_number = data_index_and_line_number_update.line_number;
   arrow_index_parameter_boundries[arrow_index_parameter_boundries.length - 1].last_index = data_index;
   return iterate_through_file_text(data_index);
  }

  if(
   data.charAt(data_index) === '/' &&
   data.charAt(data_index + 1) === '/'
  ) { 
   arrow_index_parameter_boundries.push({boundry_type: 'singleline_comment', first_index: data_index, last_index: 'to be determined'});
   data_index = data_index + 2; 
   data_index_and_line_number_update = singleline_comment(data, data_index, false, line_number, '');
   data_index = data_index_and_line_number_update.data_index;
   line_number = data_index_and_line_number_update.line_number;
   arrow_index_parameter_boundries[arrow_index_parameter_boundries.length - 1].last_index = data_index;
   return iterate_through_file_text(data_index);
  }

  if(data.charAt(data_index) === '/') { 
   arrow_index_parameter_boundries.push({boundry_type: 'regular_expression', first_index: data_index, last_index: 'to be determined'});
   data_index = data_index + 1; 
   data_index_and_line_number_update = regex(data, data_index, false, line_number, '');
   data_index = data_index_and_line_number_update.data_index;
   line_number = data_index_and_line_number_update.line_number;
   arrow_index_parameter_boundries[arrow_index_parameter_boundries.length - 1].last_index = data_index;
   return iterate_through_file_text(data_index);
  }

  if(data.charAt(data_index) === '"') { 
   arrow_index_parameter_boundries.push({boundry_type: 'double_quote', first_index: data_index, last_index: 'to be determined'});
   data_index = data_index + 1; 
   data_index_and_line_number_update = double_quote_string(data, data_index, false, line_number, '');
   data_index = data_index_and_line_number_update.data_index;
   line_number = data_index_and_line_number_update.line_number;
   arrow_index_parameter_boundries[arrow_index_parameter_boundries.length - 1].last_index = data_index;
   return iterate_through_file_text(data_index);
  }

  if(data.charAt(data_index) === "'") { 
   arrow_index_parameter_boundries.push({boundry_type: 'single_quote', first_index: data_index, last_index: 'to be determined'});
   data_index = data_index + 1; 
   data_index_and_line_number_update = single_quote_string(data, data_index, false, line_number, '');
   data_index = data_index_and_line_number_update.data_index;
   line_number = data_index_and_line_number_update.line_number;
   arrow_index_parameter_boundries[arrow_index_parameter_boundries.length - 1].last_index = data_index;
   return iterate_through_file_text(data_index);
  }

  if(data.charAt(data_index) === '`') { 
   arrow_index_parameter_boundries.push({boundry_type: 'template_quote', first_index: data_index, last_index: 'to be determined'});
   data_index = data_index + 1; 
   data_index_and_line_number_update = template_string(data, data_index, false, line_number, '');
   data_index = data_index_and_line_number_update.data_index;
   line_number = data_index_and_line_number_update.line_number;
   arrow_index_parameter_boundries[arrow_index_parameter_boundries.length - 1].last_index = data_index;
   return iterate_through_file_text(data_index);
  }

  if(file_type === 'html') {
   data_index_and_line_number_update = html_end_script(data_index);
   if(data_index_and_line_number_update.end_script === true) { 
    data_index = data_index_and_line_number_update.data_index;
    line_number = data_index_and_line_number_update.line_number
    return;
   }
  }

  if(function_types.regular === true) {
   possibly_push_regular = initiate_regular(data, data_index, line_number); 
   if(possibly_push_regular.is_function === true) { 
    exported_functions.push({ 
     index: function_index, 
     filepath: fp, 
     beginning_line_number: possibly_push_regular.beginning_line_number,
     ending_line_number: possibly_push_regular.ending_line_number,
     function_: possibly_push_regular.build_string, 
     is_async: possibly_push_regular.is_async, 
     has_name: possibly_push_regular.has_name, 
     parameters: possibly_push_regular.parameters
    });
    line_number = possibly_push_regular.ending_line_number;
    data_index = possibly_push_regular.data_index;
    function_index = function_index + 1;
    return iterate_through_file_text(data_index);
   }
  }

  if(function_types.arrow === true) {
   possibly_push_arrow = initiate_arrow(data, data_index, line_number, arrow_index_parameter_boundries);
   if(possibly_push_arrow.is_function === true) { 
    exported_functions.push({ 
     index: function_index, 
     filepath: fp, 
     beginning_line_number: possibly_push_arrow.beginning_line_number,
     ending_line_number: possibly_push_arrow.ending_line_number,
     function_: possibly_push_arrow.build_string, 
     is_async: possibly_push_arrow.is_async, 
     has_name: possibly_push_arrow.has_name, 
     parameters: possibly_push_arrow.parameters
    });
    line_number = possibly_push_arrow.ending_line_number;
    data_index = possibly_push_arrow.data_index;
    function_index = function_index + 1;
    arrow_index_parameter_boundries = [];
    return iterate_through_file_text(data_index);
   }
  }

  data_index = data_index + 1; 
  return iterate_through_file_text(data_index);
 
 }
 
 module.exports = generate;