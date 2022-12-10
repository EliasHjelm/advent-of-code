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
const ITERATIONS = 241;

let value = 1;

let pointer = 1;

let toAdd = {};

const pixels = new Array(6).fill(null).map(_ => []);

let doNothingNextCycle = false;

for (let i = 1; i < ITERATIONS; i++) {

  const zeroi = i - 1;
  const row = Math.floor(zeroi / 40);
  const col = zeroi % 40;

  let pixel = '.';

  if (value + 1 >= col && value -1 <= col) {
    pixel = '#';
  }
  console.log('ROW', row,'COL', col,'VALUE', value, 'PIXEL,', pixel)

  pixels[row][col] = pixel;

  if (toAdd[i]) {
    value += toAdd[i];
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
    doNothingNextCycle = true;
    continue;
  }

}

pixels.forEach(line => {
  console.log(line.join(''));
})
