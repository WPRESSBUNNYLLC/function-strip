let fs = require('file-system');
let shared = require('../data');

module.exports = class js extends shared {

  //expression right left right left block params expression left right blo

 constructor() {                                                                                                                                                                                                                                                                                                                                                                                                                               
  this.JavascriptTokenizer = /(?<comment>((\/\*)(.|\n){0,}?(\*\/))|((\/\/)(.){0,}))|(?<regex>(\/(.)+([^\\]\/)))|(?<whitespace>(( |\n|\t|\r)+))|(?<number>(0b([10]+)|0o([0-7]+)|0x([a-fA-F0-9]+)|(\.[0-9]{1,}|[0]\.?[0-9]{0,}|[1-9]{1}[0-9]{0,}\.?[0-9]{0,})(e[\-+][0-9]+)?))|(?<identifier>(\.?[a-zA-Z_$]{1}([a-zA-Z_$0-9]{0,})))|(?<string>("(.){0,}?")|('(.){0,}?')|(`))|((?<punctuator>(&&|&=|&)|(\/=|\/)|(===|==|=>|=)|(!==|!=|!)|(>>>=|>>=|>>>|>>|>=|>)|(<<=|<<|<=|<)|(-=|--|-)|(\|\||\|\=|\|)|(%=|%)|(\.\.\.)|(\+\+|\+=|\+)|(^=|=)|(\*=|\*)|([,{}[\];\?\:\^\~])))/g;
  this.tokens = [];
  this.current_block_and_expression_count = 0;
  this.in_parameter_set_opening_paren_count = 0;
  this.in_parameter_set_closing_paren_count = 0;
  this.in_block_opening_block_count = 0;
  this.in_block_closing_block_count = 0;
  this.token_index = 0;
  this.file = {};
  this.point_to_previous_block_multi_dimensional = []; //each index will be an array used to point back to the last block to continue next ex/block --- push set on every new block.... when end of expression, go to previous block
  this.match = [];
  this.template_string = '';
  this.counter_opening_bracket = 0;
  this.counter_closing_bracket = 0;
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
    this.template_string_();
    this.tokens.push({
      group: 'ending-template-literal', 
      value: '`'
    });
   } else if(this.match[0] !== null) { 
     this.which_token('');
   }
  }
  this.build_tree(this.file);
 }

 which_token(T) { 
  if(this.match.groups['regex']) { 
    this.tokens.push({
     group: `${T}regex`, 
     value: this.match[0] 
    });
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
     this.counter_opening_bracket += 1;
     this.JavascriptTokenizer.lastIndex += 2;
     return this.template_object_();
    } else if(shared.get_data().charAt(this.JavascriptTokenizer.lastIndex) === '`') { 
     this.template_string.length > 0 ? 
     this.tokens.push({
       group: 'template-string', 
       value: this.template_string 
      }) : '';
     this.template_string = '';
     if((this.counter_opening_bracket !== this.counter_closing_bracket)) {
      this.JavascriptTokenizer.lastIndex += 1;
      return this.template_object_();
     } else { 
      this.JavascriptTokenizer.lastIndex += 1;
      this.template_string = '';
      this.counter_opening_bracket = 0;
      this.counter_closing_bracket = 0;
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
    this.counter_opening_bracket +=1;
    this.tokens.push({ 
      group: 'T-punctuator', 
      value: this.match[0] 
    });
   } else if(this.match[0] === '}') { 
    this.counter_closing_bracket += 1;
    if(counter_closing_bracket === counter_opening_bracket) { 
     return this.template_string_();
    } else { 
     this.tokens.push({ 
      group: 'T-punctuator', 
      value: this.match[0] 
     });
    }
   } else if(this.match[0] === '`') {
     return this.template_string_();
   } else { 
     which_token('T-');
   }
  }
 }

 build_tree(current_root) { 
  if(this.tokens[this.token_index].group === 'punctuator') { 
   this.handle_punctuator(current_root, this.tokens[this.token_index].value);
  } else if(this.tokens[this.token_index].group === 'identifier') { 
   this.handle_identifier(current_root, this.tokens[this.token_index].value);
  } else if(this.tokens[this.token_index].group === 'key-word') { 
   this.handle_key_word(curret.root, this.tokens[this.token_index].value);
  } else if(this.tokens[this.token_index].group === 'regex') { 
   this.handle_regex(current.root, this.tokens[this.token_index].value);
  } else if(this.tokens[this.token_index].group === 'string') { 
   this.handle_string(current.root, this.tokens[this.token_index].value);
  } else if(this.tokens[this.token_index].group === 'comment') { 
   this.handle_comment(current.root, this.tokens[this.token_index].value);
  } else if(this.tokens[this.token_index].group === 'beginning-template-literal') { 
   this.handle_template_literal(current_root, this.tokens[this.token_index].value);
  } else if(this.tokens[this.token_index].group === 'number') { 
   this.handle_number(current_root, this.tokens[this.token_index].value);
  } else if(this.tokens[this.token_index].group === 'whitespace') { 
   this.handle_white_space(current_root, this.tokens[this.token_index].value);
  }
 }

 handle_punctuator(current_root, value) { 

 }

 handle_identifier(current_root, value) { 

 }

 handle_key_word(current_root, value) { 
  switch(value) { 
    case 'function': 
     current_root[`block-${this.current_block_count}`] = {
      block_name: 'function',
      parameters: {}, 
      body: {}
     }
     this.save_previous_block = this.current_block_count;
     this.current_block_count += 1;
    case 'while': 
     current_root.block = { 
      block_name: 'while', 
      parameters: {}, 
      body: {}
     }
  }
 }

 handle_regex(current_root, value) { 

 }

 handle_string(current_root, value) { 

 }

 handle_comment(current_root, value) { 

 }

 handle_template_literal(current_root, value) { 

 }

 handle_white_space(current_root, value) { 

 }

}