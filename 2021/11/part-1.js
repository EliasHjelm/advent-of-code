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

for (let i = 0; i < iterations; i++) {

    state = state.map(line => line.map(v => v + 1));

    const flashed = [];

    while (state.flat().filter(v => v >= 10).length > flashed.length) {

        console.log('FLASH WAVE');

        combinations(range(0,9), range(0,9)).forEach(([x,y]) => {
            const v = state[x][y];

            if (v >= 10 && !flashed.includes(`${x}-${y}`)) {
                console.log('FLASH on', x, y);
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

    if (i < 9) {
        console.log('after', i+1, 'steps:');
        console.log(state);
    }

    if ((i+1) % 10 == 0) {
        console.log('after', i+1, 'steps:');
        console.log(state);
    }

}

console.log('flashes', flashes);


