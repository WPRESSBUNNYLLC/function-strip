let t = require('./data');

function reassignment() { //has to be done after building the ds and creating blocks
for (const property in t.get_tokens()) { //this would be from ds. the block set.. and each scope would be taken into consideration recursively... assignemts/expressions on the outsides of each block if more than one function
  let assignments = {};
  let append_next = false;
  for(let i = 0; i < property.tokens.length; i++) { 
   if(property.tokens.skip === true) { 
    continue;
   }
   if(append_next === true) { 
    typeof(assignments[property.tokens[i]]) === 'undefined' ? 
    assignments[property.tokens[i]] = { count: 0, info: [property.tokens[i]] } : 
    (assignments[property.tokens[i]].count += 1, 
    assignments[property.tokens[i]].info.push(property.tokens[i]));
    append_next = false; 
    continue;
   }
   if(
    property.tokens[i] === 'let' || 
    property.tokens[i] === 'var' || 
    property.tokens[i] === 'const'
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