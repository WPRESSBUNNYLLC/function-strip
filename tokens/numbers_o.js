let shared = require('../data');
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
   } else { 
    if(next === 'e') { 
     if(!attach()) return;
    }
    run_regular();
   }
  } else { 
    if(next === 'e') { 
     if(!attach()) return;
    }
    run_regular();
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
   if(isNaN(shared.get_current_token())) {
    shared.pop_current_token();
    shared.decrease_data_index_for_correct_data_index_and_line_number(1);
    break;
   }
   shared.update_current_token(shared.get_data().charAt(shared.get_data_index()));
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
  return false;
 }
}