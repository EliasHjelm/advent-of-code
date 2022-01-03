const range = require('../../utils/range');
const combinations = require('../../utils/combinations');

let input
input = require('fs').readFileSync(require.resolve('./input'), 'utf-8');
input = require('fs').readFileSync(require.resolve('./t1'), 'utf-8');
// input = require('fs').readFileSync(require.resolve('./t2'), 'utf-8');


// remove newline at end of file
const lines = input.split('\n').slice(0, -1);
console.log('input', lines);

let state = [ ...lines[0] ];

const rules = Object.fromEntries(lines.slice(2).map(s => s.split(' -> ')));

console.log('rules', rules);
console.log('state', state);

let iterations = 10;

for (let i = 0; i < iterations; i++) {

    const newState = [state[0]];

    state.forEach((v, i) => {

        const pair = state.slice(i, i + 2).join('');

        if (pair.length == 2) {

            console.log('pair', pair);
            const insert = rules[pair];

            newState.push(insert, pair[1]);
        }
    });

    state = newState;

    console.log(i, state.length);

}

console.log('new', state);

const count = {};

state.forEach(v => {

    count[v] = (count[v] || 0) + 1;
});

console.log('c', count);

const max = Math.max(...Object.values(count));
const min = Math.min(...Object.values(count));

// 152522 too high
console.log('ans', max - min);
