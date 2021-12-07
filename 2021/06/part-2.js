const range = require('../../utils/range');

let input
input = require('fs').readFileSync(require.resolve('./input'), 'utf-8');
// input = require('fs').readFileSync(require.resolve('./t1'), 'utf-8');
// input = require('fs').readFileSync(require.resolve('./t2'), 'utf-8');


// remove newline at end of file
const lines = input.split('\n').slice(0, -1);
console.log('input', lines);

let state = lines[0].split(',').reduce((total, val) => {
    return {
        ...total,
        [val]: (total[val] || 0) + 1,
    }
}, {});

console.log('init state', state);

const iterations = 256;

range(1, iterations).forEach(day => {

    const newState = {};

    newState['8'] = state['0'] || 0;

    range(0, 7).forEach(n => {
        newState[n] = state[n+1] || 0;
    });

    newState['6'] = newState['6'] + (state['0'] || 0);

    state = newState;

    console.log('state', day, state);

});

const ans = Object.values(state).reduce((acc, curr) => acc + curr);

console.log(`After ${iterations} days there are ${ans} fish`);





