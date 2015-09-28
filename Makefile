all: build

build:
	node_modules/.bin/metalsmith

deploy: build
	surge build camouflage.surge.sh

.PHONY:	build
.PHONY:	deploy
.PHONY:	all
