module github.com/fiedka/fiedka

go 1.17

require (
	github.com/happybeing/webpack-golang-wasm-async-loader/gobridge v0.0.0-20201126150039-3d18007626dd
	github.com/linuxboot/fiano v6.0.0-rc+incompatible
	github.com/orangecms/converged-security-suite v1.0.2
)

require (
	github.com/9elements/converged-security-suite/v2 v2.6.0 // indirect
	github.com/ulikunitz/xz v0.5.10 // indirect
	golang.org/x/text v0.3.6 // indirect
)

replace github.com/9elements/converged-security-suite/v2 => github.com/orangecms/converged-security-suite v1.0.1
