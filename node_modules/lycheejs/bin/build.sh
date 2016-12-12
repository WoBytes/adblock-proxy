#!/bin/bash


LYCHEEJS_ROOT="/opt/lycheejs";
PROJECT_ROOT=$(cd "$(dirname "$0")/../"; pwd);
LYCHEEJS_FERTILIZER="$LYCHEEJS_ROOT/bin/fertilizer.sh";

if [ ! -x "$LYCHEEJS_FERTILIZER" ]; then
	LYCHEEJS_FERTILIZER=`which lycheejs-fertilizer`;
fi;


_concat() {

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



if [ -x "$LYCHEEJS_FERTILIZER" ]; then

	cd $LYCHEEJS_ROOT;

	"$LYCHEEJS_FERTILIZER" html/dist /libraries/lychee;
	"$LYCHEEJS_FERTILIZER" html-nwjs/dist /libraries/lychee;
	"$LYCHEEJS_FERTILIZER" html-webview/dist /libraries/lychee;
	"$LYCHEEJS_FERTILIZER" node/dist /libraries/lychee;
	"$LYCHEEJS_FERTILIZER" node-sdl/dist /libraries/lychee;


	if [ -d $PROJECT_ROOT/build ]; then
		cd $PROJECT_ROOT;
		rm -rf ./build;
	fi;

	_concat html;
	_concat html-nwjs;
	_concat html-webview;
	_concat node;
	# _concat node-sdl;

	echo "SUCCESS";
	exit 0;

else

	echo "FAILURE";
	exit 1;

fi;

