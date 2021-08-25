## install tools

- `tpm2-tools`
- `yq`

## get the TPM log

```sh
cat /sys/kernel/security/tpm0/binary_bios_measurements > tpmlog.bin
```

## parse to YAML

Note: fix with `awk` because output is not proper YAML

```sh
tpm2_eventlog tpmlog.bin | \
  awk -v k=1 '/  PCR/ {gsub(/  PCR/, sprintf("- EventNum: %d\n  PCR", k++))} 1' \
  > tpmlog.yml
```

## convert YAML to JSON

```sh
cat tpmlog.yml | yq > tpmlog.json
```
