module.exports = class shared {

 constructor() { 
  this.data = '';
  this.data_length = 0;
  this.tokens = {};
  this.token_file_path = '';
 }

 add_to_trees(tree, file_path) { 
  tokens[file_path] = tree;
 }

 get_data() { 
  return data;
 }

 get_file_name() {
  return token_file_path;
 }

 get_data_length() { 
  return data_length;
 }

 connect() { 
  //connect trees from file names
 }

}
