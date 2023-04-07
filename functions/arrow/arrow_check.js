//   if(
//    check_beginning_arrow() && 
//    data.charAt(data_index  ) ===  '=' && 
//    data.charAt(data_index+1) ===  '>' && 
//    check_ending_arrow() &&
//    in_function === false && 
//    function_types.arrow === true
//   ) {
//    in_function = true;
//    function_line_number = line_number;
//    is_arrow = true;
//    build_string = initiate_arrow(data, data_index, arrow_index_parameter_boundries) + " =>";
//    arrow_index_parameter_boundries = []; //only used here
//    data_index = data_index + 2;
//    //possibly call a build arrow in here and pass the data index here
//    return iterate_through_file_text(data_index);
//   }

// function check_beginning_arrow() { 
//   if(data.charAt(data_index-1) === '\n' || data.charAt(data_index-1) === ' ' || data.charAt(data_index-1) === ')') { 
//    return true
//   } else { 
//    return false
//   }
//  }

// function check_ending_arrow() { 
//   if(data.charAt(data_index+2) === '\n' || data.charAt(data_index+2) === ' ' || data.charAt(data_index+2) === '{') { 
//    return true
//   } else { 
//    return false
//   }
//  }