let fs = require('file-system');
let shared = require('../data');

module.exports = class js extends shared {

 constructor() {                                                                                                                                                                                                                                                                                                                                                                                                                               
  this.JavascriptTokenizer = /(?<comment>((\/\*)(.|\n){0,}?(\*\/))|((\/\/)(.){0,}))|(?<regex>(\/(.)+([^\\]\/)))|(?<whitespace>(( |\n|\t|\r)+))|(?<number>(0b([10]+)|0o([0-7]+)|0x([a-fA-f0-9]+)|(\.[0-9]{1,}|[0]\.?[0-9]{0,}|[1-9]{1}[0-9]{0,}\.?[0-9]{0,})(e[\-+][0-9]+)?))|(?<identifier>(\.?[a-zA-Z_$]{1}([a-zA-Z_$0-9]{0,})))|(?<string>("(.){0,}?")|('(.){0,}?')|(`))|((?<punctuator>(&&|&=|&)|(\/=|\/)|(===|==|=>|=)|(!==|!=|!)|(>>>=|>>=|>>>|>>|>=|>)|(<<=|<<|<=|<)|(-=|--|-)|(\|\||\|\=|\|)|(%=|%)|(\.\.\.)|(\+\+|\+=|\+)|(^=|=)|(\*=|\*)|([,{}[\];\?\:\^\~])))/g; 
  this.error = {};
  this.tokens = [];
  this.tree = {};
  this.tree_index = [];
  this.waiting_on_punctuator = [];
  this.tree_scope = {};
  this.this.match = [];
  this.this.template_string = '';
  this.counter_opening_bracket = 0;
  this.counter_closing_bracket = 0;
  this.key_words = {
    'abstract'	: true,
    'arguments'	: true,
    'await'	: true,
    'boolean' : true,
    'break' : true,
    'byte' : true,
    'case' : true,	
    'catch' : true,
    'char' : true,	
    'class' : true,
    'const' : true,
    'continue' : true,
    'debugger' : true,	
    'default' : true,	
    'delete' : true,	
    'do' : true,
    'double' : true,
    'else' : true,	
    'enum' : true,	
    'eval' : true,
    'export' : true,
    'extends' : true,	
    'false' : true,	
    'final' : true,
    'finally' : true,	
    'float' : true,	
    'for' : true,	
    'function' : true,
    'goto' : true,	
    'if' : true,	
    'implements' : true,	
    'import' : true,
    'in' : true,	
    'instanceof' : true,	
    'int' : true,	
    'interface' : true,
    'let' : true,
    'long' : true,	
    'native' : true,	
    'new' : true,
    'null' : true,
    'package' : true,	
    'private' : true,	
    'protected' : true,
    'public' : true,	
    'return' : true,	
    'short' : true,
    'static' : true,
    'super' : true,	
    'switch': true,	
    'synchronized': true,	
    'this': true,
    'throw': true,
    'throws': true,
    'transient': true,
    'true': true,
    'try': true,
    'typeof': true,
    'var': true,
    'void': true,
    'volatile': true,	
    'while': true,
    'with': true,
    'yield': true, 
    '=>': true
   }
 }
 
 tokens() {
  while(this.JavascriptTokenizer.lastIndex === shared.get_data_length()) {
   this.match = this.JavascriptTokenizer.exec(shared.get_data());
   if(this.match[0] === '`') { 
    this.add_token('beginning_template_literal', '`');
    this.template_string_();
    this.add_token('ending_template_literal', '`');
    this.JavascriptTokenizer.lastIndex = this.template_index;
   } else if(this.match[0] !== null) { 
     this.which_token('');
   }
  }
 }

 which_token(T) { 
  if(this.match.groups['regex']) { 
   this.tokens.push({ group: `${T}regex`, value: this.match[0] });
  } else if(this.match.groups['comment']) { 
   this.tokens.push({ group: `${T}comment`, value: this.match[0] });
  } else if(this.match.groups['string']) { 
   this.tokens.push({ group: `${T}string`, value:  this.match[0] });
  } else if(this.match.groups['number']) { 
   this.tokens.push({ group: `${T}number`, value: this.match[0] });
  } else if(this.match.groups['identifier']) { 
   if(key_words[this.match[0]]) { 
    this.tokens.push({group: `${T}key-word`, value: this.match[0] });
   } else {
    this.tokens.push({ group: `${T}identifier`, value: this.match[0] });
   }
  } else if(this.match.groups['punctuator']) {
    if(this.match[0] === '=>') { 
     this.tokens.push({ group: `${T}identifier`, value: this.match[0] });
    } else {
     this.tokens.push({ group: `${T}punctuator`, value: this.match[0] });
    }
  } else if(this.match.groups['whitespace']) { 
    this.tokens.push({ group: `${T}whitespace`, value: this.match[0] });
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
     this.tokens.push({ group: 'template_string', value: this.template_string });
     this.template_string = '';
     this.counter_opening_bracket += 1;
     this.JavascriptTokenizer.lastIndex += 2;
     return this.template_object_();
    } else if(shared.get_data().charAt(this.JavascriptTokenizer.lastIndex) === '`') { 
     this.tokens.push({ group: 'template_string', value: this.template_string });
     this.template_string = '';
     if(this.counter_opening_bracket !== this.counter_closing_bracket) {
      this.JavascriptTokenizer.lastIndex += 1;
      return this.template_object_();
     } else { 
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
  throw new Error('template literal has not ended');
 }

 template_object_() {
  while(true) { 
   this.match = this.JavascriptTokenizer.exec(shared.get_data());
   if(this.match[0] === '{') { 
    this.counter_opening_bracket +=1;
    this.tokens.push({ group: 'T-punctuator', value: this.match[0] });
   } else if(this.match[0] === '}') { 
    this.counter_closing_bracket += 1;
    if(counter_closing_bracket === counter_opening_bracket) { 
     return this.template_string_();
    } else { 
     this.tokens.push({ group: 'T-punctuator', value: this.match[0] });
    }
   } else if(this.match[0] === '`') { 
     return this.template_string_();
   } else { 
     which_token('T-');
   }
  }
 }

 /* 

  builds the tree using tokens
  scope blocks - every new block(key word) inside of another... push that as an inner block. within the block, look for correct leading syntax and proceeding(=>) and expressions
  tree expressions
  (look over correct keywords -- some are not used anymore)

  {
    key-word-function:(block 1) { 
        function name:
        parameters
        body: (body encapsulates expressions and blocks below)
        expression:
        expression:
        expression:
        expression:
        key-word-function:(block 2) { 
            function name:
            parameters
            body: (body encapsulates expressions and blocks below)
            expression
            expression
            expression
            expression
            key-word-while (block 3)
                parameters <-- parameters could also have a block statement
                body <-- body could be a single expression if first value in isnt an opening bracket
        }
    }
  }

  after tree is built, overlap each block and append their references, file name and body as it was built in the document

 */

 build_tree_after_tokenization() { 
  
  
 }

 tree_error() { 

 }

}