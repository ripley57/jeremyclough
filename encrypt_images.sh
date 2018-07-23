#!/usr/bin/bash

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
