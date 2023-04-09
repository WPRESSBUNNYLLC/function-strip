
// var bad_opening_tags = ['<a','<abbr','<acronym','<address','<applet','<area','<article','<aside','<audio','<b','<base',
// '<basefont','<bdi','<bdo','<big','<blockquote','<body','<br','<button','<canvas','<caption','<center','<cite','<code',
// '<col','<colgroup','<data','<datalist','<dd','<del','<details','<dfn','<dialog','<dir','<div','<dl','<dt',
// '<em','<embed','<fieldset','<figcaption','<figure','<font','<footer','<form','<frame','<frameset','<h1',
// '<h2','<h3','<h4','<h5','<h6','<head','<header','<hr','<html','<i','<iframe','<img','<input','<ins','<kbd','<label','<legend',
// '<li','<link','<main','<map','<mark','<meta','<meter','<nav','<noframes','<noscript','<object','<ol','<optgroup',
// '<option','<output','<p','<param','<picture','<pre','<progress','<q','<rp','<rt','<ruby','<s','<samp','<section','<select',
// '<small','<source','<span','<strike','<strong','<style','<sub','<summary','<sup','<svg','<table','<tbody','<td',
// '<template','<textarea','<tfoot','<th','<thead','<time','<title','<tr','<track','<tt','<u','<ul','<var','<video',
// ];

var html_bad_opening_tag = require('./html_recursive_exit/html_bad_opening_tag');

//returns the end of an opening tag - line number and data index and name of tag.... if unknown tag and not a script tag or comment, takes that into consideration as well... dont really need all the condiitons but helps make things clear.. wil delete after if need to... tracking tags in case <script is found in a string inside of a tag....

function is_bad_opening_tag(data, data_index, line_number) {

  if(
   data.charAt(data_index) === '<' && 
   data.charAt(data_index + 1) === 'a'
  ) { 
   data_index = data_index + 2; 
   return html_bad_opening_tag(data, data_index, line_number);
  }

  if(
   data.charAt(data_index) === '<' && 
   data.charAt(data_index + 1) === 'a' && 
   data.charAt(data_index + 2) === 'b' && 
   data.charAt(data_index + 3) === 'b' && 
   data.charAt(data_index + 4) === 'r'
  ) { 
   data_index = data_index + 5; 
   return html_bad_opening_tag(data, data_index, line_number);
  }

  if(
   data.charAt(data_index) === '<' && 
   data.charAt(data_index + 1) === 'a' && 
   data.charAt(data_index + 2) === 'c' && 
   data.charAt(data_index + 3) === 'r' && 
   data.charAt(data_index + 4) === 'o' && 
   data.charAt(data_index + 5) === 'n' && 
   data.charAt(data_index + 6) === 'y' && 
   data.charAt(data_index + 7) === 'm'
  ) { 
   data_index = data_index + 8; 
   return html_bad_opening_tag(data, data_index, line_number);
  }

  if(
   data.charAt(data_index) === '<' && 
   data.charAt(data_index + 1) === 'a' && 
   data.charAt(data_index + 2) === 'd' && 
   data.charAt(data_index + 3) === 'd' && 
   data.charAt(data_index + 4) === 'r' && 
   data.charAt(data_index + 5) === 'e' && 
   data.charAt(data_index + 6) === 's' && 
   data.charAt(data_index + 7) === 's'
  ) { 
   data_index = data_index + 8; 
   return html_bad_opening_tag(data, data_index, line_number);
  }

  if(
   data.charAt(data_index) === '<' && 
   data.charAt(data_index + 1) === 'a' && 
   data.charAt(data_index + 2) === 'p' && 
   data.charAt(data_index + 3) === 'p' && 
   data.charAt(data_index + 4) === 'l' && 
   data.charAt(data_index + 5) === 'e' && 
   data.charAt(data_index + 6) === 't'
  ) { 
   data_index = data_index + 7; 
   return html_bad_opening_tag(data, data_index, line_number);
  }

  if(
   data.charAt(data_index) === '<' && 
   data.charAt(data_index + 1) === 'a' && 
   data.charAt(data_index + 2) === 'r' && 
   data.charAt(data_index + 3) === 'e' && 
   data.charAt(data_index + 4) === 'a'
  ) { 
   data_index = data_index + 5; 
   return html_bad_opening_tag(data, data_index, line_number);
  }

  if(
   data.charAt(data_index) === '<' && 
   data.charAt(data_index + 1) === 'a' && 
   data.charAt(data_index + 2) === 'r' && 
   data.charAt(data_index + 3) === 't' && 
   data.charAt(data_index + 4) === 'i' && 
   data.charAt(data_index + 5) === 'c' && 
   data.charAt(data_index + 6) === 'l' && 
   data.charAt(data_index + 7) === 'e'
  ) { 
   data_index = data_index + 8; 
   return html_bad_opening_tag(data, data_index, line_number);
  }

  if(
   data.charAt(data_index) === '<' && 
   data.charAt(data_index + 1) === 'a' && 
   data.charAt(data_index + 2) === 's' && 
   data.charAt(data_index + 3) === 'i' && 
   data.charAt(data_index + 4) === 'd' && 
   data.charAt(data_index + 5) === 'e'
  ) { 
   data_index = data_index + 6; 
   return html_bad_opening_tag(data, data_index, line_number);
  }

  if(
   data.charAt(data_index) === '<' && 
   data.charAt(data_index + 1) === 'a' && 
   data.charAt(data_index + 2) === 'u' && 
   data.charAt(data_index + 3) === 'd' && 
   data.charAt(data_index + 4) === 'i' && 
   data.charAt(data_index + 5) === 'o'
  ) { 
   data_index = data_index + 6; 
   return html_bad_opening_tag(data, data_index, line_number);
  }

  if(
   data.charAt(data_index) === '<' && 
   data.charAt(data_index + 1) === 'b'
  ) { 
   data_index = data_index + 2; 
   return html_bad_opening_tag(data, data_index, line_number);
  }

  if(
   data.charAt(data_index) === '<' && 
   data.charAt(data_index + 1) === 'b' && 
   data.charAt(data_index + 2) === 'a' && 
   data.charAt(data_index + 3) === 's' && 
   data.charAt(data_index + 4) === 'e'
  ) { 
   data_index = data_index + 5; 
   return html_bad_opening_tag(data, data_index, line_number);
  }

  if(
   data.charAt(data_index) === '<' && 
   data.charAt(data_index + 1) === 'b' && 
   data.charAt(data_index + 2) === 'a' && 
   data.charAt(data_index + 3) === 's' && 
   data.charAt(data_index + 4) === 'e' && 
   data.charAt(data_index + 5) === 'f' && 
   data.charAt(data_index + 6) === 'r' && 
   data.charAt(data_index + 7) === 'o' && 
   data.charAt(data_index + 8) === 'n' && 
   data.charAt(data_index + 9) === 't'
  ) { 
   data_index = data_index + 10; 
   return html_bad_opening_tag(data, data_index, line_number);
  }

  if(
   data.charAt(data_index) === '<' && 
   data.charAt(data_index + 1) === 'b' && 
   data.charAt(data_index + 2) === 'd' && 
   data.charAt(data_index + 3) === 'i'
  ) { 
   data_index = data_index + 4; 
   return html_bad_opening_tag(data, data_index, line_number);
  }

  if(
   data.charAt(data_index) === '<' && 
   data.charAt(data_index + 1) === 'b' && 
   data.charAt(data_index + 2) === 'd' && 
   data.charAt(data_index + 3) === 'o'
  ) { 
   data_index = data_index + 4; 
   return html_bad_opening_tag(data, data_index, line_number);
  }

  if(
   data.charAt(data_index) === '<' && 
   data.charAt(data_index + 1) === 'b' && 
   data.charAt(data_index + 2) === 'i' && 
   data.charAt(data_index + 3) === 'g'
  ) { 
   data_index = data_index + 4; 
   return html_bad_opening_tag(data, data_index, line_number);
  }

  if(
   data.charAt(data_index) === '<' && 
   data.charAt(data_index + 1) === 'b' && 
   data.charAt(data_index + 2) === 'l' && 
   data.charAt(data_index + 3) === 'o' && 
   data.charAt(data_index + 4) === 'c' && 
   data.charAt(data_index + 5) === 'k' && 
   data.charAt(data_index + 6) === 'q' && 
   data.charAt(data_index + 7) === 'u' && 
   data.charAt(data_index + 8) === 'o' && 
   data.charAt(data_index + 9) === 't' && 
   data.charAt(data_index + 10) ==='e'
  ) { 
   data_index = data_index + 11; 
   return html_bad_opening_tag(data, data_index, line_number);
  }

  if(
   data.charAt(data_index) === '<' && 
   data.charAt(data_index + 1) === 'b' && 
   data.charAt(data_index + 2) === 'o' && 
   data.charAt(data_index + 3) === 'd' && 
   data.charAt(data_index + 4) === 'y'
  ) { 
   data_index = data_index + 5; 
   return html_bad_opening_tag(data, data_index, line_number);
  }

  if(
   data.charAt(data_index) === '<' && 
   data.charAt(data_index + 1) === 'b' && 
   data.charAt(data_index + 2) === 'r'
  ) { 
   data_index = data_index + 3; 
   return html_bad_opening_tag(data, data_index, line_number);
  }

  if(
   data.charAt(data_index) === '<' && 
   data.charAt(data_index + 1) === 'b' && 
   data.charAt(data_index + 2) === 'u' && 
   data.charAt(data_index + 3) === 't' && 
   data.charAt(data_index + 4) === 't' && 
   data.charAt(data_index + 5) === 'o' && 
   data.charAt(data_index + 6) === 'n'
  ) { 
   data_index = data_index + 7; 
   return html_bad_opening_tag(data, data_index, line_number); // add the name of the tag on this as well... for looking for the correct closing tag
  }







  //continue with the random tag and just track when in and out of strings in the other function for ending the opening tag.. really dont need all the conditions but added to make clear
  //just use a while loop to get the first word then 
}

module.exports = is_bad_opening_tag;