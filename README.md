onePage
=======

OnePage is a html preprocessor that glues smaller html pages into one.

Usage
====

```
onePage.js [options] [file ...]
Options:
-o [output filename]; default screen
-open [openDelimiter]; default <%
-close [closeDelimiter]; default %>
-inc [include Key Word]; default include 
-v; verbose
-h; help file
```

Example
====

```
$cat world.html
<span>World</span>
$cat hello.html
<p>Hello <% include world %></p>
$onePage hello.html
<p>Hello <span> World </span></p>
```

Notes
====

* Html tags are not required.
* Tags are white space sensitive. (`<% include !== <%include`)

License
====

Copyright (C) 2013 Ryan Lee

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
