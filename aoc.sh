#!/bin/bash
DATE=$(date +'%d')
COOKIE=$(cat .cookie)

echo Advent of code day $DATE !

mkdir -p $DATE

curl https://adventofcode.com/2020/day/$DATE/input -o $DATE/input -b session=$COOKIE

if [ ! -f $DATE/codez.js ]; then
    cp template.js $DATE/codez.js
fi

node $DATE/codez.js

code $DATE/codez.js
