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

const height = lines.length;
const width = lines[0].length;

const scores = [];

lines.forEach((line, row) => {

  [...line].forEach((tree, col) => {

    let left = 0;
    let right = 0;
    let up = 0;
    let down = 0;

    while (lines[row][col - (left + 1)] !== undefined && +lines[row][col-(++left)] < +tree ) {
    }

    while (lines[row][col + (right + 1)] !== undefined && +lines[row][col + ++right] < +tree) {
    }

    while (lines[row - (up + 1)] !== undefined && +lines[row - (++up)][col] < +tree) {
    }

    while(lines[row + down + 1] !== undefined && +lines[row + ++down][col] < +tree) {
    }

    const score = left * right * up * down;

    // console.log(`Tree ${row}-${col} - Up: ${up} right: ${right} down: ${down} left: ${left} - TOTAL = ${score}`);

    scores.push(score);

  });
});

console.log('max', Math.max(...scores));
