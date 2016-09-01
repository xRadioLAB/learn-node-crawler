# make all

# .PHONY: css
# css:
# 	mkdir -p bundle
# 	postcss --watch --use autoprefixer --use postcss-import css/kill-cms.css --output bundle/kill-cms.min.css

.PHONY: js
js:
	# mkdir -p bundle
	babel --watch examples/1/hello-crawler.es6.js --out-file examples/1/hello-crawler.js

# .PHONY: server
# server:
# 	browser-sync start --server --files='index.html, bundle, css, js, img'

# .PHONY: clean
# clean:
# 	rm -r bundle

.PHONY: all
all:
	make js & wait
