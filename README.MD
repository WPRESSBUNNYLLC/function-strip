strips a variety of different functions from a set of files. takes single-line comments, multi-line comments, strings, regular expressions and template literals into consideration.

Example of a function it can take

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

# regular functions

gets assignment name / regular name, assignment type, body, parameters, beginning / ending line number, and beginning / ending string index of regular function. Uses bracket counting to note when the function ends.

# arrow functions

gets assignment name, assignment type, body, parameters, beginning / ending line number, and beginning / ending string index of arrow function. Uses bracket counting to note when the function ends if first character of body is a bracket. If first is not a bracket, builds a single statement to return as the body of the function.
