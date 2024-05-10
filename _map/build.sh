#!/bin/bash

# remove any files in ./js folder without -min in the name
find ./js -type f ! -name "*-min*" -exec rm -f {} \;
rm -rf ./materials