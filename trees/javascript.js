let fs = require('file-system');
let shared = require('./data');
const key_words = require('./key-words');

module.exports = class js extends shared { //pos(s|h)ibly return the tree from here to main... and have the filepath be one tree instead... tree built in n

 constructor() {                                                                                                                                                                                                                                                                                                                                                                                                                               
  this.this.JavascriptTokenizer = /(?<comment>((\/\*)(.|\n){0,}?(\*\/))|((\/\/)(.){0,}))|(?<regex>(\/(.)+([^\\]\/)))|(?<whitespace>(( |\n|\t|\r)+))|(?<number>(0b([10]+)|0o([0-7]+)|0x([a-fA-f0-9]+)|(\.[0-9]{1,}|[0]\.?[0-9]{0,}|[1-9]{1}[0-9]{0,}\.?[0-9]{0,})(e[\-+][0-9]+)?))|(?<identifier>(\.?[a-zA-Z_$]{1}([a-zA-Z_$0-9]{0,})))|(?<string>("(.){0,}?")|('(.){0,}?')|(`))|((?<punctuator>(&&|&=|&)|(\/=|\/)|(===|==|=>|=)|(!==|!=|!)|(>>>=|>>=|>>>|>>|>=|>)|(<<=|<<|<=|<)|(-=|--|-)|(\|\||\|\=|\|)|(%=|%)|(\.\.\.)|(\+\+|\+=|\+)|(^=|=)|(\*=|\*)|([,{}[\];\?\:\^\~])))/; 
  this.TemplateTokenizer = /(?<comment>((\/\*)(.|\n){0,}?(\*\/))|((\/\/)(.){0,}))|(?<regex>(\/(.)+([^\\]\/)))|(?<whitespace>(( |\n|\t|\r)+))|(?<number>(0b([10]+)|0o([0-7]+)|0x([a-fA-f0-9]+)|(\.[0-9]{1,}|[0]\.?[0-9]{0,}|[1-9]{1}[0-9]{0,}\.?[0-9]{0,})(e[\-+][0-9]+)?))|(?<identifier>(\.?[a-zA-Z_$]{1}([a-zA-Z_$0-9]{0,})))|(?<string>("(.){0,}?")|('(.){0,}?'))|((?<punctuator>(&&|&=|&)|(\/=|\/)|(===|==|=>|=)|(!==|!=|!)|(>>>=|>>=|>>>|>>|>=|>)|(<<=|<<|<=|<)|(-=|--|-)|(\|\||\|\=|\|)|(%=|%)|(\.\.\.)|(\+\+|\+=|\+)|(^=|=)|(\*=|\*)|([,{}[\];\?\:\^\~])))/; 
  this.this.beginning_index = 0;
  this.this.ending_index = 0;
  this.error = {};
  this.tokens = [];
  this.tree = {};
  this.tree_index = [];
  this.waiting_on_punctuator = [];
  this.tree_scope = {};
  this.this.template_index = 0;
  this.this.match = [];
  this.this.combined = [];
  this.this.template_string = '';
  this.this.template_object = [];
  this.counter_opening_bracket = 0;
  this.counter_closing_bracket = 0;
  this.multi_line_comment = /((\/\*)(.|\n){0,}?(\*\/))/g;
  this.single_line_comment = /((\/\/)(.){0,}))/g;
  this.regex = /\/(.)+([^\\]\/)/g; 
  this.single_quote_string = /('(.){0,}?')|(`))/g;
  this.double_quote_string = /("(.){0,}?")/g;
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
 
 /* 
  adds token to array
 */

 tokens() {
  //just make this match[0] === null
  while(this.JavascriptTokenizer.lastIndex <= shared.get_data_length()) {
   this.match = this.JavascriptTokenizer.exec(shared.get_data());
   if(this.match[0] === '`') { 
    this.template_index = this.JavascriptTokenizer.lastIndex;
    //for defining the correct tokens inside of a template literal
    this.add_token('beginning_template_literal', '`');
    this.template_string_();
    this.add_token('ending_template_literal', '`');
    this.JavascriptTokenizer.lastIndex = this.template_index;
   } else if(this.match[0] !== null) { 
    if(this.match.groups['regex']) { 
      this.add_token('regex', this.match[0]);
    } else if(this.match.groups['comment']) { 
      this.add_token('comment', this.match[0]);
    } else if(this.match.groups['string']) { 
      this.add_token('string', this.match[0]);
    } else if(this.match.groups['number']) { 
      this.add_token('number', this.match[0]);
    } else if(this.match.groups['identifier']) { 
     if(key_words[this.match[0]]) { 
      this.add_token('key-word', this.match[0]);
     } else {
      this.add_token('identifier', this.match[0]);
     }
    } else if(this.match.groups['punctuator']) {
      this.add_token('punctuator', this.match[0]);
    } else if(this.match.groups['whitespace']) { 
      this.add_token('whitespace', this.match[0]);
    }   
   } else { 
    //not sure
    if(this.JavascriptTokenizer.lastIndex === shared.get_data_length) {
     break;
    } else { 
     throw new Error(`Unexpected token: ${this.match[0]}`);
    }
   }
  }
 }

 add_token(group, val) { 
  this.tokens.push({ 
   group: group, 
   value: val, 
  });
 }

 /* 
  seperating the template literal into strings and javascript using counting... 
  could use while loops instead of updating index... 
  could rearrange index updating to make less
  string string javascript string javascript string string
  might be wrong... will fix after building tree
 */

 template_string_() {
  this.multi_line_comment.lastIndex = this.template_index;
  this.single_line_comment.lastIndex = this.template_index; 
  this.regex.lastIndex = this.template_index;
  this.single_quote_string.lastIndex = this.template_index;
  this.double_quote_string.lastIndex = this.template_index; 
   while(true) {
    //dont push the opening of the template literal
    if(
     shared.get_data().charAt(this.template_index) === '$' && 
     shared.get_data().charAt(this.template_index + 1) === '{'
    ) { 
     this.combined.push({template_string: template_string}); 
     this.template_string = '';
     this.counter_opening_bracket += 1;
     this.update_all_index(2);
     this.template_object_();
    } else if(shared.get_data().charAt(this.template_index) === '`') { 
     //push the string in the  to array --- 
     this.combined.push({template_string: template_string}); 
     this.template_string = '';
     if(this.counter_opening_bracket !== this.counter_closing_bracket) {
      this.update_all_index(1);
      this.template_object_();
     } else { 
      this.construct_template_string_as_seperated_non_error();
      this.JavascriptTokenizer.lastIndex = this.template_index + 1;
      this.combined = [];
      this.template_string = '';
      this.template_object = [];
      this.counter_opening_bracket = 0;
      this.counter_closing_bracket = 0;
      break;
     }
    } else { 
     this.template_string += shared.get_data().charAt(this.template_index);
     update_all_index(1);
   }
  }
 }

 template_object_() {
  while(true) { 
   if(shared.get_data().charAt(this.template_index) === '"') { 
    this.match = double_quote_string.exec(shared.get_data());
    this.template_object.push(this.match[0]);
    this.multi_line_comment.lastIndex = double_quote_string.lastIndex
    this.single_line_comment.lastIndex = double_quote_string.lastIndex
    this.regex.lastIndex = double_quote_string.lastIndex
    this.single_quote_string.lastIndex = double_quote_string.lastIndex
    this.template_index = double_quote_string.lastIndex;
   } else if(shared.get_data().charAt(this.template_index) === "'") { 
     this.match = single_quote_string.exec(shared.get_data());
     this.template_object.push(this.match[0]);
     this.multi_line_comment.lastIndex = single_quote_string.lastIndex
     this.single_line_comment.lastIndex = single_quote_string.lastIndex
     this.regex.lastIndex = single_quote_string.lastIndex
     this.single_quote_string.lastIndex = single_quote_string.lastIndex
     this.template_index = single_quote_string.lastIndex;
   } else if(
     shared.get_data().charAt(this.template_index) === '/' && 
     shared.get_data().charAt(this.template_index + 1) === '/'
    ) { 
     this.match = single_line_comment.exec(shared.get_data());
     this.template_object.push(this.match[0]);
     this.multi_line_comment.lastIndex = single_line_comment.lastIndex
     this.single_line_comment.lastIndex = single_line_comment.lastIndex
     this.regex.lastIndex = single_line_comment.lastIndex
     this.single_quote_string.lastIndex = single_line_comment.lastIndex
     this.template_index = single_line_comment.lastIndex;
   } else if(
     shared.get_data().charAt(this.template_index === '/') && 
     shared.get_data().charAt(this.template_index + 1) === '*'
    ) { 
     this.match = multi_line_comment.exec(shared.get_data());
     this.template_object.push(this.match[0]);
     this.multi_line_comment.lastIndex = multi_line_comment.lastIndex
     this.single_line_comment.lastIndex = multi_line_comment.lastIndex
     this.regex.lastIndex = multi_line_comment.lastIndex
     this.single_quote_string.lastIndex = multi_line_comment.lastIndex
     this.template_index = multi_line_comment.lastIndex;
   } else if(
     shared.get_data().charAt(this.template_index) === '/' && 
     shared.get_data().charAt(this.template_index + 1) !== '*' && 
     shared.get_data().charAt(this.template_index + 1) !== '/'
    ) { 
     this.match = regex.exec(shared.get_data());
     this.template_object.push(this.match[0]);
     this.multi_line_comment.lastIndex = regex.lastIndex;
     this.single_line_comment.lastIndex = regex.lastIndex; 
     this.single_quote_string.lastIndex = regex.lastIndex;
     this.double_quote_string.lastIndex = regex.lastIndex; 
     this.template_index = regex.lastIndex;
   } else if(shared.get_data().charAt(this.template_index) === '{') { 
    this.counter_opening_bracket +=1;
    this.template_object.push('{');
    this.update_all_index(1)
    //dont append the closing bracket of the template literal
   } else if(shared.get_data().charAt(this.template_index) === '}') {
    this.counter_closing_bracket += 1;
    if(counter_closing_bracket === counter_opening_bracket) { 
     //push the javascript in the template to array
     this.combined.push({template_object: template_object.join('')})
     this.template_object = [];
     this.update_all_index(1)
     this.template_string_();
    } else { 
     this.template_object.push('}');
     this.update_all_index(1);
    }
    //dont append the template literal string when entering into a string
   } else if(shared.get_data().charAt(this.template_index) === '`') { 
    this.update_all_index(1)
    this.template_string_();
   } else { 
    this.template_object.push(shared.get_data().charAt(this.template_index));
    this.update_all_index(1)
   }
  }
 }

 update_all_index(i) { 
  this.multi_line_comment.lastIndex += i
  this.single_line_comment.lastIndex += i
  this.regex.lastIndex += i;
  this.single_quote_string.lastIndex += i;
  this.template_index += i;
  this.double_quote_string.lastIndex += i;
 }

 /* 
  pushed template string and template javascript as seperate tokens
 */

 construct_template_string_as_seperated_non_error() { 
  for(let i = 0; i < this.combined.length; i++) {
    if(typeof(this.combined.template_string) !== 'undefined') { 
     this.add_token('template_string', this.combined[i]);
    } else {
     let javascript_in_template = this.combined[i];
     this.TemplateTokenizer.lastIndex = 0;
     //make this match 0 = null or less than last index.. not sure
     while(this.TemplateTokenizer.lastIndex <= javascript_in_template.length) {
      this.match = this.TemplateTokenizer.exec(javascript_in_template);
      if(this.match.groups['regex']) { 
        this.add_token('T-regex', this.match[0]);
      } else if(this.match.groups['comment']) { 
        this.add_token('T-comment', this.match[0]);
      } else if(this.match.groups['string']) { 
        this.add_token('T-string', this.match[0]);
      } else if(this.match.groups['number']) { 
        this.add_token('T-number', this.match[0]);
      } else if(this.match.groups['identifier']) { 
       if(key_words[this.match[0]]) { 
        this.add_token('T-key-word', this.match[0]);
       } else {
        this.add_token('T-identifier', this.match[0]);
       }
      } else if(this.match.groups['punctuator']) {
        this.add_token('T-punctuator', this.match[0]);
      } else if(this.match.groups['whitespace']) { 
        this.add_token('T-whitespace', this.match[0]);
      } else { 
        //not sure maybe 
       if(this.TemplateTokenizer.lastIndex === javascript_in_template.length) {
        break;
       } else { 
        throw new Error(`Unexpected token in regular expression javascript: ${this.match[0]}`);
       }
      }    
     }
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

}