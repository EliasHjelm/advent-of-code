const range = require('../../utils/range');
const combinations = require('../../utils/combinations');
const sum = require('../../utils/sum');

let input
input = require('fs').readFileSync(require.resolve('./input'), 'utf-8');
// input = require('fs').readFileSync(require.resolve('./t1'), 'utf-8');
// input = require('fs').readFileSync(require.resolve('./t2'), 'utf-8');


// remove newline at end of file
const lines = input.split('\n').slice(0, -1);
console.log('input', lines);

lines.unshift('1-index-me-please');


const ADD_DELAY = 2;
const ITERATIONS = 242;

let vals = {};

let value = 1;

let pointer = 1;

let toAdd = {};


let doNothingNextCycle = false;

for (let i = 1; i < ITERATIONS; i++) {

  if (i % 40 === 20) {
    vals[i] = value * i;
  }

  if (toAdd[i]) {
    value += toAdd[i];
    console.log('ADD', toAdd[i], 'AFTER CYCLE', i, 'GIVES', value);
  }

  if (doNothingNextCycle) {
    doNothingNextCycle = false;
    continue;
  }
  const instruction = lines[pointer];


  pointer++;
  if (/addx/.test(instruction)) {
    const n = parseInt(instruction.split(' ')[1]);
    toAdd[i + 1] = n;
    console.log('CYCLE', i, 'ADD', n, 'AFTER CYCLE', i + 1);
    doNothingNextCycle = true;
    continue;
  }


}

console.log('vals', vals);

console.log('ans', sum(Object.values(vals)));