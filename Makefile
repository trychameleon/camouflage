all: build

release: build deploy

build:
	@node --harmony build.js

deploy:
	surge build camouflage.surge.sh

serve:
	@node --harmony build.js -s

.PHONY:	release
.PHONY:	build
.PHONY:	deploy
.PHONY:	serve
.PHONY:	all
