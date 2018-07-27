#!/usr/bin/bash
#
# Procedure to create a new enrypted image:
# 1) Capture the image in a high res bitmap format, e.g. tif.
# 2) Use PSP to resize the image (e.g. tif), to 650x841 pixels.
# 3) Use ImageMagick to convert the image to a jpg.
# 4) Run this script on the jpg to encrypt it.

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
