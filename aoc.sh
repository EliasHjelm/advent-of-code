#!/bin/bash
DATE=$(date +'%d')
SHORTDATE=$(date +'%d' | sed 's/^0//')
YEAR=$(date +'%Y')
DIR=$YEAR/$DATE
COOKIE=$(cat .cookie)

echo Advent of code $YEAR day $DATE !

mkdir -p $DIR

curl https://adventofcode.com/$YEAR/day/$SHORTDATE/input -o $DIR/input -b session=$COOKIE

if [ ! -f $DIR/part-1.js ]; then
    cp template.js $DIR/part-1.js
fi

if [ ! -f $DIR/t1 ]; then
    touch $DIR/t1
fi

if [ ! -f $DIR/t2 ]; then
    touch $DIR/t2
fi

code ./

cd $DIR

node ./part-1.js

code ./part-1.js

google-chrome https://adventofcode.com/$YEAR/day/$SHORTDATE
