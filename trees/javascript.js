/*
 Javascript tokenizer and AST 
 Author: Alex Eatman
*/

let fs = require('file-system');
let shared = require('../data');

module.exports = class js extends shared {

 constructor() {   
  this.JavascriptTokenizer = /(?<comment>((\/\*)(.|\n){0,}?(\*\/))|((\/\/)(.){0,}))|(?<regex>(\/(.)+([^\\]\/)))|(?<whitespace>(( |\n|\t|\r)+))|(?<number>(0b([10]+)|0o([0-7]+)|0x([a-fA-F0-9]+)|(\.[0-9]{1,}|[0]\.?[0-9]{0,}|[1-9]{1}[0-9]{0,}\.?[0-9]{0,})(e[-+][0-9]+)?))|(?<identifier>([a-zA-Z_$]{1}([a-zA-Z_$0-9]{0,})))|(?<string>("(.){0,}?")|('(.){0,}?')|(`))|((?<punctuator>(&&=|&&|&=|&)|(\/=|\/)|(===|==|=>|=)|(!==|!=|!)|(>>>=|>>=|>>>|>>|>=|>)|(<<=|<<|<=|<)|(-=|--|-)|(\|\|=|\|\||\|\=|\|)|(%=|%)|(\.\.\.|\.)|(\+\+|\+=|\+)|(\^=|\^)|(\*\*=|\*\*|\*=|\*)|(\?\?=|\?)|([,{}\[\];:~\(\)])))/g;  
  this.tokens = [];
  this.bracket_error = { 
   array: { 
    o: 0, 
    c: 0 
   }, 
   paren: { 
    o: 0, 
    c: 0 
   }, 
   bracket: { 
    o: 0, 
    c: 0 
   }
  } 
  this.match = [];
  this.template_string = '';
  this.template_count_pop = [];
  this.template_string_open_close = {
   o: 0, 
   c: 0 
  };
  this.attach_to_regex = '';
  this.igsmuy = {
   i: { 
    v: 'i', 
    found: false 
   }, 
   g: { 
    v: 'g', 
    found: false 
   }, 
   y: { 
    v: 'y', 
    found: false 
   }, 
   u: { 
    v: 'u', 
    found: false 
   }, 
   m: { 
    v: 'm', 
    found: false 
   }, 
   s: {
    v: 's', 
    found: false 
   }
  }
  this.key_words = {
   'arguments'	: true,
   'async': true,
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
   'module' : true,
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
  if(
   this.bracket_error.array.o !== this.bracket_error.array.c || 
   this.bracket_error.bracket.o !== this.bracket_error.bracket.c || 
   this.bracket_error.paren.o !== this.bracket_error.paren.c
  ) { 
   throw new Error('opening brackets do not match closing brackets'); 
  }
  shared.add_to_tokens(this.tokens, shared.get_file_name());
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
    if(key_words[this.match[0]]) { 
     this.tokens.push({ 
      group: `${T}key-word`, 
      value: this.match[0] 
     });
    } else {
     this.tokens.push({ 
      group: `${T}punctuator`, 
      value: this.match[0] 
     });
     this.check_bracket_error();
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

 check_bracket_error() {
  if(this.match[0] === '{') { 
    this.bracket_error.bracket.o += 1;
   } else if(this.match[0] === '}') { 
    this.bracket_error.bracket.c += 1;
    if(this.bracket_error.bracket.c > this.bracket_error.bracket.o) { 
      throw new Error('at no point should there be more closing brackets than opening brackets');
     }
   } else if(this.match[0] === '(') { 
    this.bracket_error.paren.o += 1;
   } else if(this.match[0] === ')') {
    this.bracket_error.paren.c += 1;
    if(this.bracket_error.paren.c > this.bracket_error.paren.o) { 
      throw new Error('at no point should there be more closing brackets than opening brackets');
     }
   } else if(this.match[0] === '[') { 
    this.bracket_error.array.o += 1;
   } else if(this.match[0] === ']') { 
    this.bracket_error.array.c += 1;
    if(this.bracket_error.array.c > this.bracket_error.array.o) { 
      throw new Error('at no point should there be more closing brackets than opening brackets');
     }
   } 
 }

 template_string_() {
   while(true) {
    if(
     shared.get_data().charAt(this.JavascriptTokenizer.lastIndex) === '$' && 
     shared.get_data().charAt(this.JavascriptTokenizer.lastIndex + 1) === '{'
    ) { 
     this.bracket_error.bracket.o += 1;
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
     if(this.template_string_open_close.o !== this.template_string_open_close.c) {
      this.JavascriptTokenizer.lastIndex += 1;
      return this.template_object_();
     } else { 
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
    this.bracket_error.bracket.o += 1;
    this.template_count_pop[this.template_count_pop.length - 1].o += 1;
    this.tokens.push({ 
      group: 'T-punctuator', 
      value: this.match[0] 
    });
   } else if(this.match[0] === '}') { 
    this.bracket_error.bracket.c += 1;
    if(this.bracket_error.bracket.c > this.bracket_error.bracket.o) { 
     throw new Error('at no point should there be more closing brackets than opening brackets');
    }
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

}