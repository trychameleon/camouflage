all: build

release: build deploy

build:
	@node --harmony build.js chameleon_token="Sxj6nnShTett38sjDkjwvZdYqqWUkS5FcBWFKaZclf3UjllBG7rdUWQ89cQNt-y2kSnF1rXIIPlRUk"

build_dev:
	@node --harmony build.js title=Dev chameleon_token="STBvCDdzXuUhyK1kPoJbdAoMp3kyTa4J3yyl2HKKBXjhRQ-1CyHoj-zEaRfmoLqLJzINvF"

build_v3:
	@node --harmony build.js title=V3 chameleon_token="Sqhgo78fnLur3tBEXeYRslqGMtJVxyZsQJm0lpLEPsHDnX-1CyJsf-zEbABdMkEIopiokS"

build_v4:
	@node --harmony build.js title=V4 chameleon_token="STUcecpq6OH1WxyKVwkZOHjrDRvnyZO131UWJfrN0YH8oM-1CyPbq-zEdCvFK4VBJghiAo"

build_v5:
	@node --harmony build.js title=V5 chameleon_token="Szg9TtjsTTRMWzurHqsMqGQ72ObNM4KUJQDes5fdfb2d1y-1CyPJo-zEdOyeYm734HzwfZ"

build_bugfix:
	@node --harmony build.js title=Bugfix chameleon_token="S2SUo4WAVp4wqaju67PEHDdZLCdrt0AFgIpMcgUX9F2RXC-1DlgG5-zVolxwAW0el5RHLA"

deploydemo: build
	surge build camouflage.surge.sh

deploydev: build_dev
	surge build camouflage-dev.surge.sh

deployv3: build_v3
	surge build camouflage-v3.surge.sh

deployv4: build_v4
	surge build camouflage-v4.surge.sh

deployv5: build_v5
	surge build camouflage-v5.surge.sh

deploybugfix: build_bugfix
	surge build camouflage-bugfix.surge.sh

deploy: deploydemo deploydev deployv3 deployv4 deployv5 deploybugfix

test:

serve:
	@node --harmony build.js -s

.PHONY:	release
.PHONY:	build
.PHONY:	deploy
.PHONY:	serve
.PHONY:	all
