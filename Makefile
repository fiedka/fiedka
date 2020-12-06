NODE_ENV:=production
DIST_DIR:=dist
BUNDLE_FILE:=utk-web.tgz
PANDOC_TEMPLATE:=default.html5

dist: static
	npm run build -- -o $(DIST_DIR)

.PHONY: static
static:
	mkdir -p public
	pandoc \
		--template="$(PANDOC_TEMPLATE)" \
		--metadata title="About utk-web" \
		--toc -o public/about.html README.md
	cp -r docs public/

.PHONY: prepare
prepare:
	npm install

.PHONY: bundle
bundle:
	tar -czf $(BUNDLE_FILE) $(DIST_DIR)

.PHONY: clean
clean:
	rm -rf public/*
	rm -rf "$(DIST_DIR)"
