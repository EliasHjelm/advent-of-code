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

let vis = 0;

lines.forEach((line, row) => {

  [...line].forEach((tree, col) => {

    const visibleFromTop = row === 0 || range(0, row - 1).every(row => {
      return +lines[row][col] < +tree;
    });


    const visibleFromBottom = row === height - 1 || range(row + 1, height - 1).every(row => {
      return +lines[row][col] < +tree;
    });

    const visFromLeft = col === 0 || range(0, col - 1).every(col => {
      return +lines[row][col] < +tree;
    });

    const visFromRight = col === width - 1 || range(col + 1, width - 1).every(col => {
      return +lines[row][col] < +tree;
    });

    if (visFromLeft || visFromRight || visibleFromBottom || visibleFromTop) {
      vis++;
    }

  });
});

console.log('vis', vis);