//gets identifier

let shared = require('../data');
const identifier_ = /[A-Za-z0-9$_]/;

const id = { 
 A: 1,
 B: 1,
 C: 1,
 D: 1,
 E: 1, 
 F: 1, 
 G: 1, 
 H: 1, 
 I: 1, 
 J: 1,
 K: 1, 
 L: 1, 
 M: 1, 
 N: 1, 
 O: 1,
 P: 1, 
 Q: 1, 
 R: 1, 
 S: 1, 
 T: 1, 
 U: 1, 
 V: 1, 
 W: 1, 
 X: 1, 
 Y: 1, 
 Z: 1,
 a: 1,
 b: 1,
 c: 1,
 d: 1,
 e: 1, 
 f: 1, 
 g: 1, 
 h: 1, 
 i: 1, 
 j: 1,
 k: 1, 
 L: 1, 
 M: 1, 
 N: 1, 
 O: 1,
 P: 1, 
 Q: 1, 
 R: 1, 
 S: 1, 
 T: 1, 
 U: 1, 
 V: 1, 
 W: 1, 
 X: 1, 
 Y: 1, 
 Z: 1,
}

function identifier() { 
 while(true) {
  if(shared.get_data().charAt(shared.get_data_index()).test(identifier_) === false) { 
   shared.decrease_data_index_for_correct_data_index_and_line_number(1);
   break;
  }
  shared.update_current_token(shared.get_data().charAt(shared.get_data_index()));
  shared.update_data_index(1);
 }
}

module.exports = identifier;