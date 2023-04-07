
//import check 
//import beginning
//return build string if check passes

  var build_string = '';
  var has_name = false; 
  var is_async = false;

  function initiate_regular() { 

  }

  /*
   if in a function and a bracket..when in the above things, i avoid counting bad brackets --- maybe make all these bottom parts into their own seperate files... ..which would be backtracking beginning first then building the function secoond
  */
 
  if(
   data.charAt(data_index) === '{' && 
   in_function === true
  ) {
   opening_bracket = opening_bracket + 1; 
   has_bracket = true; //has bracket needs to be noted above too or not
   build_string += data.charAt(data_index);
   data_index = data_index + 1;
   return iterate_through_file_text(data_index);
  } 
 
  /*
   if not in a comment or string, keeping count of ending bracket to know when to end the function
  */
  
  if(
   data.charAt(data_index) === '}' && 
   in_function === true
  ) {
   closing_bracket = closing_bracket + 1;
   build_string += data.charAt(data_index);
   data_index = data_index + 1;
   return iterate_through_file_text(data_index);
  }
 
  /* 
   end creating the function.. this condition should hit one time then going out of the function.
  */
 
  if(
   ((is_arrow === true && has_bracket === false && data.charAt(data_index) === '\n') || //is arrow and has bracket needs to be checked above
   (opening_bracket === closing_bracket && opening_bracket > 0)) && 
   in_function === true
  ) { 
   push_function();
   function_index = function_index + 1;
   build_string = '';
   has_bracket = false;
   in_function = false;
   opening_bracket = 0; 
   closing_bracket = 0;
   data_index = data_index + 1;
   return iterate_through_file_text(data_index);
  }
 
  /* 
   pushing every character when in the function... the build string is also in the other files copied over.... if not in the function, just moving next
  */
  
  if(in_function === true) { 
   build_string += data.charAt(data_index);
   data_index = data_index + 1;
   return iterate_through_file_text(data_index);
  } else { 
   data_index = data_index + 1;
   return iterate_through_file_text(data_index);
  }