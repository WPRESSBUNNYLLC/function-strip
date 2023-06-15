/*
 Javascript tokenizer and AST 
 Author: Alex Eatman
*/

let fs = require('file-system');
let shared = require('../data');

module.exports = class js extends shared {

 constructor() {   
  //https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Expressions_and_Operators -- add the others -- make identifier a call if a paren after but add the paren individually as a punctuator for counting
  this.JavascriptTokenizer = /(?<comment>((\/\*)(.|\n){0,}?(\*\/))|((\/\/)(.){0,}))|(?<regex>(\/(.)+([^\\]\/)))|(?<whitespace>(( |\n|\t|\r)+))|(?<number>(0b([10]+)|0o([0-7]+)|0x([a-fA-F0-9]+)|(\.[0-9]{1,}|[0]\.?[0-9]{0,}|[1-9]{1}[0-9]{0,}\.?[0-9]{0,})(e[\-+][0-9]+)?))|(?<identifier>([a-zA-Z_$]{1}([a-zA-Z_$0-9]{0,})))|(?<string>("(.){0,}?")|('(.){0,}?')|(`))|((?<punctuator>(&&|&=|&)|(\/=|\/)|(===|==|=>|=)|(!==|!=|!)|(>>>=|>>=|>>>|>>|>=|>)|(<<=|<<|<=|<)|(-=|--|-)|(\|\||\|\=|\|)|(%=|%)|(\.\.\.|\.)|(\+\+|\+=|\+)|(\^=|\^)|(\*=|\*)|([,\{\}[\];\?\:\~\(\)])))/g;
  this.tokens = [];
  this.current_block_and_expression_count = 0;
  this.token_index = 0;
  this.block = 1;
  this.file = {};
  this.current_expression = { 
   root: null, 
   left: null, 
   right: null 
  }
  this.new_expression_expected = false;
  this.bracket_count_block_pop = [];
  this.point_to_previous_block = []; 
  this.match = [];
  this.template_string = '';
  this.template_count_pop = [];
  this.template_string_open_close = { 
   o: 0, 
   c: 0 
  };
  this.attach_to_regex = '';
  this.igsmuy = {
   i: { v: 'i', found: false }, 
   g: { v: 'g', found: false }, 
   y: { v: 'y', found: false }, 
   u: { v: 'u', found: false }, 
   m: { v: 'm', found: false }, 
   s: { v: 's', found: false }
  }
  this.key_words = {
   'arguments'	: true,
   'await'	: true,
   'break' : true,
   'case' : true,	
   'catch' : true,
   'class' : true,
   'const' : true,
   'continue' : true,
   'debugger' : true,	
   'default' : true,	
   'delete' : true,	
   'do' : true,
   'else' : true,	
   'enum' : true,	
   'eval' : true,
   'export' : true,
   'extends' : true,	
   'false' : true,	
   'finally' : true,	
   'for' : true,	
   'function' : true,
   'if' : true,	
   'implements' : true,	
   'import' : true,
   'in' : true,	
   'instanceof' : true,	
   'interface' : true,
   'let' : true,
   'new' : true,
   'null' : true,
   'package' : true,	
   'private' : true,	
   'protected' : true,
   'public' : true,	
   'return' : true,	
   'static' : true,
   'super' : true,	
   'switch': true,	
   'this': true,
   'throw': true,
   'true': true,
   'try': true,
   'typeof': true,
   'var': true,
   'void': true,
   'while': true,
   'with': true,
   'yield': true, 
   'require': true,
   '=>': true
   }
 }

 tokens_() {
  while(this.JavascriptTokenizer.lastIndex <= shared.get_data_length()) {
   this.match = this.JavascriptTokenizer.exec(shared.get_data());
   if(this.match[0] === '`') { 
    this.tokens.push({
      group: 'beginning-template-literal', 
      value: '`'
    });
    this.template_string_open_close.o += 1;
    this.template_string_();
    this.tokens.push({
      group: 'ending-template-literal', 
      value: '`'
    });
   } else if(this.match[0] !== null) { 
     this.which_token('');
   }
  }
  this.build_tree(this.current_expression);
 }

 which_token(T) { 
  if(this.match.groups['regex']) { 
    this.check_regex_extension();
    this.tokens.push({
     group: `${T}regex`, 
     value: this.match[0] + this.attach_to_regex
    });
    this.attach_to_regex = '';
  } else if(this.match.groups['comment']) { 
    this.tokens.push({ 
     group: `${T}comment`, 
     value: this.match[0] 
    });
  } else if(this.match.groups['string']) { 
    this.tokens.push({
     group: `${T}string`, 
     value:  this.match[0] 
    });
  } else if(this.match.groups['number']) { 
    this.tokens.push({ 
     group: `${T}number`, 
     value: this.match[0] 
    });
  } else if(this.match.groups['identifier']) { 
    if(key_words[this.match[0]]) { 
     this.tokens.push({
      group: `${T}key-word`, 
      value: this.match[0] 
     });
    } else {
     this.tokens.push({ 
      group: `${T}identifier`, 
      value: this.match[0] 
     });
   }
  } else if(this.match.groups['punctuator']) {
    if(this.match[0] === '=>') { 
     this.tokens.push({ 
      group: `${T}key-word`, 
      value: this.match[0] 
     });
    } else {
     this.tokens.push({ 
      group: `${T}punctuator`, 
      value: this.match[0] 
     });
     if(this.match[0] === '(') { 
      this.check_if_previous_identifier_is_a_call();
     }
    }
  } else if(this.match.groups['whitespace']) { 
    this.tokens.push({ 
     group: `${T}whitespace`, 
     value: this.match[0] 
    });
  } else { 
    throw new Error('invalid token')
  }
 }

 check_regex_extension() {
  if(
   typeof this.igsmuy[shared.get_data().charAt(this.JavascriptTokenizer.lastIndex)] !== 'undefined' && 
   this.igsmuy[shared.get_data().charAt(this.JavascriptTokenizer.lastIndex)].found === false
  ) { 
   this.igsmuy[shared.get_data().charAt(this.JavascriptTokenizer.lastIndex)].found = true;
   this.attach_to_regex += this.igsmuy[shared.get_data().charAt(this.JavascriptTokenizer.lastIndex)].v;
   this.JavascriptTokenizer.lastIndex += 1;
   return this.check_regex_extension();
  } else { 
    if(this.attach_to_regex.length > 0) {
     for (const [key, value] of Object.entries(this.igsmuy)) {
      this.igsmuy[key].found = false;
     }
    }
    return;
  }
 }

 check_if_previous_identifier_is_a_call() { 
  for(let i = this.tokens.length - 1; i > -1; i--) { 
    if(
     this.tokens[i].group === 'comment' || 
     this.tokens[i].group === 'whitespace'
    ) { 
     continue;
    } else if(
     this.tokens[i].group === 'identifier' || 
     this.tokens[i].group === 'T-identifier'
    ) { 
     this.tokens[i].group = 'call';
     break;
    } else { 
     break;
    }
  }
 }

 template_string_() {
   while(true) {
    if(
     shared.get_data().charAt(this.JavascriptTokenizer.lastIndex) === '$' && 
     shared.get_data().charAt(this.JavascriptTokenizer.lastIndex + 1) === '{'
    ) { 
     this.template_string.length > 0 ? 
     this.tokens.push({ 
      group: 'template-string', 
      value: this.template_string 
     }) : '';
     this.template_string = '';
     this.template_count_pop.push({ 
      o: 1, 
      c: 0
     });
     this.JavascriptTokenizer.lastIndex += 2;
     return this.template_object_();
    } else if(shared.get_data().charAt(this.JavascriptTokenizer.lastIndex) === '`') { 
     this.template_string_open_close.c += 1;
     this.template_string.length > 0 ? 
     this.tokens.push({
      group: 'template-string', 
      value: this.template_string 
     }) : '';
     this.template_string = '';
     //use template object length instead and get rid of string count
     if(this.template_string_open_close.o !== this.template_string_open_close.c) {
      this.JavascriptTokenizer.lastIndex += 1;
      return this.template_object_();
     } else { 
      if(this.template_count_pop.length !== 0) { 
       throw new Error('the template literal string has ended but there are still remaining brackets?');
      }
      this.JavascriptTokenizer.lastIndex += 1;
      this.template_string = '';
      this.template_count_pop = [];
      this.template_string_open_close.o = 0;
      this.template_string_open_close.c = 0; 
      break;
     }
    } else { 
     this.template_string += shared.get_data().charAt(this.JavascriptTokenizer.lastIndex);
     this.JavascriptTokenizer.lastIndex += 1;
   }
  }
 }

 template_object_() {
  while(true) { 
   this.match = this.JavascriptTokenizer.exec(shared.get_data());
   if(this.match[0] === '{') {
    this.template_count_pop[this.template_count_pop.length - 1].o += 1;
    this.tokens.push({ 
      group: 'T-punctuator', 
      value: this.match[0] 
    });
   } else if(this.match[0] === '}') { 
    this.template_count_pop[this.template_count_pop.length - 1].c += 1;
    if(this.template_count_pop[this.template_count_pop.length - 1].o === this.template_count_pop[this.template_count_pop.length - 1].c) { 
     this.template_count_pop.pop();
     return this.template_string_();
    } else { 
     this.tokens.push({ 
      group: 'T-punctuator', 
      value: this.match[0] 
     });
    }
   } else if(this.match[0] === '`') {
     this.template_string_open_close.o += 1;
     return this.template_string_();
   } else { 
     which_token('T-');
   }
  }
 }

 build_tree(current) { 
  switch(this.tokens[this.token_index].group) { 
   case 'punctuator': this.handle_punctuator(this.tokens[this.token_index].value, current);
   case 'identifier': this.handle_identifier(this.tokens[this.token_index].value, current);
   case 'key-word': this.handle_key_word(this.tokens[this.token_index].value, current);
   case 'regex': this.handle_regex(this.tokens[this.token_index].value, current);
   case 'string': this.handle_string(this.tokens[this.token_index].value, current);
   case 'comment': this.handle_comment(this.tokens[this.token_index].value, current);
   case 'beginning-template-literal': this.handle_template_literal(this.tokens[this.token_index].value, current);
   case 'number': this.handle_number(this.tokens[this.token_index].value, current);
   case 'whitespace': this.handle_white_space(this.tokens[this.token_index].value, current);
  }
 }

 handle_punctuator(value, current) { 
  switch(value) { 
    case '&&': 
     this.handle_common_punc_a(current, value);
    case '&=': 
     this.handle_common_punc_b(current, value);
    case '&': 
     this.handle_common_punc_a(current, value);
    case '/=': 
     this.handle_common_punc_b(current, value);
    case '/': 
     this.handle_common_punc_a(current, value);
    case '===': 
     this.handle_common_punc_a(current, value);
    case '==': 
     this.handle_common_punc_a(current, value);
    case '=': 
     this.handle_common_punc_s(current, value);
    case '!==': 
     this.handle_common_punc_a(current, value);
    case '!=': 
     this.handle_common_punc_a(current, value);
    case '!': 
     this.handle_common_punc_n(current, value);
    case '>>>=': 
     this.handle_common_punc_b(current, value);
    case '>>=': 
     this.handle_common_punc_b(current, value);
    case '>>>':
     this.handle_common_punc_a(current, value); 
    case '>>': 
     this.handle_common_punc_a(current, value);
    case '>=': 
     this.handle_common_punc_a(current, value);
    case '>': 
     this.handle_common_punc_a(current, value);
    case '<<=': 
     this.handle_common_punc_b(current, value);
    case '<<': 
     this.handle_common_punc_a(current, value);
    case '<=': 
     this.handle_common_punc_a(current, value);
    case '<': 
     this.handle_common_punc_a(current, value);
    case '-=': 
     this.handle_common_punc_b(current, value);
    case '--':
     this.handle_common_punc_c(current, value);
    case '-':
     this.handle_common_punc_a(current, value);
    case '||':
     this.handle_common_punc_a(current, value);
    case '|=':
     this.handle_common_punc_b(current, value);
    case '|': 
     this.handle_common_punc_a(current, value);
    case '%=':
     this.handle_common_punc_b(current, value);
    case '%':
     this.handle_common_punc_a(current, value);
    case '...':
     this.handle_common_punc_p(current, value);
    case '++': 
     this.handle_common_punc_c(current, value);
    case '+=': 
     this.handle_common_punc_b(current, value);
    case '+': 
     this.handle_common_punc_a(current, value);
    case '^=': 
     this.handle_common_punc_b(current, value);
    case '^': 
     this.handle_common_punc_a(current, value);
    case '*=': 
     this.handle_common_punc_b(current, value);
    case '*': 
     this.handle_common_punc_a(current, value);
    case '[': 
     this.handle_common_punc_f(current, value);
    case ',': 
     this.handle_common_punc_d(current, value);
    case '{': 
     this.handle_common_punc_e(current, value);
    case '}': 
     this.handle_common_punc_e2(current, value);
    case ']': 
     this.handle_common_punc_f2(current, value);
    case ';': 
     this.handle_common_punc_h(current, value);
    case ':': 
     this.handle_common_punc_i(current, value);
    case '~':
     this.handle_common_punc_j(current, value);
    case '(': 
     this.handle_common_punc_k(current, value);
    case ')':
     this.handle_common_punc_k2(current, value);
  }
 }

 handle_common_punc_a(current, value) { //only move forward on punctuator
  let next;
  if(
   current.left !== null &&
   current.root === null &&
   current.right === null
  ) { 
   current.root = { 
    type_: 'punctuator', 
    value: value 
   }
   next = current;
  } else if(
   current.root !== null &&
   current.left !== null &&
   current.right !== null
  ) { 
   let temp = current.right.root;
   current.right = { 
    root: {
     type_: 'punctuator', 
     value: value
    },
    left: {
     root: temp,
     left: null, 
     right: null 
    }, 
    right: null
   }
   next = current.right;
  }
  this.token_index += 1;
  return this.build_tree(next);
 }

 handle_common_punc_b(current, value) {
  if(
   current.left !== null && 
   current.root === null && 
   current.right === null
  ) { 
   let temp = current.left.root;
   current.root = { 
    type_: 'punctuator', 
    value: '='
   }
   current.right = { 
    root: {
     type_: 'punctuator', 
     value: value.split('=')[0]
    },
    left: { 
     root: temp, 
     left: null, 
     right: null
    }, 
    right: null
   }
  }
  this.token_index += 1;
  this.build_tree(current.right);
 }

//'Pre-crement means increment on the same line. Post-increment means increment after the line executes.'
//wait until expression is over then increment for i++
//figure it out after

 handle_common_punc_c(current, value) { 
  
 }

 handle_common_punc_s() { 

 }

 handle_common_punc_n() { 

 }

 handle_common_p() { 

 }

 handle_common_punc_d() { 

 }

 handle_common_punc_h() { 

 }

 handle_common_punc_i() { 

 }

 handle_common_punc_j() { 

 }

 handle_common_punc_k() { 

 }

 handle_common_punc_e() { 

 }

 handle_common_punc_e2() { 

 }

 handle_common_punc_f() { 

 }

 handle_common_punc_f2() { 

 }

 handle_identifier(value, current) { //check for an invalid left hand assignment in case ahsh() --- just split up identifier in tokenizer to call or identiider 
  if(
   current.left === null && 
   current.root === null && 
   current.right === null
  ) { 
   current.left = { 
   root: { 
    value: value, 
    type_: 'identifier'
   },
    left: null, 
    right: null
   }
  } else if(
   current.left !== null && 
   current.root !== null && 
   current.right === null
  ) { 
   current.right = { 
    root: { 
     value: value, 
     type_: 'identifier'
    },
    left: null, 
    right: null
   }
  }
  this.token_index += 1; 
  this.build_tree(current);
 }

 handle_key_word(value, current) { //will require look aheads
  switch(value) { 
    case 'arguments':
    case 'await':
    case 'break':
    case 'case':
    case 'catch':
    case 'class':
    case 'const':
    case 'continue':
    case 'debugger':
    case 'default':
    case 'delete':
    case 'do':
    case 'else':
    case 'enum':
    case 'eval':
    case 'export':
    case 'extends':
    case 'false':
    case 'finally':
    case 'for':
    case 'function':
    case 'if':
    case 'implements':
    case 'import':
    case 'in':
    case 'instanceof':
    case 'interface':
    case 'let':
    case 'new':
    case 'null':
    case 'package':
    case 'private':
    case 'protected':
    case 'public':
    case 'return': 
    case 'static':
    case 'super':
    case 'switch':
    case 'this':
    case 'throw':
    case 'true':
    case 'try':
    case 'typeof':
    case 'var':
    case 'void':
    case 'while':
    case 'with':
    case 'yield':
    case 'require':
    case '=>': 
  }
 }

 //string numbers and regex should only appear on the left side when shifting.. when adding in normally.. push to the right of current... unless im wrong which i might be. joann will let me know that right joann. yea, you're a bitch.

 handle_regex(value, current) { 
  if(
   current.left !== null && 
   current.root !== null && 
   current.right === null
  ) { 
   current.right = { 
    root: {
     type_: 'regex', 
     value: value
    }, 
    left: null, 
    right: null
   }
  }
  this.token_index += 1; 
  this.build_tree(current);
 }

 handle_string(value, current) { 
  if(
   current.left !== null && 
   current.root !== null && 
   current.right === null
  ) { 
   current.right = { 
    root: {
     type_: 'string', 
     value: value
    }, 
    left: null, 
    right: null
   }
  }
  this.token_index += 1; 
  this.build_tree(current);
 }

 handle_number(value, current) { 
  if(
   current.left !== null && 
   current.root !== null && 
   current.right === null
  ) { 
   current.right = { 
    root: {
     type_: 'number', 
     value: value
    }, 
    left: null, 
    right: null
   }
  }
  this.token_index += 1; 
  this.build_tree(current);
 }

 handle_comment(value, current) { 
 }

 handle_template_literal(value, current) { //will require a look ahead
  
 }

 handle_white_space(value, current) { 

 }

 is_current_an_error() { 

 }

 is_tree_an_error() { 

 }

 is_tree_finished() { //only all three would be null if tree is finished

 }

 make_asm() { 

 }

}