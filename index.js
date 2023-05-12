  
  /* 

   Title: function parser
   description: strips functions from files

   Author: Alex
   
  */

   let fs = require('file-system');
   let update_function_and_update_data = require('./data');

   let initiate_arrow = require('generate/functions/arrowJs/arrow_main');
   let initiate_regular = require('generate/functions/regularJs/regular_main');

   let html_tag = require('generate/html_recursive_exit/html_tag');
   let html_comment = require('./html_recursive_exit/html_comment');

   let double_quote_string = require('./script_recursive_exit/double_quote_string');
   let multiline_comment = require('./script_recursive_exit/multiline_comment');
   let regex = require('./script_recursive_exit/regex');
   let single_quote_string = require('./script_recursive_exit/single_quote_string');
   let singleline_comment = require('./script_recursive_exit/singleline_comment');
   let template_string = require('./script_recursive_exit/template_string');

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
   let first_valid_character_html_tag = /a-zA-Z0-9/;
   let data_index_and_line_number_update = {}; 
   let function_index = 1;
   let possibly_push_arrow = {};
   let possibly_push_regular = {};
   let data = '';
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
      data_index = 0;
      update_function_and_update_data.update_data(fs.readFileSync(filepath, 'utf8'));
      data = update_function_and_update_data.data;
      data_length = data.length;
      fp = filepath;
      line_number = 0;
      valid_parens = {};
      try {
       if(file_type === 'html') { 
        run_from_html(data_index);
       } else { 
        iterate_through_file_text(data_index);
       }
      } catch(err) { 
       console.log(err.message + '\n' + 'filepath: ' + filepath); 
      }
     }
    }
   })
   
  }

  return exported_functions;
 
 }

 /*
  when in an html file, find script tag and run the script function
 */

 function run_from_html(data_index) { 
 
  if(data_index > data_length) { 
   return;
  }
 
  if(update_function_and_update_data.data.charAt(data_index) === '\n') { 
   line_number = line_number + 1;
  }
 
  if(
   update_function_and_update_data.data.charAt(data_index) === '<' && 
   update_function_and_update_data.data.charAt(data_index + 1) === '!' && 
   update_function_and_update_data.data.charAt(data_index + 2) === '-' && 
   update_function_and_update_data.data.charAt(data_index + 3) === '-' 
  ) { 
   data_index += 4; 
   data_index_and_line_number_update = html_comment(data_index, false, line_number);
   data_index = data_index_and_line_number_update.data_index;
   line_number = data_index_and_line_number_update.line_number;
   return run_from_html(data_index);
  }

  if(
   update_function_and_update_data.data.charAt(data_index) === '<' && 
   update_function_and_update_data.data.charAt(data_index + 1).test(first_valid_character_html_tag) === true
  ) { 
   temp_line_number = line_number;
   bts = '<' +  update_function_and_update_data.data.charAt(data_index + 1);
   data_index += 2;
   data_index_and_line_number_update = html_tag(data_index, line_number, bts, update_function_and_update_data.data.charAt(data_index + 1));
   data_index = data_index_and_line_number_update.data_index;
   line_number = data_index_and_line_number_update.line_number;
   tags.push({
    tag_line_number_start: temp_line_number, 
    tag_line_number_end: line_number, 
    type: 'opening', 
    name: data_index_and_line_number_update.script_name.toLowerCase(), 
    tag_string: data_index_and_line_number_update.tag_string
   })
   if(data_index_and_line_number_update.script_name.toLowerCase() === 'script') { 
    iterate_through_file_text(data_index);
   } 
   return run_from_html(data_index);
  }

  if(
   update_function_and_update_data.data.charAt(data_index) === '<' && 
   update_function_and_update_data.data.charAt(data_index + 1) === '/' &&
   update_function_and_update_data.data.charAt(data_index + 2).test(first_valid_character_html_tag) === true
  ) { 
   temp_line_number = line_number;
   bts = '<' + update_function_and_update_data.data.charAt(data_index + 1) + update_function_and_update_data.data.charAt(data_index + 2);
   data_index += 3;
   data_index_and_line_number_update = html_tag(data_index, line_number, bts, update_function_and_update_data.data.charAt(data_index + 2));
   data_index = data_index_and_line_number_update.data_index;
   line_number = data_index_and_line_number_update.line_number;
   tags.push({
    tag_line_number_start: temp_line_number, 
    tag_line_number_end: line_number, 
    type: 'closing', 
    name: data_index_and_line_number_update.script_name.toLowerCase(), 
    tag_string: data_index_and_line_number_update.tag_string
   })
   return run_from_html(data_index);
  }

  data_index += 1; 
  return run_from_html(data_index);
  
 }
 
 /*
  building the function outside of certain things like comments etc...
 */
 
 function iterate_through_file_text(data_index) {
 
  if(data_index > data_length) { 
   return;
  }
 
  if(update_function_and_update_data.data.charAt(data_index) === '\n') { 
   line_number += 1;
  }

  if(
   update_function_and_update_data.data.charAt(data_index) === '/' &&
   update_function_and_update_data.data.charAt(data_index + 1) === '*'
  ) { 
   data_index += 2; 
   data_index_and_line_number_update = multiline_comment(data_index, false, line_number, '');
   data_index = data_index_and_line_number_update.data_index;
   line_number = data_index_and_line_number_update.line_number;
   return iterate_through_file_text(data_index);
  }

  if(
   update_function_and_update_data.data.charAt(data_index) === '/' &&
   update_function_and_update_data.data.charAt(data_index + 1) === '/'
  ) { 
   data_index += 2; 
   data_index_and_line_number_update = singleline_comment(data_index, false, line_number);
   data_index = data_index_and_line_number_update.data_index;
   line_number = data_index_and_line_number_update.line_number;
   return iterate_through_file_text(data_index);
  }

  if(
   update_function_and_update_data.data.charAt(data_index) === '/' && 
   update_function_and_update_data.data.charAt(data_index + 1) !== '/' && 
   update_function_and_update_data.data.charAt(data_index + 1) !== '*'
  ) {
   data_index += 2; 
   data_index_and_line_number_update = regex(data_index, false, line_number);
   data_index = data_index_and_line_number_update.data_index;
   line_number = data_index_and_line_number_update.line_number;
   return iterate_through_file_text(data_index);
  }

  if(update_function_and_update_data.data.charAt(data_index) === '"') { 
   data_index += 1; 
   data_index_and_line_number_update = double_quote_string(data_index, false, line_number, false);
   data_index = data_index_and_line_number_update.data_index;
   line_number = data_index_and_line_number_update.line_number;
   return iterate_through_file_text(data_index);
  }

  if(update_function_and_update_data.data.charAt(data_index) === "'") { 
   data_index += 1; 
   data_index_and_line_number_update = single_quote_string(data_index, false, line_number, false);
   data_index = data_index_and_line_number_update.data_index;
   line_number = data_index_and_line_number_update.line_number;
   return iterate_through_file_text(data_index);
  }

  if(update_function_and_update_data.data.charAt(data_index) === '`') { 
   data_index += 1; 
   data_index_and_line_number_update = template_string(data_index, false, line_number);
   data_index = data_index_and_line_number_update.data_index;
   line_number = data_index_and_line_number_update.line_number;
   return iterate_through_file_text(data_index);
  }

  if(file_type === 'html') { 
   if(
    update_function_and_update_data.data.charAt(data_index) === '<' && 
    update_function_and_update_data.data.charAt(data_index + 1) === '/' &&
    update_function_and_update_data.data.charAt(data_index + 2).test(first_valid_character_html_tag) === true
   ) { 
    temp_line_number = line_number;
    bts = '<' + update_function_and_update_data.data.charAt(data_index + 1) + update_function_and_update_data.data.charAt(data_index + 2);
    data_index = data_index + 3;
    data_index_and_line_number_update = html_tag(data_index, line_number, bts, update_function_and_update_data.data.charAt(data_index + 2));
    data_index = data_index_and_line_number_update.data_index;
    line_number = data_index_and_line_number_update.line_number;
    tags.push({
     tag_line_number_start: temp_line_number, 
     tag_line_number_end: line_number, 
     type: 'closing', 
     name: data_index_and_line_number_update.script_name.toLowerCase(), 
     tag_string: data_index_and_line_number_update.tag_string
    })
    if(data_index_and_line_number_update.script_name.toLowerCase() === 'script') { //should always be script
     return;
    } else { 
     return iterate_through_file_text(data_index);
    }
   }
  }

  if(function_types.regular === true) {
   possibly_push_regular = initiate_regular(data_index, line_number); 
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
    function_index += 1;
    return iterate_through_file_text(data_index);
   }
  }

  if(update_function_and_update_data.data.charAt(data_index) === '(') { 
   valid_parens[`${data_index}-opening`] = true;
   data_index += 1;
   return iterate_through_file_text(data_index);
  } 
  
  if(update_function_and_update_data.data.charAt(data_index) === ')') { 
   valid_parens[`${data_index}-closing`] = true;
   data_index += 1;
   return iterate_through_file_text(data_index);
  }

  if(function_types.arrow === true) {
   possibly_push_arrow = initiate_arrow(data_index, line_number, valid_parens);
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
    function_index += 1;
    valid_parens = {};
    return iterate_through_file_text(data_index);
   }
  }

  data_index += 1; 
  return iterate_through_file_text(data_index);
 
 }

 module.exports = generate;