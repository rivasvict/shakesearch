#!/bin/bash
docker run --rm -p 3001:3001 -v "$PWD":/usr/src/myapp -w /usr/src/myapp golang:1.18 ./shakesearch