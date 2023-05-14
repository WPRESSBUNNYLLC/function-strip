
let data = '';
let line_number = 0; 
let data_index = 0; 
let tokens = [];

function update_data(data_) { 
 data = data_;
}

function update_line_number(line_number_) { 
 line_number += line_number_;
}

function update_data_index(data_index_) { 
 data_index += data_index_;
}

function update_tokens(token_, type_) { 
 tokens.push({ token: token_, type: type_ }); // value, (punctuator, number, identifier, key_word) ... will think of other things
}

function get_data_index() { 
 return data_index;
}

function get_line_number() { 
 return line_number;
}

function get_tokens() { 
 return tokens;
}

function get_data() { 
 return data;
}

module.exports = {
 get_data: get_data, 
 get_data_index: get_data_index, 
 get_line_number: get_line_number, 
 get_tokens: get_tokens, 
 update_data: update_data, 
 update_data_index: update_data_index, 
 update_line_number: update_line_number,
 update_tokens: update_tokens
}

//random tree practice -- remove might be wrong... not sure didnt run

let wow = { 
    root: 5, 
    left: { 
      root: 3, 
      left: { 
        root: 2,
        left: null, 
        right: null
      }, 
      right: null
    },
    right: { 
      root: 8, 
      left: { 
        root: 7, 
        left: { 
          root: 6, 
          left: null,
          right: null
        }, 
        right: null
      }, 
      right: { 
        root: 11, 
        left: null, 
        right: null
      }
    }
  }
  
  let value_inserted_at = [];
  
  function insert(v, current) { 
    
    if(current.root === null) { 
      current.root = v;
      current.right = null; 
      current.left = null;
      return;
    }
    
    if(current.root === v) { 
      console.log('value already inserted');
      return;
    }
    
    if(v < current.root) { 
     if(current.left !== null) {
      value_inserted_at.push('left');
      insert(v, current.left);
     } else { 
       value_inserted_at.push('left');
       current.left = {};
       current.left.root = v; 
       current.left.left = null; 
       current.left.right = null;
       return;
     }
    }
    
    if(v > current.root) { 
      if(current.right !== null) {
       value_inserted_at.push('right');
       insert(v, current.right);
      } else { 
        value_inserted_at.push('right');
        current.right = {};
        current.right.root = v; 
        current.right.left = null; 
        current.right.right = null;
        return;
      }
    }
    
  }
  
  insert(9, wow);
  console.log(value_inserted_at);
  value_inserted_at = [];
  
  insert(12, wow);
  console.log(value_inserted_at);
  value_inserted_at = [];
  
  insert(3, wow);
  console.log(value_inserted_at);
  value_inserted_at = [];
  
  insert(15, wow);
  console.log(value_inserted_at);
  value_inserted_at = [];
  
  insert(0, wow);
  console.log(value_inserted_at);
  value_inserted_at = [];
  
  let value_deleted_at = [];
  
  function remove(v, current) { 
  
   if(current.root === null) { 
    console.log('binary tree is empty');
    return;
   }
  
   if(current.root === v) { 
    let vv = get_right_most(wow, v);
    if(typeof(vv) === 'string') { 
     return; //right most value replaced or deleted...
    }
    current.root = vv; //value deleted, replaced with right most value
    return;
   }
  
   if(v > current.root) { 
    remove(v, current.right);
   }
  
   if(v < current.root) { 
    remove(v, current.left);
   }
  
  } 
  
  function get_right_most(current, v) { 
   if(current.right === null) { 
    let temp = current.root;
    current = current.left !== null ? current.left : undefined; 
    if(temp === v) { 
     return 'no update';
    }
    return temp;
   }
   get_right_most(current.right, v);
  }
  
  remove(15, wow);
  
  function print_all(current) { 
  
   if(current.root === null) { 
    console.log('binary tree is empty');
    return;
   }
  
   console.log(current.root);
   
   if(current.left !== null) {
    print_all(current.left); 
   }
  
   if(current.right !== null) {
    print_all(current.right);
   }
  
  }
  
  print_all(wow);
  
  function find_one(current, v) {
  
   if(current.root === null) { 
    console.log('binary tree is empty');
    return;
   }
  
   if(current.root === v) { 
    console.log('found value'); 
    return;
   }
  
   if(current.left !== null) { 
    find_one(current.left, v);
   }
  
   if(current.right !== null) { 
    find_one(current.right, v);
   }
  
  }
  
  find_one(wow, v);

  function bfs() { 

  }

  bfs
  
  //bfs
  //reverse
  //if balanced
  ///...