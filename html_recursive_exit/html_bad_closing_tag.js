
/*
 determines the exit of a bad closing tag in an html document... whether opening or closing... this is for strings which contain the function keyword.... might not need this tag... comes from html function
*/

var data_ = '';
var data_index_ = 0;
var in_function_ = false;
var line_number_ = 0;

function html_bad_closing_tag(data, data_index, in_function, line_number) { 
 data_ = data;
 data_index_ = data_index;
 in_function_ = in_function;
 line_number_ = line_number;
 recurse(data_index_);
}

function recurse(data_index_) { 

}

module.exports = html_bad_closing_tag;

      //check all other tags using a set of recursive calls for each tag.. this is so script isnt found in a specific string within a tag... if a script was in another tag not in a string, there would be an error
   // <p wow = "<script> </script>"></p> ...just make sure to denote when in an opening and closing tag