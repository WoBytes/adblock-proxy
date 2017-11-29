#!/bin/bash


LYCHEEJS_ROOT=$(cd "$(dirname "$0")/../../../"; pwd);
PROJECT_ROOT=$(cd "$(dirname "$0")/../"; pwd);
LYCHEEJS_FERTILIZER="$LYCHEEJS_ROOT/libraries/fertilizer/bin/fertilizer.sh";
LYCHEEJS_HELPER="$LYCHEEJS_ROOT/bin/helper.sh";


_concat_lychee() {

	platform="$1";
	target="$PROJECT_ROOT/build/$platform/lychee.js";
	folder=$(dirname "$target");
	core="$LYCHEEJS_ROOT/libraries/lychee/build/$platform/core.js";
	dist="$LYCHEEJS_ROOT/libraries/lychee/build/$platform/dist/index.js";


	if [ ! -d "$folder" ]; then
		mkdir -p "$folder";
	fi;


	cat $core $dist > $target;
	echo -e "\n" >> $target;
	echo -e "lychee.inject(lychee.ENVIRONMENTS[\"/libraries/lychee/dist\"]);\n" >> $target;
	echo -e "\n" >> $target;

}

_concat_library() {

	platform="$1";
	library="$2";
	target="$PROJECT_ROOT/build/$platform/$library.js";
	folder=$(dirname "$target");
	core="$LYCHEEJS_ROOT/libraries/lychee/build/$platform/core.js";
	dist="$LYCHEEJS_ROOT/libraries/$library/build/$platform/dist/index.js";


	if [ ! -d "$folder" ]; then
		mkdir -p "$folder";
	fi;


	cat $core $dist > $target;
	echo -e "\n" >> $target;
	echo -e "lychee.inject(lychee.ENVIRONMENTS[\"/libraries/$library/dist\"]);\n" >> $target;
	echo -e "\n" >> $target;

}


if [ -x "$LYCHEEJS_FERTILIZER" ] && [ -x "$LYCHEEJS_HELPER" ]; then

	cd $LYCHEEJS_ROOT;

	"$LYCHEEJS_FERTILIZER" html/dist /libraries/lychee;
	"$LYCHEEJS_FERTILIZER" html-nwjs/dist /libraries/lychee;
	"$LYCHEEJS_FERTILIZER" html-webview/dist /libraries/lychee;
	"$LYCHEEJS_FERTILIZER" node/dist /libraries/lychee;
	"$LYCHEEJS_FERTILIZER" node-sdl/dist /libraries/lychee;

	"$LYCHEEJS_FERTILIZER" node/dist /libraries/breeder;
	"$LYCHEEJS_FERTILIZER" node/dist /libraries/fertilizer;
	"$LYCHEEJS_FERTILIZER" node/dist /libraries/harvester;
	"$LYCHEEJS_FERTILIZER" node/dist /libraries/strainer;


	if [ -d $PROJECT_ROOT/build ]; then
		cd $PROJECT_ROOT;
		rm -rf ./build;
	fi;

	_concat_lychee html;
	_concat_lychee html-nwjs;
	_concat_lychee html-webview;
	_concat_lychee node;
	# _concat node-sdl;

	_concat_library node breeder;
	_concat_library node fertilizer;
	_concat_library node harvester;
	_concat_library node strainer;


	cd $PROJECT_ROOT;
	"$LYCHEEJS_HELPER" env:node ./bin/build.js;


	echo "SUCCESS";
	exit 0;

else

	echo "FAILURE";
	exit 1;

fi;

