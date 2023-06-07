let fs = require('file-system');
let shared = require('./data');
const key_words = require('./key-words');

module.exports = class js extends shared { //possibly return the tree from here to main... and have the filepath be one tree instead... tree built in n

 constructor() {                                                                                                                                                                                                                                                                                                                                                                                                                               
  this.this.JavascriptTokenizer = /(?<comment>((\/\*)(.|\n){0,}?(\*\/))|((\/\/)(.){0,}))|(?<regex>(\/(.)+([^\\]\/)))|(?<whitespace>(( |\n|\t|\r)+))|(?<number>(0b([10]+)|0o([0-7]+)|0x([a-fA-f0-9]+)|(\.[0-9]{1,}|[0]\.?[0-9]{0,}|[1-9]{1}[0-9]{0,}\.?[0-9]{0,})(e[\-+][0-9]+)?))|(?<identifier>(\.?[a-zA-Z_$]{1}([a-zA-Z_$0-9]{0,})))|(?<string>("(.){0,}?")|('(.){0,}?')|(`))|((?<punctuator>(&&|&=|&)|(\/=|\/)|(===|==|=>|=)|(!==|!=|!)|(>>>=|>>=|>>>|>>|>=|>)|(<<=|<<|<=|<)|(-=|--|-)|(\|\||\|\=|\|)|(%=|%)|(\.\.\.)|(\+\+|\+=|\+)|(^=|=)|(\*=|\*)|([,{}[\];\?\:\^\~])))/; 
  this.TemplateTokenizer = /(?<comment>((\/\*)(.|\n){0,}?(\*\/))|((\/\/)(.){0,}))|(?<regex>(\/(.)+([^\\]\/)))|(?<whitespace>(( |\n|\t|\r)+))|(?<number>(0b([10]+)|0o([0-7]+)|0x([a-fA-f0-9]+)|(\.[0-9]{1,}|[0]\.?[0-9]{0,}|[1-9]{1}[0-9]{0,}\.?[0-9]{0,})(e[\-+][0-9]+)?))|(?<identifier>(\.?[a-zA-Z_$]{1}([a-zA-Z_$0-9]{0,})))|(?<string>("(.){0,}?")|('(.){0,}?'))|((?<punctuator>(&&|&=|&)|(\/=|\/)|(===|==|=>|=)|(!==|!=|!)|(>>>=|>>=|>>>|>>|>=|>)|(<<=|<<|<=|<)|(-=|--|-)|(\|\||\|\=|\|)|(%=|%)|(\.\.\.)|(\+\+|\+=|\+)|(^=|=)|(\*=|\*)|([,{}[\];\?\:\^\~])))/; 
  this.this.beginning_index = 0;
  this.this.ending_index = 0;
  this.error = {};
  this.tokens = []; //make sure to encapsulate string types in this
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
 }
 
 /* 
  adds token to array
 */

 tokens() {
  while(this.JavascriptTokenizer.lastIndex <= shared.get_data_length()) { //just make this match[0] === null
   this.match = this.JavascriptTokenizer.exec(shared.get_data());
   if(this.match[0] === '`') { 
    this.template_index = this.JavascriptTokenizer.lastIndex;
    this.add_token('beginning_template_literal', '`'); //for defining the correct tokens inside of a template literal
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
  seperating the template literal into strings and javascript using counting... could use while loops instead of updating index... could rearrange index updating to make less
 */

 template_string_() {
  this.multi_line_comment.lastIndex = this.template_index;
  this.single_line_comment.lastIndex = this.template_index; 
  this.regex.lastIndex = this.template_index;
  this.single_quote_string.lastIndex = this.template_index;
  this.double_quote_string.lastIndex = this.template_index; 
   while(true) {
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
     this.regex.lastIndex = regex.lastIndex;
     this.single_quote_string.lastIndex = regex.lastIndex;
     this.double_quote_string.lastIndex = regex.lastIndex; 

   } else if(shared.get_data().charAt(this.template_index) === '{') { 
    this.counter_opening_bracket +=1;

   } else if(shared.get_data().charAt(this.template_index) === '}') {
    this.counter_closing_bracket += 1;
    if(counter_closing_bracket === counter_opening_bracket) { 
     this.combined.push({template_object: template_object.join('')})
     this.template_object = [];
     this.update_all_index(1)
     this.template_string_();
    }

   } else if(shared.get_data().charAt(this.template_index) === '`') { 
    this.template_string_();
    this.update_all_index(1)

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
     while(this) { //make this match 0 = null or less than last index not sure
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

      }    
     }
    }
   }
  }

 /* 
  builds the tree using tokens
 */

 build_tree_after_tokenization() { 
  
 }

}