#!/usr/bin/bash

cat > cv.md <<EOI
<div align="center" style="padding:20px;">
<!-- 
Apparently we are supposed to use the object tag instead of the embed 
tag, but only using embed tag appears to preserve my footer tag. 
-->
EOI

# Prevent carriage return by usin printf.
printf "%s" "<embed style=\"background: transparent url(../assets/images/spinner.gif) no-repeat center\" type=\"application/pdf\" width=\"800\" height=\"500\" src=\"data:application/pdf;base64," >> cv.md

# As the pdf as a single line of base64.
openssl base64 -in CV_Jeremy_Clough.pdf > CV_Jeremy_Clough.base64
gawk '{printf "%s", $0}' CV_Jeremy_Clough.base64 > base64.tmp 
cat base64.tmp >> cv.md
rm -f CV_Jeremy_Clough.base64 base64.tmp

# Close the embed tag.
printf "%s\n" '"/>' >> cv.md

cat >> cv.md <<EOI
</div>
EOI
