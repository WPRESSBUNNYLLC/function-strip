strips a variety of different functions from a set of files. Should capture entire function body, parameters, and name along with the filepath and line number.

https://stackoverflow.com/questions/42987651/regular-expression-to-match-all-javascript-functions

This solution is somewhat accurate except that it does not take ending brackets in single-line comments, multi-line comments, strings, regular expressions and template literals into consideration. If an ending bracket is found, the function ends when it should not.

There are many edge cases in this problem I think can not be solved with a regular expression and if tried, would lead to many expressions and would be difficult to manage (drop offs, trimming, recursion etc).

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

The solution provided should capture the true function 100% of the time if there are no errors in the document
