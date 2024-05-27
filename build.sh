#!/bin/bash
find . -type d -name "js" -exec find {} -type f -name "script.js" -exec rm -f {} \;