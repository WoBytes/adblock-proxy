#!/bin/bash

# Test HTTP proxy
node ./bin/proxy.js --host=localhost --port=1338;

# Test HTTPS proxy
# openssl req -newkey rsa:2048 -new -nodes -x509 -days 3650 -keyout key.pem -out cert.pem;
# node ./bin/proxy.js --host=localhost --port=1339;

