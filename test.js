const generate = require("../lib/generate");

const folders = [
  { folder: "./stripThisTest", files: 'all' },
];

const file_to_generate = './example/generated/generated_functions.js';

const function_types = { 
 regular: true, 
 arrow: true, 
}

try {
  console.log(generate(folders, file_to_generate, function_types));
} catch (err) {
  console.log(err.message);
}