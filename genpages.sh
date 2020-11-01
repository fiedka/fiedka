#!/bin/sh

if [ $# -eq 0 ]
  then
    echo "Please provide the name of your firmware image."
    exit 1
fi

FIRMWARE_IMAGE=$1

case $2 in
  "all")
    echo "Generating ${FIRMWARE_IMAGE}.all"
    sed "s#{FIRMWARE_IMAGE}#${FIRMWARE_IMAGE}#" \
      src/templates/all.tmpl > src/pages/"${FIRMWARE_IMAGE}.all.jsx"
    ;;
  "psp")
    echo "Generating ${FIRMWARE_IMAGE}.psp"
    sed "s#{FIRMWARE_IMAGE}#${FIRMWARE_IMAGE}#" \
      src/templates/psp.tmpl > src/pages/"${FIRMWARE_IMAGE}.psp.jsx"
    ;;
  "uefi")
    echo "Generating ${FIRMWARE_IMAGE}.uefi"
    sed "s#{FIRMWARE_IMAGE}#${FIRMWARE_IMAGE}#" \
      src/templates/uefi.tmpl > src/pages/"${FIRMWARE_IMAGE}.uefi.jsx"
    ;;
  "ufp")
    echo "Generating ${FIRMWARE_IMAGE}.ufp"
    sed "s#{FIRMWARE_IMAGE}#${FIRMWARE_IMAGE}#" \
      src/templates/ufp.tmpl > src/pages/"${FIRMWARE_IMAGE}.ufp.jsx"
    ;;
  *)
    echo "Generating ${FIRMWARE_IMAGE}"
    sed "s#{FIRMWARE_IMAGE}#${FIRMWARE_IMAGE}#" \
      src/templates/utk.tmpl > src/pages/"${FIRMWARE_IMAGE}.jsx"
    ;;
esac
