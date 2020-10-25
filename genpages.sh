#!/bin/sh

if [ $# -eq 0 ]
  then
    echo "Please provide the name of you firmware image"
fi

FIRMWARE_IMAGE=$1

sed "s#{FIRMWARE_IMAGE}#${FIRMWARE_IMAGE}#" \
  src/templates/UEFI.tmpl > src/pages/"${FIRMWARE_IMAGE}.jsx"
sed "s#{FIRMWARE_IMAGE}#${FIRMWARE_IMAGE}#" \
  src/templates/PSP.tmpl > src/pages/"${FIRMWARE_IMAGE}.psp.jsx"
