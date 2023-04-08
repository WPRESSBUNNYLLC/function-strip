var bad_closing_tags = ['</a','</abbr','</acronym>','</address','</applet','</area','</article','</aside','</audio','</b','</base',
'</basefont','</bdi','</bdo','</big','</blockquote','</body','</br','</button','</canvas','</caption','</center','</cite','</code',
'</col','</colgroup','</data','</datalist','</dd','</del','</details','</dfn','</dialog','</dir','</div','</dl','</dt',
'</em','</embed','</fieldset','</figcaption','</figure','</font','</footer','</form','</frame','</frameset','</h1',
'</h2','</h3','</h4','</h5','</h6','</head','</header','</hr','</html','</i','</iframe','</img','</input','</ins','</kbd','</label','</legend',
'</li','</link','</main','</map','</mark','</meta','</meter','</nav','</noframes','</noscript','</object','</ol','</optgroup',
'</option','</output','</p','</param','</picture','</pre','</progress','</q','</rp','</rt','</ruby','</s','</samp','</section','</select',
'</small','</source','</span','</strike','</strong','</style','</sub','</summary','</sup','</svg','</table','</tbody','</td',
'</template','</textarea','</tfoot','</th','</thead','</time','</title','</tr','</track','</tt','</u','</ul','</var','</video',
];

function is_bad_closing_tag(string_) { //obviously i could use an object. you are not cool
 if(bad_closing_tags.includes(string_)) { 
  return true
 } else { 
  return false;
 }
}

module.exports = is_bad_closing_tag;