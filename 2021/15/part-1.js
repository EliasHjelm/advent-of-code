const range = require('../../utils/range');
const combinations = require('../../utils/combinations');

let input
input = require('fs').readFileSync(require.resolve('./input'), 'utf-8');
// input = require('fs').readFileSync(require.resolve('./t1'), 'utf-8');
// input = require('fs').readFileSync(require.resolve('./t2'), 'utf-8');


// remove newline at end of file
const lines = input.split('\n').slice(0, -1);

const grid = lines.map(line => line.split('').map(Number));

const size = grid.length;

console.log('size', size);

const getAdjacent = (x, y, origin = [-1, -1]) => {

    return [
        [x, y + 1],
        [x, y - 1],
        [x + 1, y],
        [x - 1, y],
    ].filter(([x, y]) => unvisited.includes(`${x}-${y}`));
};

let unvisited = combinations(range(0, size - 1), range(0, size - 1)).map(([x, y]) => `${x}-${y}`);

const cache = {
    '0-0': 0,
};

const inf = Number.MAX_SAFE_INTEGER;

unvisited.forEach(c => {
    cache[c] = inf;
});

cache['0-0'] = 0;

let current = '0-0';

let insanity = 0;
let limit = inf;

while (unvisited.includes(`${size - 1}-${size -1}`) && ++insanity < limit) {

    const [x,y] = current.split('-').map(Number);

    const adjacent = getAdjacent(x, y);

    const base = cache[`${x}-${y}`];

    const near = adjacent.map(([x, y]) => {

        const s = `${x}-${y}`;
        const val = grid[x][y] + base;

        // update cache if beneficial
        cache[s] = Math.min(cache[s] || inf, val);

        return {
            val,
            s,
        };
    });

    unvisited = unvisited.filter(v => v !== `${x}-${y}`);

    const min = Math.min(...unvisited.map(s => cache[s]));

    const nextCurrent = unvisited.find(n => cache[n] == min);

    current = nextCurrent;

}

console.log('ans', cache[`${size -1}-${size -1}`]);

// 9007199254740991 -- too high
