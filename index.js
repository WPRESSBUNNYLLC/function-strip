let fs = require('file-system');
let shared = require('./data');
const key_words = require('./key-words');
let folders = [];
let file_type = '';                                                                                                                                                                                                                                                                                                                                                                                                                                 
let JavascriptTokenizer = /(?<comment>((\/\*)(.|\n){0,}?(\*\/))|((\/\/)(.){0,}))|(?<regex>(\/(.)+([^\\]\/)))|(?<whitespace>(( |\n|\t|\r)+))|(?<number>(0b([10]+)|0o([0-7]+)|0x([a-fA-f0-9]+)|(\.[0-9]{1,}|[0]\.?[0-9]{0,}|[1-9]{1}[0-9]{0,}\.?[0-9]{0,})(e[\-+][0-9]+)?))|(?<identifier>(\.?[a-zA-Z_$]{1}([a-zA-Z_$0-9]{0,})))|(?<string>("(.){0,}?")|('(.){0,}?')|(`))|((?<punctuator>(&&|&=|&)|(\/=|\/)|(===|==|=>|=)|(!==|!=|!)|(>>>=|>>=|>>>|>>|>=|>)|(<<=|<<|<=|<)|(-=|--|-)|(\|\||\|\=|\|)|(%=|%)|(\.\.\.)|(\+\+|\+=|\+)|(^=|=)|(\*=|\*)|([,{}[\];\?\:\^\~])))/; 
let TemplateTokenizer = /(?<comment>((\/\*)(.|\n){0,}?(\*\/))|((\/\/)(.){0,}))|(?<regex>(\/(.)+([^\\]\/)))|(?<whitespace>(( |\n|\t|\r)+))|(?<number>(0b([10]+)|0o([0-7]+)|0x([a-fA-f0-9]+)|(\.[0-9]{1,}|[0]\.?[0-9]{0,}|[1-9]{1}[0-9]{0,}\.?[0-9]{0,})(e[\-+][0-9]+)?))|(?<identifier>(\.?[a-zA-Z_$]{1}([a-zA-Z_$0-9]{0,})))|(?<string>("(.){0,}?")|('(.){0,}?'))|((?<punctuator>(&&|&=|&)|(\/=|\/)|(===|==|=>|=)|(!==|!=|!)|(>>>=|>>=|>>>|>>|>=|>)|(<<=|<<|<=|<)|(-=|--|-)|(\|\||\|\=|\|)|(%=|%)|(\.\.\.)|(\+\+|\+=|\+)|(^=|=)|(\*=|\*)|([,{}[\];\?\:\^\~])))/; 

let current_line_number = 0;
let beginning_index = 0;
let ending_index = 0;
let error = {};
let tree = {};
let tree_index = []; //left left right right left left left right right right left left
let waiting_on_punctuator = [];
let tree_scope = {};
let template_index = 0;
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
  //go through and get only javascript -- when in html tag out
 }

 function tokens() { 
  while(JavascriptTokenizer.lastIndex <= shared.get_data_length()) { 
  match = JavascriptTokenizer.exec(shared.get_data());
  if(match[0] === '`') { 
    template_index = JavascriptTokenizer.lastIndex;
    beginng_line_number = current_line_number;
    template_string_();
    ending_line_number = current_line_number;
    beginning_index = match.index; 
    ending_index = JavascriptTokenizer.lastIndex;
  } else if(match[0] !== null) { 
    beginning_index = match.index; 
    ending_index = JavascriptTokenizer.lastIndex;   
    beginng_line_number = current_line_number;
    current_line_number += (match[0].match(/\/n/g) || []).length;
    ending_line_number = current_line_number;
    //push token with group name
    //if punc build tree
    //if prevous is whatever... push expect error
//   shared.update_current_token_type('string-literal');
//   shared.update_current_token(shared.get_data().charAt(shared.get_data_index()));
//   shared.set_beginning_token_line_number_and_data_index(shared.get_data_index(), shared.get_line_number());
//   shared.update_data_index(1); 
//   double_quote_string();
//   shared.set_ending_token_line_number_and_data_index(shared.get_data_index(), shared.get_line_number());
//   shared.update_tokens();
//   shared.build_data_structure();
//   shared.update_data_index(1);

  } else { 
    throw new Error(`Unexpected: ${match[0]}`);
  }
 }
}

let combined = [];
let template_string = '';
let template_object = [];
let counter_opening_bracket = 0;
let counter_closing_bracket = 0;
let multi_line_comment = /((\/\*)(.|\n){0,}?(\*\/))/g;
let single_line_comment = /((\/\/)(.){0,}))/g;
let regex = /\/(.)+([^\\]\/)/g; 
let single_quote_string = /('(.){0,}?')|(`))/g;
let double_quote_string = /("(.){0,}?")/g;

function template_string_() {
 update_index();
 while(true) {
  if(
   shared.get_data().charAt(template_index) === '$' && 
   shared.get_data().charAt(template_index + 1) === '{'
  ) { 
   combined.push({template_string: template_string}); 
   template_string = '';
   counter_opening_bracket += 1;
   update_all_index(2);
   template_object_();
  } else if(shared.get_data().charAt(template_index) === '`') { 
   combined.push({template_string: template_string}); 
   template_string = '';
   if(counter_opening_bracket !== counter_closing_bracket) {
    update_all_index(1);
    template_object_();
   } else { 
    current_line_number = (combined.join('').match(/\/n/g) || []).length;
    construct_template_string_as_seperated_non_error();
    JavascriptTokenizer.lastIndex = template_index + 1;
    combined = [];
    template_string = '';
    template_object = [];
    counter_opening_bracket = 0;
    counter_closing_bracket = 0;
    break;
   }
  } else { 
   template_string += shared.get_data().charAt(template_index);
   update_all_index(1);
  }
 }
}

function template_object_() { 

 while(true) { 

  if(shared.get_data().charAt(template_index) === '"') { 
   match = double_quote_string.exec(shared.get_data());
   template_object.push(match[0]);
   update_index_from_double();

  } else if(shared.get_data().charAt(template_index) === "'") { 
    match = single_quote_string.exec(shared.get_data());
    template_object.push(match[0]);
    update_index_from_single();

  } else if(shared.get_data().charAt(template_index) === '/' && shared.get_data().charAt(template_index + 1) === '/') { 
    match = single_line_comment.exec(shared.get_data());
    template_object.push(match[0]);
    update_index_from_single_line();

  } else if(shared.get_data().charAt(template_index === '/') && shared.get_data().charAt(template_index + 1) === '*') { 
    match = multi_line_comment.exec(shared.get_data());
    template_object.push(match[0]);
    update_index_from_multi_line();

  } else if(shared.get_data().charAt(template_index) === '/' && shared.get_data().charAt(template_index + 1) !== '*' && shared.get_data().charAt(template_index + 1) !== '/') { 
    match = regex.exec(shared.get_data());
    template_object.push(match[0]);
    update_index_from_regex_();

  } else if(shared.get_data().charAt(template_index) === '{') { 
    counter_opening_bracket +=1;

  } else if(shared.get_data().charAt(template_index) === '}') {
    counter_closing_bracket += 1;
    if(counter_closing_bracket === counter_opening_bracket) { 
     combined.push({template_object: template_object.join('')})
     template_object = [];
     update_all_index(1)
     template_string_();
    }

  } else if(shared.get_data().charAt(template_index) === '`') { 
    template_string_();
    update_all_index(1)

  } else { 
    template_object.push(shared.get_data().charAt(template_index));
    update_all_index(1)
  }

 }
}

function update_index() { 
 multi_line_comment.lastIndex = template_index;
 single_line_comment.lastIndex = template_index; 
 regex.lastIndex = template_index;
 single_quote_string.lastIndex = template_index;
 double_quote_string.lastIndex = template_index; 
}

function update_index_from_double() { 
 multi_line_comment.lastIndex = double_quote_string.lastIndex
 single_line_comment.lastIndex = double_quote_string.lastIndex
 regex.lastIndex = double_quote_string.lastIndex
 single_quote_string.lastIndex = double_quote_string.lastIndex
 template_index = double_quote_string.lastIndex;
}

function update_index_from_single() { 
 multi_line_comment.lastIndex = single_quote_string.lastIndex
 single_line_comment.lastIndex = single_quote_string.lastIndex
 regex.lastIndex = single_quote_string.lastIndex
 single_quote_string.lastIndex = single_quote_string.lastIndex
 template_index = single_quote_string.lastIndex;
}

function update_index_from_single_line() { 
 multi_line_comment.lastIndex = single_line_comment.lastIndex
 single_line_comment.lastIndex = single_line_comment.lastIndex
 regex.lastIndex = single_line_comment.lastIndex
 single_quote_string.lastIndex = single_line_comment.lastIndex
 template_index = single_line_comment.lastIndex;
}

function update_index_from_multi_line() { 
 multi_line_comment.lastIndex = multi_line_comment.lastIndex
 single_line_comment.lastIndex = multi_line_comment.lastIndex
 regex.lastIndex = multi_line_comment.lastIndex
 single_quote_string.lastIndex = multi_line_comment.lastIndex
 template_index = multi_line_comment.lastIndex;
}

function update_index_from_regex_() { 
 multi_line_comment.lastIndex = regex.lastIndex;
 single_line_comment.lastIndex = regex.lastIndex; 
 regex.lastIndex = regex.lastIndex;
 single_quote_string.lastIndex = regex.lastIndex;
 double_quote_string.lastIndex = regex.lastIndex; 
}

function update_all_index(i) { 
 multi_line_comment.lastIndex += i
 single_line_comment.lastIndex += i
 regex.lastIndex += i;
 single_quote_string.lastIndex += i;
 template_index += i;
 double_quote_string.lastIndex += i;
}

function construct_template_string_as_seperated_non_error() { 
  for(let i = 0; i < combined.length; i++) {
    if(typeof(combined.template_string)) { 
     //push string
    } else {
     while(true) { 
      //build tokens
     }
    }
  }
}

//get the output from each step and not run an error when seeing the combining value...

function build_tree() { 
  //{}
}

module.exports = generate;