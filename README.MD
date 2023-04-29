strips a variety of different functions from a set of files. Should capture entire function body, parameters, and name along with the filepath and beginning/ending line number.

https://stackoverflow.com/questions/42987651/regular-expression-to-match-all-javascript-functions

This solution is somewhat accurate except that it does not take ending brackets in single-line comments, multi-line comments, strings, regular expressions and template literals into consideration. If an ending bracket is found, the function ends when it should not.

There are many edge cases in this problem I think would be difficult to solve with many regular expressions.
Example of a function that would lead to inaccurate results.

```js
var a = function wow(1,2 // )) {
2, 3) {
// }
/* } */
var a = 'sdsd }'
var b = "ddsd }"
var a = ` ${awesome + '}}}'}`;
}
```

The solution provided should capture the true function 100% of the time if there are no errors in the document.

# javascript

# regular functions

gets name, body parameters and beginning and ending line number of regular function. Uses bracket counting to note when the function ends.

# arrow functions

gets name, body parameters and beginning and ending line number of arrow function. Uses bracket counting to note when the function ends if first character is a bracket. If first is not a bracket, builds a single statement to return as the body of the function.
