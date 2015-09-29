all: build

build:
	@node --harmony_generators build.js

deploy: build
	surge build camouflage.surge.sh

.PHONY:	build
.PHONY:	deploy
.PHONY:	all
