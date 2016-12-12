#!/bin/bash

PROJECT_ROOT=$(cd "$(dirname "$0")/../"; pwd);
PROJECT_NODE=$(which node);


if [ "$PROJECT_NODE" != "" ]; then

	cd $PROJECT_ROOT;

	$PROJECT_NODE ./bin/serve.js $1 $2 $3 $4;

fi;

