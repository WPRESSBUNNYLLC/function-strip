// determines when ending a single line comment

let shared = require('generate/data');

function singleline_comment() { 
 while(true) {
  shared.update_current_token(shared.get_data().charAt(shared.get_data_index()));
  if(shared.get_data().charAt(shared.get_data_index()) === '\n') { 
   shared.update_line_number(1);
   break;
  }
  shared.update_data_index(1);
 }
}

module.exports = singleline_comment;