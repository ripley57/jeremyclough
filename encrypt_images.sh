#!/usr/bin/bash
#
# Procedure to create a new enrypted sample image:
# 1) Create the sample as a Word doc. Reduce all margins.
# 2) Redact the contents in CW.  
# 3) Produce in CW and include "page x of y" option.
# 4) Export the produced document in 600dpi colour tif format.
# 5) Use PSP to resize the tif image to 650x841 pixels.
# 6) Use ImageMagick to convert the tif image to a jpg.
# 7) Run this script on the jpg to encrypt it.

script_name=$(basename $0)

if [ $# -ne 1 ]; then
    echo "ERROR: Usage: $script_name <encryption-password>"
    exit 1
fi

password=$1

images_dir_unencrypted=images_unencrypted
images_dir_encrypted=images_encrypted

COMMAND_TO_RUN="find ${images_dir_unencrypted} -maxdepth 1 -type f -exec sh -c 'fname=\$(basename {}) ; openssl enc -aes-256-cbc -in {} -out ${images_dir_encrypted}/\${fname}.encrypted -pass pass:\"$password\" -e -base64' \\;"

eval "$COMMAND_TO_RUN"
