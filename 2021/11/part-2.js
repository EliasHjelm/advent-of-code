const range = require('../../utils/range');
const combinations = require('../../utils/combinations');

let input
input = require('fs').readFileSync(require.resolve('./input'), 'utf-8');
// input = require('fs').readFileSync(require.resolve('./t1'), 'utf-8');
// input = require('fs').readFileSync(require.resolve('./t2'), 'utf-8');


// remove newline at end of file
let state = input.split('\n').slice(0, -1).map(l => l.split('').map(Number));
console.log('input', state);

let iterations = 100;

let flashes = 0;

const ans = range(0, 100000).find(i => {

    state = state.map(line => line.map(v => v + 1));

    const flashed = [];

    while (state.flat().filter(v => v >= 10).length > flashed.length) {

        combinations(range(0,9), range(0,9)).forEach(([x,y]) => {
            const v = state[x][y];

            if (v >= 10 && !flashed.includes(`${x}-${y}`)) {
                flashed.push(`${x}-${y}`);
                flashes++;
                const adjacent = combinations(range(x-1, x+1), range(y-1, y+1));

                adjacent.forEach(([x, y]) => {
                    if (state[x]?.[y] !== undefined) {
                        state[x][y]++;
                    }
                });
            }
        });
    }

    state = state.map(line => line.map(v => v < 10 ? v : 0));

    return flashed.length == 100;
})

console.log('ans', ans + 1);