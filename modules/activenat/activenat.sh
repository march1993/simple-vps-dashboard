#!/bin/bash

echo "Content-type: text/plain"
echo ''
netstat-nat -n -o | awk '{print $2}' | cut  -f 1 -d ':' | sort | uniq
