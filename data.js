module.exports = class shared {

 constructor() { 
  this.data = '';
  this.tokens = {};
  this.token_file_path = '';
 }

 add_to_tokens(tokens, file_path) { 
  tokens[file_path] = tokens;
 }

 get_data() { 
  return data;
 }

 set_data(d) { 
  this.data = d
 }

 set_file_path(file_path) { 
  this.token_file_path = file_path;
 }

 get_file_path() {
  return token_file_path;
 }

 get_data_length() { 
  return this.data.length;
 }

 list() { 
  for (const [key, value] of Object.entries(this.tokens)) {
   console.log(`${key}: ${value}`);
  }
 }

}
