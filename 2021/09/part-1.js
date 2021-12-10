const combinations = require('../../utils/combinations');
const range = require('../../utils/range');

let input
input = require('fs').readFileSync(require.resolve('./input'), 'utf-8');
// input = require('fs').readFileSync(require.resolve('./t1'), 'utf-8');
// input = require('fs').readFileSync(require.resolve('./t2'), 'utf-8');


// remove newline at end of file
const lines = input.split('\n').slice(0, -1).map(s => [...s].map(Number));
console.log(lines);

const lowpoints = [];

combinations(range(0, lines.length - 1), range(0, lines[0].length - 1)).forEach(([x, y]) => {

    console.log('x y', x, y);
    console.log('lines[x]', lines[x]);

    const adjacent = [lines[x-1]?.[y], lines[x+1]?.[y], lines[x][y+1], lines[x][y-1]].filter(v => v !== undefined);

    const val = lines[x][y];

    if (adjacent.every(v => v > val)) {
        lowpoints.push(val + 1);
    }

});

console.log('low points', lowpoints);
console.log('ans', lowpoints.reduce((acc, curr) => acc + curr));

