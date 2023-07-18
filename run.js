const generate = require("./index");

function tokenize(folders) {
 const folders = [
  { folder: "./", files: 'all' },
 ];

 const file_to_generate = './example/tokenized/tokenized_files.js';

 try {
  console.log(generate(folders, file_to_generate));
 } catch (err) {
  console.log(err.message);
 }

 return;

}

module.exports = tokenize;