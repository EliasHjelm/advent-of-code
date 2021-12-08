const combinations = require('../../utils/combinations');
const range = require('../../utils/range');

let input
input = require('fs').readFileSync(require.resolve('./input'), 'utf-8');
// input = require('fs').readFileSync(require.resolve('./t1'), 'utf-8');
// input = require('fs').readFileSync(require.resolve('./t2'), 'utf-8');


// remove newline at end of file
const lines = input.split('\n').slice(0, -1);
console.log('input', lines);

const grid = {};

for (const line of lines) {

    const [start, end] = line.split(' -> ');

    const [x1, y1] = start.split(',');
    const [x2, y2] = end.split(',');

    if (x1 !== x2 && y1 !== y2) {
        continue;
    }

    combinations(range(x1, x2), range(y1, y2)).forEach((arg) => {
        const [x, y] = arg;
        grid[x] = grid[x] || {};

        grid[x][y] = (grid[x][y] || 0) + 1;
    });
}

const ans = Object.values(grid).reduce((acc, curr) => {

    const twos = Object.values(curr).filter(val => val >= 2).length;

    return acc + twos;
}, 0);

// console.log('grid', grid);

console.log('ans', ans);

