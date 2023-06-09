let fs = require('file-system');
let shared = require('../data');

module.exports = class js extends shared {

 constructor() {                                                                                                                                                                                                                                                                                                                                                                                                                               
  this.JavascriptTokenizer = /(?<comment>((\/\*)(.|\n){0,}?(\*\/))|((\/\/)(.){0,}))|(?<regex>(\/(.)+([^\\]\/)))|(?<whitespace>(( |\n|\t|\r)+))|(?<number>(0b([10]+)|0o([0-7]+)|0x([a-fA-F0-9]+)|(\.[0-9]{1,}|[0]\.?[0-9]{0,}|[1-9]{1}[0-9]{0,}\.?[0-9]{0,})(e[\-+][0-9]+)?))|(?<identifier>(\.?[a-zA-Z_$]{1}([a-zA-Z_$0-9]{0,})))|(?<string>("(.){0,}?")|('(.){0,}?')|(`))|((?<punctuator>(&&|&=|&)|(\/=|\/)|(===|==|=>|=)|(!==|!=|!)|(>>>=|>>=|>>>|>>|>=|>)|(<<=|<<|<=|<)|(-=|--|-)|(\|\||\|\=|\|)|(%=|%)|(\.\.\.)|(\+\+|\+=|\+)|(^=|=)|(\*=|\*)|([,{}[\];\?\:\^\~])))/g;
  this.error = {};
  this.tokens = [];
  this.current_block_count = 0; 
  this.current_expression_count = 0;
  this.in_parameter_set = false;
  this.in_block = false;
  this.in_parameter_set_opening_paren_count = 0; //entering and exiting parameters of block... when ///exiting check next for single expression or counting brackets
  this.in_parameter_set_closing_paren_count = 0;
  this.token_index = 0;
  this.saved_identifier_or_number_when_root_null = {};
  this.tree_index = 0;
  this.saved_previous_block_on_boolean_operator = {};
  this.file = {}; //seperate into blocks and expressions
  this.tree_index = [];
  this.waiting_on_punctuator = [];
  this.tree_scope = {};
  this.match = [];
  this.template_string = '';
  this.counter_opening_bracket = 0;
  this.counter_closing_bracket = 0;
  this.current = [];
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

 //function root, parameters left, body right 
 //object left is identifier, right is value, middle is : --- seperate these each into their indvidual scope
 //single expressions are single trees

 //example 

 /*

  function wow() { 

    let a = {
      awesomel 1, 
      cool: 3
    }

    let b = cool;


  }

  let a = 3

  wow === true ? console.log('awesome') : '';

      1-function     2-assign
       function     = assign
                   / \
       /     \    a   3
  parameters  =
             / \
            a  object -- put many left1's right 1's in root... instead of a single left right... number each of them right1 left1, right2, left2 (iterate and use typeof to find out when ending)
                /  \
            awesome 1 -- count brackets to know when function has ended to move next


  wow === true ? console.log('awesome') : '';

  ===
 /  \
wow true
    / \ 
    .  ''
   / \
console log
        /
      'awesome' 

 */



}