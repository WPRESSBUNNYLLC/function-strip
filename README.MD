strips a variety of different functions from a set of files. Should capture entire function body, parameters, and name along with the filepath and line number.

https://stackoverflow.com/questions/42987651/regular-expression-to-match-all-javascript-functions

This solution is accurate except that it does not take ending brackets in single-line comments, multi-line comments, strings, regular expressions and template literals into consideration. If an ending bracket is found, the function ends when it should not.

Also, the parameters of the function does not take these into consideration.

Template literal functions are not noted.

And many more errors when using a regular expression for this problem. The amount of edge cases I think can not be solved with a regular expression and if tried, would lead to inaccurate results.

Example of a function that would lead to inaccurate results.

```js
var a = function wow(1,2 // )) {
2, 3)
// }
/* } */
var a = 'sdsd }'
var b = "ddsd }"
var a = ` ${awesome + '}}}'}`;
}
```

The solution provided should match 100% of the time if no errors are found in the document.
