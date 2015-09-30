all: build

build:
	@node --harmony_generators build.js

deploy: build
	surge build camouflage.surge.sh

serve: build
	@node --harmony_generators serve.js

.PHONY:	build
.PHONY:	deploy
.PHONY:	serve
.PHONY:	all
