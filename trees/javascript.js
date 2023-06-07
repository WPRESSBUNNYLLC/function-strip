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

 tokens() { 
  while(this.JavascriptTokenizer.lastIndex <= shared.get_data_length()) { 
   this.match = this.JavascriptTokenizer.exec(shared.get_data());
   if(this.match[0] === '`') { 
    this.template_index = this.JavascriptTokenizer.lastIndex;
    this.template_string_();
    this,JavascriptTokenizer.lastIndex = this.template_index;
   } else if(this.match[0] !== null) { 
    //build tree
   } else { 
    throw new Error(`Unexpected: ${this.match[0]}`);
   }
  }
 }

 template_string_() {
  this.update_index();
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
   update_index_from_double();

  } else if(shared.get_data().charAt(this.template_index) === "'") { 
    this.match = single_quote_string.exec(shared.get_data());
    this.template_object.push(this.match[0]);
    this.update_index_from_single();

  } else if(
     shared.get_data().charAt(this.template_index) === '/' && 
     shared.get_data().charAt(this.template_index + 1) === '/'
    ) { 
    this.match = single_line_comment.exec(shared.get_data());
    this.template_object.push(this.match[0]);
    this.update_index_from_single_line();

  } else if(
     shared.get_data().charAt(this.template_index === '/') && 
     shared.get_data().charAt(this.template_index + 1) === '*'
    ) { 
    this.match = multi_line_comment.exec(shared.get_data());
    this.template_object.push(this.match[0]);
    this.update_index_from_multi_line();

  } else if(
     shared.get_data().charAt(this.template_index) === '/' && 
     shared.get_data().charAt(this.template_index + 1) !== '*' && 
     shared.get_data().charAt(this.template_index + 1) !== '/'
    ) { 
    this.match = regex.exec(shared.get_data());
    this.template_object.push(this.match[0]);
    this.update_index_from_regex_();

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

update_index() { 
 this.multi_line_comment.lastIndex = this.template_index;
 this.single_line_comment.lastIndex = this.template_index; 
 this.regex.lastIndex = this.template_index;
 this.single_quote_string.lastIndex = this.template_index;
 this.double_quote_string.lastIndex = this.template_index; 
}

update_index_from_double() { 
 this.multi_line_comment.lastIndex = double_quote_string.lastIndex
 this.single_line_comment.lastIndex = double_quote_string.lastIndex
 this.regex.lastIndex = double_quote_string.lastIndex
 this.single_quote_string.lastIndex = double_quote_string.lastIndex
 this.template_index = double_quote_string.lastIndex;
}

update_index_from_single() { 
 this.multi_line_comment.lastIndex = single_quote_string.lastIndex
 this.single_line_comment.lastIndex = single_quote_string.lastIndex
 this.regex.lastIndex = single_quote_string.lastIndex
 this.single_quote_string.lastIndex = single_quote_string.lastIndex
 this.template_index = single_quote_string.lastIndex;
}

update_index_from_single_line() { 
 this.multi_line_comment.lastIndex = single_line_comment.lastIndex
 this.single_line_comment.lastIndex = single_line_comment.lastIndex
 this.regex.lastIndex = single_line_comment.lastIndex
 this.single_quote_string.lastIndex = single_line_comment.lastIndex
 this.template_index = single_line_comment.lastIndex;
}

update_index_from_multi_line() { 
 this.multi_line_comment.lastIndex = multi_line_comment.lastIndex
 this.single_line_comment.lastIndex = multi_line_comment.lastIndex
 this.regex.lastIndex = multi_line_comment.lastIndex
 this.single_quote_string.lastIndex = multi_line_comment.lastIndex
 this.template_index = multi_line_comment.lastIndex;
}

update_index_from_regex_() { 
 this.multi_line_comment.lastIndex = regex.lastIndex;
 this.single_line_comment.lastIndex = regex.lastIndex; 
 this.regex.lastIndex = regex.lastIndex;
 this.single_quote_string.lastIndex = regex.lastIndex;
 this.double_quote_string.lastIndex = regex.lastIndex; 
}

update_all_index(i) { 
 this.multi_line_comment.lastIndex += i
 this.single_line_comment.lastIndex += i
 this.regex.lastIndex += i;
 this.single_quote_string.lastIndex += i;
 this.template_index += i;
 this.double_quote_string.lastIndex += i;
}

template_string_as_seperated_non_error() { 
  for(let i = 0; i < this.combined.length; i++) {
    if(typeof(this.combined.this.template_string)) { 
     //build tree
    } else {
     while(true) { 
      //build tree
     }
    }
  }
}

build_tree() { 
  //{} -- build based off previous and current
}

}