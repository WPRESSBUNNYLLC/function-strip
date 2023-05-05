strips a variety of functions from a set of files. Takes single-line comments, multi-line comments, strings, regular expressions and template literals into consideration. Captures the true function 100% of the time if there are no errors in the document. Doesnt use a compiler. Just finds the key word and builds the function body. The name and type or declaration will be a seperate problem.

# regular functions

gets body, parameters, beginning/ending line number, and beginning/ending string index of regular function. Uses bracket counting to note when the function ends.

# arrow functions

gets body, parameters, beginning / ending line number, and beginning/ending string index of arrow function. Uses bracket counting to note when the function ends if first character of body is a bracket. If first is not a bracket, builds a single statement to return as the body of the function.

# additional

can transform functions like in babel going from arrow to regular etc.
