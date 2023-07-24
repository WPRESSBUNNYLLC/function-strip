/*
 ATRAIN BABY 2.0
*/

let fs = require('file-system');
let shared = require('../data');

module.exports = class js extends shared {

 init() {   
  this.JavascriptTokenizer = /(?<comment>((\/\*)(.|\n){0,}?(\*\/))|((\/\/)(.){0,}))|(?<regex>(\/(.)+([^\\]\/)))|(?<whitespace>(( |\n|\t|\r)+))|(?<number>(0b([10]+)|0o([0-7]+)|0x([a-fA-F0-9]+)|(\.[0-9]{1,}|[0]\.?[0-9]{0,}|[1-9]{1}[0-9]{0,}\.?[0-9]{0,})(e[-+][0-9]+)?))|(?<identifier>([a-zA-Z_$]{1}([a-zA-Z_$0-9]{0,})))|(?<string>("(.){0,}?")|('(.){0,}?')|(`))|((?<punctuator>(&&=|&&|&=|&)|(\/=|\/)|(===|==|=>|=)|(!==|!=|!)|(>>>=|>>=|>>>|>>|>=|>)|(<<=|<<|<=|<)|(-=|--|-)|(\|\|=|\|\||\|\=|\|)|(%=|%)|(\.\.\.|\.)|(\+\+|\+=|\+)|(\^=|\^)|(\*\*=|\*\*|\*=|\*)|(\?\?=|\?)|([,{}\[\];:~\(\)])))/g;  
  this.tokens = [];
  this.tokenized_global_object_index = 0;
  this.tokenized_global_object = {};
  this.outter_most_scope_tokens = [];
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
   },
  this.lookup_table = []; 
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

  for(let i = 0; i < this.tokens.length; i++) { 
   if(this.tokens[i].value === '[') { 
    this.enter_encapsulation('array');
   } else if(this.tokens[i].value === '(') { 
    this.enter_encapsulation('paren');
   } else if(this.tokens[i].value === '{') { 
    this.enter_encapsulation('bracket');
   } else if(this.tokens[i].value === ']') { 
    this.exit_back_into_previous_encapsulation('array');
   } else if(this.tokens[i].value === ')') { 
    this.exit_back_into_previous_encapsulation('paren');
   } else if(this.tokens[i].value === '}') { 
    this.exit_back_into_previous_encapsulation('bracket');
   } else { 
    this.tokenized_global_object[this.tokenized_global_object_index].tokens.push(this.tokens[i]);
   }
  }

  for(let i = 0; i < this.outter_most_scope_tokens.length; i++) { 
    //pring entire set of code for each one... then look at errors
  }

  shared.add_to_tokens(this.tokens, shared.get_file_name());
 }

 enter_encapsulation(open_encapsulation_type) { 
  this.tokenized_global_object[this.global_token_object_index].next = this.global_token_object_index + 1; //i have gotten to a new encapsulation, create the reference pointer in this object for the next encapsulation
  if(typeof(this.tokenized_global_object[this.global_token_object_index + 1]) === 'undefined') { 
    this.tokenized_global_object[this.global_token_object_index + 1] = [{ 
     tokens: [],
     scoped_declarations: {},
     expressions: {}, 
     last: this.tokenized_global_object_index, 
     next: null, 
     open_encapsulation_type: open_encapsulation_type
    }];
  } else { 
    this.tokenized_global_object[this.global_token_object_index + 1].push({ 
     tokens: [],
     scoped_declarations: {},
     expressions: {}, 
     last: this.tokenized_global_object_index, 
     next: null, 
     open_encapsulation_type: open_encapsulation_type
    }
   )
  }
  this.tokenized_global_object_index += 1; 
 }

 exit_back_into_previous_encapsulation(closing_encapsulation_type) { 
  if(this.tokenized_global_object[this.tokenized_global_object_index].open_encapsulation_type === closing_encapsulation_type) { 
   this.tokenized_global_object -= 1; 
   if(this.tokenized_global_object === 0) {
    this.outter_most_scope_tokens.push(this.tokenized_global_object);
    this.tokenized_global_object = {};
   } else { 
    //dont do anything... we are moving back -- we are basically capturing blocks, then running error handling on each block
   }
  } else { 
    throw new Error('closing encapsulation type not the same as opening')
  }
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

 //need to save the node in the tree when traversing an array for storage.
 //or instead sectionalize each intrenal structure into using an object with a backwards reference pointer and a forward reference pointer. This would help differentiate global state and inner states, so that declarations are consistent. 
 //the entire code returned should be an object of inner and outer encapsulations including that of arrays, parentheses and brackets. Each section is the scope it can reach inside and the scope it can read outside. 
 //take each indivdidual section and assign a global_state section and make each state have individual expressions
 //you can define each incoming via a group. so the new set of tokens is in a certain inner level via the inner level amount. 
 //now you can toggle between how many levels a group is in from global. and measure execution sequences. 47 levels in where 
 //current_level = the level away from global (index next, index last)
 //current_type = the type of level you are in 
 //iterate over and take calmas as seperated values 
 //as you go, every time you reach a new outside level, you go back to the previous node (representing an opening bracket)
 //you continue tracking each individual character until 
 //for calmas make sure to create a key pair 


 //split every array element on the left side
 //top should be array 
 //left side should be each individual array element value. seperated by calmas. 
 //right side might be an operator, but should be a ;
 //

 //label openings and closings as you go one time. them find the opening and closing and put it inside of another object
 //
 //sectionalize everything from the bottom and top at the same time
 //after you sectionalize everything put things that are supposed to be into each other, instead labeled with their full path
 //once you sectionaized ( { and  [      begin defining values as expressions ...
 //when you sectionalize use the push pop method where a section begins and you push it on
 //every new section an array of expressions inside
 //take the immediate snap shot from both sides... when going in from the left and right... this will prevent me having to do a bunch of crazy shit 
 //number each as you go from left and right
 //make sure you use a priority bracket naming convention to mention what type of bracket this section belongs to and whether or not its a calling one (function)
 //make sure you use priority name array types to check if an array is being read or written to

 //the convention for figuring out bracket assignments is by updating a variable called last_bracket 
   //valid names include [function, if, while, else if, else, =]

   //the idea is it doesnt matter what the model formula is, as long as the ai model algorithm plots its point in the most accurate means possible. That means to look at what the model parameter is doing. Or what the movement is of the model parameter, twards the objective. Maybe its to look at everything the model parameter represents, so that it is used as a viable measurement property that measures the variance/difference/target when the next set of random data comes in, accurately. Regression AI is soley large pattern recognition and next determination primarily using the x & y coordinate plane. Every next point is the accumulation of its past x & y coordinates averaged over each other, every iteration. Computation time is the time it takes for the formula to run until we get to our next y, and when the next data set comes in, we use the formula to get the next point. AI is using all of the the y's history to determine its next point on the xy graph. When we get the point we measure the difference between the actual landing and the models algorithm landing. How can we increase the likliness of landing on the correct point with this algorithm. Can we measure the shapes in the patterns. Context switching in AI models where a different model is needed in a different instance in a game is another difficult thing to create, because we need to act on the response with this set of variables, and we need to act in the response of another set of variables. So as we were running our model here, that was tested and measured to performance, the model was able to make the correct decision 99% of the time. And because the context was satisfied we moved on to a different context. In the next context, the set of categories satisfying the context were used in the next algorithm. Model feature algorithm preperation is a difficult task. The first thing to keep in mind, is that you need the resources to be able to get viable results, which thankfully containerized applications help us with. With containers you can maximize the http port registry and use all of them to host each one of your applications. All the remote host needs is docker engine installed and one simple push to your instance and your application is hosted without any pre-installed configurations. This is one of the reasons why docker is such a useful tool. It Maximizes the amount of applications that can be reached. An often issue with this is that the kernal space on the computer can not accomodate the amount of traffic coming to the application if more than one application starts to become popular. The biggest rule with any ai model now is the algorithm used for the next decision, which there are many and the most powerful, in large language models, are neueral network algorithms which mainly have to deal with path node variance and path saving for fast responses from incoming data. This is the most accurate model anyone can use and is able to be used by many language models one of them linear regression models. Neural networks work quite intuiveitely however, to truly understand the simplicity behind them, you must ask yourself a one question? How do we compare the path of an incoming set of data, and the saved xy path. For that we simply just line them up horizontally, and slide the answer from the models algorithm into the neural networks path. The origninal path is a connection of the set of variables with highest to lowest importance. 
   //how do we become the most literal with ai. Averaging or measuring the likiness within a set of categories formed in a path, whichever path has the highest average success or fastest time to the next set of variables (next major decision measured by the nuearl network narrowing). You need to be able to categorize and assign a percentage to each step, representing the likliness of the next path taking place. So when the data comes in, the category, is saved on the path. So in a large language model, lets look at the sequence for what might represent an infinite or very large amount of questions. 
   
   //there are two steps, the first step is determining an entire categorical path per node insertion. 
 my_way() {

 }

}