let fs = require('file-system');
let shared = require('./data');
let html_tag = require('generate/html_recursive_exit/html_tag');
let html_comment = require('./html_recursive_exit/html_comment');
let tag_update = {}; 
let folders = [];
let file_type = '';
let JavascriptTokenizer = /(?<comment>((\/\*)(.|\n){0,}?(\*\/))|((\/\/)(.){0,}))|(?<regex>(\/([^\/\*].)+([^\\]\/)[a-zA-Z]*))|(?<whitespace>(( |\n|\t|\r)+))|(?<number>(0b([10]+)|0o([0-7]+)|0x([a-fA-f0-9]+)|(\.[0-9]{1,}|[0]\.?[0-9]{0,}|[1-9]{1}[0-9]{0,}\.?[0-9]{0,})(e[\-+][0-9]+)?))|(?<identifier>(\.?[a-zA-Z_$]{1}([a-zA-Z_$0-9]{0,})))|(?<string>("(.){0,}?")|('(.){0,}?')|(`))|(?<punctuator>(&&|&=|&)|(\/=|\/)|(===|==|=>|=)|(!==|!=|!)|(>>>=|>>=|>>>|>>|>=|>)|(<<=|<<|<=|<)|(-=|--|-)|(\|\||\|\=|\|)|(%=|%)|(\.\.\.)|(\+\+|\+=|\+)|(^=|=)|(\*=|\*)|([,{}[\];\?\:\^\~]))/;
let shared = require('generate/data');
let recursive_counter_script = 0;
let recursive_counter_string = 0; 
let currently_inside_of = 'string';
let current_line_number = 0;
let template_tokens = [];
let current_template_string = []; //string template string template string template...etc
let error = {};
let tree = {};
let match;

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

function tokens() { 
 while(JavascriptTokenizer.lastIndex < shared.get_data_length()) { 
  match = JavascriptTokenizer.exec(shared.get_data());
  if(match[0] === '`'){ 
    template_tokens.push('beginning-template');
    template();
    template_tokens.push('ending_template');
  } else if(match[0] !== null) { 
    //count line numbers in token
    //push token with group name
    //if punc build tree
    //if prevous is whatever... push expect error
  } else { 
    throw new Error(`Unexpected: ${match[0]}`);
  }
 }
}

function template() { 

 if(
  currently_inside_of === 'string' && 
  shared.get_data().charAt(JavascriptTokenizer.lastIndex) === '$' && 
  shared.get_data().charAt(JavascriptTokenizer.lastIndex + 1) === '{'
 ) { 
  currently_inside_of = 'script'
  recursive_counter_script = recursive_counter_script + 1; 
  JavascriptTokenizer.lastIndex += 2;
  return recurse();
 } else if(currently_inside_of === 'string') { 
  //add to string
 }

 if(
  currently_inside_of === 'script' && 
  shared.get_data().charAt(JavascriptTokenizer.lastIndex) === '}'
 ) {
  currently_inside_of = 'string'; 
  recursive_counter_script -= 1;
  JavascriptTokenizer.lastIndex += 1;
  
  return recurse();
 } else if (currently_inside_of === 'script') { 
  //add to current tokens
 }

 if(
  currently_inside_of === 'script' && 
  shared.get_data().charAt(JavascriptTokenizer.lastIndex) === '`'
 ) { 
  currently_inside_of = 'string'; 
  recursive_counter_string += 1;
  regex_tokenizer.lastIndex += 1;
  return recurse();
 }

 if(
  currently_inside_of === 'string' && 
  shared.get_data().charAt(JavascriptTokenizer.lastIndex) === '`'
 ) {
  currently_inside_of = 'script'; 
  recursive_counter_string -= 1;
  JavascriptTokenizer.lastIndex += 1;
  if(
   recursive_counter_string === 0 && 
   recursive_counter_script === 0
  ) {
   recursive_counter_script = 0;
   recursive_counter_string = 0; 
   currently_inside_of = 'string';
   return;
 }
  return recurse();
 }

 JavascriptTokenizer.lastIndex += 1; 
 return recurse();

}

function build_tree() { 
  // {}
}
  
//   shared.update_current_token_type('string-literal');
//   shared.update_current_token(shared.get_data().charAt(shared.get_data_index()));
//   shared.set_beginning_token_line_number_and_data_index(shared.get_data_index(), shared.get_line_number());
//   shared.update_data_index(1); 
//   double_quote_string();
//   shared.set_ending_token_line_number_and_data_index(shared.get_data_index(), shared.get_line_number());
//   shared.update_tokens();
//   shared.build_data_structure();
//   shared.update_data_index(1);

 module.exports = generate;