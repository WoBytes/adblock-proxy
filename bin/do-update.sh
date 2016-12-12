#!/bin/bash

PROJECT_ROOT=$(cd "$(dirname "$0")/../"; pwd);
CONFIG_ROOT="$PROJECT_ROOT/config.d";


# Update Host Lists

wget http://winhelp2002.mvps.org/hosts.txt -O "$CONFIG_ROOT/hosts/winhelp2002-mvps.txt";
wget http://someonewhocares.org/hosts/hosts -O "$CONFIG_ROOT/hosts/someonewhocares.txt";
wget http://cdn.trjlive.com/hosts/hosts-v8.txt -O "$CONFIG_ROOT/hosts/trjlive.txt";


# Update AdBlock Plus Filters

wget --no-check-certificate https://easylist-downloads.adblockplus.org/fanboy-annoyance.txt -O "$CONFIG_ROOT/adblockplus/fanboy-annoyance.txt";
wget --no-check-certificate https://easylist-downloads.adblockplus.org/fanboy-social.txt -O "$CONFIG_ROOT/adblockplus/fanboy-social.txt";
wget --no-check-certificate https://easylist-downloads.adblockplus.org/easylist_noelemhide.txt -O "$CONFIG_ROOT/adblockplus/easylist_noelemhide.txt";
wget --no-check-certificate https://easylist-downloads.adblockplus.org/easyprivacy.txt -O "$CONFIG_ROOT/adblockplus/easyprivacy.txt";

