let fs = require('file-system');
let shared = require('./data');
let javascript = require('./trees/javascript')
let folders = [];
let allowed_file_types = {
 ts: 1, js: 1, html: 1
};

 /*
  flders = array -> folders and files to get tokens from { folder: "./", files: 'all' },
  f_t_g = string = string to generate all objects './example/tokenized/tokenized_files.js'; filepath: [tokens], filepath: [tokens]
 */

 function generate(fldrs, f_t_g) {
 
  let error_initial = '';
 
  if(typeof(f_t_g) !== 'string') { 
   error_initial += 'f_t_g: file to generate must be a string \n';
  }
 
  if(typeof(fldrs) !== 'object' || Array.isArray(fldrs) == false) { 
   error_initial += 'folders: an array was not passed \n';
  }
 
  if(error_initial.trim().length > 0) { 
   throw new Error(error_initial);
  }
 
  file_to_generate = f_t_g;
  folders = fldrs;
 
  for(let i = 0; i < folders.length; i++) {
 
   let errors = '';
 
   if(typeof(folders[i].folder) !== 'string') { 
    errors += 'folder: folder must be a string \n';
   }
 
   if(
    typeof(folders[i].files) !== 'string' && 
    (typeof(folders[i].files) !== 'object' || 
    Array.isArray(folders[i].files == false))
   ) { 
    errors += 'files: files must be a string or array \n';
   }
 
   if(typeof(folders[i].files) == 'string' && folders[i].files !== 'all') {  
    errors += 'files: if files is a string, the keyword must be (all) for all files and folders \n';
   }
 
   if(errors.trim().length > 0) { 
    errors += `index: ${i}`;
    throw new Error(errors);
   }
 
   fs.recurseSync(
    folders[i].folder, 
    folders[i].files == 'all' ? null : folders[i].files, 
    (filepath, relative, filename) => {
    if(filename) { 
     file_type = filename.split('.');
     file_type = file_type[file_type.length - 1].toLowerCase(); 
     if(allowed_file_types[file_type]) { 
      try {
       shared.set_data(fs.readFileSync(filepath, 'utf8'), filepath);
       shared.set_file_path(filepath);
       if(file_type === 'ts') {
        // typescript.init(); 
        // typescript.tokens();
       } else if(file_type === 'js') { 
        javascript.init();
        javascript.tokens();
       } else if(file_type === 'html') {
        // html.init();
        // html.tokens();
       } else { 
        console.log('file not added')
       }
      } catch(err) { 
       console.log(err.message + '\n' + 'filepath: ' + filepath); 
      }
     }
    }
   })

   return shared.get_tokens();

  }
 }

module.exports = generate;