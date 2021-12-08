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

    const [x1, y1] = start.split(',').map(Number);
    const [x2, y2] = end.split(',').map(Number);

    const length = Math.abs(x1 - x2) || Math.abs(y1 - y2);

    const direction = {
        x: x1 < x2 ? 1 : x1 == x2 ? 0 : -1,
        y: y1 < y2 ? 1 : y1 == y2 ? 0 : -1,
    };


    range(0, length).forEach(n => {
        const x = x1 + n * direction.x;
        const y = y1 + n * direction.y;

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

