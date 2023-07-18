module.exports = class shared {

 constructor() { 
  this.data = '';
  this.data_length = 0;
  this.tokens = {};
  this.token_file_path = '';
 }

 add_to_trees(tokens, file_path) { 
  tokens[file_path] = tokens;
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

 list() { 
  for (const [key, value] of Object.entries(this.tokens)) {
   console.log(`${key}: ${value}`);
  }
 }

}
