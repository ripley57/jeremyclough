#!/usr/bin/bash

cat > sample_3.md <<EOI
---
layout: default
title: Samples
---
<div id="wrapper">
    <div id="content_area">
      <div id="content_body">
      <h1>Sample 3</h1>
	  
	  <div align="center" style="padding:20px;">
EOI

# Prevent carriage return by using printf.
printf "%s" "<embed style=\"background: transparent url(../assets/images/spinner.gif) no-repeat center\" type=\"application/pdf\" width=\"800\" height=\"400\" src=\"data:application/pdf;base64," >> sample_3.md

# Convert the pdf to a single line of base64.
openssl base64 -in CV_Jeremy_Clough.pdf > CV_Jeremy_Clough.base64
gawk '{printf "%s", $0}' CV_Jeremy_Clough.base64 > base64.tmp
cat base64.tmp >> sample_3.md
rm -f CV_Jeremy_Clough.base64 base64.tmp

# Close the embed tag.
printf "%s\n" '"/>' >> sample_3.md

cat >> sample_3.md <<EOI
</div>
</div>
</div>

    <div id="left_side">
    <nav id="nav-v">
    <ul>
        <li><a href="/personal/pages/sample_1.html">Sample 1</a></li>
        <li><a href="/personal/pages/sample_2.html">Sample 2</a></li>
        <li><a class="active" href="/personal/pages/sample_3.html">Sample 3</a></li>
        <li><a href="/personal/pages/sample_4.html">Sample 4</a></li>
        <li><a href="/personal/pages/sample_5.html">Sample 5</a></li>
    </ul>
    </nav>
    </div>
</div>
EOI
