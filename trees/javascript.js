/*
 Javascript tokenizer and AST 
 Author: Alex Eatman
*/

let fs = require('file-system');
let shared = require('../data');

module.exports = class js {

 constructor() {   
  this.JavascriptTokenizer = /(?<comment>((\/\*)(.|\n){0,}?(\*\/))|((\/\/)(.){0,}))|(?<regex>(\/(.)+([^\\]\/)))|(?<whitespace>(( |\n|\t|\r)+))|(?<number>(0b([10]+)|0o([0-7]+)|0x([a-fA-F0-9]+)|(\.[0-9]{1,}|[0]\.?[0-9]{0,}|[1-9]{1}[0-9]{0,}\.?[0-9]{0,})(e[\-+][0-9]+)?))|(?<identifier>([a-zA-Z_$]{1}([a-zA-Z_$0-9]{0,})))|(?<string>("(.){0,}?")|('(.){0,}?')|(`))|((?<punctuator>(&&=|&&|&=|&)|(\/=|\/)|(===|==|=>|=)|(!==|!=|!)|(>>>=|>>=|>>>|>>|>=|>)|(<<=|<<|<=|<)|(-=|--|-)|(\|\|=|\|\||\|\=|\|)|(%=|%)|(\.\.\.|\.)|(\+\+|\+=|\+)|(\^=|\^)|(\*\*=|\*\*|\*=|\*)(\?\?=|\?)|([,{}[\];:~\(\)])))/g;
  this.tokens = [];
  this.current_block_and_expression_count = 0;
  this.tree_index_value = '';
  this.token_index = 0;
  this.last_token = '';
  this.block = 1;
  this.prev_block = [1];
  this.attach_previous = '';
  this.file = {};
  this.current_expression = { 
   root: null, 
   left: null, 
   right: null 
  }
  this.current = this.current_expression;
  this.bracket_count_block_pop = [];
  this.array_bracket_block_pop = [];
  this.paren_block_pop = [];
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

  if(this.token_index > this.tokens.length - 1) { 
   return;
  }

  let group = this.tokens[this.token_index].group;
  let value = this.tokens[this.token_index].value;

  switch(group) { 

   case 'punctuator':
    if(
     value === '&&' || 
     value === '&' ||
     value === '/' ||
     value === '===' || 
     value === '==' ||
     value === '!==' ||
     value === '!=' ||
     value === '>>>' || 
     value === '>>' || 
     value === '>=' || 
     value === '>' || 
     value === '<<' || 
     value === '<' || 
     value === '-' || 
     value === '||' || 
     value === '|' || 
     value === '.' || 
     value === '%' || 
     value === '+' || 
     value === '^' || 
     value === '*' || 
     value === '<='
    ) { 
     let next;
     if(
      current.left !== null &&
      current.root === null &&
      current.right === null
     ) { 
      current.root = { 
       prev_comment_whitespace: this.attach_previous,
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
       prev_comment_whitespace: this.attach_previous,
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
    } else { 
     throw new Error('Invalid tree syntax');
    }
    this.token_index += 1;
    this.attach_previous = '';
    return this.build_tree(next);
   } else if( 
    value === '&=' || 
    value === '/=' || 
    value === '>>>=' || 
    value === '>>=' || 
    value === '<<=' || 
    value === '-=' || 
    value === '|=' || 
    value === '%=' || 
    value === '+=' || 
    value === '*=' || 
    value === '^='
   ) { 
    if(
     current.left !== null && 
     current.root === null && 
     current.right === null
    ) { 
     let temp = current.left.root;
     current.root = { 
      prev_comment_whitespace: this.attach_previous,
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
    } else { 
     throw new Error('Invalid tree syntax');
    }
    this.token_index += 1;
    this.attach_previous = '';
    return this.build_tree(current.right);
   } else if(
    value === '++' || 
    value === '--'
   ) { 
    
   } else if(value === '=') { 

   } else if(value === '!') {

   } else if(value === '...') { 

   } else if(value === '[') { 

   } else if(value === ']') { 

   } else if(value === ',') { 

   } else if(value === '{') { 

   } else if(value === '}') { 

   } else if(value === ';') { 

   } else if(value === ':') { 

   } else if(value === '~') { 

   } else if(value === '(') { 

   } else if(value === ')') { 

   }

   case 'identifier': 
    if(
     current.left === null && 
     current.root === null && 
     current.right === null
    ) { 
     current.left = { 
      root: { 
       prev_comment_whitespace: this.attach_previous,
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
       prev_comment_whitespace: this.attach_previous,
       value: value, 
       type_: 'identifier'
      },
      left: null, 
      right: null
     }
    } else { 
    throw new Error('Invalid tree syntax');
   }
   this.token_index += 1; 
   this.attach_previous = '';
   return this.build_tree(current);

   case 'key-word': 
    if(value === 'arguments') { 

    } else if(value === 'await') { 

    } else if(value === 'break') { 

    } else if(value === 'case') { 

    } else if(value === 'catch') { 

    } else if(value === 'class') { 

    } else if(value === 'const') { 

    } else if(value === 'continue') { 

    } else if(value === 'debugger') { 

    } else if(value === 'default') { 

    } else if(value === 'delete') { 

    } else if(value === 'do') { 

    } else if(value === 'else') { 

    } else if(value === 'enum') { 

    } else if(value === 'eval') { 

    } else if(value === 'export') { 

    } else if(value === 'extends') { 

    } else if(value === 'false') { 

    } else if(value === 'finally') { 

    } else if(value === 'for') { 

    } else if(value === 'function') { 

    } else if(value === 'if') { 

    } else if(value === 'implements') { 

    } else if(value === 'import') { 

    } else if(value === 'in') { 

    } else if(value === 'instanceof') { 

    } else if(value === 'interface') { 

    } else if(value === 'let') { 

    } else if(value === 'module') { 

    } else if(value === 'new') { 

    } else if(value === 'null') { 

    } else if(value === 'package') { 

    } else if(value === 'private') { 

    } else if(value === 'protected') { 

    } else if(value === 'public') { 

    } else if(value === 'return') { 

    } else if(value === 'static') { 

    } else if(value === 'super') { 

    } else if(value === 'switch') { 

    } else if(value === 'this') { 

    } else if(value === 'throw') { 

    } else if(value === 'true') { 

    } else if(value === 'try') { 

    } else if(value === 'typeof') { 

    } else if(value === 'var') { 

    } else if(value === 'void') { 

    } else if(value === 'while') { 

    } else if(value === 'with') { 

    } else if(value === 'yield') { 

    } else if(value === 'require') { 

    } else if(value === '=>') { 

    }

   case 'regex': 
    if(
     current.left !== null && 
     current.root !== null && 
     current.right === null
    ) { 
     current.right = { 
      root: {
       prev_comment_whitespace: this.attach_previous,
       type_: 'regex', 
       value: value
      }, 
      left: null, 
      right: null
     }
    } else { 
     throw new Error('Invalid tree syntax');
    }
    this.token_index += 1; 
    this.attach_previous = '';
    return this.build_tree(current, value);

   case 'string': 
    if(
     current.left !== null &&
     current.root !== null && 
     current.right === null
    ) { 
     current.right = { 
      root: {
       prev_comment_whitespace: this.attach_previous,
       type_: 'string', 
       value: value
      }, 
      left: null, 
      right: null
     }
    } else { 
     throw new Error('Invalid tree syntax');
    }
    this.token_index += 1; 
    this.attach_previous = '';
    return this.build_tree(current);

   case 'comment': 
    this.attach_previous += value;
    this.token_index += 1;
    return this.build_tree(current);

   case 'beginning-template-literal': 
    //set some values for in a template literal and go through (create and append a seperate expression)

   case 'number': 
    if(
     current.left !== null && 
     current.root !== null && 
     current.right === null
    ) { 
     current.right = { 
      root: {
       prev_comment_whitespace: this.attach_previous,
       type_: 'number', 
       value: value
      }, 
      left: null, 
      right: null
     }
    } else { 
     throw new Error('Invalid tree syntax');
    }
    this.token_index += 1; 
    this.attach_previous = '';
    return this.build_tree(current);

   case 'whitespace': 
    this.attach_previous += value;
    this.token_index += 1;
    return this.build_tree(current);  

  }
 }

 is_current_an_error() { 

 }

 is_tree_an_error() { 

 }

 is_tree_finished() {

 }

 make_asm() { 

 }

}