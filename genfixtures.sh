#!/bin/sh

if [ $# -eq 0 ]
  then
    echo "Please provide the full path your firmware image."
    exit 1
fi

FIRMWARE_IMAGE=$1

if [ -z ${2+x} ]
  then
    FIRMWARE_IMAGE_NAME=$(basename "$1")
else
  FIRMWARE_IMAGE_NAME=$2
fi

utk "${FIRMWARE_IMAGE}" json | \
  jq . > "src/fixtures/${FIRMWARE_IMAGE_NAME}.utk.json"
fmap jusage "${FIRMWARE_IMAGE}" | \
  jq . > "src/fixtures/${FIRMWARE_IMAGE_NAME}.fmap.json"
psptool --json "${FIRMWARE_IMAGE}" | \
  jq . > "src/fixtures/${FIRMWARE_IMAGE_NAME}.psp.json"
uefi-firmware-parser --brute --json "$FIRMWARE_IMAGE" | \
  jq . > src/fixtures/"$FIRMWARE_IMAGE_NAME".ufp.json
