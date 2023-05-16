let t = require('./data');

function reassignment() { 
for (const property in t.get_tokens()) {
  let assignments = {};
  let append_next = false;
  for(let i = 0; i < property.tokens.length; i++) { 
   if(property.tokens.skip === true) { 
    continue;
   }
   if(append_next === true) { 
    typeof(assignments[property.tokens[i]]) === 'undefined' ? 
    assignments[property.tokens[i]] = { count: 0, info: [property.tokens[i]] } : 
    (assignments[property.tokens[i]].count += 1, assignments[property.tokens[i]].info.push(property.tokens[i]));
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

module.exports = reassignment;