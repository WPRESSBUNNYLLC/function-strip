strips a variety of functions from a set of files. Takes single-line comments, multi-line comments, strings, regular expressions and template literals into consideration. Captures the true function 100% of the time if there are no errors in the document.

# regular functions

gets assignment name, assignment type, body, parameters, beginning/ending line number, and beginning/ending string index of regular function. Uses bracket counting to note when the function ends.

# arrow functions

gets assignment name, assignment type, body, parameters, beginning / ending line number, and beginning/ending string index of arrow function. Uses bracket counting to note when the function ends if first character of body is a bracket. If first is not a bracket, builds a single statement to return as the body of the function.

# additional

also can be configured to transform functions like in bebel going from arrow to regular etc
