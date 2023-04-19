strips a variety of different functions from a set of files. Should capture entire function body, parameters, and name along with filepath and line number.

https://stackoverflow.com/questions/42987651/regular-expression-to-match-all-javascript-functions

This solution is accurate except that it does not take ending brackets in single-line comments, multi-line comments, strings, regular expressions and template literals into consideration. If an ending bracket is found in any of these in the regular expression, the function ends, when it should not.

The solution provided should match 100% of the time if no errors are found in the document.

var a = function wow(1,2) {
// }
/\* }
var a = 'sdsd }'
var b = "ddsd }"
var a = ` ${awesome}`;
}
