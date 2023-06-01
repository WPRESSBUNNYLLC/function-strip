
let shared = require('../data');

let reguar_expecting_only = { 
 0: true,
 1: true,
 2: true,
 3: true,
 4: true,
 5: true,
 6: true,
 7: true, 
 8: true,
 9: true, 
 '.': true, 
 'e': true
}

const octal = {
 0: true,
 1: true,
 2: true,
 3: true,
 4: true,
 5: true,
 6: true,
 7: true
}

const zero_nine = {
 0: true,
 1: true,
 2: true,
 3: true,
 4: true,
 5: true,
 6: true,
 7: true, 
 8: true,
 9: true, 
}

const hex = {
 0: true,
 1: true,
 2: true,
 3: true,
 4: true,
 5: true,
 6: true,
 7: true, 
 8: true,
 9: true, 
 a: true, 
 b: true, 
 c: true, 
 d: true, 
 e: true, 
 f: true, 
 A: true, 
 B: true, 
 C: true, 
 D: true, 
 E: true, 
 F: true
}

const binary = {
  0: true,
  1: true,
}

function initiate_number() { 
  let b = shared.get_data().charAt(shared.get_data_index() + 1);
  if(shared.get_data().charAt(shared.get_data_index()) === '0') {
   if(b === 'b') { 
     shared.update_current_token('b');
     shared.update_data_index(2);
     run_binary();
   } else if(b === 'x') { 
     shared.update_current_token('x');
     shared.update_data_index(2);
     run_hex();
   } else if(b === 'o') { 
     shared.update_current_token('o');
     shared.update_data_index(2);
     run_octal();
   } else if( typeof reguar_expecting_only[b] !== 'undefined') { 
     leading_zero = true;
     if(reguar_expecting_only[b] === '.') { delete reguar_expecting_only['.'];  }
     if(reguar_expecting_only[b] === 'e') { delete reguar_expecting_only['.']; delete reguar_expecting_only['e']; };
     if(reguar_expecting_only[b][zero_nine] === true) { delete reguar_expecting_only['.'];  }
     shared.update_current_token(shared.get_data().charAt(shared.get_data_index() + 1));
     shared.update_data_index(2);
     run_regular();
   } else { 
     return
   }
  } else { 
    if(typeof reguar_expecting_only[b] !== 'undefined') { 
     if(reguar_expecting_only[b] === '.') { delete reguar_expecting_only['.'];  }
     if(reguar_expecting_only[b] === 'e') { delete reguar_expecting_only['.']; delete reguar_expecting_only['e']; };     
     shared.update_current_token(shared.get_data().charAt(shared.get_data_index() + 1));
     shared.update_data_index(2);
     run_regular();
    }
  }
}

function run_binary() {
 while(true) { 
  if(typeof binary[shared.get_data().charAt(shared.get_data_index())] === 'undefined') { 
   shared.pop_current_token();
   shared.decrease_data_index_for_correct_data_index_and_line_number(1);
   break;
  }
  shared.update_current_token(shared.get_data().charAt(shared.get_data_index()));
  shared.update_data_index(1);
 }
}

function run_octal() { 
 while(true) { 
  if(typeof octal[shared.get_data().charAt(shared.get_data_index())] === 'undefined') { 
   shared.pop_current_token();
   shared.decrease_data_index_for_correct_data_index_and_line_number(1);
   break;
  }
  shared.update_current_token(shared.get_data().charAt(shared.get_data_index()));
  shared.update_data_index(1);
 }
}

function run_hex() { 
 while(true) { 
  if(typeof hex[shared.get_data().charAt(shared.get_data_index())] === 'undefined') { 
   shared.pop_current_token();
   shared.decrease_data_index_for_correct_data_index_and_line_number(1);
   break;
  }
  shared.update_current_token(shared.get_data().charAt(shared.get_data_index()));
  shared.update_data_index(1);
 }
}

function run_regular() { 
 while(true) {
  let d_i = shared.get_data().charAt(shared.get_data_index());
  if(typeof reguar_expecting_only[d_i] === 'undefined') {
   shared.pop_current_token();
   shared.decrease_data_index_for_correct_data_index_and_line_number(1);
   reguar_expecting_only['e'] = true; 
   reguar_expecting_only['.'] = true;
   break;
  }
  if(reguar_expecting_only[d_i] === '.') { delete reguar_expecting_only['.'];  }
  if(reguar_expecting_only[d_i] === 'e') { delete reguar_expecting_only['.']; delete reguar_expecting_only['e']; };
  shared.update_current_token(d_i);
  shared.update_data_index(1);
 }
}

//03 delete periof 
//0e delete e and period
//0. delete period
//12323e delete e and periof 
//232. delete period