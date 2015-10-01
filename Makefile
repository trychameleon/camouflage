all: build

build:
	@node --harmony_generators build.js

deploy:
	surge build camouflage.surge.sh

serve:
	@node --harmony_generators build.js -s

.PHONY:	build
.PHONY:	deploy
.PHONY:	serve
.PHONY:	all
