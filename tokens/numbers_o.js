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
let zero_nine = { 
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
const binary = {
 0: true,
 1: true,
}

function initiate_number() { 
  let next = shared.get_data().charAt(shared.get_data_index() + 1);
  if(shared.get_data().charAt(shared.get_data_index()) === '0') {
   if(next === 'b') { 
    shared.update_current_token('b');
    shared.update_data_index(2);
    run_binary();
   } else if(next === 'x') { 
      shared.update_current_token('x');
      shared.update_data_index(2);
      run_hex();
   } else if(next === 'o') { 
      shared.update_current_token('o');
      shared.update_data_index(2);
      run_octal();
   } else if( typeof reguar_expecting_only[next] !== 'undefined') { 
      if(reguar_expecting_only[next] === '.') { delete reguar_expecting_only['.'];  }
      else if(reguar_expecting_only[next] === 'e') { delete reguar_expecting_only['.']; delete reguar_expecting_only['e']; if(!attach()) { return } }
      else { delete reguar_expecting_only['.'];  }
      shared.update_current_token(next);
      shared.update_data_index(2);
      run_regular();
   } else { 
      return
   }
  } else { 
    if(typeof reguar_expecting_only[next] !== 'undefined') { 
     if(reguar_expecting_only[next] === '.') { delete reguar_expecting_only['.'];  }
     else if(reguar_expecting_only[next] === 'e') { delete reguar_expecting_only['.']; delete reguar_expecting_only['e']; if(!attach()) { return }  };     
     shared.update_current_token(next);
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

let bad_attachment = false;
function run_regular() { 
 while(true) {
  let d_i = shared.get_data().charAt(shared.get_data_index());
  if(typeof reguar_expecting_only[d_i] === 'undefined' || bad_attachment === true) {
   shared.pop_current_token();
   shared.decrease_data_index_for_correct_data_index_and_line_number(1);
   reguar_expecting_only['e'] = true; 
   reguar_expecting_only['.'] = true;
   bad_attachment = false;
   break;
  }
  if(typeof reguar_expecting_only[d_i] !== 'undefined' && reguar_expecting_only[d_i] === '.') { delete reguar_expecting_only['.'];  }
  else if(typeof reguar_expecting_only[d_i] !== 'undefined' && reguar_expecting_only[d_i] === 'e') { typeof reguar_expecting_only['.'] !== 'undefined' ? delete reguar_expecting_only['.'] : '', delete reguar_expecting_only['e']; attach(); continue; };
  shared.update_current_token(d_i);
  shared.update_data_index(1);
 }
}

function attach() {
 let next = shared.get_data().charAt(shared.get_data_index() + 1);
 let next2 = shared.get_data().charAt(shared.get_data_index() + 2);
 if((next === '+' || next === '-') && typeof zero_nine[next2] !== 'undefined') { 
  shared.update_current_token(next);
  shared.update_current_token(next2);
  shared.update_data_index(3);
  return true;
 } else { 
   bad_attachment = true; //land on an e and a bad attachment... stop on next iteration
   return false;
 }
}