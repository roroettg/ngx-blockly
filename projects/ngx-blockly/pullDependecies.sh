#!/usr/bin/env bash

export BLOCKLY_VERSION="1.20190419.0"

rm -rf ./scripts/blockly/

wget -qO- -O blockly.zip  https://github.com/google/blockly/archive/$BLOCKLY_VERSION.zip \
            && unzip blockly.zip -d ./scripts/ \
            && mv ./scripts/blockly-$BLOCKLY_VERSION ./scripts/blockly \
            && rm -rf blockly.zip ./scripts/blockly/demos ./scripts/blockly/tests

