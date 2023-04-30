/*

 let a = 1; 
 let b = 2; 
 let c = 3;
 let d = 0;

 var cc = () =>

 d = a  
  + b + 
 c;

 console.log(d);
 cc();
 console.log(d);

 using finish_first_statement as something completely seperate...

 also have to take this into consideration if opening is ( 
 var c = () => (a) + (b);

 var bb = () => d = 

 (a) + (b)
 
 - (c);

 console.log(d);
 bb();
 console.log(d);

 single statements vs block statements. 
 if first statement is not a block statement, dont recurse 
 if first statement is a block statement recurse the blocks inside and for each block, build a single statement


*/

var first_statement_descriptor = [];
var build_string_ = '';
var line_number_ = 0;
var data_index_ = 0;

function return_first_statement(data_index, line_number, build_string) { //really dont know.. in_function_build_strings last character should be the begining of the tree or whatever the f. first statement in, next statement in, end... just play around
 build_string = build_string;
 line_number = line_number;
 data_index = data_index;
 recurse(data_index_);
}

function recurse(data_index_) { 
 
}

