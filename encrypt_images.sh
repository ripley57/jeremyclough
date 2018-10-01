#!/usr/bin/bash
#
# Description:
#    Encrypt all of the files in the "images_unencrypted" directory,
#    saving the encrypted versions in the "images_encrypted" directory.
#
# Procedure to create a new enrypted sample image:
#    1) Create the sample as a Word doc. Reduce all margins.
#    2) Redact the contents in CW.  
#    3) Produce in CW and include "page x of y" option.
#    4) Export the produced document in 600dpi colour tif format.
#    5) Use ImageMgick to resize the tif image to 650x841 pixels, e.g.:
#       "c:\Program Files\ImageMagick-7.0.1-Q8\magick.exe" "0000001.tif" -resize 650x841 "0000001_resized.tif"
#    6) Use ImageMagick to convert the tif image to a jpg, e.g.:
#       "c:\Program Files\ImageMagick-7.0.1-Q8\magick.exe" "0000001_resized.tif" 0000001.jpg
#    7) Run this script to encrypt the jpg.

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

# Update the Github pages site files.
cp ${images_dir_encrypted}/SAMP01-1.jpg.encrypted assets/images/samples/
cp ${images_dir_encrypted}/SAMP01-2.jpg.encrypted assets/images/samples/

cp ${images_dir_encrypted}/CV01-1.jpg.encrypted assets/images/
cp ${images_dir_encrypted}/CV01-2.jpg.encrypted assets/images/
