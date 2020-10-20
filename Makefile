NODE_ENV:=production
DIST_DIR:=dist
BUNDLE_FILE:=utk-web.tgz
PANDOC_TEMPLATE:=default.html5

dist: static
	npm run build -- -o $(DIST_DIR)

static:
	pandoc --template="$(PANDOC_TEMPLATE)" --toc -o public/about.html README.md

prepare:
	npm install

bundle:
	tar -czf $(BUNDLE_FILE) $(DIST_DIR)

clean:
	rm public/about.html
	rm -rf $(DIST_DIR)
