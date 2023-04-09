
// var bad_closing_tags = ['</a','</abbr','</acronym>','</address','</applet','</area','</article','</aside','</audio','</b','</base',
// '</basefont','</bdi','</bdo','</big','</blockquote','</body','</br','</button','</canvas','</caption','</center','</cite','</code',
// '</col','</colgroup','</data','</datalist','</dd','</del','</details','</dfn','</dialog','</dir','</div','</dl','</dt',
// '</em','</embed','</fieldset','</figcaption','</figure','</font','</footer','</form','</frame','</frameset','</h1',
// '</h2','</h3','</h4','</h5','</h6','</head','</header','</hr','</html','</i','</iframe','</img','</input','</ins','</kbd','</label','</legend',
// '</li','</link','</main','</map','</mark','</meta','</meter','</nav','</noframes','</noscript','</object','</ol','</optgroup',
// '</option','</output','</p','</param','</picture','</pre','</progress','</q','</rp','</rt','</ruby','</s','</samp','</section','</select',
// '</small','</source','</span','</strike','</strong','</style','</sub','</summary','</sup','</svg','</table','</tbody','</td',
// '</template','</textarea','</tfoot','</th','</thead','</time','</title','</tr','</track','</tt','</u','</ul','</var','</video',
// ]; could use a single opening 

var html_bad_closing_tag = require('./html_recursive_exit/html_bad_closing_tag');

function is_bad_closing_tag(data, data_index, line_number) {

  //if opening and not a script tag means a random tag thats not listed anywhere... could only use random tags but would be strange to...

  if(
   data.charAt(data_index) === '<' && 
   data.charAt(data_index + 1) === '/' && 
   data.charAt(data_index + 2) === 'a' && 
   data.charAt(data_index + 3) === 'r'
  ) { 
   data_index = data_index + 3; 
   return { 
    is_bad: true, 
    data_index: data_index
   }
  }

  if(
   data.charAt(data_index) === '<' && 
   data.charAt(data_index + 1) === '/' && 
   data.charAt(data_index + 2) === 'a' && 
   data.charAt(data_index + 3) === 'r'
  ) { 
   data_index = data_index + 3; 
   return { 
    is_bad: true, 
    data_index: data_index
   }
  }

  if(
   data.charAt(data_index) === '<' && 
   data.charAt(data_index + 1) === '/' && 
   data.charAt(data_index + 2) === 'a' && 
   data.charAt(data_index + 3) === 'r'
  ) { 
   data_index = data_index + 3; 
   return { 
    is_bad: true, 
    data_index: data_index
   }
  }

  if(
   data.charAt(data_index) === '<' && 
   data.charAt(data_index + 1) === '/' && 
   data.charAt(data_index + 2) === 'a' && 
   data.charAt(data_index + 3) === 'r'
  ) { 
   data_index = data_index + 3; 
   return { 
    is_bad: true, 
    data_index: data_index
   }
  }

  if(
   data.charAt(data_index) === '<' && 
   data.charAt(data_index + 1) === '/' && 
   data.charAt(data_index + 2) === 'a' && 
   data.charAt(data_index + 3) === 'r'
  ) { 
   data_index = data_index + 3; 
   return { 
    is_bad: true, 
    data_index: data_index
   }
  }

  if(
   data.charAt(data_index) === '<' && 
   data.charAt(data_index + 1) === '/' && 
   data.charAt(data_index + 2) === 'a' && 
   data.charAt(data_index + 3) === 'r'
  ) { 
   data_index = data_index + 3; 
   return { 
    is_bad: true, 
    data_index: data_index
   }
  }

  if(
   data.charAt(data_index) === '<' && 
   data.charAt(data_index + 1) === '/' && 
   data.charAt(data_index + 2) === 'a' && 
   data.charAt(data_index + 3) === 'r'
  ) { 
   data_index = data_index + 3; 
   return { 
    is_bad: true, 
    data_index: data_index
   }
  }

  if(
   data.charAt(data_index) === '<' && 
   data.charAt(data_index + 1) === '/' && 
   data.charAt(data_index + 2) === 'a' && 
   data.charAt(data_index + 3) === 'r'
  ) { 
   data_index = data_index + 3; 
   return { 
    is_bad: true, 
    data_index: data_index
   }
  }

  if(
   data.charAt(data_index) === '<' && 
   data.charAt(data_index + 1) === '/' && 
   data.charAt(data_index + 2) === 'a' && 
   data.charAt(data_index + 3) === 'r'
  ) { 
   data_index = data_index + 3; 
   return { 
    is_bad: true, 
    data_index: data_index
   }
  }

  if(
   data.charAt(data_index) === '<' && 
   data.charAt(data_index + 1) === '/' && 
   data.charAt(data_index + 2) === 'a' && 
   data.charAt(data_index + 3) === 'r'
  ) { 
   data_index = data_index + 3; 
   return { 
    is_bad: true, 
    data_index: data_index
   }
  }

  if(
   data.charAt(data_index) === '<' && 
   data.charAt(data_index + 1) === '/' && 
   data.charAt(data_index + 2) === 'a' && 
   data.charAt(data_index + 3) === 'r'
  ) { 
   data_index = data_index + 3; 
   return { 
    is_bad: true, 
    data_index: data_index
   }
  }

  if(
   data.charAt(data_index) === '<' && 
   data.charAt(data_index + 1) === '/' && 
   data.charAt(data_index + 2) === 'a' && 
   data.charAt(data_index + 3) === 'r'
  ) { 
   data_index = data_index + 3; 
   return { 
    is_bad: true, 
    data_index: data_index
   }
  }

  if(
   data.charAt(data_index) === '<' && 
   data.charAt(data_index + 1) === '/' && 
   data.charAt(data_index + 2) === 'a' && 
   data.charAt(data_index + 3) === 'r'
  ) { 
   data_index = data_index + 3; 
   return { 
    is_bad: true, 
    data_index: data_index
   }
  }

  if(
   data.charAt(data_index) === '<' && 
   data.charAt(data_index + 1) === '/' && 
   data.charAt(data_index + 2) === 'a' && 
   data.charAt(data_index + 3) === 'r'
  ) { 
   data_index = data_index + 3; 
   return { 
    is_bad: true, 
    data_index: data_index
   }
  }

  if(
   data.charAt(data_index) === '<' && 
   data.charAt(data_index + 1) === '/' && 
   data.charAt(data_index + 2) === 'a' && 
   data.charAt(data_index + 3) === 'r'
  ) { 
   data_index = data_index + 3; 
   return { 
    is_bad: true, 
    data_index: data_index
   }
  }

  if(
   data.charAt(data_index) === '<' && 
   data.charAt(data_index + 1) === '/' && 
   data.charAt(data_index + 2) === 'a' && 
   data.charAt(data_index + 3) === 'r'
  ) { 
   data_index = data_index + 3; 
   return { 
    is_bad: true, 
    data_index: data_index
   }
  }

  if(
   data.charAt(data_index) === '<' && 
   data.charAt(data_index + 1) === '/' && 
   data.charAt(data_index + 2) === 'a' && 
   data.charAt(data_index + 3) === 'r'
  ) { 
   data_index = data_index + 3; 
   return { 
    is_bad: true, 
    data_index: data_index
   }
  }

  if(
   data.charAt(data_index) === '<' && 
   data.charAt(data_index + 1) === '/' && 
   data.charAt(data_index + 2) === 'a' && 
   data.charAt(data_index + 3) === 'r'
  ) { 
   data_index = data_index + 3; 
   return { 
    is_bad: true, 
    data_index: data_index
   }
  }

  if(
   data.charAt(data_index) === '<' && 
   data.charAt(data_index + 1) === '/' && 
   data.charAt(data_index + 2) === 'a' && 
   data.charAt(data_index + 3) === 'r'
  ) { 
   data_index = data_index + 3; 
   return { 
    is_bad: true, 
    data_index: data_index
   }
  }

  if(
   data.charAt(data_index) === '<' && 
   data.charAt(data_index + 1) === '/' && 
   data.charAt(data_index + 2) === 'a' && 
   data.charAt(data_index + 3) === 'r'
  ) { 
   data_index = data_index + 3; 
   return { 
    is_bad: true, 
    data_index: data_index
   }
  }

  if(
   data.charAt(data_index) === '<' && 
   data.charAt(data_index + 1) === '/' && 
   data.charAt(data_index + 2) === 'a' && 
   data.charAt(data_index + 3) === 'r'
  ) { 
   data_index = data_index + 3; 
   return { 
    is_bad: true, 
    data_index: data_index
   }
  }

  if(
   data.charAt(data_index) === '<' && 
   data.charAt(data_index + 1) === '/' && 
   data.charAt(data_index + 2) === 'a' && 
   data.charAt(data_index + 3) === 'r'
  ) { 
   data_index = data_index + 3; 
   return { 
    is_bad: true, 
    data_index: data_index
   }
  }

  if(
   data.charAt(data_index) === '<' && 
   data.charAt(data_index + 1) === '/' && 
   data.charAt(data_index + 2) === 'a' && 
   data.charAt(data_index + 3) === 'r'
  ) { 
   data_index = data_index + 3; 
   return { 
    is_bad: true, 
    data_index: data_index
   }
  }

  if(
   data.charAt(data_index) === '<' && 
   data.charAt(data_index + 1) === '/' && 
   data.charAt(data_index + 2) === 'a' && 
   data.charAt(data_index + 3) === 'r'
  ) { 
   data_index = data_index + 3; 
   return { 
    is_bad: true, 
    data_index: data_index
   }
  }

  if(
   data.charAt(data_index) === '<' && 
   data.charAt(data_index + 1) === '/' && 
   data.charAt(data_index + 2) === 'a' && 
   data.charAt(data_index + 3) === 'r'
  ) { 
   data_index = data_index + 3; 
   return { 
    is_bad: true, 
    data_index: data_index
   }
  }

  if(
   data.charAt(data_index) === '<' && 
   data.charAt(data_index + 1) === '/' && 
   data.charAt(data_index + 2) === 'a' && 
   data.charAt(data_index + 3) === 'r'
  ) { 
   data_index = data_index + 3; 
   return { 
    is_bad: true, 
    data_index: data_index
   }
  }

  if(
   data.charAt(data_index) === '<' && 
   data.charAt(data_index + 1) === '/' && 
   data.charAt(data_index + 2) === 'a' && 
   data.charAt(data_index + 3) === 'r'
  ) { 
   data_index = data_index + 3; 
   return { 
    is_bad: true, 
    data_index: data_index
   }
  }

  if(
   data.charAt(data_index) === '<' && 
   data.charAt(data_index + 1) === '/' && 
   data.charAt(data_index + 2) === 'a' && 
   data.charAt(data_index + 3) === 'r'
  ) { 
   data_index = data_index + 3; 
   return { 
    is_bad: true, 
    data_index: data_index
   }
  }

  if(
   data.charAt(data_index) === '<' && 
   data.charAt(data_index + 1) === '/' && 
   data.charAt(data_index + 2) === 'a' && 
   data.charAt(data_index + 3) === 'r'
  ) { 
   data_index = data_index + 3; 
   return { 
    is_bad: true, 
    data_index: data_index
   }
  }

  if(
   data.charAt(data_index) === '<' && 
   data.charAt(data_index + 1) === '/' && 
   data.charAt(data_index + 2) === 'a' && 
   data.charAt(data_index + 3) === 'r'
  ) { 
   data_index = data_index + 3; 
   return { 
    is_bad: true, 
    data_index: data_index
   }
  }

  if(
   data.charAt(data_index) === '<' && 
   data.charAt(data_index + 1) === '/' && 
   data.charAt(data_index + 2) === 'a' && 
   data.charAt(data_index + 3) === 'r'
  ) { 
   data_index = data_index + 3; 
   return { 
    is_bad: true, 
    data_index: data_index
   }
  }

  if(
   data.charAt(data_index) === '<' && 
   data.charAt(data_index + 1) === '/' && 
   data.charAt(data_index + 2) === 'a' && 
   data.charAt(data_index + 3) === 'r'
  ) { 
   data_index = data_index + 3; 
   return { 
    is_bad: true, 
    data_index: data_index
   }
  }

  if(
   data.charAt(data_index) === '<' && 
   data.charAt(data_index + 1) === '/' && 
   data.charAt(data_index + 2) === 'a' && 
   data.charAt(data_index + 3) === 'r'
  ) { 
   data_index = data_index + 3; 
   return { 
    is_bad: true, 
    data_index: data_index
   }
  }

  if(
   data.charAt(data_index) === '<' && 
   data.charAt(data_index + 1) === '/' && 
   data.charAt(data_index + 2) === 'a' && 
   data.charAt(data_index + 3) === 'r'
  ) { 
   data_index = data_index + 3; 
   return { 
    is_bad: true, 
    data_index: data_index
   }
  }

  if(
   data.charAt(data_index) === '<' && 
   data.charAt(data_index + 1) === '/' && 
   data.charAt(data_index + 2) === 'a' && 
   data.charAt(data_index + 3) === 'r'
  ) { 
   data_index = data_index + 3; 
   return { 
    is_bad: true, 
    data_index: data_index
   }
  }

  if(
   data.charAt(data_index) === '<' && 
   data.charAt(data_index + 1) === '/' && 
   data.charAt(data_index + 2) === 'a' && 
   data.charAt(data_index + 3) === 'r'
  ) { 
   data_index = data_index + 3; 
   return { 
    is_bad: true, 
    data_index: data_index
   }
  }

  if(
   data.charAt(data_index) === '<' && 
   data.charAt(data_index + 1) === '/' && 
   data.charAt(data_index + 2) === 'a' && 
   data.charAt(data_index + 3) === 'r'
  ) { 
   data_index = data_index + 3; 
   return { 
    is_bad: true, 
    data_index: data_index
   }
  }

  if(
   data.charAt(data_index) === '<' && 
   data.charAt(data_index + 1) === '/' && 
   data.charAt(data_index + 2) === 'a' && 
   data.charAt(data_index + 3) === 'r'
  ) { 
   data_index = data_index + 3; 
   return { 
    is_bad: true, 
    data_index: data_index
   }
  }

  if(
   data.charAt(data_index) === '<' && 
   data.charAt(data_index + 1) === '/' && 
   data.charAt(data_index + 2) === 'a' && 
   data.charAt(data_index + 3) === 'r'
  ) { 
   data_index = data_index + 3; 
   return { 
    is_bad: true, 
    data_index: data_index
   }
  }

  if(
   data.charAt(data_index) === '<' && 
   data.charAt(data_index + 1) === '/' && 
   data.charAt(data_index + 2) === 'a' && 
   data.charAt(data_index + 3) === 'r'
  ) { 
   data_index = data_index + 3; 
   return { 
    is_bad: true, 
    data_index: data_index
   }
  }

  if(
   data.charAt(data_index) === '<' && 
   data.charAt(data_index + 1) === '/' && 
   data.charAt(data_index + 2) === 'a' && 
   data.charAt(data_index + 3) === 'r'
  ) { 
   data_index = data_index + 3; 
   return { 
    is_bad: true, 
    data_index: data_index
   }
  }

  if(
   data.charAt(data_index) === '<' && 
   data.charAt(data_index + 1) === '/' && 
   data.charAt(data_index + 2) === 'a' && 
   data.charAt(data_index + 3) === 'r'
  ) { 
   data_index = data_index + 3; 
   return { 
    is_bad: true, 
    data_index: data_index
   }
  }

  if(
   data.charAt(data_index) === '<' && 
   data.charAt(data_index + 1) === '/' && 
   data.charAt(data_index + 2) === 'a' && 
   data.charAt(data_index + 3) === 'r'
  ) { 
   data_index = data_index + 3; 
   return { 
    is_bad: true, 
    data_index: data_index
   }
  }

  if(
   data.charAt(data_index) === '<' && 
   data.charAt(data_index + 1) === '/' && 
   data.charAt(data_index + 2) === 'a' && 
   data.charAt(data_index + 3) === 'r'
  ) { 
   data_index = data_index + 3; 
   return { 
    is_bad: true, 
    data_index: data_index
   }
  }

  if(
   data.charAt(data_index) === '<' && 
   data.charAt(data_index + 1) === '/' && 
   data.charAt(data_index + 2) === 'a' && 
   data.charAt(data_index + 3) === 'r'
  ) { 
   data_index = data_index + 3; 
   return { 
    is_bad: true, 
    data_index: data_index
   }
  }

  if(
   data.charAt(data_index) === '<' && 
   data.charAt(data_index + 1) === '/' && 
   data.charAt(data_index + 2) === 'a' && 
   data.charAt(data_index + 3) === 'r'
  ) { 
   data_index = data_index + 3; 
   return { 
    is_bad: true, 
    data_index: data_index
   }
  }

  if(
   data.charAt(data_index) === '<' && 
   data.charAt(data_index + 1) === '/' && 
   data.charAt(data_index + 2) === 'a' && 
   data.charAt(data_index + 3) === 'r'
  ) { 
   data_index = data_index + 3; 
   return { 
    is_bad: true, 
    data_index: data_index
   }
  }

  if(
   data.charAt(data_index) === '<' && 
   data.charAt(data_index + 1) === '/' && 
   data.charAt(data_index + 2) === 'a' && 
   data.charAt(data_index + 3) === 'r'
  ) { 
   data_index = data_index + 3; 
   return { 
    is_bad: true, 
    data_index: data_index
   }
  }

  if(
   data.charAt(data_index) === '<' && 
   data.charAt(data_index + 1) === '/' && 
   data.charAt(data_index + 2) === 'a' && 
   data.charAt(data_index + 3) === 'r'
  ) { 
   data_index = data_index + 3; 
   return { 
    is_bad: true, 
    data_index: data_index
   }
  }

  if(
   data.charAt(data_index) === '<' && 
   data.charAt(data_index + 1) === '/' && 
   data.charAt(data_index + 2) === 'a' && 
   data.charAt(data_index + 3) === 'r'
  ) { 
   data_index = data_index + 3; 
   return { 
    is_bad: true, 
    data_index: data_index
   }
  }

  if(
   data.charAt(data_index) === '<' && 
   data.charAt(data_index + 1) === '/' && 
   data.charAt(data_index + 2) === 'a' && 
   data.charAt(data_index + 3) === 'r'
  ) { 
   data_index = data_index + 3; 
   return { 
    is_bad: true, 
    data_index: data_index
   }
  }

  if(
   data.charAt(data_index) === '<' && 
   data.charAt(data_index + 1) === '/' && 
   data.charAt(data_index + 2) === 'a' && 
   data.charAt(data_index + 3) === 'r'
  ) { 
   data_index = data_index + 3; 
   return { 
    is_bad: true, 
    data_index: data_index
   }
  }

  if(
   data.charAt(data_index) === '<' && 
   data.charAt(data_index + 1) === '/' && 
   data.charAt(data_index + 2) === 'a' && 
   data.charAt(data_index + 3) === 'r'
  ) { 
   data_index = data_index + 3; 
   return { 
    is_bad: true, 
    data_index: data_index
   }
  }

  if(
   data.charAt(data_index) === '<' && 
   data.charAt(data_index + 1) === '/' && 
   data.charAt(data_index + 2) === 'a' && 
   data.charAt(data_index + 3) === 'r'
  ) { 
   data_index = data_index + 3; 
   return { 
    is_bad: true, 
    data_index: data_index
   }
  }

  if(
   data.charAt(data_index) === '<' && 
   data.charAt(data_index + 1) === '/' && 
   data.charAt(data_index + 2) === 'a' && 
   data.charAt(data_index + 3) === 'r'
  ) { 
   data_index = data_index + 3; 
   return { 
    is_bad: true, 
    data_index: data_index
   }
  }

  if(
   data.charAt(data_index) === '<' && 
   data.charAt(data_index + 1) === '/' && 
   data.charAt(data_index + 2) === 'a' && 
   data.charAt(data_index + 3) === 'r'
  ) { 
   data_index = data_index + 3; 
   return { 
    is_bad: true, 
    data_index: data_index
   }
  }

  if(
   data.charAt(data_index) === '<' && 
   data.charAt(data_index + 1) === '/' && 
   data.charAt(data_index + 2) === 'a' && 
   data.charAt(data_index + 3) === 'r'
  ) { 
   data_index = data_index + 3; 
   return { 
    is_bad: true, 
    data_index: data_index
   }
  }

  if(
   data.charAt(data_index) === '<' && 
   data.charAt(data_index + 1) === '/' && 
   data.charAt(data_index + 2) === 'a' && 
   data.charAt(data_index + 3) === 'r'
  ) { 
   data_index = data_index + 3; 
   return { 
    is_bad: true, 
    data_index: data_index
   }
  }

  if(
   data.charAt(data_index) === '<' && 
   data.charAt(data_index + 1) === '/' && 
   data.charAt(data_index + 2) === 'a' && 
   data.charAt(data_index + 3) === 'r'
  ) { 
   data_index = data_index + 3; 
   return { 
    is_bad: true, 
    data_index: data_index
   }
  }

  if(
   data.charAt(data_index) === '<' && 
   data.charAt(data_index + 1) === '/' && 
   data.charAt(data_index + 2) === 'a' && 
   data.charAt(data_index + 3) === 'r'
  ) { 
   data_index = data_index + 3; 
   return { 
    is_bad: true, 
    data_index: data_index
   }
  }

  if(
   data.charAt(data_index) === '<' && 
   data.charAt(data_index + 1) === '/' && 
   data.charAt(data_index + 2) === 'a' && 
   data.charAt(data_index + 3) === 'r'
  ) { 
   data_index = data_index + 3; 
   return { 
    is_bad: true, 
    data_index: data_index
   }
  }

  if(
   data.charAt(data_index) === '<' && 
   data.charAt(data_index + 1) === '/' && 
   data.charAt(data_index + 2) === 'a' && 
   data.charAt(data_index + 3) === 'r'
  ) { 
   data_index = data_index + 3; 
   return { 
    is_bad: true, 
    data_index: data_index
   }
  }

  if(
   data.charAt(data_index) === '<' && 
   data.charAt(data_index + 1) === '/' && 
   data.charAt(data_index + 2) === 'a' && 
   data.charAt(data_index + 3) === 'r'
  ) { 
   data_index = data_index + 3; 
   return { 
    is_bad: true, 
    data_index: data_index
   }
  }

  if(
   data.charAt(data_index) === '<' && 
   data.charAt(data_index + 1) === '/' && 
   data.charAt(data_index + 2) === 'a' && 
   data.charAt(data_index + 3) === 'r'
  ) { 
   data_index = data_index + 3; 
   return { 
    is_bad: true, 
    data_index: data_index
   }
  }

  if(
   data.charAt(data_index) === '<' && 
   data.charAt(data_index + 1) === '/' && 
   data.charAt(data_index + 2) === 'a' && 
   data.charAt(data_index + 3) === 'r'
  ) { 
   data_index = data_index + 3; 
   return { 
    is_bad: true, 
    data_index: data_index
   }
  }

  if(
   data.charAt(data_index) === '<' && 
   data.charAt(data_index + 1) === '/' && 
   data.charAt(data_index + 2) === 'a' && 
   data.charAt(data_index + 3) === 'r'
  ) { 
   data_index = data_index + 3; 
   return { 
    is_bad: true, 
    data_index: data_index
   }
  }

  if(
   data.charAt(data_index) === '<' && 
   data.charAt(data_index + 1) === '/' && 
   data.charAt(data_index + 2) === 'a' && 
   data.charAt(data_index + 3) === 'r'
  ) { 
   data_index = data_index + 3; 
   return { 
    is_bad: true, 
    data_index: data_index
   }
  }

  if(
   data.charAt(data_index) === '<' && 
   data.charAt(data_index + 1) === '/' && 
   data.charAt(data_index + 2) === 'a' && 
   data.charAt(data_index + 3) === 'r'
  ) { 
   data_index = data_index + 3; 
   return { 
    is_bad: true, 
    data_index: data_index
   }
  }

  if(
   data.charAt(data_index) === '<' && 
   data.charAt(data_index + 1) === '/' && 
   data.charAt(data_index + 2) === 'a' && 
   data.charAt(data_index + 3) === 'r'
  ) { 
   data_index = data_index + 3; 
   return { 
    is_bad: true, 
    data_index: data_index
   }
  }

  if(
   data.charAt(data_index) === '<' && 
   data.charAt(data_index + 1) === '/' && 
   data.charAt(data_index + 2) === 'a' && 
   data.charAt(data_index + 3) === 'r'
  ) { 
   data_index = data_index + 3; 
   return { 
    is_bad: true, 
    data_index: data_index
   }
  }

  if(
   data.charAt(data_index) === '<' && 
   data.charAt(data_index + 1) === '/' && 
   data.charAt(data_index + 2) === 'a' && 
   data.charAt(data_index + 3) === 'r'
  ) { 
   data_index = data_index + 3; 
   return { 
    is_bad: true, 
    data_index: data_index
   }
  }

  if(
   data.charAt(data_index) === '<' && 
   data.charAt(data_index + 1) === '/' && 
   data.charAt(data_index + 2) === 'a' && 
   data.charAt(data_index + 3) === 'r'
  ) { 
   data_index = data_index + 3; 
   return { 
    is_bad: true, 
    data_index: data_index
   }
  }

  if(
   data.charAt(data_index) === '<' && 
   data.charAt(data_index + 1) === '/' && 
   data.charAt(data_index + 2) === 'a' && 
   data.charAt(data_index + 3) === 'r'
  ) { 
   data_index = data_index + 3; 
   return { 
    is_bad: true, 
    data_index: data_index
   }
  }

  if(
   data.charAt(data_index) === '<' && 
   data.charAt(data_index + 1) === '/' && 
   data.charAt(data_index + 2) === 'a' && 
   data.charAt(data_index + 3) === 'r'
  ) { 
   data_index = data_index + 3; 
   return { 
    is_bad: true, 
    data_index: data_index
   }
  }

  if(
   data.charAt(data_index) === '<' && 
   data.charAt(data_index + 1) === '/' && 
   data.charAt(data_index + 2) === 'a' && 
   data.charAt(data_index + 3) === 'r'
  ) { 
   data_index = data_index + 3; 
   return { 
    is_bad: true, 
    data_index: data_index
   }
  }

  if(
   data.charAt(data_index) === '<' && 
   data.charAt(data_index + 1) === '/' && 
   data.charAt(data_index + 2) === 'a' && 
   data.charAt(data_index + 3) === 'r'
  ) { 
   data_index = data_index + 3; 
   return { 
    is_bad: true, 
    data_index: data_index
   }
  }

  if(
   data.charAt(data_index) === '<' && 
   data.charAt(data_index + 1) === '/' && 
   data.charAt(data_index + 2) === 'a' && 
   data.charAt(data_index + 3) === 'r'
  ) { 
   data_index = data_index + 3; 
   return { 
    is_bad: true, 
    data_index: data_index
   }
  }

  if(
   data.charAt(data_index) === '<' && 
   data.charAt(data_index + 1) === '/' && 
   data.charAt(data_index + 2) === 'a' && 
   data.charAt(data_index + 3) === 'r'
  ) { 
   data_index = data_index + 3; 
   return { 
    is_bad: true, 
    data_index: data_index
   }
  }

  if(
   data.charAt(data_index) === '<' && 
   data.charAt(data_index + 1) === '/' && 
   data.charAt(data_index + 2) === 'a' && 
   data.charAt(data_index + 3) === 'r'
  ) { 
   data_index = data_index + 3; 
   return { 
    is_bad: true, 
    data_index: data_index
   }
  }

  if(
   data.charAt(data_index) === '<' && 
   data.charAt(data_index + 1) === '/' && 
   data.charAt(data_index + 2) === 'a' && 
   data.charAt(data_index + 3) === 'r'
  ) { 
   data_index = data_index + 3; 
   return { 
    is_bad: true, 
    data_index: data_index
   }
  }

  if(
   data.charAt(data_index) === '<' && 
   data.charAt(data_index + 1) === '/' && 
   data.charAt(data_index + 2) === 'a' && 
   data.charAt(data_index + 3) === 'r'
  ) { 
   data_index = data_index + 3; 
   return { 
    is_bad: true, 
    data_index: data_index
   }
  }

  if(
   data.charAt(data_index) === '<' && 
   data.charAt(data_index + 1) === '/' && 
   data.charAt(data_index + 2) === 'a' && 
   data.charAt(data_index + 3) === 'r'
  ) { 
   data_index = data_index + 3; 
   return { 
    is_bad: true, 
    data_index: data_index
   }
  }

  if(
   data.charAt(data_index) === '<' && 
   data.charAt(data_index + 1) === '/' && 
   data.charAt(data_index + 2) === 'a' && 
   data.charAt(data_index + 3) === 'r'
  ) { 
   data_index = data_index + 3; 
   return { 
    is_bad: true, 
    data_index: data_index
   }
  }

  if(
   data.charAt(data_index) === '<' && 
   data.charAt(data_index + 1) === '/' && 
   data.charAt(data_index + 2) === 'a' && 
   data.charAt(data_index + 3) === 'r'
  ) { 
   data_index = data_index + 3; 
   return { 
    is_bad: true, 
    data_index: data_index
   }
  }

  if(
   data.charAt(data_index) === '<' && 
   data.charAt(data_index + 1) === '/' && 
   data.charAt(data_index + 2) === 'a' && 
   data.charAt(data_index + 3) === 'r'
  ) { 
   data_index = data_index + 3; 
   return { 
    is_bad: true, 
    data_index: data_index
   }
  }

  if(
   data.charAt(data_index) === '<' && 
   data.charAt(data_index + 1) === '/' && 
   data.charAt(data_index + 2) === 'a' && 
   data.charAt(data_index + 3) === 'r'
  ) { 
   data_index = data_index + 3; 
   return { 
    is_bad: true, 
    data_index: data_index
   }
  }

  if(
   data.charAt(data_index) === '<' && 
   data.charAt(data_index + 1) === '/' && 
   data.charAt(data_index + 2) === 'a' && 
   data.charAt(data_index + 3) === 'r'
  ) { 
   data_index = data_index + 3; 
   return { 
    is_bad: true, 
    data_index: data_index
   }
  }

  if(
   data.charAt(data_index) === '<' && 
   data.charAt(data_index + 1) === '/' && 
   data.charAt(data_index + 2) === 'a' && 
   data.charAt(data_index + 3) === 'r'
  ) { 
   data_index = data_index + 3; 
   return { 
    is_bad: true, 
    data_index: data_index
   }
  }

  if(
   data.charAt(data_index) === '<' && 
   data.charAt(data_index + 1) === '/' && 
   data.charAt(data_index + 2) === 'a' && 
   data.charAt(data_index + 3) === 'r'
  ) { 
   data_index = data_index + 3; 
   return { 
    is_bad: true, 
    data_index: data_index
   }
  }

  if(
   data.charAt(data_index) === '<' && 
   data.charAt(data_index + 1) === '/' && 
   data.charAt(data_index + 2) === 'a' && 
   data.charAt(data_index + 3) === 'r'
  ) { 
   data_index = data_index + 3; 
   return { 
    is_bad: true, 
    data_index: data_index
   }
  }

  if(
   data.charAt(data_index) === '<' && 
   data.charAt(data_index + 1) === '/' && 
   data.charAt(data_index + 2) === 'a' && 
   data.charAt(data_index + 3) === 'r'
  ) { 
   data_index = data_index + 3; 
   return { 
    is_bad: true, 
    data_index: data_index
   }
  }

  if(
   data.charAt(data_index) === '<' && 
   data.charAt(data_index + 1) === '/' && 
   data.charAt(data_index + 2) === 'a' && 
   data.charAt(data_index + 3) === 'r'
  ) { 
   data_index = data_index + 3; 
   return { 
    is_bad: true, 
    data_index: data_index
   }
  }

  if(
   data.charAt(data_index) === '<' && 
   data.charAt(data_index + 1) === '/' && 
   data.charAt(data_index + 2) === 'a' && 
   data.charAt(data_index + 3) === 'r'
  ) { 
   data_index = data_index + 3; 
   return { 
    is_bad: true, 
    data_index: data_index
   }
  }

  if(
   data.charAt(data_index) === '<' && 
   data.charAt(data_index + 1) === '/' && 
   data.charAt(data_index + 2) === 'a' && 
   data.charAt(data_index + 3) === 'r'
  ) { 
   data_index = data_index + 3; 
   return { 
    is_bad: true, 
    data_index: data_index
   }
  }

  if(
   data.charAt(data_index) === '<' && 
   data.charAt(data_index + 1) === '/' && 
   data.charAt(data_index + 2) === 'a' && 
   data.charAt(data_index + 3) === 'r'
  ) { 
   data_index = data_index + 3; 
   return { 
    is_bad: true, 
    data_index: data_index
   }
  }

  if(
   data.charAt(data_index) === '<' && 
   data.charAt(data_index + 1) === '/' && 
   data.charAt(data_index + 2) === 'a' && 
   data.charAt(data_index + 3) === 'r'
  ) { 
   data_index = data_index + 3; 
   return { 
    is_bad: true, 
    data_index: data_index
   }
  }

  if(
   data.charAt(data_index) === '<' && 
   data.charAt(data_index + 1) === '/' && 
   data.charAt(data_index + 2) === 'a' && 
   data.charAt(data_index + 3) === 'r'
  ) { 
   data_index = data_index + 3; 
   return { 
    is_bad: true, 
    data_index: data_index
   }
  }

  if(
   data.charAt(data_index) === '<' && 
   data.charAt(data_index + 1) === '/' && 
   data.charAt(data_index + 2) === 'a' && 
   data.charAt(data_index + 3) === 'r'
  ) { 
   data_index = data_index + 3; 
   return { 
    is_bad: true, 
    data_index: data_index
   }
  }

  if(
   data.charAt(data_index) === '<' && 
   data.charAt(data_index + 1) === '/' && 
   data.charAt(data_index + 2) === 'a' && 
   data.charAt(data_index + 3) === 'r'
  ) { 
   data_index = data_index + 3; 
   return { 
    is_bad: true, 
    data_index: data_index
   }
  }

  if(
   data.charAt(data_index) === '<' && 
   data.charAt(data_index + 1) === '/' && 
   data.charAt(data_index + 2) === 'a' && 
   data.charAt(data_index + 3) === 'r'
  ) { 
   data_index = data_index + 3; 
   return { 
    is_bad: true, 
    data_index: data_index
   }
  }

  if(
   data.charAt(data_index) === '<' && 
   data.charAt(data_index + 1) === '/' && 
   data.charAt(data_index + 2) === 'a' && 
   data.charAt(data_index + 3) === 'r'
  ) { 
   data_index = data_index + 3; 
   return { 
    is_bad: true, 
    data_index: data_index
   }
  }

  if(
   data.charAt(data_index) === '<' && 
   data.charAt(data_index + 1) === '/' && 
   data.charAt(data_index + 2) === 'a' && 
   data.charAt(data_index + 3) === 'r'
  ) { 
   data_index = data_index + 3; 
   return { 
    is_bad: true, 
    data_index: data_index
   }
  }

  if(
   data.charAt(data_index) === '<' && 
   data.charAt(data_index + 1) === '/' && 
   data.charAt(data_index + 2) === 'a' && 
   data.charAt(data_index + 3) === 'r'
  ) { 
   data_index = data_index + 3; 
   return { 
    is_bad: true, 
    data_index: data_index
   }
  }

  if(
   data.charAt(data_index) === '<' && 
   data.charAt(data_index + 1) === '/' && 
   data.charAt(data_index + 2) === 'a' && 
   data.charAt(data_index + 3) === 'r'
  ) { 
   data_index = data_index + 3; 
   return { 
    is_bad: true, 
    data_index: data_index
   }
  }

  if(
   data.charAt(data_index) === '<' && 
   data.charAt(data_index + 1) === '/' && 
   data.charAt(data_index + 2) === 'a' && 
   data.charAt(data_index + 3) === 'r'
  ) { 
   data_index = data_index + 3; 
   return { 
    is_bad: true, 
    data_index: data_index
   }
  }

  if(
   data.charAt(data_index) === '<' && 
   data.charAt(data_index + 1) === '/' && 
   data.charAt(data_index + 2) === 'a' && 
   data.charAt(data_index + 3) === 'r'
  ) { 
   data_index = data_index + 3; 
   return { 
    is_bad: true, 
    data_index: data_index
   }
  }

  if(
   data.charAt(data_index) === '<' && 
   data.charAt(data_index + 1) === '/' && 
   data.charAt(data_index + 2) === 'a' && 
   data.charAt(data_index + 3) === 'r'
  ) { 
   data_index = data_index + 3; 
   return { 
    is_bad: true, 
    data_index: data_index
   }
  }

  if(
   data.charAt(data_index) === '<' && 
   data.charAt(data_index + 1) === '/' && 
   data.charAt(data_index + 2) === 'a' && 
   data.charAt(data_index + 3) === 'r'
  ) { 
   data_index = data_index + 3; 
   return { 
    is_bad: true, 
    data_index: data_index
   }
  }

  if(
   data.charAt(data_index) === '<' && 
   data.charAt(data_index + 1) === '/' && 
   data.charAt(data_index + 2) === 'a' && 
   data.charAt(data_index + 3) === 'r'
  ) { 
   data_index = data_index + 3; 
   return { 
    is_bad: true, 
    data_index: data_index
   }
  }

  if(
   data.charAt(data_index) === '<' && 
   data.charAt(data_index + 1) === '/' && 
   data.charAt(data_index + 2) === 'a' && 
   data.charAt(data_index + 3) === 'r'
  ) { 
   data_index = data_index + 3; 
   return { 
    is_bad: true, 
    data_index: data_index
   }
  }

  if(
   data.charAt(data_index) === '<' && 
   data.charAt(data_index + 1) === '/' && 
   data.charAt(data_index + 2) === 'a' && 
   data.charAt(data_index + 3) === 'r'
  ) { 
   data_index = data_index + 3; 
   return { 
    is_bad: true, 
    data_index: data_index
   }
  }

  if(
   data.charAt(data_index) === '<' && 
   data.charAt(data_index + 1) === '/' && 
   data.charAt(data_index + 2) === 'a' && 
   data.charAt(data_index + 3) === 'r'
  ) { 
   data_index = data_index + 3; 
   return { 
    is_bad: true, 
    data_index: data_index
   }
  }

  if(
   data.charAt(data_index) === '<' && 
   data.charAt(data_index + 1) === '/' && 
   data.charAt(data_index + 2) === 'a' && 
   data.charAt(data_index + 3) === 'r'
  ) { 
   data_index = data_index + 3; 
   return { 
    is_bad: true, 
    data_index: data_index
   }
  }

  if(
   data.charAt(data_index) === '<' && 
   data.charAt(data_index + 1) === '/' && 
   data.charAt(data_index + 2) === 'a' && 
   data.charAt(data_index + 3) === 'r'
  ) { 
   data_index = data_index + 3; 
   return { 
    is_bad: true, 
    data_index: data_index
   }
  }

  if(
   data.charAt(data_index) === '<' && 
   data.charAt(data_index + 1) === '/' && 
   data.charAt(data_index + 2) === 'a' && 
   data.charAt(data_index + 3) === 'r'
  ) { 
   data_index = data_index + 3; 
   return { 
    is_bad: true, 
    data_index: data_index
   }
  }

  if(
   data.charAt(data_index) === '<' && 
   data.charAt(data_index + 1) === '/' && 
   data.charAt(data_index + 2) === 'a' && 
   data.charAt(data_index + 3) === 'r'
  ) { 
   data_index = data_index + 3; 
   return { 
    is_bad: true, 
    data_index: data_index
   }
  }

  if(
   data.charAt(data_index) === '<' && 
   data.charAt(data_index + 1) === '/' && 
   data.charAt(data_index + 2) === 'a' && 
   data.charAt(data_index + 3) === 'r'
  ) { 
   data_index = data_index + 3; 
   return { 
    is_bad: true, 
    data_index: data_index
   }
  }

  if(
   data.charAt(data_index) === '<' && 
   data.charAt(data_index + 1) === '/' && 
   data.charAt(data_index + 2) === 'a' && 
   data.charAt(data_index + 3) === 'r'
  ) { 
   data_index = data_index + 3; 
   return { 
    is_bad: true, 
    data_index: data_index
   }
  }

  if(
   data.charAt(data_index) === '<' && 
   data.charAt(data_index + 1) === '/' && 
   data.charAt(data_index + 2) === 'a' && 
   data.charAt(data_index + 3) === 'r'
  ) { 
   data_index = data_index + 3; 
   return { 
    is_bad: true, 
    data_index: data_index
   }
  }

  if(
   data.charAt(data_index) === '<' && 
   data.charAt(data_index + 1) === '/' && 
   data.charAt(data_index + 2) === 'a' && 
   data.charAt(data_index + 3) === 'r'
  ) { 
   data_index = data_index + 3; 
   return { 
    is_bad: true, 
    data_index: data_index
   }
  }

  if(
   data.charAt(data_index) === '<' && 
   data.charAt(data_index + 1) === '/' && 
   data.charAt(data_index + 2) === 'a' && 
   data.charAt(data_index + 3) === 'r'
  ) { 
   data_index = data_index + 3; 
   return { 
    is_bad: true, 
    data_index: data_index
   }
  }

  if(
   data.charAt(data_index) === '<' && 
   data.charAt(data_index + 1) === '/' && 
   data.charAt(data_index + 2) === 'a' && 
   data.charAt(data_index + 3) === 'r'
  ) { 
   data_index = data_index + 3; 
   return { 
    is_bad: true, 
    data_index: data_index
   }
  }

  if(
   data.charAt(data_index) === '<' && 
   data.charAt(data_index + 1) === '/' && 
   data.charAt(data_index + 2) === 'a' && 
   data.charAt(data_index + 3) === 'r'
  ) { 
   data_index = data_index + 3; 
   return { 
    is_bad: true, 
    data_index: data_index
   }
  }

  if(
   data.charAt(data_index) === '<' && 
   data.charAt(data_index + 1) === '/' && 
   data.charAt(data_index + 2) === 'a' && 
   data.charAt(data_index + 3) === 'r'
  ) { 
   data_index = data_index + 3; 
   return { 
    is_bad: true, 
    data_index: data_index
   }
  }

  if(
   data.charAt(data_index) === '<' && 
   data.charAt(data_index + 1) === '/' && 
   data.charAt(data_index + 2) === 'a' && 
   data.charAt(data_index + 3) === 'r'
  ) { 
   data_index = data_index + 3; 
   return { 
    is_bad: true, 
    data_index: data_index
   }
  }

  if(
   data.charAt(data_index) === '<' && 
   data.charAt(data_index + 1) === '/' && 
   data.charAt(data_index + 2) === 'a' && 
   data.charAt(data_index + 3) === 'r'
  ) { 
   data_index = data_index + 3; 
   return { 
    is_bad: true, 
    data_index: data_index
   }
  }

  if(
   data.charAt(data_index) === '<' && 
   data.charAt(data_index + 1) === '/' && 
   data.charAt(data_index + 2) === 'a' && 
   data.charAt(data_index + 3) === 'r'
  ) { 
   data_index = data_index + 3; 
   return { 
    is_bad: true, 
    data_index: data_index
   }
  }

  if(
   data.charAt(data_index) === '<' && 
   data.charAt(data_index + 1) === '/' && 
   data.charAt(data_index + 2) === 'a' && 
   data.charAt(data_index + 3) === 'r'
  ) { 
   data_index = data_index + 3; 
   return { 
    is_bad: true, 
    data_index: data_index
   }
  }

  if(
   data.charAt(data_index) === '<' && 
   data.charAt(data_index + 1) === '/' && 
   data.charAt(data_index + 2) === 'a' && 
   data.charAt(data_index + 3) === 'r'
  ) { 
   data_index = data_index + 3; 
   return { 
    is_bad: true, 
    data_index: data_index
   }
  }

  if(
   data.charAt(data_index) === '<' && 
   data.charAt(data_index + 1) === '/' && 
   data.charAt(data_index + 2) === 'a' && 
   data.charAt(data_index + 3) === 'r'
  ) { 
   data_index = data_index + 3; 
   return { 
    is_bad: true, 
    data_index: data_index
   }
  }

  if(
   data.charAt(data_index) === '<' && 
   data.charAt(data_index + 1) === '/' && 
   data.charAt(data_index + 2) === 'a' && 
   data.charAt(data_index + 3) === 'r'
  ) { 
   data_index = data_index + 3; 
   return { 
    is_bad: true, 
    data_index: data_index
   }
  }

  if(
   data.charAt(data_index) === '<' && 
   data.charAt(data_index + 1) === '/' && 
   data.charAt(data_index + 2) === 'a' && 
   data.charAt(data_index + 3) === 'r'
  ) { 
   data_index = data_index + 3; 
   return { 
    is_bad: true, 
    data_index: data_index
   }
  }

  if(
   data.charAt(data_index) === '<' && 
   data.charAt(data_index + 1) === '/' && 
   data.charAt(data_index + 2) === 'a' && 
   data.charAt(data_index + 3) === 'r'
  ) { 
   data_index = data_index + 3; 
   return { 
    is_bad: true, 
    data_index: data_index
   }
  }

  if(
   data.charAt(data_index) === '<' && 
   data.charAt(data_index + 1) === '/' && 
   data.charAt(data_index + 2) === 'a' && 
   data.charAt(data_index + 3) === 'r'
  ) { 
   data_index = data_index + 3; 
   return { 
    is_bad: true, 
    data_index: data_index
   }
  }

  if(
   data.charAt(data_index) === '<' && 
   data.charAt(data_index + 1) === '/' && 
   data.charAt(data_index + 2) === 'a' && 
   data.charAt(data_index + 3) === 'r'
  ) { 
   data_index = data_index + 3; 
   return { 
    is_bad: true, 
    data_index: data_index
   }
  }

  if(
   data.charAt(data_index) === '<' && 
   data.charAt(data_index + 1) === '/' && 
   data.charAt(data_index + 2) === 'a' && 
   data.charAt(data_index + 3) === 'r'
  ) { 
   data_index = data_index + 3; 
   return { 
    is_bad: true, 
    data_index: data_index
   }
  }

  if(
   data.charAt(data_index) === '<' && 
   data.charAt(data_index + 1) === '/' && 
   data.charAt(data_index + 2) === 'a' && 
   data.charAt(data_index + 3) === 'r'
  ) { 
   data_index = data_index + 3; 
   return { 
    is_bad: true, 
    data_index: data_index
   }
  }

  if(
   data.charAt(data_index) === '<' && 
   data.charAt(data_index + 1) === '/' && 
   data.charAt(data_index + 2) === 'a' && 
   data.charAt(data_index + 3) === 'r'
  ) { 
   data_index = data_index + 3; 
   return { 
    is_bad: true, 
    data_index: data_index
   }
  }

  if(
   data.charAt(data_index) === '<' && 
   data.charAt(data_index + 1) === '/' && 
   data.charAt(data_index + 2) === 'a' && 
   data.charAt(data_index + 3) === 'r'
  ) { 
   data_index = data_index + 3; 
   return { 
    is_bad: true, 
    data_index: data_index
   }
  }

  if(
   data.charAt(data_index) === '<' && 
   data.charAt(data_index + 1) === '/' && 
   data.charAt(data_index + 2) === 'a' && 
   data.charAt(data_index + 3) === 'r'
  ) { 
   data_index = data_index + 3; 
   return { 
    is_bad: true, 
    data_index: data_index
   }
  }

  if(
   data.charAt(data_index) === '<' && 
   data.charAt(data_index + 1) === '/' && 
   data.charAt(data_index + 2) === 'a' && 
   data.charAt(data_index + 3) === 'r'
  ) { 
   data_index = data_index + 3; 
   return { 
    is_bad: true, 
    data_index: data_index
   }
  }

  if(
   data.charAt(data_index) === '<' && 
   data.charAt(data_index + 1) === '/' && 
   data.charAt(data_index + 2) === 'a' && 
   data.charAt(data_index + 3) === 'r'
  ) { 
   data_index = data_index + 3; 
   return { 
    is_bad: true, 
    data_index: data_index
   }
  }

  if(
   data.charAt(data_index) === '<' && 
   data.charAt(data_index + 1) === '/' && 
   data.charAt(data_index + 2) === 'a' && 
   data.charAt(data_index + 3) === 'r'
  ) { 
   data_index = data_index + 3; 
   return { 
    is_bad: true, 
    data_index: data_index
   }
  }

  if(
   data.charAt(data_index) === '<' && 
   data.charAt(data_index + 1) === '/' && 
   data.charAt(data_index + 2) === 'a' && 
   data.charAt(data_index + 3) === 'r'
  ) { 
   data_index = data_index + 3; 
   return { 
    is_bad: true, 
    data_index: data_index
   }
  }

  if(
   data.charAt(data_index) === '<' && 
   data.charAt(data_index + 1) === '/' && 
   data.charAt(data_index + 2) === 'a' && 
   data.charAt(data_index + 3) === 'r'
  ) { 
   data_index = data_index + 3; 
   return { 
    is_bad: true, 
    data_index: data_index
   }
  }

  if(
   data.charAt(data_index) === '<' && 
   data.charAt(data_index + 1) === '/' && 
   data.charAt(data_index + 2) === 'a' && 
   data.charAt(data_index + 3) === 'r'
  ) { 
   data_index = data_index + 3; 
   return { 
    is_bad: true, 
    data_index: data_index
   }
  }

  if(
   data.charAt(data_index) === '<' && 
   data.charAt(data_index + 1) === '/' && 
   data.charAt(data_index + 2) === 'a' && 
   data.charAt(data_index + 3) === 'r'
  ) { 
   data_index = data_index + 3; 
   return { 
    is_bad: true, 
    data_index: data_index
   }
  }

  if(
   data.charAt(data_index) === '<' && 
   data.charAt(data_index + 1) === '/' && 
   data.charAt(data_index + 2) === 'a' && 
   data.charAt(data_index + 3) === 'r'
  ) { 
   data_index = data_index + 3; 
   return { 
    is_bad: true, 
    data_index: data_index
   }
  }

  if(
   data.charAt(data_index) === '<' && 
   data.charAt(data_index + 1) === '/' && 
   data.charAt(data_index + 2) === 'a' && 
   data.charAt(data_index + 3) === 'r'
  ) { 
   data_index = data_index + 3; 
   return { 
    is_bad: true, 
    data_index: data_index
   }
  }

  if(
   data.charAt(data_index) === '<' && 
   data.charAt(data_index + 1) === '/' && 
   data.charAt(data_index + 2) === 'a' && 
   data.charAt(data_index + 3) === 'r'
  ) { 
   data_index = data_index + 3; 
   return { 
    is_bad: true, 
    data_index: data_index
   }
  }

  if(
   data.charAt(data_index) === '<' && 
   data.charAt(data_index + 1) === '/' && 
   data.charAt(data_index + 2) === 'a' && 
   data.charAt(data_index + 3) === 'r'
  ) { 
   data_index = data_index + 3; 
   return { 
    is_bad: true, 
    data_index: data_index
   }
  }

  if(
   data.charAt(data_index) === '<' && 
   data.charAt(data_index + 1) === '/' && 
   data.charAt(data_index + 2) === 'a' && 
   data.charAt(data_index + 3) === 'r'
  ) { 
   data_index = data_index + 3; 
   return { 
    is_bad: true, 
    data_index: data_index
   }
  }

  if(
   data.charAt(data_index) === '<' && 
   data.charAt(data_index + 1) === '/' && 
   data.charAt(data_index + 2) === 'a' && 
   data.charAt(data_index + 3) === 'r'
  ) { 
   data_index = data_index + 3; 
   return { 
    is_bad: true, 
    data_index: data_index
   }
  }

  if(
   data.charAt(data_index) === '<' && 
   data.charAt(data_index + 1) === '/' && 
   data.charAt(data_index + 2) === 'a' && 
   data.charAt(data_index + 3) === 'r'
  ) { 
   data_index = data_index + 3; 
   return { 
    is_bad: true, 
    data_index: data_index
   }
  }

  if(
   data.charAt(data_index) === '<' && 
   data.charAt(data_index + 1) === '/' && 
   data.charAt(data_index + 2) === 'a' && 
   data.charAt(data_index + 3) === 'r'
  ) { 
   data_index = data_index + 3; 
   return { 
    is_bad: true, 
    data_index: data_index
   }
  }

  if(
   data.charAt(data_index) === '<' && 
   data.charAt(data_index + 1) === '/' && 
   data.charAt(data_index + 2) === 'a' && 
   data.charAt(data_index + 3) === 'r'
  ) { 
   data_index = data_index + 3; 
   return { 
    is_bad: true, 
    data_index: data_index
   }
  }

  return { 
    is_bad: false, 
    data_index: data_index
  }

}

module.exports = is_bad_closing_tag;