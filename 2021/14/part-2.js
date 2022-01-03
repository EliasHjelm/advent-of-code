const range = require('../../utils/range');
const combinations = require('../../utils/combinations');

let input
input = require('fs').readFileSync(require.resolve('./input'), 'utf-8');
// input = require('fs').readFileSync(require.resolve('./t1'), 'utf-8');
// input = require('fs').readFileSync(require.resolve('./t2'), 'utf-8');


// remove newline at end of file
const lines = input.split('\n').slice(0, -1);
console.log('input', lines);

let state = {};

[ ...lines[0] ].forEach((v, i) => {

    const pair = [...lines[0]].slice(i, i + 2).join('');

    if (pair.length == 2) {
        state[pair] = (state[pair] || 0) + 1;
    }
});

const rules = Object.fromEntries(lines.slice(2).map(s => s.split(' -> ')));

let iterations = 40;

for (let i = 0; i < iterations; i++) {

    const newState = {};

    Object.keys(state).forEach(pair => {

        const insert = rules[pair];

        const newPairs = [`${pair[0]}${insert}`, `${insert}${pair[1]}`];

        const val = state[pair];

        newPairs.forEach(p => {
            newState[p] = (newState[p] || 0) + val;
        });
    })

    state = newState;

    const total = Object.values(state).reduce((acc, curr) => acc + curr);

    console.log(i, total);
}

console.log('new', state);

const count = {};

for (const pair in state) {

    const val = state[pair];

    count[pair[0]] = (count[pair[0]] || 0) + val;
    count[pair[1]] = (count[pair[1]] || 1) + val;
}

const max = Math.max(...Object.values(count));
const min = Math.min(...Object.values(count));

const start = [...lines[0]][0];
const end = [...lines[0]][lines[0].length -1];

count[start]++;
count[end]++;
console.log('count', count);


// 1096460582128 too low
// 3572761917025 too high
// 3572761917024 try
console.log('ans', max/2 - min/2);

