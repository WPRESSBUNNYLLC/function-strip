let t = require('./data');

function reassignment() { //has to be done after building the ds and creating blocks...
for (const property in t.get_tokens()) { //this would be from ds. the block set.. and each scope would be taken into consideration recursively... assignemts/expressions on the outsides of each block if more than one  function... an increment of te index per block
  let assignments = {};
  let append_next = false;
  for(let i = 0; i < property.tokens.length; i++) { 
   if(property.tokens[i].skip === true) { 
    continue;
   }
   if(append_next === true) { 
    typeof(assignments[property.tokens[i].token]) === 'undefined' ? 
    assignments[property.tokens[i].token] = { count: 0, info: [property.tokens[i]] } : 
    (assignments[property.tokens[i].token].count += 1, 
    assignments[property.tokens[i].token].info.push(property.tokens[i]));
    append_next = false; 
    continue;
   }
   if(
    property.tokens[i].token === 'let' || 
    property.tokens[i].token === 'var' || 
    property.tokens[i].token === 'const'
   ) { 
    append_next = true;
   }
  }
  t.update_token_assignment_errors(property, assignments);
 }
}

// let value = 0;

// function a() { 
//     let value = 4; 
//     let value = 3;
// }

module.exports = reassignment;