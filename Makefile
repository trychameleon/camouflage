all: build

build:
	@node --harmony build.js

deploy:
	surge build camouflage.surge.sh

serve:
	@node --harmony build.js -s

.PHONY:	build
.PHONY:	deploy
.PHONY:	serve
.PHONY:	all
